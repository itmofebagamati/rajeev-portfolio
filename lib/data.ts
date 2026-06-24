export const NAV_LINKS = ["About", "Experience", "Skills", "Education", "Contact"] as const;
export type NavLink = typeof NAV_LINKS[number];

export const SKILLS = [
  { name: "HTML5",      icon: "🌐", color: "#e34c26" },
  { name: "CSS3",       icon: "🎨", color: "#264de4" },
  { name: "JavaScript", icon: "⚡", color: "#f7df1e" },
  { name: "TypeScript", icon: "🔷", color: "#3178c6" },
  { name: "React",      icon: "⚛️", color: "#61dafb" },
  { name: "Next.js",    icon: "▲",  color: "#ffffff" },
  { name: "Node.js",    icon: "🟢", color: "#68a063" },
  { name: "WordPress",  icon: "📝", color: "#21759b" },
  { name: "Photoshop",  icon: "🖌️", color: "#31a8ff" },
  { name: "Figma",      icon: "🎭", color: "#f24e1e" },
  { name: "SEO",        icon: "📈", color: "#00e5a0" },
  { name: "Git",        icon: "🌿", color: "#f05032" },
];

export const EXPERIENCE = [
  {
    period: "Sep 2024 – Present",
    role: "Computer Officer – 7th Level",
    org: "Government of Bagmati Province",
    desc: "Managing IT infrastructure, overseeing digital systems, and providing technical support for provincial government operations.",
  },
  {
    period: "May 2024 – Sep 2024",
    role: "Assistant Computer Operator",
    org: "Government of Nepal",
    desc: "Supported computer operations, maintained records, and assisted in day-to-day digital administration tasks.",
  },
  {
    period: "Apr 2019 – May 2024",
    role: "Instructor",
    org: "Government of Nepal",
    desc: "Delivered computer science and IT courses. Developed curriculum and mentored students in practical computing skills.",
  },
  {
    period: "Apr 2019 – May 2024",
    role: "Instructor",
    org: "Government of Nepal",
    desc: "Delivered computer science and IT courses. Developed curriculum and mentored students in practical computing skills.",
  },
];

export const EDUCATION = [
  {
    period: "2026 – Present",
    degree: "Master of Public Administration (MPA)",
    institution: "Tribhuvan University (TU)",
    type: "Masters",
  },
  {
    period: "2014 – 2018",
    degree: "Bachelor of Computer Engineering",
    institution: "Visvesvaraya Technological University (VTU)",
    type: "Bachelors",
  },
  {
    period: "2009 – 2013",
    degree: "Diploma in Computer Engineering",
    institution: "C.T.E.V.T.",
    type: "Diploma",
  },
];

export const SERVICES = [
  { icon: "🌐", title: "Web Development",  desc: "Modern responsive websites with clean, maintainable code." },
  { icon: "📱", title: "App Development",  desc: "Cross-platform mobile apps with intuitive UX." },
  { icon: "🎨", title: "Graphic Design",   desc: "Visual identities and creative assets that communicate." },
  { icon: "📈", title: "Digital Marketing",desc: "Growth-focused campaigns with measurable results." },
  { icon: "💡", title: "IT Consulting",    desc: "Technology roadmaps tailored to your goals." },
  { icon: "♟️", title: "Product Strategy", desc: "From ideation to launch — real products, real impact." },
];

export const CONTACT_INFO = [
  { icon: "📍", label: "Address", value: "Kathmandu, Nepal",          href: null },
  { icon: "📞", label: "Phone",   value: "+977-9866367111",            href: "tel:+9779866367111" },
  { icon: "✉️", label: "Email",   value: "rajeev.sah@nepal.gov.np",   href: "mailto:rajeev.sah@nepal.gov.np" },
  { icon: "🌐", label: "Website", value: "rajeevsah.com.np",           href: "https://rajeevsah.com.np" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://www.facebook.com/share/1BVbgwosj4/",           icon: "f" },
  { label: "Instagram", href: "https://www.instagram.com/rajeev.sah244",               icon: "ig" },
  { label: "Blog",      href: "https://blog.rajeevsah.com.np",                          icon: "✍" },
];
