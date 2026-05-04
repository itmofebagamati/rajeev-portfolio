"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer style={{
        background: "var(--bg2)", borderTop: "1px solid var(--border)",
        padding: "28px 32px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
      }}>
        <motion.span
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "'Fira Code', monospace", fontWeight: 700, fontSize: "16px", color: "#00e5a0" }}
        >
          Er.Rajeev
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#8892a4", textAlign: "center" }}
        >
          © {new Date().getFullYear()} Er. Rajeev Kumar Sah · All rights reserved ·{" "}
          <a href="https://rajeevsah.com.np" style={{ color: "#00e5a0", textDecoration: "none" }}>rajeevsah.com.np</a>
        </motion.p>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {show && (
          <motion.button
            className="scroll-top"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.15, boxShadow: "0 6px 28px rgba(224,64,251,0.5)" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
