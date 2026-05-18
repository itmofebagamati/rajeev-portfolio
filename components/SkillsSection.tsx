"use client";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";
import type { SkillItem } from "@/sanity/lib/types";

export default function SkillsSection({ data }: { data: SkillItem[] }) {
  return (
    <section id="skills" style={{ padding: "96px 32px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="section-tag" style={{ margin: "0 auto 12px" }}>Skills</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700 }}>
              My <span style={{ color: "#00e5a0" }}>Tech Stack</span>
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "14px" }}>
          {data.map((skill, i) => (
            <motion.div key={skill._id} className="skill-box"
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
              whileHover={{ scale: 1.1, borderColor: "#00e5a0", backgroundColor: "rgba(0,229,160,0.07)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{ fontSize: "32px", lineHeight: 1 }}>{skill.icon}</span>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#8892a4", textAlign: "center", lineHeight: 1.3 }}>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
