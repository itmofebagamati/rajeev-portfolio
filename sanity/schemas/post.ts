export default {
  name: "post", title: "Blog Posts", type: "document",
  fields: [
    { name: "title",       title: "Post Title",    type: "string" },
    { name: "slug",        title: "Slug (URL)",    type: "slug", options: { source: "title" } },
    { name: "coverImage",  title: "Cover Image",   type: "image", options: { hotspot: true } },
    { name: "excerpt",     title: "Short Description", type: "text", rows: 3 },
    {
      name: "category", title: "Category", type: "string",
      options: { list: [
        { title: "Technology",  value: "Technology" },
        { title: "Government",  value: "Government" },
        { title: "Programming", value: "Programming" },
        { title: "Nepal",       value: "Nepal" },
        { title: "Personal",    value: "Personal" },
        { title: "Tutorial",    value: "Tutorial" },
        { title: "Other",       value: "Other" },
      ]},
    },
    { name: "readTime",     title: "Read Time (minutes)", type: "number",   initialValue: 3 },
    { name: "publishedAt",  title: "Published Date",      type: "datetime", initialValue: () => new Date().toISOString() },
    { name: "featured",     title: "Featured Post?",      type: "boolean",  initialValue: false },
    { name: "externalLink", title: "External Blog Link (optional)", type: "url",
      description: "If you write on an external platform, paste the link here instead of writing content below" },
    {
      name: "body", title: "Post Content", type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt",     title: "Alt Text", type: "string" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, media }: Record<string, any>) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "No date",
        media,
      };
    },
  },
};