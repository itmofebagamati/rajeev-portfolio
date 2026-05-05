"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const graphicVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.3 } },
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax transforms via Framer Motion
  const textY    = useTransform(scrollY, [0, 600], [0, 180]);
  const graphicY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section id="home" ref={heroRef} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 32px", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0d1117 100%)",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      {/* Animated glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "10%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,1) 0%, transparent 70%)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: "absolute", bottom: "5%", left: "2%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,64,251,1) 0%, transparent 70%)", pointerEvents: "none" }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center", paddingTop: "80px", position: "relative", zIndex: 1 }}
        className="grid-cols-1 md:grid-cols-2">

        {/* LEFT — staggered text */}
        <motion.div
          style={{ y: textY, willChange: "transform" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} style={{ fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "#8892a4", marginBottom: "12px" }}>
            <span style={{ color: "#00e5a0" }}>Hello,</span>
          </motion.p>

          <motion.h1 variants={itemVariants} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.08, marginBottom: "12px" }}>
            This is <span style={{ color: "#e040fb" }}>Rajeev</span>,<br />
            I&apos;m a Professional<br />
            <span style={{ color: "#00e5a0" }}>Software Developer.</span>
          </motion.h1>

          {/* Social row */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: "12px", margin: "20px 0 28px" }}>
            {[
              { label: "FB",   href: "https://www.facebook.com/share/1BVbgwosj4/", bg: "#1877f2" },
              { label: "IG",   href: "https://www.instagram.com/rajeev.sah244",    bg: "#e1306c" },
              { label: "GH",   href: "https://github.com",                          bg: "#333" },
              { label: "Blog", href: "https://blog.rajeevsah.com.np",               bg: "#00e5a0", color: "#0d1117" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href} target="_blank" rel="noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 38, height: 38, borderRadius: "50%", background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fira Code', monospace", fontSize: "10px", fontWeight: 600,
                  color: s.color ?? "#fff", textDecoration: "none",
                }}
              >
                {s.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <motion.button
              className="btn-outline"
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,229,160,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me 👋
            </motion.button>
            <motion.a href="/cv.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <button className="btn-solid">Get Resume ⬇</button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — photo with parallax */}
        <motion.div
          style={{ y: graphicY, willChange: "transform", justifyContent: "center", alignItems: "center" }}
          variants={graphicVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex"
        >
          <div style={{ position: "relative", width: 340, height: 380, margin: "0 auto" }}>
            {/* Animated corner borders */}
            {[
              { top: -8, left: -8, borderTop: "3px solid #00e5a0", borderLeft: "3px solid #00e5a0", borderRadius: "4px 0 0 0" },
              { top: -8, right: -8, borderTop: "3px solid #e040fb", borderRight: "3px solid #e040fb", borderRadius: "0 4px 0 0" },
              { bottom: -8, left: -8, borderBottom: "3px solid #e040fb", borderLeft: "3px solid #e040fb", borderRadius: "0 0 0 4px" },
              { bottom: -8, right: -8, borderBottom: "3px solid #00e5a0", borderRight: "3px solid #00e5a0", borderRadius: "0 0 4px 0" },
            ].map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                style={{ position: "absolute", width: 40, height: 40, ...style }}
              />
            ))}

            {/* Photo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "100%", height: "100%", borderRadius: "10px", overflow: "hidden",
                background: "#1e2535", border: "1px solid rgba(0,229,160,0.15)",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <span style={{ fontSize: "80px" }}>👨‍💻</span>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#00e5a0", letterSpacing: "0.14em" }}>// add profile.jpg</span>
              </div>
              <Image
                src="/images/profile.jpg"
                alt="Er. Rajeev Kumar Sah"
                fill
                style={{ objectFit: "cover", objectPosition: "top", zIndex: 1 }}
                unoptimized
              />
            </motion.div>

            {/* Floating badges */}
            {/*<motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{
                position: "absolute", top: 16, right: -20, zIndex: 2,
                background: "#00e5a0", color: "#0d1117",
                fontFamily: "'Fira Code', monospace", fontSize: "11px", fontWeight: 700,
                padding: "6px 14px", borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,229,160,0.4)",
              }}
            >
              Nepal Gov 🇳🇵
            </motion.div>*/}

            {/*<motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute", bottom: 24, left: -20, zIndex: 2,
                background: "#161b27", border: "1px solid rgba(224,64,251,0.4)",
                color: "#e040fb",
                fontFamily: "'Fira Code', monospace", fontSize: "11px",
                padding: "6px 14px", borderRadius: "20px",
              }}
            >
              B.E. Comp. Eng. 🎓
            </motion.div>*/}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#8892a4" }}
        >
          SCROLL
        </motion.span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #00e5a0, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
