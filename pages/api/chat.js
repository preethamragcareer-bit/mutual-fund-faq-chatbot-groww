import { retrieve, buildSystemPrompt, ADVICE_REGEX, PERFORMANCE_REGEX } from "../../lib/corpus";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body;
  if (!query || typeof query !== "string") return res.status(400).json({ error: "Missing query" });

  // Fast-path refusals (no LLM call needed)
  if (ADVICE_REGEX.test(query)) {
    return res.json({
      type: "refuse",
      text: "I can only provide factual scheme information — not investment advice or recommendations.",
      edulink: "https://www.amfiindia.com/investor-corner/knowledge-center",
      edulabel: "AMFI Investor Education Centre"
    });
  }

  const isPerformanceQ = PERFORMANCE_REGEX.test(query);
  const hasFactualKeyword = /expense|exit load|sip|benchmark|riskometer|lock.?in|minimum|download|statement/.test(query.toLowerCase());
  if (isPerformanceQ && !hasFactualKeyword) {
    return res.json({
      type: "performance_refuse",
      text: "I do not provide return figures or performance comparisons. Please refer to the official factsheet for accurate performance data.",
      factsheet_url: "https://www.miraeassetmf.co.in/downloads/factsheet",
      factsheet_label: "Mirae Asset Official Monthly Factsheet"
    });
  }

  const chunks = retrieve(query);
  if (!chunks.length) {
    return res.json({
      type: "unknown",
      text: "I don't have that specific fact in my corpus. Please check the official Mirae Asset website or Groww.",
      source_url: "https://www.miraeassetmf.co.in",
      source_label: "Mirae Asset official website"
    });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not set");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.1,
        max_tokens: 300,
        messages: [
          { role: "system", content: buildSystemPrompt(chunks) },
          { role: "user", content: query }
        ]
      })
    });

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "";

    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : {
      type: "answer",
      text: raw,
      source_url: chunks[0].source_url,
      source_label: chunks[0].source_label,
      updated: "April 2025"
    };

    return res.json(parsed);
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(500).json({
      type: "unknown",
      text: "Something went wrong. Please try again.",
      source_url: "https://groww.in",
      source_label: "Groww"
    });
  }
}
