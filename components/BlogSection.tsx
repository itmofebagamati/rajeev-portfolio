"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimSection from "./AnimSection";
import { urlFor } from "@/sanity/lib/client";
import type { PostPreview } from "@/sanity/lib/types";

const CATEGORY_COLOR: Record<string, string> = {
  Technology:  "#4fc3f7",
  Government:  "#e040fb",
  Programming: "#00e5a0",
  Nepal:       "#ffd54f",
  Personal:    "#ff8a65",
  Tutorial:    "#81c784",
  Other:       "#8892a4",
};

function PostCard({ post, featured = false }: { post: PostPreview; featured?: boolean }) {
  const coverSrc = post.coverImage
    ? urlFor(post.coverImage).width(featured ? 800 : 400).height(featured ? 400 : 220).url()
    : null;

  const catColor = CATEGORY_COLOR[post.category ?? "Other"] ?? "#8892a4";
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";
  const href = post.externalLink ?? `/blog/${post.slug?.current}`;
  const isExternal = !!post.externalLink;

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noreferrer" : ""}
      whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
      transition={{ duration: 0.25 }}
      style={{
        display: "block", textDecoration: "none", color: "inherit",
        background: "#161b27", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px", overflow: "hidden", cursor: "pointer",
        gridColumn: featured ? "span 2" : "span 1",
      }}
      className={featured ? "featured-card" : ""}
    >
      {/* Cover image */}
      <div style={{ position: "relative", height: featured ? 220 : 180, background: "#1e2535", overflow: "hidden" }}>
        {coverSrc ? (
          <Image src={coverSrc} alt={post.title} fill style={{ objectFit: "cover" }} unoptimized />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", background: "linear-gradient(135deg, #1e2535, #161b27)" }}>
            📝
          </div>
        )}
        {/* Category badge */}
        {post.category && (
          <div style={{ position: "absolute", top: 12, left: 12, background: `${catColor}22`, border: `1px solid ${catColor}55`, color: catColor, fontFamily: "'Fira Code', monospace", fontSize: "10px", padding: "3px 10px", borderRadius: "20px", backdropFilter: "blur(8px)" }}>
            {post.category}
          </div>
        )}
        {post.featured && (
          <div style={{ position: "absolute", top: 12, right: 12, background: "#00e5a022", border: "1px solid #00e5a055", color: "#00e5a0", fontFamily: "'Fira Code', monospace", fontSize: "10px", padding: "3px 10px", borderRadius: "20px" }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "10px", fontFamily: "'Fira Code', monospace", fontSize: "11px", color: "#8892a4" }}>
          {date && <span>📅 {date}</span>}
          {post.readTime && <span>⏱ {post.readTime} min read</span>}
          {isExternal && <span style={{ color: "#4fc3f7" }}>↗ External</span>}
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: featured ? "20px" : "16px", marginBottom: "10px", lineHeight: 1.3, color: "#e2e8f0" }}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#8892a4", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.excerpt}
          </p>
        )}
        <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#00e5a0" }}>
          Read more →
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogSection({ posts }: { posts: PostPreview[] }) {
  if (!posts || posts.length === 0) return null;

  const featured  = posts.filter(p => p.featured).slice(0, 1);
  const rest      = posts.filter(p => !p.featured).slice(0, 5);
  const displayed = featured.length ? [featured[0], ...rest.slice(0, 5)] : rest;

  return (
    <section id="blog" style={{ padding: "96px 32px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="section-tag">Blog</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, marginTop: "8px" }}>
                Latest <span style={{ color: "#00e5a0" }}>Articles</span>
              </h2>
            </div>
            <motion.a href="/blog" whileHover={{ x: 4 }}
              style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#00e5a0", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              View all posts →
            </motion.a>
          </div>
        </AnimSection>

        <AnimSection delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="blog-grid">
            {displayed.map((post, i) => (
              <motion.div key={post._id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                style={{ gridColumn: post.featured ? "span 2" : "span 1" }}
                className={post.featured ? "featured-wrap" : ""}
              >
                <PostCard post={post} featured={post.featured} />
              </motion.div>
            ))}
          </div>
        </AnimSection>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .featured-wrap { grid-column: span 1 !important; }
          .featured-card { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
