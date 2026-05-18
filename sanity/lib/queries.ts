import { groq } from "next-sanity";

// Hero section
export const heroQuery = groq`
  *[_type == "hero"][0] {
    greeting,
    name,
    title,
    buttonPrimaryText,
    buttonSecondaryText,
    profileImage,
    badge1,
    badge2,
    socialLinks[] {
      label,
      url,
      bgColor,
      textColor
    }
  }
`;

// About section
export const aboutQuery = groq`
  *[_type == "about"][0] {
    bio1,
    bio2,
    name,
    dob,
    address,
    email,
    phone,
    website,
    profileImage
  }
`;

// Experience
export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    period,
    role,
    organization,
    description
  }
`;

// Education
export const educationQuery = groq`
  *[_type == "education"] | order(order asc) {
    _id,
    period,
    degree,
    institution,
    type
  }
`;

// Skills
export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc) {
    _id,
    name,
    icon,
    color
  }
`;

// All in one query (for homepage)
export const homeQuery = groq`
  {
    "hero":       *[_type == "hero"][0] {
      greeting, name, title, profileImage, badge1, badge2,
      socialLinks[] { label, url, bgColor, textColor }
    },
    "about":      *[_type == "about"][0] {
      bio1, bio2, name, dob, address, email, phone, website, profileImage
    },
    "experience": *[_type == "experience"] | order(order asc) {
      _id, period, role, organization, description
    },
    "education":  *[_type == "education"] | order(order asc) {
      _id, period, degree, institution, type
    },
    "skills":     *[_type == "skill"] | order(order asc) {
      _id, name, icon, color
    }
  }
`;

// Nav items
export const navQuery = groq`
  *[_type == "navItem"] | order(order asc) {
    _id, label, linkType, sectionId, pageSlug, externalUrl, openInNewTab
  }
`;

// Blog posts (for homepage preview — latest 6)
export const postsPreviewQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    slug,
    excerpt,
    category,
    readTime,
    publishedAt,
    featured,
    coverImage,
    externalLink
  }
`;

// All blog posts (for /blog page)
export const allPostsQuery = groq`
  *[_type == "post"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    readTime,
    publishedAt,
    featured,
    coverImage,
    externalLink
  }
`;

// Single blog post
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, readTime, publishedAt,
    featured, coverImage, externalLink, body
  }
`;

// Gallery photos
export const galleryQuery = groq`
  *[_type == "gallery"] | order(takenAt desc) {
    _id, title, description, category, featured, takenAt, image
  }
`;
