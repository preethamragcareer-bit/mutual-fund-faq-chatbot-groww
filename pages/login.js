import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";


const FEATURES = [
  { icon: "📈", label: "10M+ investors trust Groww" },
  { icon: "🔒", label: "Bank-grade 256-bit encryption" },
  { icon: "⚡", label: "Instant KYC in under 5 minutes" },
  { icon: "💸", label: "Start SIPs from just ₹99/month" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect home
    try {
      const saved = localStorage.getItem("groww_user");
      if (saved) router.replace("/");
    } catch (_) {}
    // Read ?mode=signup from URL
    if (router.query.mode === "signup") setMode("signup");
  }, [router.query.mode]);


  function switchMode(m) {
    setMode(m);
    setError("");
    setForm({ name: "", email: "", password: "" });
  }

  function validate() {
    if (mode === "signup" && !form.name.trim()) return "Please enter your full name.";
    if (!form.email.includes("@") || !form.email.includes(".")) return "Enter a valid email address.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 900));
    const name = mode === "signup" ? form.name.trim() : form.email.split("@")[0];
    try {
      localStorage.setItem("groww_user", JSON.stringify({ name, email: form.email }));
    } catch (_) {}
    router.push("/");
  }

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>{mode === "login" ? "Login — Groww" : "Create Account — Groww"}</title>
        <meta name="description" content="Log in to your Groww account to manage investments, SIPs and mutual funds." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={styles.root}>
        {/* ── LEFT PANEL – Form ── */}
        <div style={styles.left}>

          <div style={styles.formCard}>
            {/* Logo */}
            <div style={styles.logoRow}>
              <div style={styles.logoCircle}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>G</span>
              </div>
              <span style={styles.logoText}>Groww</span>
            </div>

            <h1 style={styles.heading}>
              {mode === "login" ? "Welcome back 👋" : "Join Groww today"}
            </h1>
            <p style={styles.subheading}>
              {mode === "login"
                ? "Log in to track your investments and mutual funds."
                : "Create an account and start your investment journey."}
            </p>

            {/* Mode tabs */}
            <div style={styles.tabs}>
              <button
                style={{ ...styles.tab, ...(mode === "login" ? styles.tabActive : {}) }}
                onClick={() => switchMode("login")}
              >
                Log In
              </button>
              <button
                style={{ ...styles.tab, ...(mode === "signup" ? styles.tabActive : {}) }}
                onClick={() => switchMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {error && (
                <div style={styles.errorBox}>
                  <span style={{ fontSize: 14 }}>⚠️</span> {error}
                </div>
              )}

              {mode === "signup" && (
                <div style={styles.fieldGroup}>
                  <label style={styles.label} htmlFor="lp-name">Full Name</label>
                  <input
                    id="lp-name"
                    type="text"
                    placeholder="Preetham Rag"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={styles.input}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputBlurStyle)}
                    autoComplete="name"
                  />
                </div>
              )}

              <div style={styles.fieldGroup}>
                <label style={styles.label} htmlFor="lp-email">Email</label>
                <input
                  id="lp-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={styles.input}
                  onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={e => Object.assign(e.target.style, inputBlurStyle)}
                  autoComplete="email"
                />
              </div>

              <div style={styles.fieldGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={styles.label} htmlFor="lp-password">Password</label>
                  {mode === "login" && (
                    <a href="#" style={styles.forgotLink}>Forgot password?</a>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="lp-password"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    style={{ ...styles.input, paddingRight: 44 }}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => Object.assign(e.target.style, inputBlurStyle)}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    style={styles.eyeBtn}
                    tabIndex={-1}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5.373-10-7s4.477-7 10-7c1.076 0 2.11.175 3.075.49M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                id="lp-submit"
                type="submit"
                disabled={loading}
                style={{ ...styles.submitBtn, opacity: loading ? 0.8 : 1 }}
              >
                {loading ? (
                  <span style={styles.spinner} />
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>

              <p style={styles.switchText}>
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  style={styles.switchBtn}
                >
                  {mode === "login" ? "Create new" : "Log in"}
                </button>
              </p>
            </form>

            <p style={styles.disclaimer}>
              By continuing, you agree to Groww&apos;s{" "}
              <a href="#" style={{ color: "#00b386" }}>Terms of Service</a> and{" "}
              <a href="#" style={{ color: "#00b386" }}>Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL – Branding ── */}
        <div style={styles.right}>
          <div style={styles.rightInner}>
            {/* Big G logo */}
            <div style={styles.bigLogoWrap}>
              <div style={styles.bigLogoRing}>
                <div style={styles.bigLogoCircle}>
                  <span style={styles.bigLogoLetter}>G</span>
                </div>
              </div>
            </div>

            <h2 style={styles.rightHeading}>India&apos;s most trusted<br />investing platform</h2>
            <p style={styles.rightSub}>
              Stocks, Mutual Funds, SIPs, IPOs and more —<br />all in one place.
            </p>

            {/* Feature pills */}
            <div style={styles.featureList}>
              {FEATURES.map(f => (
                <div key={f.label} style={styles.featurePill}>
                  <span style={{ fontSize: 18 }}>{f.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{f.label}</span>
                </div>
              ))}
            </div>

            {/* Floating stat cards */}
            <div style={styles.statRow}>
              {[
                { val: "₹2.3L Cr+", lbl: "Assets managed" },
                { val: "4.8★", lbl: "App Store rating" },
                { val: "0 fees", lbl: "On MF investing" },
              ].map(s => (
                <div key={s.val} style={styles.statCard}>
                  <div style={styles.statVal}>{s.val}</div>
                  <div style={styles.statLbl}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative blobs */}
          <div style={{ ...styles.blob, top: -80, right: -80, width: 320, height: 320, opacity: 0.18 }} />
          <div style={{ ...styles.blob, bottom: 40, left: -60, width: 240, height: 240, opacity: 0.14 }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f1628; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.06); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}

const inputFocusStyle = {
  borderColor: "#00b386",
  boxShadow: "0 0 0 3px rgba(0,179,134,0.15)",
};
const inputBlurStyle = {
  borderColor: "#e5e7eb",
  boxShadow: "none",
};

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    minHeight: "100vh",
  },

  /* ── LEFT ── */
  left: {
    flex: "0 0 48%",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    position: "relative",
    minHeight: "100vh",
  },
  formCard: {
    width: "100%",
    maxWidth: 400,
    animation: "fadeSlideIn 0.4s ease both",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00b386, #5b4ce6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,179,134,0.35)",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },
  heading: {
    fontSize: 28,
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: 8,
    letterSpacing: "-0.5px",
  },
  subheading: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 28,
    lineHeight: 1.6,
  },
  tabs: {
    display: "flex",
    background: "#f3f4f6",
    borderRadius: 10,
    padding: 4,
    marginBottom: 28,
    gap: 4,
  },
  tab: {
    flex: 1,
    padding: "9px 0",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    background: "transparent",
    color: "#6b7280",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#fff",
    color: "#1a1a2e",
    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  errorBox: {
    background: "#fff5f5",
    border: "1px solid #fecaca",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#dc2626",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    color: "#1a1a2e",
    background: "#fafafa",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  forgotLink: {
    fontSize: 12,
    color: "#00b386",
    textDecoration: "none",
    fontWeight: 600,
  },
  submitBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #00b386 0%, #5b4ce6 100%)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "opacity 0.2s, transform 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 20,
    letterSpacing: "0.02em",
    boxShadow: "0 4px 18px rgba(0,179,134,0.3)",
  },
  spinner: {
    display: "inline-block",
    width: 20,
    height: 20,
    border: "3px solid rgba(255,255,255,0.35)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  switchText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
  },
  switchBtn: {
    background: "none",
    border: "none",
    color: "#00b386",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
  },
  disclaimer: {
    fontSize: 11.5,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 1.6,
  },

  /* ── RIGHT ── */
  right: {
    flex: 1,
    background: "linear-gradient(145deg, #0f1628 0%, #1a1040 50%, #0d2b1f 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
    position: "relative",
    overflow: "hidden",
  },
  rightInner: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: 420,
  },
  bigLogoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 36,
    animation: "float 4s ease-in-out infinite",
  },
  bigLogoRing: {
    width: 136,
    height: 136,
    borderRadius: "50%",
    border: "2px solid rgba(0,179,134,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulseRing 3s ease-in-out infinite",
    boxShadow: "0 0 40px rgba(0,179,134,0.2), inset 0 0 40px rgba(0,179,134,0.05)",
  },
  bigLogoCircle: {
    width: 104,
    height: 104,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00b386, #5b4ce6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 40px rgba(0,179,134,0.45)",
  },
  bigLogoLetter: {
    color: "#fff",
    fontSize: 52,
    fontWeight: 800,
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1,
  },
  rightHeading: {
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.3,
    marginBottom: 12,
    letterSpacing: "-0.5px",
  },
  rightSub: {
    fontSize: 14.5,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.7,
    marginBottom: 36,
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 36,
    textAlign: "left",
  },
  featurePill: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(8px)",
  },
  statRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
  },
  statCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "14px 16px",
    textAlign: "center",
    flex: 1,
    backdropFilter: "blur(8px)",
  },
  statVal: {
    fontSize: 18,
    fontWeight: 800,
    color: "#00b386",
    marginBottom: 4,
  },
  statLbl: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontWeight: 500,
  },
  blob: {
    position: "absolute",
    borderRadius: "50%",
    background: "radial-gradient(circle, #00b386, #5b4ce6)",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
};
