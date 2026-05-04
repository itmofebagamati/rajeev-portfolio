"use client";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";
import { EDUCATION } from "@/lib/data";

const TYPE_COLOR: Record<string, string> = {
  Masters:   "#e040fb",
  Bachelors: "#00e5a0",
  Diploma:   "#4fc3f7",
};

export default function EducationSection() {
  return (
    <section id="education" style={{ padding: "96px 32px", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>Educations</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>
              Academic <span style={{ color: "#00e5a0" }}>Background</span>
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Illustration */}
          <AnimSection direction="left">
            <motion.div
              whileHover={{ boxShadow: "0 0 40px rgba(79,195,247,0.1)" }}
              style={{
                background: "linear-gradient(135deg, #161b27, #1e2535)",
                borderRadius: "12px", border: "1px solid rgba(79,195,247,0.15)",
                padding: "40px 32px", textAlign: "center",
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "80px", marginBottom: "16px" }}
              >
                🎓
              </motion.div>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#8892a4", lineHeight: 1.7 }}>
                Engineering graduate with{" "}
                <span style={{ color: "#4fc3f7" }}>B.E. in Computer Engineering</span> from VTU, India.
                Currently pursuing <span style={{ color: "#e040fb" }}>MPA</span> at Tribhuvan University.
              </p>
            </motion.div>
          </AnimSection>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: "40px" }}>
            <div className="timeline-line" style={{ background: "linear-gradient(to bottom, transparent, #e040fb 15%, #e040fb 85%, transparent)" }} />
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                style={{ position: "relative", marginBottom: "24px" }}
              >
                <motion.div
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                  style={{ background: TYPE_COLOR[edu.type], boxShadow: `0 0 12px ${TYPE_COLOR[edu.type]}` }}
                />
                <motion.div
                  className="card"
                  style={{ padding: "20px 24px" }}
                  whileHover={{ x: 4, borderColor: `${TYPE_COLOR[edu.type]}55` }}
                  transition={{ duration: 0.2 }}
                >
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: TYPE_COLOR[edu.type], letterSpacing: "0.1em" }}>
                    {edu.period}
                  </span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", margin: "6px 0 4px" }}>
                    {edu.degree}
                  </h3>
                  <p style={{ color: "#8892a4", fontSize: "13px", fontFamily: "'Fira Code', monospace", marginBottom: "8px" }}>
                    {edu.institution}
                  </p>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: "inline-block", fontFamily: "'Fira Code', monospace", fontSize: "10px",
                      padding: "2px 10px", borderRadius: "20px",
                      border: `1px solid ${TYPE_COLOR[edu.type]}44`, color: TYPE_COLOR[edu.type],
                      cursor: "default",
                    }}
                  >
                    {edu.type}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
