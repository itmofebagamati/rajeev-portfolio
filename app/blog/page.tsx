import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { fallbackPosts } from "@/sanity/lib/fallback";
import { urlFor } from "@/sanity/lib/client";
import type { PostPreview } from "@/sanity/lib/types";

export const revalidate = 60;

const CATEGORY_COLOR: Record<string, string> = {
  Technology:  "#4fc3f7",
  Government:  "#e040fb",
  Programming: "#00e5a0",
  Nepal:       "#ffd54f",
  Personal:    "#ff8a65",
  Tutorial:    "#81c784",
  Other:       "#8892a4",
};

async function getPosts(): Promise<PostPreview[]> {
  if (!client) return fallbackPosts;
  try {
    const posts = await client.fetch<PostPreview[]>(allPostsQuery);
    return posts?.length ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <Link href="/" style={{
            fontFamily: "'Fira Code', monospace", fontSize: "12px",
            color: "#8892a4", textDecoration: "none", display: "inline-flex",
            alignItems: "center", gap: "6px", marginBottom: "24px",
            transition: "color 0.2s",
          }}
          >
            ← Back to Portfolio
          </Link>
          <div style={{
            display: "block", border: "1px solid #00e5a0", color: "#00e5a0",
            fontFamily: "'Fira Code', monospace", fontSize: "10px",
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "3px 12px", borderRadius: "2px", marginBottom: "12px",
          }}>
            Blog
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e2e8f0",
          }}>
            All <span style={{ color: "#00e5a0" }}>Articles</span>
          </h1>
          <p style={{
            fontFamily: "'Fira Code', monospace", fontSize: "13px",
            color: "#8892a4", marginTop: "8px",
          }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""} published
          </p>
        </div>

        {/* Posts grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}>
          {posts.map((post) => {
            const coverSrc = post.coverImage
              ? urlFor(post.coverImage).width(600).height(340).url()
              : null;
            const catColor = CATEGORY_COLOR[post.category ?? "Other"] ?? "#8892a4";
            const date = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })
              : "";
            const href = post.externalLink ?? `/blog/${post.slug?.current}`;
            const isExternal = !!post.externalLink;

            return (
              <Link
                key={post._id}
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noreferrer" : ""}
                style={{
                  display: "block", textDecoration: "none", color: "inherit",
                  background: "#161b27",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", overflow: "hidden",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                }}

              >
                {/* Cover */}
                <div style={{
                  position: "relative", height: 200,
                  background: "#1e2535", overflow: "hidden",
                }}>
                  {coverSrc ? (
                    <Image src={coverSrc} alt={post.title} fill
                      style={{ objectFit: "cover" }} unoptimized />
                  ) : (
                    <div style={{
                      position: "absolute", inset: 0, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: "48px",
                      background: "linear-gradient(135deg, #1e2535, #161b27)",
                    }}>
                      📝
                    </div>
                  )}
                  {post.category && (
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      background: `${catColor}22`,
                      border: `1px solid ${catColor}55`,
                      color: catColor,
                      fontFamily: "'Fira Code', monospace", fontSize: "10px",
                      padding: "3px 10px", borderRadius: "20px",
                      backdropFilter: "blur(8px)",
                    }}>
                      {post.category}
                    </div>
                  )}
                  {post.featured && (
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(0,229,160,0.15)",
                      border: "1px solid rgba(0,229,160,0.3)",
                      color: "#00e5a0",
                      fontFamily: "'Fira Code', monospace", fontSize: "10px",
                      padding: "3px 10px", borderRadius: "20px",
                    }}>
                      ⭐ Featured
                    </div>
                  )}
                  {isExternal && (
                    <div style={{
                      position: "absolute", bottom: 12, right: 12,
                      background: "rgba(79,195,247,0.15)",
                      border: "1px solid rgba(79,195,247,0.3)",
                      color: "#4fc3f7",
                      fontFamily: "'Fira Code', monospace", fontSize: "10px",
                      padding: "3px 10px", borderRadius: "20px",
                    }}>
                      ↗ External
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "20px" }}>
                  <div style={{
                    display: "flex", gap: "12px",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "11px", color: "#8892a4", marginBottom: "10px",
                  }}>
                    {date && <span>📅 {date}</span>}
                    {post.readTime && <span>⏱ {post.readTime} min</span>}
                  </div>
                  <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: "17px", marginBottom: "10px",
                    lineHeight: 1.35, color: "#e2e8f0",
                  }}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p style={{
                      fontFamily: "'Fira Code', monospace", fontSize: "12px",
                      color: "#8892a4", lineHeight: 1.75,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}>
                      {post.excerpt}
                    </p>
                  )}
                  <div style={{
                    marginTop: "16px", display: "flex", alignItems: "center",
                    gap: "6px", fontFamily: "'Fira Code', monospace",
                    fontSize: "12px", color: "#00e5a0",
                  }}>
                    {isExternal ? "Read on external site →" : "Read article →"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap');
      `}</style>
    </div>
  );
}
