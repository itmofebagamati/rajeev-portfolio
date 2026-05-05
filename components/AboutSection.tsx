"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";

const INFO = [
  ["Name",    "Er. Rajeev Kumar Sah"],
  ["D.O.B.", "December 30, 1991"],
  ["Address", "Kathmandu, Nepal"],
  ["Email",   "rajeev.sah@nepal.gov.np"],
  ["Phone",   "+977-9866367111"],
  ["Website", "rajeevsah.com.np"],
];

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: "96px 32px", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "56px", flexWrap: "wrap" }}>

            {/* Photo + sidebar label */}
            <div style={{ display: "flex", gap: "14px", flexShrink: 0 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ boxShadow: "0 0 40px rgba(0,229,160,0.25)" }}
                style={{
                  width: 200, height: 240, borderRadius: "10px", overflow: "hidden",
                  border: "2px solid rgba(0,229,160,0.25)",
                  position: "relative", background: "#1e2535", flexShrink: 0,
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Rajeev Kumar Sah"
                  fill
                  style={{ objectFit: "cover", zIndex: 1 }}
                  unoptimized
                />
              </motion.div>
              <div className="sidebar-label hidden md:block">About Me</div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <AnimSection delay={100}>
                <div className="section-tag">Who I Am?</div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, marginBottom: "16px", marginTop: "8px" }}>
                  I&apos;m <span style={{ color: "#e040fb" }}>Rajeev Kumar Sah</span>
                </h2>
                <p style={{ color: "#8892a4", lineHeight: 1.85, fontSize: "15px", marginBottom: "14px" }}>
                  I am a results-driven and detail-oriented engineering professional with strong interest in
                  technology, computer science, and innovative problem-solving. Skilled in analytical thinking,
                  system design, and adapting quickly to new tools and technologies.
                </p>
                <p style={{ color: "#8892a4", lineHeight: 1.85, fontSize: "15px", marginBottom: "24px" }}>
                  Currently serving as <span style={{ color: "#00e5a0" }}>Computer Officer (7th Level)</span> at
                  the Government of Bagmati Province. I love to learn and explore new technologies and am
                  passionate about building efficient, user-centric digital solutions.
                </p>
              </AnimSection>

              {/* Info rows — staggered */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                {INFO.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    style={{ display: "flex", gap: "8px", fontSize: "13px", fontFamily: "'Fira Code', monospace" }}
                  >
                    <span style={{ color: "#00e5a0", minWidth: 72, flexShrink: 0 }}>{k}:</span>
                    <span style={{ color: "#c9d1d9", wordBreak: "break-all" }}>{v}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
