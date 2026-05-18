"use client";
import dynamic from "next/dynamic";
import config from "@/sanity/lib/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#101112",
        fontFamily: "'Fira Code', monospace",
        fontSize: "14px",
        color: "#00e5a0",
      }}>
        Loading Studio...
      </div>
    ),
  }
);

export default function StudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <NextStudio config={config} basePath="/studio" />
    </div>
  );
}