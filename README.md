# Mirae Asset MF FAQ Chatbot — Groww UI
**RAG-based Mutual Fund FAQ Chatbot · NextLeap PM Fellowship · Preetham Rag**

A facts-only FAQ chatbot embedded in a Groww-like interface. Answers factual questions about Mirae Asset Mutual Fund schemes using official public sources only.

---

## Live Demo
Deploy to Vercel → get a URL like: `https://mutual-fund-faq-chatbot-groww.vercel.app`

---

## Scope
**Platform:** Groww | **AMC:** Mirae Asset Mutual Fund

| Scheme | Category | Benchmark |
|---|---|---|
| Mirae Asset Large Cap Fund | Large Cap Equity | NIFTY 100 TRI |
| Mirae Asset ELSS Tax Saver Fund | ELSS (80C) | NIFTY 500 TRI |
| Mirae Asset Flexi Cap Fund | Flexi Cap Equity | NIFTY 500 TRI |
| Mirae Asset Large & Midcap Fund | Large & Mid Cap | NIFTY Large Midcap 250 TRI |

---

## Tech Stack
| Component | Tech |
|---|---|
| UI | Next.js 14 + React 18 |
| Deployment | Vercel (free) |
| LLM | Claude Haiku (Anthropic API) |
| Retrieval | Keyword-based JSON corpus |
| Refusal Logic | Regex guards (advice + performance) |

---

## Deploy to Vercel (5 minutes)

### Step 1 — Get Anthropic API key
- Go to [console.anthropic.com](https://console.anthropic.com)
- Create API key → Copy it

### Step 2 — Push to GitHub
- Create new GitHub repo: `mutual-fund-faq-chatbot-groww`
- Upload all files from this folder

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **New Project** → Import your repo
3. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from Step 1
4. Click **Deploy** → Done in ~2 minutes

### Step 4 — Get your live URL
Vercel gives you: `https://mutual-fund-faq-chatbot-groww.vercel.app`

---

## Run Locally
```bash
npm install
ANTHROPIC_API_KEY=your_key_here npm run dev
# Open http://localhost:3000
```

---

## Deliverables
| File | Description |
|---|---|
| `pages/index.js` | Groww-like UI with floating chat widget |
| `pages/api/chat.js` | API route — retrieval + LLM call |
| `lib/corpus.js` | Knowledge base (4 schemes + 5 topic chunks) |
| `sources.csv` | 20 official source URLs |
| `sample_qa.md` | 10 sample Q&A pairs with citations |
| `README.md` | This file |

---

## Disclaimer
This tool provides factual information only from official public sources (Groww, Mirae Asset, AMFI, SEBI). It is not a registered investment adviser and does not provide investment advice, recommendations, or return projections. Mutual fund investments are subject to market risks.

**Built by Preetham Rag · PM Fellow at NextLeap · #NextLeapPMFellowship**
