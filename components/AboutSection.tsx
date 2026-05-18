"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";
import { urlFor } from "@/sanity/lib/client";
import type { AboutData } from "@/sanity/lib/types";

export default function AboutSection({ data }: { data: AboutData }) {
  const infoRows = [
    ["Name",    data.name],
    ["D.O.B.", data.dob],
    ["Address", data.address],
    ["Email",   data.email],
    ["Phone",   data.phone],
    ["Website", data.website],
  ];

  const photoSrc = data.profileImage
    ? urlFor(data.profileImage).width(400).height(480).url()
    : "/images/profile.jpg";

  return (
    <section id="about" style={{ padding: "96px 32px", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "56px", flexWrap: "wrap" }}>
            {/* Photo */}
            <div style={{ display: "flex", gap: "14px", flexShrink: 0 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ boxShadow: "0 0 40px rgba(0,229,160,0.25)" }}
                style={{ width: 200, height: 240, borderRadius: "10px", overflow: "hidden", border: "2px solid rgba(0,229,160,0.25)", position: "relative", background: "#1e2535", flexShrink: 0 }}
              >
                <Image src={photoSrc} alt={data.name} fill style={{ objectFit: "cover", zIndex: 1 }} unoptimized />
              </motion.div>
              <div className="sidebar-label hidden md:block">About Me</div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <AnimSection delay={100}>
                <div className="section-tag">Who I Am?</div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, marginBottom: "16px", marginTop: "8px" }}>
                  I&apos;m <span style={{ color: "#e040fb" }}>{data.name}</span>
                </h2>
                <p style={{ color: "#8892a4", lineHeight: 1.85, fontSize: "15px", marginBottom: "14px" }}>{data.bio1}</p>
                <p style={{ color: "#8892a4", lineHeight: 1.85, fontSize: "15px", marginBottom: "24px" }}>{data.bio2}</p>
              </AnimSection>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                {infoRows.map(([k, v], i) => (
                  <motion.div key={k}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}
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
