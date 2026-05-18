export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    { name: "order",        title: "Order (1 = first)", type: "number" },
    { name: "period",       title: "Period",            type: "string", description: 'e.g. "Sep 2024 – Present"' },
    { name: "role",         title: "Job Title / Role",  type: "string" },
    { name: "organization", title: "Organization",       type: "string" },
    { name: "description",  title: "Description",        type: "text", rows: 3 },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "role", subtitle: "organization" },
  },
};
