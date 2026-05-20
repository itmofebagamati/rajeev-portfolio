import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/sanity/lib/client";
import { postBySlugQuery, allPostsQuery } from "@/sanity/lib/queries";
import type { PostPreview } from "@/sanity/lib/types";
import { PortableText } from "@portabletext/react";

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

// Generate static params for all published posts
export async function generateStaticParams() {
  if (!client) return [];
  try {
    const posts = await client.fetch<PostPreview[]>(allPostsQuery);
    return (posts ?? []).map((post) => ({ slug: post.slug?.current ?? "" }));
  } catch {
    return [];
  }
}

async function getPost(slug: string) {
  if (!client) return null;
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

// Portable Text components for rich content rendering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ptComponents: any = {
  types: {
    image: ({ value }: { value: { asset?: unknown; caption?: string; alt?: string } }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(900).url();
      if (!src) return null;
      return (
        <figure style={{ margin: "2rem 0" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "10px", overflow: "hidden" }}>
            <Image src={src} alt={value.alt ?? ""} fill style={{ objectFit: "cover" }} unoptimized />
          </div>
          {value.caption && (
            <figcaption style={{ textAlign: "center", fontFamily: "'Fira Code', monospace", fontSize: "12px", color: "#8892a4", marginTop: "8px" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#e2e8f0", margin: "2rem 0 1rem" }}>{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#e2e8f0", margin: "2rem 0 1rem" }}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#e2e8f0", margin: "1.5rem 0 0.75rem" }}>{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#e2e8f0", margin: "1.5rem 0 0.5rem" }}>{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "15px", color: "#8892a4", lineHeight: 1.9, margin: "0 0 1.2rem" }}>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ borderLeft: "3px solid #00e5a0", paddingLeft: "1.2rem", margin: "1.5rem 0", color: "#6b7280", fontStyle: "italic", fontFamily: "'Fira Code', monospace", fontSize: "14px" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: "#e2e8f0", fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ color: "#c9d1d9", fontStyle: "italic" }}>{children}</em>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code style={{ background: "#1e2535", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px 6px", fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#00e5a0" }}>
        {children}
      </code>
    ),
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a href={value?.href} target="_blank" rel="noreferrer"
        style={{ color: "#00e5a0", textDecoration: "underline", textUnderlineOffset: "3px" }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: "1.5rem", margin: "0 0 1.2rem", fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "#8892a4", lineHeight: 1.8 }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5rem", margin: "0 0 1.2rem", fontFamily: "'Fira Code', monospace", fontSize: "14px", color: "#8892a4", lineHeight: 1.8 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.4rem" }}>
        <span style={{ color: "#00e5a0", marginRight: "8px" }}>▸</span>{children}
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.4rem" }}>{children}</li>
    ),
  },
};

// Next.js 15+ requires params as a Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const coverSrc = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : null;
  const catColor = CATEGORY_COLOR[post.category ?? "Other"] ?? "#8892a4";
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "";

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>

      {/* Top nav bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(13,17,23,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{
          fontFamily: "'Fira Code', monospace", fontWeight: 700,
          fontSize: "17px", color: "#00e5a0", textDecoration: "none",
        }}>
          Er.Rajeev
        </Link>
        <Link href="/blog" style={{
          fontFamily: "'Fira Code', monospace", fontSize: "12px",
          color: "#8892a4", textDecoration: "none", display: "flex",
          alignItems: "center", gap: "6px",
        }}>
          ← All Posts
        </Link>
      </div>

      {/* Cover image */}
      {coverSrc && (
        <div style={{ position: "relative", width: "100%", height: "420px", marginTop: "60px" }}>
          <Image src={coverSrc} alt={post.title} fill
            style={{ objectFit: "cover", opacity: 0.7 }} unoptimized />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, #0d1117 100%)",
          }} />
        </div>
      )}

      {/* Article content */}
      <article style={{
        maxWidth: 780, margin: "0 auto",
        padding: coverSrc ? "0 32px 80px" : "100px 32px 80px",
        marginTop: coverSrc ? "-120px" : "0",
        position: "relative", zIndex: 1,
      }}>

        {/* Meta badges */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {post.category && (
            <span style={{
              background: `${catColor}22`, border: `1px solid ${catColor}44`,
              color: catColor, fontFamily: "'Fira Code', monospace",
              fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
            }}>
              {post.category}
            </span>
          )}
          {post.featured && (
            <span style={{
              background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.3)",
              color: "#00e5a0", fontFamily: "'Fira Code', monospace",
              fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
            }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e2e8f0",
          lineHeight: 1.15, marginBottom: "20px",
        }}>
          {post.title}
        </h1>

        {/* Date + read time */}
        <div style={{
          display: "flex", gap: "20px", alignItems: "center",
          fontFamily: "'Fira Code', monospace", fontSize: "12px",
          color: "#8892a4", marginBottom: "40px",
          paddingBottom: "32px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {date && <span>📅 {date}</span>}
          {post.readTime && <span>⏱ {post.readTime} min read</span>}
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{
            fontFamily: "'Fira Code', monospace", fontSize: "16px",
            color: "#c9d1d9", lineHeight: 1.8, marginBottom: "2rem",
            padding: "20px 24px",
            background: "rgba(0,229,160,0.04)",
            border: "1px solid rgba(0,229,160,0.12)",
            borderRadius: "8px",
            borderLeft: "3px solid #00e5a0",
          }}>
            {post.excerpt}
          </p>
        )}

        {/* External link */}
        {post.externalLink && (
          <div style={{
            padding: "20px 24px", borderRadius: "10px",
            background: "rgba(79,195,247,0.06)",
            border: "1px solid rgba(79,195,247,0.2)",
            marginBottom: "2rem",
          }}>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: "13px", color: "#8892a4", marginBottom: "12px" }}>
              This post is published on an external platform.
            </p>
            <a href={post.externalLink} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#4fc3f7", color: "#0d1117",
              fontFamily: "'Fira Code', monospace", fontWeight: 700, fontSize: "13px",
              padding: "10px 20px", borderRadius: "6px", textDecoration: "none",
            }}>
              Read full post ↗
            </a>
          </div>
        )}

        {/* Body content */}
        {post.body && (
          <div style={{ marginTop: "8px" }}>
            <PortableText value={post.body} components={ptComponents} />
          </div>
        )}

        {/* Footer nav */}
        <div style={{
          marginTop: "60px", paddingTop: "32px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "16px",
        }}>
          <Link href="/blog" style={{
            fontFamily: "'Fira Code', monospace", fontSize: "13px",
            color: "#00e5a0", textDecoration: "none",
          }}>
            ← Back to all posts
          </Link>
          <Link href="/" style={{
            fontFamily: "'Fira Code', monospace", fontSize: "13px",
            color: "#8892a4", textDecoration: "none",
          }}>
            View Portfolio →
          </Link>
        </div>
      </article>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Space+Grotesk:wght@600;700&display=swap');
      `}</style>
    </div>
  );
}
