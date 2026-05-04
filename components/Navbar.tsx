"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, type NavLink } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState<NavLink | "">("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id as NavLink);
    setMenuOpen(false);
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("");
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: "0 32px", height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(13,17,23,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={goHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Fira Code', monospace",
            fontWeight: 700, fontSize: "18px",
            color: "#00e5a0",
          }}
        >
          Er.Rajeev
        </motion.button>

        {/* Desktop nav */}
        <ul className="hidden md:flex" style={{ display: "flex", gap: "32px", listStyle: "none", alignItems: "center" }}>
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <button
                onClick={() => scrollTo(link)}
                className={`nav-item ${active === link ? "active" : ""}`}
                style={{ background: "none", border: "none", fontFamily: "'Fira Code', monospace", cursor: "pointer" }}
              >
                {link}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Hamburger */}
        <motion.button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={menuOpen
                ? i === 0 ? { rotate: 45, y: 7 } : i === 2 ? { rotate: -45, y: -7 } : { opacity: 0, scaleX: 0 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: "24px", height: "2px", background: "#e2e8f0", transformOrigin: "center" }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(13,17,23,0.98)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px",
            }}
          >
            <motion.button
              onClick={goHome}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              style={{ fontFamily: "'Fira Code', monospace", fontSize: "22px", fontWeight: 700, color: "#00e5a0", background: "none", border: "none", cursor: "pointer" }}
            >
              Er.Rajeev
            </motion.button>
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ scale: 1.1, color: "#00e5a0" }}
                style={{ fontFamily: "'Fira Code', monospace", fontSize: "18px", background: "none", border: "none", cursor: "pointer", color: active === link ? "#00e5a0" : "#e2e8f0" }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
