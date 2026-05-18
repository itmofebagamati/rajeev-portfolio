export default {
  name: "gallery",
  title: "Gallery Photos",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    { name: "title",       title: "Title / Caption",  type: "string" },
    { name: "description", title: "Description",       type: "text", rows: 2 },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Work",       value: "Work" },
          { title: "Travel",     value: "Travel" },
          { title: "Personal",   value: "Personal" },
          { title: "Event",      value: "Event" },
          { title: "Nature",     value: "Nature" },
          { title: "Other",      value: "Other" },
        ],
      },
      initialValue: "Personal",
    },
    {
      name: "featured",
      title: "Featured (show in hero row)?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "takenAt",
      title: "Date Taken",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    },
  ],
  orderings: [
    { title: "Newest First", name: "takenAtDesc", by: [{ field: "takenAt", direction: "desc" }] },
  ],
  preview: {
    select: {
      title:    "title",
      subtitle: "category",
      media:    "image",
    },
    prepare({ title, subtitle, media }: Record<string, any>) {
      return { title: title || "Untitled", subtitle, media };
    },
  },
};
