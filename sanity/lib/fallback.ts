// Fallback data used when Sanity is not configured yet
// or when fetching fails — site always works even without CMS
import type { HomeData } from "./types";

export const fallbackData: HomeData = {
  hero: {
    greeting: "Hello,",
    name: "Rajeev",
    title: "Software Developer",
    badge1: "Nepal Gov 🇳🇵",
    badge2: "B.E. Comp. Eng. 🎓",
    socialLinks: [
      { label: "FB",   url: "https://www.facebook.com/share/1BVbgwosj4/", bgColor: "#1877f2" },
      { label: "IG",   url: "https://www.instagram.com/rajeev.sah244",    bgColor: "#e1306c" },
      { label: "GH",   url: "https://github.com",                          bgColor: "#333333" },
      { label: "Blog", url: "https://blog.rajeevsah.com.np",               bgColor: "#00e5a0", textColor: "#0d1117" },
    ],
  },
  about: {
    name:    "Er. Rajeev Kumar Sah",
    dob:     "December 30, 1991",
    address: "Kathmandu, Nepal",
    email:   "rajeev.sah@nepal.gov.np",
    phone:   "+977-9866367111",
    website: "rajeevsah.com.np",
    bio1: "I am a results-driven and detail-oriented engineering professional with strong interest in technology, computer science, and innovative problem-solving. Skilled in analytical thinking, system design, and adapting quickly to new tools and technologies.",
    bio2: "Currently serving as Computer Officer (7th Level) at the Government of Bagmati Province. I love to learn and explore new technologies and am passionate about building efficient, user-centric digital solutions.",
  },
  experience: [
    { _id: "1", period: "Sep 2024 – Present",   role: "Computer Officer – 7th Level",   organization: "Government of Bagmati Province", description: "Managing IT infrastructure, overseeing digital systems, and providing technical support for provincial government operations." },
    { _id: "2", period: "May 2024 – Sep 2024",  role: "Assistant Computer Operator",    organization: "Government of Nepal",            description: "Supported computer operations, maintained records, and assisted in day-to-day digital administration tasks." },
    { _id: "3", period: "Apr 2019 – May 2024",  role: "Instructor",                     organization: "Government of Nepal",            description: "Delivered computer science and IT courses. Developed curriculum and mentored students in practical computing skills." },
  ],
  education: [
    { _id: "1", period: "2026 – Present", degree: "Master of Public Administration (MPA)", institution: "Tribhuvan University (TU)",                  type: "Masters"   },
    { _id: "2", period: "2014 – 2018",    degree: "Bachelor of Computer Engineering",      institution: "Visvesvaraya Technological University (VTU)", type: "Bachelors" },
    { _id: "3", period: "2009 – 2013",    degree: "Diploma in Computer Engineering",       institution: "C.T.E.V.T.",                                  type: "Diploma"   },
  ],
  skills: [
    { _id: "1",  name: "HTML5",          icon: "🌐", color: "#e34c26" },
    { _id: "2",  name: "CSS3",           icon: "🎨", color: "#264de4" },
    { _id: "3",  name: "JavaScript",     icon: "⚡", color: "#f7df1e" },
    { _id: "4",  name: "TypeScript",     icon: "🔷", color: "#3178c6" },
    { _id: "5",  name: "React",          icon: "⚛️", color: "#61dafb" },
    { _id: "6",  name: "Next.js",        icon: "▲",  color: "#ffffff" },
    { _id: "7",  name: "Node.js",        icon: "🟢", color: "#68a063" },
    { _id: "8",  name: "WordPress",      icon: "📝", color: "#21759b" },
    { _id: "9",  name: "Photoshop",      icon: "🖌️", color: "#31a8ff" },
    { _id: "10", name: "Figma",          icon: "🎭", color: "#f24e1e" },
    { _id: "11", name: "SEO",            icon: "📈", color: "#00e5a0" },
    { _id: "12", name: "Git",            icon: "🌿", color: "#f05032" },
  ],
};

import type { NavItem, PostPreview, GalleryPhoto } from "./types";

export const fallbackNav: NavItem[] = [
  { _id: "1", label: "About",      linkType: "section", sectionId: "about" },
  { _id: "2", label: "Experience", linkType: "section", sectionId: "experience" },
  { _id: "3", label: "Skills",     linkType: "section", sectionId: "skills" },
  { _id: "4", label: "Education",  linkType: "section", sectionId: "education" },
  { _id: "5", label: "Blog",       linkType: "section", sectionId: "blog" },
  { _id: "6", label: "Gallery",    linkType: "section", sectionId: "gallery" },
  { _id: "7", label: "Contact",    linkType: "section", sectionId: "contact" },
];

export const fallbackPosts: PostPreview[] = [
  { _id: "1", title: "Getting Started with Next.js 14", slug: { current: "getting-started-nextjs" }, excerpt: "A beginner-friendly guide to building modern web apps with Next.js 14 App Router.", category: "Programming", readTime: 5, publishedAt: new Date().toISOString(), featured: true },
  { _id: "2", title: "IT in Nepal's Government Sector", slug: { current: "it-nepal-government" }, excerpt: "How technology is transforming public administration in Nepal.", category: "Nepal", readTime: 4, publishedAt: new Date(Date.now() - 86400000).toISOString(), featured: false },
  { _id: "3", title: "TypeScript Tips for Beginners", slug: { current: "typescript-tips" }, excerpt: "Essential TypeScript patterns every developer should know.", category: "Tutorial", readTime: 6, publishedAt: new Date(Date.now() - 172800000).toISOString(), featured: false },
];

export const fallbackGallery: GalleryPhoto[] = [];
