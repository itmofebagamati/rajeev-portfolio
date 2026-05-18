export default {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    { name: "order",       title: "Order (1 = first)", type: "number" },
    { name: "period",      title: "Period",             type: "string", description: 'e.g. "2014 – 2018"' },
    { name: "degree",      title: "Degree / Program",   type: "string" },
    { name: "institution", title: "Institution",         type: "string" },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Masters",   value: "Masters" },
          { title: "Bachelors", value: "Bachelors" },
          { title: "Diploma",   value: "Diploma" },
        ],
        layout: "radio",
      },
    },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "degree", subtitle: "institution" },
  },
};
