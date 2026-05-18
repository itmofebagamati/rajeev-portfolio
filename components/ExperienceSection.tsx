"use client";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";
import type { ExperienceItem } from "@/sanity/lib/types";

export default function ExperienceSection({ data }: { data: ExperienceItem[] }) {
  return (
    <section id="experience" style={{ padding: "96px 32px", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>Experiences</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>
              Work <span style={{ color: "#00e5a0" }}>Experience</span>
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}
          className="exp-layout">
          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "40px" }}>
            <div className="timeline-line" />
            {data.map((exp, i) => (
              <motion.div key={exp._id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                style={{ position: "relative", marginBottom: "28px" }}
              >
                <motion.div className="timeline-dot"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }} />
                <motion.div className="card" style={{ padding: "20px 24px" }}
                  whileHover={{ x: 4, borderColor: "rgba(0,229,160,0.35)" }} transition={{ duration: 0.2 }}>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#00e5a0", letterSpacing: "0.1em" }}>{exp.period}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", margin: "6px 0 4px" }}>{exp.role}</h3>
                  <p style={{ color: "#e040fb", fontSize: "13px", fontFamily: "'Fira Code', monospace", marginBottom: "8px" }}>{exp.organization}</p>
                  <p style={{ color: "#8892a4", fontSize: "13px", lineHeight: 1.7 }}>{exp.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Panel */}
          <AnimSection delay={150} direction="right">
            <motion.div whileHover={{ boxShadow: "0 0 40px rgba(0,229,160,0.1)" }}
              style={{ minHeight: 280, background: "linear-gradient(135deg, #161b27, #1e2535)", borderRadius: "12px", border: "1px solid rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", padding: "32px" }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} style={{ fontSize: "80px" }}>🏢</motion.div>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#8892a4", textAlign: "center", lineHeight: 1.7 }}>
                <span style={{ color: "#00e5a0" }}>5+</span> years of professional experience<br />across government and education sectors
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                {["Govt. Tech", "IT Admin", "Education", "Freelance"].map((tag, i) => (
                  <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }}
                    transition={{ delay: 0.3 + i * 0.08 }} whileHover={{ scale: 1.08 }}
                    style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(0,229,160,0.3)", color: "#00e5a0", cursor: "default" }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .exp-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
