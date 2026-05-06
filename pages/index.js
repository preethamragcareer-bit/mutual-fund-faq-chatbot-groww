import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const TICKERS = [
  { name: "NIFTY 50", val: "24,052.70", chg: "-66.60 (0.28%)", up: false },
  { name: "SENSEX", val: "77,065.59", chg: "-203.81 (0.26%)", up: false },
  { name: "BANKNIFTY", val: "54,815.95", chg: "-62.55 (0.11%)", up: false },
  { name: "MIDCPNIFTY", val: "13,953.95", chg: "+23.75 (0.17%)", up: true },
];

const STOCK_SNAPSHOT = [
  { name: "Titagarh Rail", value: "₹855.40", change: "+11.17%" },
  { name: "PNB", value: "₹109.25", change: "+0.52%" },
  { name: "Vedanta", value: "₹302.30", change: "+2.80%" },
];

const TOP_MOVERS = [
  { company: "CG Power & Inds", price: "₹829.45", change: "+0.36%" },
  { company: "Vedanta", price: "₹302.30", change: "+2.60%" },
  { company: "PNB", price: "₹109.25", change: "+0.52%" },
];

const TOOLS = ["IPO", "Bonds", "ETFs", "Intraday Screener", "Market News"];
const WATCHLIST = [
  { name: "HDFC Bank", price: "₹1,532.20", change: "+0.62%", up: true },
  { name: "Infosys", price: "₹1,468.55", change: "-0.41%", up: false },
];

const EXAMPLES = [
  "Expense ratio of Large Cap Fund?",
  "ELSS lock-in period?",
  "Minimum SIP for ELSS?",
  "Exit load on Flexi Cap Fund?",
  "How to download capital gains statement?",
  "Benchmark of Large & Midcap Fund?",
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      type: "welcome",
      text: "Hi! I'm your Groww Mutual Fund Assistant. Ask me anything about Mirae Asset schemes — expense ratio, exit load, SIP, ELSS lock-in, riskometer, or how to download your statement. Facts-only. No investment advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(query) {
    const q = query || input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", ...data }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "bot", type: "unknown",
        text: "Something went wrong. Please try again.",
        source_url: "https://groww.in", source_label: "Groww"
      }]);
    }
    setLoading(false);
  }

  function renderBotMsg(msg) {
    if (msg.type === "welcome") return <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{msg.text}</p>;

    if (msg.type === "answer") return (
      <div>
        <p style={{ margin: "0 0 8px", fontSize: 13, lineHeight: 1.65 }}>{msg.text}</p>
        <div style={{ background: "#f0f7ff", borderRadius: 6, padding: "6px 10px", fontSize: 11.5 }}>
          📎 <strong>Source:</strong>{" "}
          <a href={msg.source_url} target="_blank" rel="noopener" style={{ color: "#00b386", textDecoration: "none", wordBreak: "break-all" }}>
            {msg.source_label}
          </a>
          <br />
          <span style={{ color: "#888", fontSize: 10.5 }}>Last updated from sources: {msg.updated || "April 2025"}</span>
        </div>
      </div>
    );

    if (msg.type === "refuse") return (
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 6, padding: "8px 10px", fontSize: 12.5, color: "#92400e" }}>
        ⚠️ {msg.text}<br />
        <a href={msg.edulink} target="_blank" rel="noopener" style={{ color: "#b45309", fontSize: 12 }}>{msg.edulabel}</a>
      </div>
    );

    if (msg.type === "performance_refuse") return (
      <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 6, padding: "8px 10px", fontSize: 12.5, color: "#92400e" }}>
        📈 {msg.text}<br />
        <a href={msg.factsheet_url} target="_blank" rel="noopener" style={{ color: "#b45309", fontSize: 12 }}>{msg.factsheet_label}</a>
      </div>
    );

    return (
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 13, lineHeight: 1.65 }}>{msg.text}</p>
        <a href={msg.source_url} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#00b386" }}>{msg.source_label}</a>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Groww — Stocks, MF & More</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ fontFamily: "'DM Sans',sans-serif", minHeight: "100vh", background: "#fff", color: "#1a1a2e" }}>

        {/* ── TOP NAV ── */}
        <nav className="top-nav" style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 24px", display: "flex", alignItems: "center", gap: 20, height: 56, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#00b386", display: "grid", placeItems: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>G</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#1a1a2e" }}>Groww</span>
          </div>
          <div className="search-wrap" style={{ flex: 1, maxWidth: 440, display: "flex", alignItems: "center", border: "1px solid #d9dcff", background: "#f8f9ff", borderRadius: 10, padding: "0 10px", height: 38 }}>
            <span style={{ color: "#5b4ce6", marginRight: 8, fontSize: 14 }}>🔎</span>
            <input
              placeholder="Search stocks, mutual funds, ETFs..."
              style={{ width: "100%", border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#3d4161", fontFamily: "inherit" }}
            />
          </div>
          {["Stocks", "F&O", "Mutual Funds", "IPO", "ETFs"].map((tab, i) => (
            <a key={tab} className="nav-tab" href="#" style={{
              fontSize: 14, fontWeight: i === 2 ? 600 : 400,
              color: i === 2 ? "#5b4ce6" : "#444",
              textDecoration: "none",
              borderBottom: i === 2 ? "2px solid #5b4ce6" : "none",
              paddingBottom: 4
            }}>{tab}</a>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
            <button style={{ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "6px 16px", fontSize: 13, cursor: "pointer", color: "#444" }}>Login</button>
            <button style={{ background: "linear-gradient(135deg,#00b386,#5b4ce6)", border: "none", borderRadius: 6, padding: "6px 16px", fontSize: 13, cursor: "pointer", color: "#fff", fontWeight: 600 }}>Sign Up</button>
          </div>
        </nav>

        {/* ── TICKER BAR ── */}
        <div style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0", padding: "8px 24px", display: "flex", gap: 32, overflowX: "auto" }}>
          {TICKERS.map(t => (
            <div key={t.name} style={{ whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 11.5, color: "#888", marginRight: 6 }}>{t.name}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t.val}</span>{" "}
              <span style={{ fontSize: 12, color: t.up ? "#00b386" : "#e74c3c" }}>{t.chg}</span>
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="dashboard-main" style={{ width: "100%", maxWidth: 1140, margin: "0 auto", padding: "24px 20px 70px", minHeight: "calc(100vh - 104px)", display: "grid", gridTemplateColumns: "1.2fr .9fr", gap: 26 }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "20px 22px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: "#2f2b57" }}>Most bought stocks on Groww</h2>
              <div className="stock-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {STOCK_SNAPSHOT.map(stock => (
                  <div key={stock.name} style={{ background: "#f8fafc", border: "1px solid #edf2f7", borderRadius: 12, padding: "14px 12px", minHeight: 92 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#242a43", marginBottom: 8 }}>{stock.name}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{stock.value}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#00b386" }}>{stock.change}</div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "20px 22px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#2f2b57" }}>Top movers today</h2>
              <div className="movers-grid" style={{ fontSize: 11, color: "#8a90a2", display: "grid", gridTemplateColumns: "1.4fr .9fr .7fr", padding: "0 2px 8px", textTransform: "uppercase", letterSpacing: ".05em" }}>
                <span>Company</span>
                <span>Market Price</span>
                <span>Change</span>
              </div>
              {TOP_MOVERS.map(row => (
                <div key={row.company} className="movers-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr .9fr .7fr", alignItems: "center", borderTop: "1px solid #f2f4f8", padding: "12px 2px" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#293042" }}>{row.company}</span>
                  <span style={{ fontSize: 14, color: "#4b5563" }}>{row.price}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#00b386" }}>{row.change}</span>
                </div>
              ))}
            </section>

            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: "#242a43" }}>Quick Ask</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {EXAMPLES.slice(0, 4).map(ex => (
                  <button key={ex} onClick={() => { setOpen(true); send(ex); }}
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 999, padding: "7px 12px", fontSize: 12.5, color: "#15803d", cursor: "pointer", fontFamily: "inherit" }}>
                    {ex}
                  </button>
                ))}
              </div>
            </section>

            <div style={{ background: "linear-gradient(95deg,#f0fdf4,#f5f3ff)", border: "1px solid #ddd6fe", borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "#3f3f46", lineHeight: 1.5 }}>
              🛡️ <strong>Facts-only Assistant.</strong> The Groww MF Assistant answers factual questions only. It does not recommend buying or selling any fund. Data sourced from official public pages (Groww / Mirae Asset / AMFI / SEBI). Last updated: <strong>April 2025.</strong>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14, color: "#2f2b57" }}>Your investments</h2>
              <div style={{ background: "#f8fafc", border: "1px solid #edf2f7", borderRadius: 12, minHeight: 156, padding: "20px 14px", textAlign: "center", color: "#99a1b7", display: "grid", placeItems: "center" }}>
                <div>
                  <div style={{ fontSize: 32, marginBottom: 4 }}>📂</div>
                  <div style={{ fontSize: 15, color: "#6b7280", marginBottom: 4 }}>You haven't invested yet.</div>
                  <div style={{ fontSize: 12.5 }}>Start with as little as ₹99.</div>
                </div>
              </div>
            </section>

            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#2f2b57" }}>Watchlist</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {WATCHLIST.map(item => (
                  <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafbff", border: "1px solid #eef1ff", borderRadius: 10, padding: "10px 12px" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#293042" }}>{item.name}</div>
                      <div style={{ fontSize: 12.5, color: "#6b7280" }}>{item.price}</div>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: item.up ? "#00b386" : "#e74c3c" }}>{item.change}</div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: "#fff", border: "1px solid #eef1f6", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14, color: "#2f2b57" }}>Products & Tools</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TOOLS.map(item => (
                  <a key={item} href="#" style={{ color: "#4b5563", textDecoration: "none", fontSize: 14, padding: "5px 0" }}>{item}</a>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* ── FLOATING CHAT WIDGET ── */}
        {open && (
          <div style={{
            position: "fixed", bottom: 86, right: 20, width: 360,
            background: "#fff", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex", flexDirection: "column", zIndex: 9999,
            border: "1px solid #e5e7eb", overflow: "hidden",
            animation: "slideUp 0.2s ease"
          }}>
            {/* Chat header */}
            <div style={{ background: "#00b386", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "grid", placeItems: "center", fontSize: 16 }}>🤖</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Groww Assistant</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Mirae Asset MF · Facts-only</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ height: 320, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10, background: "#f9f9f9" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 8, alignItems: "flex-start" }}>
                  {msg.role === "bot" && (
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#00b386", display: "grid", placeItems: "center", fontSize: 12, flexShrink: 0 }}>🤖</div>
                  )}
                  <div style={{
                    maxWidth: "80%", padding: "10px 12px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.role === "user" ? "#00b386" : "#fff",
                    color: msg.role === "user" ? "#fff" : "#1a1a2e",
                    border: msg.role === "bot" ? "1px solid #e5e7eb" : "none",
                    fontSize: 13, lineHeight: 1.5
                  }}>
                    {msg.role === "user" ? msg.text : renderBotMsg(msg)}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#00b386", display: "grid", placeItems: "center", fontSize: 12 }}>🤖</div>
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px 14px 14px 4px", padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{
                          width: 7, height: 7, borderRadius: "50%", background: "#00b386",
                          animation: `bounce 0.9s ${i * 0.15}s infinite`
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Example pills */}
            <div style={{ padding: "8px 12px", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
              <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: 600 }}>Try asking</div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
                {EXAMPLES.slice(0, 4).map(ex => (
                  <button key={ex} onClick={() => send(ex)}
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 999, padding: "4px 10px", fontSize: 11, color: "#15803d", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 8, padding: "10px 12px", borderTop: "1px solid #f0f0f0", background: "#fff" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask about Mirae Asset funds..."
                style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={() => send()}
                style={{ background: "#00b386", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", fontSize: 16, cursor: "pointer" }}>
                ➤
              </button>
            </div>

            {/* Footer disclaimer */}
            <div style={{ background: "#f9f9f9", padding: "6px 12px", fontSize: 10, color: "#aaa", borderTop: "1px solid #f0f0f0" }}>
              Facts-only. No investment advice. Sources: Groww / Mirae Asset / AMFI / SEBI.
            </div>
          </div>
        )}

        {/* ── FAB BUTTON ── */}
        <button onClick={() => setOpen(o => !o)} style={{
          position: "fixed", bottom: 20, right: 20,
          width: 56, height: 56, borderRadius: "50%",
          background: "#00b386", border: "none",
          boxShadow: "0 4px 20px rgba(0,179,134,0.4)",
          cursor: "pointer", fontSize: 22, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, transition: "transform .15s"
        }}>
          {open ? "✕" : "💬"}
        </button>
      </div>

    </>
  );
}
