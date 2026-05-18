export default {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    { name: "name",    title: "Full Name",    type: "string", initialValue: "Er. Rajeev Kumar Sah" },
    { name: "dob",     title: "Date of Birth", type: "string", initialValue: "December 30, 1991" },
    { name: "address", title: "Address",       type: "string", initialValue: "Kathmandu, Nepal" },
    { name: "email",   title: "Email",         type: "string", initialValue: "rajeev.sah@nepal.gov.np" },
    { name: "phone",   title: "Phone",         type: "string", initialValue: "+977-9866367111" },
    { name: "website", title: "Website",       type: "string", initialValue: "rajeevsah.com.np" },
    {
      name: "bio1",
      title: "Bio Paragraph 1",
      type: "text",
      rows: 4,
      initialValue: "I am a results-driven and detail-oriented engineering professional with strong interest in technology, computer science, and innovative problem-solving.",
    },
    {
      name: "bio2",
      title: "Bio Paragraph 2",
      type: "text",
      rows: 4,
      initialValue: "Currently serving as Computer Officer (7th Level) at the Government of Bagmati Province.",
    },
    {
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
