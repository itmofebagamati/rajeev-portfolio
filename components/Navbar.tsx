"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { NavItem } from "@/sanity/lib/types";

export default function Navbar({ navItems }: { navItems: NavItem[] }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (item: NavItem) => {
    setActive(item.label);
    setMenuOpen(false);
    if (item.linkType === "section" && item.sectionId) {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("");
    setMenuOpen(false);
  };

  const NavLink = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
    const isActive = active === item.label;
    const baseStyle: React.CSSProperties = {
      fontFamily: "'Fira Code', monospace",
      background: "none", border: "none", cursor: "pointer",
      color: isActive ? "#00e5a0" : mobile ? "#e2e8f0" : "#8892a4",
      fontSize: mobile ? "20px" : "13px",
      padding: mobile ? "14px 40px" : "0",
      width: mobile ? "100%" : "auto",
      textAlign: mobile ? "center" : "left",
      borderBottom: mobile ? "1px solid rgba(255,255,255,0.04)" : "none",
      textDecoration: "none",
      transition: "color 0.2s",
      display: "block",
    };

    const content = item.linkType === "external" ? (
      <a href={item.externalUrl} target={item.openInNewTab ? "_blank" : "_self"} rel="noreferrer"
        style={baseStyle} onClick={() => setMenuOpen(false)}>
        {item.label}
      </a>
    ) : item.linkType === "page" ? (
      <Link href={item.pageSlug ?? "/"} style={baseStyle} onClick={() => setMenuOpen(false)}>
        {item.label}
      </Link>
    ) : (
      <button style={baseStyle} onClick={() => handleNavClick(item)}
        className={!mobile ? `nav-item ${isActive ? "active" : ""}` : ""}>
        {item.label}
      </button>
    );

    return mobile ? (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + navItems.indexOf(item) * 0.06 }}
        onMouseEnter={e => (e.currentTarget.querySelector("*") as HTMLElement)?.style && ((e.currentTarget.querySelector("*") as HTMLElement).style.color = "#00e5a0")}
        onMouseLeave={e => (e.currentTarget.querySelector("*") as HTMLElement)?.style && ((e.currentTarget.querySelector("*") as HTMLElement).style.color = isActive ? "#00e5a0" : "#e2e8f0")}
      >
        {content}
      </motion.div>
    ) : content;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 20px", height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled || menuOpen ? "rgba(13,17,23,0.98)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.4s ease",
        }}
      >
        <motion.button onClick={goHome} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Fira Code', monospace", fontWeight: 700, fontSize: "18px", color: "#00e5a0", zIndex: 101 }}>
          Er.Rajeev
        </motion.button>

        {/* Desktop nav */}
        <ul className="md-nav" style={{ display: "none", gap: "28px", listStyle: "none", alignItems: "center" }}>
          {navItems.map((item, i) => (
            <motion.li key={item._id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}>
              <NavLink item={item} />
            </motion.li>
          ))}
        </ul>

        {/* Hamburger */}
        <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.9 }}
          className="hamburger-btn"
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "8px", zIndex: 101 }}>
          {[0, 1, 2].map((i) => (
            <motion.span key={i}
              animate={menuOpen
                ? i === 0 ? { rotate: 45, y: 7 } : i === 2 ? { rotate: -45, y: -7 } : { opacity: 0, scaleX: 0 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.25 }}
              style={{ display: "block", width: "24px", height: "2px", background: "#e2e8f0", transformOrigin: "center" }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ position: "fixed", inset: 0, zIndex: 99, background: "#0d1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}
          >
            <motion.button onClick={goHome} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              style={{ fontFamily: "'Fira Code', monospace", fontSize: "22px", fontWeight: 700, color: "#00e5a0", background: "none", border: "none", cursor: "pointer", marginBottom: "32px" }}>
              Er.Rajeev
            </motion.button>
            {navItems.map(item => <NavLink key={item._id} item={item} mobile />)}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ display: "flex", gap: "14px", marginTop: "32px" }}>
              {[
                { label: "FB", href: "https://www.facebook.com/share/1BVbgwosj4/", bg: "#1877f2" },
                { label: "IG", href: "https://www.instagram.com/rajeev.sah244",    bg: "#e1306c" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ width: 40, height: 40, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fira Code', monospace", fontSize: "10px", fontWeight: 600, color: "#fff", textDecoration: "none" }}>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .md-nav { display: flex !important; } .hamburger-btn { display: none !important; } }
        @media (max-width: 767px) { .md-nav { display: none !important; } .hamburger-btn { display: flex !important; } }
      `}</style>
    </>
  );
}
