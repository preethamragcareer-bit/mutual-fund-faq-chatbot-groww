export const CORPUS = [
  {
    id: "large_cap",
    scheme: "Mirae Asset Large Cap Fund",
    keywords: ["large cap","large-cap","largecap","large cap fund"],
    facts: {
      category: "Large Cap Fund (Equity) — invests >80% in top-100 companies by market cap (SEBI-defined).",
      expense_ratio: "Direct Plan: 0.54% | Regular Plan: 1.54% (as of early 2025).",
      min_sip: "₹99 per instalment (multiples of ₹1 thereafter).",
      min_lumpsum: "₹5,000.",
      exit_load: "1% if redeemed within 1 year (365 days). Nil after 1 year.",
      riskometer: "Very High.",
      benchmark: "NIFTY 100 Total Return Index (TRI).",
      fund_manager: "Gaurav Misra (Co-Head Equity).",
      lock_in: "No lock-in period.",
      taxation: "STCG: 20% (within 1 year). LTCG: 12.5% on gains above ₹1.25 lakh per year (after 1 year).",
      aum: "Approximately ₹35,000–41,800 Cr (Direct Plan, early 2025)."
    },
    source_url: "https://groww.in/mutual-funds/mirae-asset-large-cap-fund-direct-growth",
    source_label: "Groww — Mirae Asset Large Cap Fund Direct Growth"
  },
  {
    id: "elss",
    scheme: "Mirae Asset ELSS Tax Saver Fund",
    keywords: ["elss","tax saver","tax saving","80c","lock-in","lock in","lockin","tax benefit"],
    facts: {
      category: "ELSS — Equity Linked Savings Scheme. Invests ≥80% in equity. Qualifies for Section 80C deduction.",
      expense_ratio: "Direct Plan: 0.59% | Regular Plan: ~1.55–1.58% (as of early 2025).",
      min_sip: "₹500 per instalment (multiples of ₹500 thereafter).",
      min_lumpsum: "₹500.",
      exit_load: "Nil — units are locked in for 3 years; early redemption is not permitted.",
      riskometer: "Very High.",
      benchmark: "NIFTY 500 Total Return Index (TRI).",
      fund_manager: "Neelesh Surana.",
      lock_in: "Mandatory 3-year lock-in per SIP instalment / lumpsum from date of investment.",
      tax_benefit: "Tax deduction up to ₹1,50,000 per financial year under Section 80C of the Income Tax Act.",
      taxation: "LTCG: 12.5% on gains above ₹1.25 lakh after 3-year lock-in. No STCG since early redemption is not allowed.",
      aum: "Approximately ₹22,940–26,200 Cr (early 2025)."
    },
    source_url: "https://groww.in/mutual-funds/mirae-asset-elss-tax-saver-fund-direct-growth",
    source_label: "Groww — Mirae Asset ELSS Tax Saver Fund Direct Growth"
  },
  {
    id: "flexi_cap",
    scheme: "Mirae Asset Flexi Cap Fund",
    keywords: ["flexi cap","flexi-cap","flexicap"],
    facts: {
      category: "Flexi Cap Fund (Equity) — invests across large, mid, and small cap companies with no fixed allocation constraint.",
      expense_ratio: "Direct Plan: ~0.60% | Regular Plan: ~1.55% (as of early 2025).",
      min_sip: "₹99 per instalment.",
      min_lumpsum: "₹5,000.",
      exit_load: "1% on units exceeding 15% of investment if redeemed within 1 year. Nil after 1 year.",
      riskometer: "Very High.",
      benchmark: "NIFTY 500 Total Return Index (TRI).",
      fund_manager: "Varun Goel.",
      lock_in: "No lock-in period.",
      taxation: "STCG: 20% (within 1 year). LTCG: 12.5% on gains above ₹1.25 lakh per year (after 1 year).",
      aum: "Part of Mirae Asset's ~₹2,00,688 Cr total AUM."
    },
    source_url: "https://groww.in/mutual-funds/mirae-asset-flexi-cap-fund-direct-growth",
    source_label: "Groww — Mirae Asset Flexi Cap Fund Direct Growth"
  },
  {
    id: "large_midcap",
    scheme: "Mirae Asset Large & Midcap Fund",
    keywords: ["large midcap","large & midcap","large and midcap","large midcap fund","emerging bluechip"],
    facts: {
      category: "Large & Mid Cap Fund (Equity) — invests 35–65% in large cap AND 35–65% in mid cap stocks (SEBI-mandated).",
      expense_ratio: "Direct Plan: 0.57–0.63% | Regular Plan: ~1.54% (as of early 2025).",
      min_sip: "₹99 per instalment.",
      min_lumpsum: "₹5,000.",
      exit_load: "1% if redeemed within 1 year (365 days). Nil after 1 year.",
      riskometer: "Very High.",
      benchmark: "NIFTY Large Midcap 250 Total Return Index (TRI).",
      fund_manager: "Neelesh Surana & Ankit Jain.",
      lock_in: "No lock-in period.",
      taxation: "STCG: 20% (within 1 year). LTCG: 12.5% on gains above ₹1.25 lakh per year (after 1 year).",
      aum: "Approximately ₹38,138–40,554 Cr (Direct Plan, early 2025)."
    },
    source_url: "https://groww.in/mutual-funds/mirae-asset-large-midcap-fund-direct-growth",
    source_label: "Groww — Mirae Asset Large & Midcap Fund Direct Growth"
  },
  {
    id: "capital_gains",
    scheme: "General — Groww Platform",
    keywords: ["capital gain","capital gains","statement","download","report","itr","cams","kfin","tax filing","tax statement"],
    facts: {
      groww_app: "Groww App: Tap 'You' (bottom-right) → 'SIP & Reports' → 'Capital Gain' → Select financial year → Tap 'Download'.",
      groww_web: "Groww Website: Login → Profile → Reports → Tax Filing → 'Capital Gains - Mutual Funds' → Select FY → Download (Excel format).",
      cams: "Via CAMS: Visit camsonline.com → Statements → Capital Gain/Loss Statement → Enter registered email → Select FY → Email encrypted statement.",
      kfin: "Via KFin Technologies: Visit kfintech.com → Mutual Fund Investors → Statements and Reports → Capital Gains Statement.",
      note: "For consolidated statements across multiple AMCs/platforms, use CAMS or KFin (both are SEBI-registered RTAs)."
    },
    source_url: "https://groww.in/help/mutual-funds/mf-others/how-to-download-capital-gain-report--50",
    source_label: "Groww Help Centre — How to download capital gain report"
  }
];

export const ADVICE_REGEX = /\b(should i|should i buy|should i sell|should i invest|is it good|is it better|recommend|suggest|worth buying|which fund is best|compare returns|best fund|portfolio|allocation|will it grow|outlook|pick for me)\b/i;
export const PERFORMANCE_REGEX = /\b(returns?|how much return|annualized|cagr|1 year return|3 year return|5 year return|past performance|historical return)\b/i;

export function retrieve(query) {
  const q = query.toLowerCase();
  const factsStr = (chunk) => JSON.stringify(chunk.facts).toLowerCase();
  const scored = CORPUS.map(chunk => {
    let score = 0;
    chunk.keywords.forEach(kw => { if (q.includes(kw)) score += 3; });
    if (q.includes(chunk.scheme.toLowerCase())) score += 5;
    if (/expense|ter|ratio/.test(q) && factsStr(chunk).includes("expense")) score += 2;
    if (/exit load/.test(q) && factsStr(chunk).includes("exit_load")) score += 2;
    if (/\bsip\b|minimum|min sip/.test(q) && factsStr(chunk).includes("min_sip")) score += 2;
    if (/lock.?in/.test(q) && factsStr(chunk).includes("lock_in")) score += 2;
    if (/benchmark/.test(q) && factsStr(chunk).includes("benchmark")) score += 2;
    if (/risk/.test(q) && factsStr(chunk).includes("riskometer")) score += 2;
    if (/download|statement|capital gain|cams|kfin|itr|tax filing/.test(q)) {
      if (chunk.id === "capital_gains") score += 8;
    }
    return { score, chunk };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.filter(x => x.score > 0).slice(0, 2).map(x => x.chunk);
}

export function buildSystemPrompt(chunks) {
  const context = chunks.map(c =>
    `--- SCHEME: ${c.scheme} ---\nFACTS: ${JSON.stringify(c.facts, null, 2)}\nSOURCE_URL: ${c.source_url}\nSOURCE_LABEL: ${c.source_label}`
  ).join("\n\n");

  return `You are a facts-only Mutual Fund FAQ assistant for Mirae Asset Mutual Fund schemes on Groww.
Corpus: Mirae Asset Large Cap Fund, ELSS Tax Saver Fund, Flexi Cap Fund, Large & Midcap Fund.

STRICT RULES:
1. Answer ONLY from the CONTEXT below. Never invent data.
2. Keep answers ≤3 sentences. Be concise and factual.
3. Always include source_url and source_label from context.
4. Refuse investment advice with type "refuse".
5. Refuse performance/returns queries with type "performance_refuse".
6. Never mention PII fields (PAN, Aadhaar, bank account, OTP).
7. If context does not answer the query, use type "unknown".

CONTEXT:
${context}

RESPOND with valid JSON only:
For answer: {"type":"answer","text":"...","source_url":"...","source_label":"...","updated":"April 2025"}
For advice refusal: {"type":"refuse","text":"I can only provide factual scheme information — not investment advice or recommendations.","edulink":"https://www.amfiindia.com/investor-corner/knowledge-center","edulabel":"AMFI Investor Education Centre"}
For performance refusal: {"type":"performance_refuse","text":"I do not provide return figures. Please refer to the official factsheet for performance data.","factsheet_url":"https://www.miraeassetmf.co.in/downloads/factsheet","factsheet_label":"Mirae Asset Official Factsheet"}
For unknown: {"type":"unknown","text":"I don't have that fact in my corpus. Please check the official Mirae Asset website.","source_url":"https://www.miraeassetmf.co.in","source_label":"Mirae Asset official website"}`;
}
