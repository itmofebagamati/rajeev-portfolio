import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../schemas";

export default defineConfig({
  name: "rajeev-portfolio",
  title: "Rajeev Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio CMS")
          .items([
            S.listItem().title("🏠 Hero Section")
              .child(S.document().schemaType("hero").documentId("hero")),
            S.listItem().title("👤 About Section")
              .child(S.document().schemaType("about").documentId("about")),
            S.divider(),
            S.listItem().title("🧭 Navigation Menu")
              .child(S.documentTypeList("navItem").title("Navigation Menu Items")),
            S.divider(),
            S.listItem().title("💼 Experience")
              .child(S.documentTypeList("experience").title("Work Experience")),
            S.listItem().title("🎓 Education")
              .child(S.documentTypeList("education").title("Education")),
            S.listItem().title("⚡ Skills")
              .child(S.documentTypeList("skill").title("Skills")),
            S.divider(),
            S.listItem().title("📝 Blog Posts")
              .child(S.documentTypeList("post").title("Blog Posts")
                .defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
            S.listItem().title("🖼️ Gallery Photos")
              .child(S.documentTypeList("gallery").title("Gallery Photos")
                .defaultOrdering([{ field: "takenAt", direction: "desc" }])),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
