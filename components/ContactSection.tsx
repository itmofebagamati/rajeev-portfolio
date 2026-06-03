"use client";
import { useState } from "react";
import AnimSection from "./AnimSection";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/data";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setState("submitting");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "f7402f0b-4890-4f57-9b7c-1554efa4ea3e",
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        from_name: "Rajeev Portfolio Contact Form",
      }),
    });

    const data = await res.json();

    if (data.success) {
      setState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setState("idle"), 7000);
    } else {
      console.error("Form error:", data);
      setState("error");
      setTimeout(() => setState("idle"), 6000);
    }
  } catch (err) {
    console.error("Form exception:", err);
    setState("error");
    setTimeout(() => setState("idle"), 6000);
  }
};

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1e2535",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px",
    padding: "11px 14px",
    color: "#e2e8f0",
    fontFamily: "'Fira Code', monospace",
    fontSize: "13px",
    outline: "none",
    marginBottom: "12px",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "96px 32px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>Contact</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>
              Get In <span style={{ color: "#00e5a0" }}>Touch</span>
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Info cards */}
          <AnimSection delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="card"
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px" }}>
                  <span style={{ fontSize: "20px" }}>{c.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: "#00e5a0", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3px" }}>
                      {c.label}
                    </p>
                    {c.href
                      ? <a href={c.href} style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#c9d1d9", textDecoration: "none" }}>{c.value}</a>
                      : <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#c9d1d9" }}>{c.value}</p>
                    }
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    style={{
                      width: 38, height: 38, borderRadius: "8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#161b27", border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#8892a4",
                      textDecoration: "none", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#00e5a0"; e.currentTarget.style.color = "#00e5a0"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#8892a4"; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </AnimSection>

          {/* Form */}
          <AnimSection delay={200}>
            {state === "success" && (
              <div style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.3)", borderRadius: "8px", padding: "14px 18px", marginBottom: "18px", fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#00e5a0" }}>
                ✅ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {state === "error" && (
              <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "8px", padding: "14px 18px", marginBottom: "18px", fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#ff6b6b" }}>
                ❌ Something went wrong. Please email me directly at{" "}
                <a href="mailto:rajeev.sah@nepal.gov.np" style={{ color: "#00e5a0" }}>rajeev.sah@nepal.gov.np</a>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text" name="name" placeholder="// Your Name" required
                style={inputStyle}
                value={form.name}
                onFocus={e => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              />
              <input
                type="email" name="email" placeholder="// Your Email" required
                style={inputStyle}
                value={form.email}
                onFocus={e => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              />
              <input
                type="text" name="subject" placeholder="// Subject" required
                style={inputStyle}
                value={form.subject}
                onFocus={e => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
              />
              <textarea
                name="message" placeholder="// Your Message..." required rows={5}
                style={{ ...inputStyle, resize: "vertical", marginBottom: "16px" }}
                value={form.message}
                onFocus={e => (e.target.style.borderColor = "rgba(0,229,160,0.4)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              />
              <button
                type="submit"
                disabled={state === "submitting"}
                className="btn-outline"
                style={{
                  opacity: state === "submitting" ? 0.6 : 1,
                  cursor: state === "submitting" ? "not-allowed" : "pointer",
                }}
              >
                {state === "submitting" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}
