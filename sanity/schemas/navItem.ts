export default {
  name: "navItem",
  title: "Navigation Menu",
  type: "document",
  fields: [
    { name: "order",  title: "Order (1 = first)", type: "number" },
    { name: "label",  title: "Menu Label",        type: "string", description: 'e.g. "About", "Blog"' },
    {
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Section on homepage (e.g. #about)", value: "section" },
          { title: "Separate page (e.g. /blog)",        value: "page" },
          { title: "External URL",                       value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "section",
    },
    {
      name: "sectionId",
      title: "Section ID",
      type: "string",
      description: 'The section id WITHOUT #, e.g. "about", "skills", "blog"',
      hidden: ({ document }: { document: { linkType?: string } }) => document?.linkType !== "section",
    },
    {
      name: "pageSlug",
      title: "Page Path",
      type: "string",
      description: 'e.g. "/blog" or "/gallery"',
      hidden: ({ document }: { document: { linkType?: string } }) => document?.linkType !== "page",
    },
    {
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ document }: { document: { linkType?: string } }) => document?.linkType !== "external",
    },
    {
      name: "openInNewTab",
      title: "Open in new tab?",
      type: "boolean",
      initialValue: false,
      hidden: ({ document }: { document: { linkType?: string } }) => document?.linkType !== "external",
    },
  ],
  orderings: [{ title: "Menu Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label", subtitle: "linkType" },
  },
};
