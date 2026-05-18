"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimSection from "./AnimSection";
import { urlFor } from "@/sanity/lib/client";
import type { GalleryPhoto } from "@/sanity/lib/types";

const CATEGORIES = ["All", "Work", "Travel", "Personal", "Event", "Nature", "Other"];

function LightBox({ photo, onClose }: { photo: GalleryPhoto; onClose: () => void }) {
  const src = urlFor(photo.image).width(1200).height(900).url();
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", cursor: "zoom-out" }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", borderRadius: "12px", overflow: "hidden", cursor: "default" }}
      >
        <Image src={src} alt={photo.title ?? ""} width={1200} height={900} style={{ objectFit: "contain", maxHeight: "85vh", width: "auto" }} unoptimized />
        {(photo.title || photo.description) && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
            {photo.title && <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "4px" }}>{photo.title}</p>}
            {photo.description && <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#8892a4" }}>{photo.description}</p>}
          </div>
        )}
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  if (!photos || photos.length === 0) return null;

  const availableCategories = CATEGORIES.filter(c => c === "All" || photos.some(p => p.category === c));
  const filtered = activeCategory === "All" ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" style={{ padding: "96px 32px", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="section-tag">Gallery</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, marginTop: "8px" }}>
                Photo <span style={{ color: "#00e5a0" }}>Gallery</span>
              </h2>
            </div>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#8892a4" }}>
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {availableCategories.map(cat => (
              <motion.button key={cat} onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Fira Code', monospace", fontSize: "12px",
                  padding: "6px 16px", borderRadius: "20px", cursor: "pointer",
                  background: activeCategory === cat ? "#00e5a0" : "transparent",
                  border: activeCategory === cat ? "1px solid #00e5a0" : "1px solid rgba(255,255,255,0.12)",
                  color: activeCategory === cat ? "#0d1117" : "#8892a4",
                  transition: "all 0.2s",
                }}>
                {cat}
              </motion.button>
            ))}
          </div>
        </AnimSection>

        {/* Masonry-style grid */}
        <AnimSection delay={100}>
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}
            className="gallery-grid">
            <AnimatePresence>
              {filtered.map((photo, i) => {
                const src = urlFor(photo.image).width(600).height(400).url();
                const isFeatured = photo.featured;
                return (
                  <motion.div
                    key={photo._id} layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, zIndex: 10 }}
                    onClick={() => setLightbox(photo)}
                    style={{
                      position: "relative", borderRadius: "10px", overflow: "hidden",
                      cursor: "zoom-in", background: "#1e2535",
                      gridColumn: isFeatured ? "span 2" : "span 1",
                      gridRow: isFeatured ? "span 2" : "span 1",
                      aspectRatio: isFeatured ? "auto" : "4/3",
                      minHeight: isFeatured ? 300 : 180,
                    }}
                    className={isFeatured ? "featured-photo" : ""}
                  >
                    <Image src={src} alt={photo.title ?? ""} fill style={{ objectFit: "cover" }} unoptimized />
                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                      style={{ position: "absolute", inset: 0, background: "rgba(13,17,23,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px" }}
                    >
                      <span style={{ fontSize: "24px" }}>🔍</span>
                      {photo.title && <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", textAlign: "center" }}>{photo.title}</p>}
                      {photo.category && (
                        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: "10px", color: "#00e5a0", border: "1px solid #00e5a044", padding: "2px 8px", borderRadius: "20px" }}>
                          {photo.category}
                        </span>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </AnimSection>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <LightBox photo={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-photo { grid-column: span 2 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .featured-photo { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
