export default {
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    { name: "order", title: "Order (1 = first)", type: "number" },
    { name: "name",  title: "Skill Name",         type: "string" },
    { name: "icon",  title: "Icon (emoji)",        type: "string", description: "Paste an emoji e.g. ⚛️" },
    { name: "color", title: "Color (hex)",          type: "string", description: 'e.g. "#61dafb"' },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "icon" },
  },
};
