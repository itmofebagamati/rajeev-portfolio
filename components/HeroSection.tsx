"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { urlFor } from "@/sanity/lib/client";
import type { HeroData } from "@/sanity/lib/types";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const graphicVariants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.3 } },
};

export default function HeroSection({ data }: { data: HeroData }) {
  const { scrollY } = useScroll();
  const textY    = useTransform(scrollY, [0, 600], [0, 120]);
  const graphicY = useTransform(scrollY, [0, 600], [0, 60]);

  const photoSrc = data.profileImage
    ? urlFor(data.profileImage).width(680).height(760).url()
    : "/images/profile.jpg";

  const socials = data.socialLinks ?? [];

  const PhotoFrame = ({ size }: { size: "sm" | "lg" }) => {
    const w = size === "lg" ? 340 : 200;
    const h = size === "lg" ? 380 : 220;
    const bw = size === "lg" ? 3 : 2;
    const fw = size === "lg" ? 40 : 28;
    const bs = size === "lg" ? 20 : 16;

    return (
      <div style={{ position: "relative", width: w, height: h }}>
        {[
          { top: -8, left: -8,  borderTop: `${bw}px solid #00e5a0`, borderLeft:  `${bw}px solid #00e5a0`, borderRadius: "4px 0 0 0" },
          { top: -8, right: -8, borderTop: `${bw}px solid #e040fb`, borderRight: `${bw}px solid #e040fb`, borderRadius: "0 4px 0 0" },
          { bottom: -8, left: -8,  borderBottom: `${bw}px solid #e040fb`, borderLeft:  `${bw}px solid #e040fb`, borderRadius: "0 0 0 4px" },
          { bottom: -8, right: -8, borderBottom: `${bw}px solid #00e5a0`, borderRight: `${bw}px solid #00e5a0`, borderRadius: "0 0 4px 0" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
            style={{ position: "absolute", width: fw, height: fw, ...s }} />
        ))}

        <motion.div
          animate={{ y: [0, size === "lg" ? -10 : -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", borderRadius: "10px", overflow: "hidden", background: "#1e2535", border: "1px solid rgba(0,229,160,0.15)", position: "relative" }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: size === "lg" ? "80px" : "52px" }}>👨‍💻</span>
          </div>
          <Image src={photoSrc} alt={`Er. ${data.name}`} fill style={{ objectFit: "cover", objectPosition: "top", zIndex: 1 }} unoptimized />
        </motion.div>

        {data.badge1 && (
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ position: "absolute", top: bs, right: size === "lg" ? -20 : -14, zIndex: 2, background: "#00e5a0", color: "#0d1117", fontFamily: "'Fira Code', monospace", fontSize: size === "lg" ? "11px" : "9px", fontWeight: 700, padding: size === "lg" ? "6px 14px" : "4px 10px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,229,160,0.4)", whiteSpace: "nowrap" }}>
            {data.badge1}
          </motion.div>
        )}
        {data.badge2 && (
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: "absolute", bottom: size === "lg" ? 24 : 16, left: size === "lg" ? -20 : -14, zIndex: 2, background: "#161b27", border: "1px solid rgba(224,64,251,0.4)", color: "#e040fb", fontFamily: "'Fira Code', monospace", fontSize: size === "lg" ? "11px" : "9px", padding: size === "lg" ? "6px 14px" : "4px 10px", borderRadius: "20px", whiteSpace: "nowrap" }}>
            {data.badge2}
          </motion.div>
        )}
      </div>
    );
  };

  const Buttons = () => (
    <motion.div variants={itemVariants} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <motion.button className="btn-outline" whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,229,160,0.3)" }} whileTap={{ scale: 0.97 }}
        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
        Contact Me 👋
      </motion.button>
      <motion.a href="/cv.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        <button className="btn-solid">Get Resume ⬇</button>
      </motion.a>
    </motion.div>
  );

  const Socials = ({ centered }: { centered?: boolean }) => (
    <motion.div variants={itemVariants} style={{ display: "flex", gap: "12px", justifyContent: centered ? "center" : "flex-start" }}>
      {socials.map(s => (
        <motion.a key={s.label} href={s.url} target="_blank" rel="noreferrer"
          whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.95 }}
          style={{ width: 38, height: 38, borderRadius: "50%", background: s.bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fira Code', monospace", fontSize: "10px", fontWeight: 600, color: s.textColor ?? "#fff", textDecoration: "none" }}>
          {s.label}
        </motion.a>
      ))}
    </motion.div>
  );

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 20px 40px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #0d1117 100%)" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(0,229,160,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.12, 0.07] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} style={{ position: "absolute", bottom: "5%", left: "2%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,64,251,1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        {/* MOBILE */}
        <div className="mobile-hero">
          <motion.div variants={graphicVariants} initial="hidden" animate="visible" style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <PhotoFrame size="sm" />
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ textAlign: "center" }}>
            <motion.p variants={itemVariants} style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#8892a4", marginBottom: "10px" }}>
              <span style={{ color: "#00e5a0" }}>{data.greeting}</span>
            </motion.p>
            <motion.h1 variants={itemVariants} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.9rem, 8vw, 2.8rem)", lineHeight: 1.1, marginBottom: "16px" }}>
              This is <span style={{ color: "#e040fb" }}>{data.name}</span>,<br />
              I&apos;m a Professional<br />
              <span style={{ color: "#00e5a0" }}>{data.title}.</span>
            </motion.h1>
            <div style={{ margin: "16px 0 20px" }}><Socials centered /></div>
            <Buttons />
          </motion.div>
        </div>

        {/* DESKTOP */}
        <div className="desktop-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <motion.div style={{ y: textY, willChange: "transform" }} variants={containerVariants} initial="hidden" animate="visible">
            <motion.p variants={itemVariants} style={{ fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "#8892a4", marginBottom: "12px" }}>
              <span style={{ color: "#00e5a0" }}>{data.greeting}</span>
            </motion.p>
            <motion.h1 variants={itemVariants} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1.08, marginBottom: "12px" }}>
              This is <span style={{ color: "#e040fb" }}>{data.name}</span>,<br />
              I&apos;m a Professional<br />
              <span style={{ color: "#00e5a0" }}>{data.title}.</span>
            </motion.h1>
            <div style={{ margin: "20px 0 28px" }}><Socials /></div>
            <Buttons />
          </motion.div>

          <motion.div style={{ y: graphicY, willChange: "transform", display: "flex", justifyContent: "center", alignItems: "center" }} variants={graphicVariants} initial="hidden" animate="visible">
            <PhotoFrame size="lg" />
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5, duration: 1 }}
        style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#8892a4" }}>SCROLL</motion.span>
        <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #00e5a0, transparent)", transformOrigin: "top" }} />
      </motion.div>

      <style>{`
        @media (max-width: 767px) { .mobile-hero { display: block !important; } .desktop-hero { display: none !important; } }
        @media (min-width: 768px) { .mobile-hero { display: none !important; } .desktop-hero { display: grid !important; } }
      `}</style>
    </section>
  );
}
