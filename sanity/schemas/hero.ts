export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "greeting",
      title: "Greeting Text",
      type: "string",
      description: 'e.g. "Hello,"',
      initialValue: "Hello,",
    },
    {
      name: "name",
      title: "Your Name",
      type: "string",
      description: 'e.g. "Rajeev"',
      initialValue: "Rajeev",
    },
    {
      name: "title",
      title: "Professional Title",
      type: "string",
      description: 'e.g. "Software Developer"',
      initialValue: "Software Developer",
    },
    {
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "badge1",
      title: "Badge 1 Text (top right)",
      type: "string",
      initialValue: "Nepal Gov 🇳🇵",
    },
    {
      name: "badge2",
      title: "Badge 2 Text (bottom left)",
      type: "string",
      initialValue: "B.E. Comp. Eng. 🎓",
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label",     title: "Label",          type: "string" },
          { name: "url",       title: "URL",             type: "url" },
          { name: "bgColor",   title: "Background Color (hex)", type: "string" },
          { name: "textColor", title: "Text Color (hex)",       type: "string", initialValue: "#ffffff" },
        ],
      }],
    },
  ],
};
