

export interface SocialLink {
  label: string;
  url: string;
  bgColor: string;
  textColor?: string;
}

export interface HeroData {
  greeting:     string;
  name:         string;
  title:        string;
  profileImage?: unknown;
  badge1?:      string;
  badge2?:      string;
  socialLinks?: SocialLink[];
}

export interface AboutData {
  name:          string;
  dob:           string;
  address:       string;
  email:         string;
  phone:         string;
  website:       string;
  bio1:          string;
  bio2:          string;
  profileImage?: unknown;
}

export interface ExperienceItem {
  _id:          string;
  period:       string;
  role:         string;
  organization: string;
  description:  string;
}

export interface EducationItem {
  _id:         string;
  period:      string;
  degree:      string;
  institution: string;
  type:        "Masters" | "Bachelors" | "Diploma";
}

export interface SkillItem {
  _id:   string;
  name:  string;
  icon:  string;
  color: string;
}

export interface HomeData {
  hero:       HeroData;
  about:      AboutData;
  experience: ExperienceItem[];
  education:  EducationItem[];
  skills:     SkillItem[];
}

export interface NavItem {
  _id:          string;
  label:        string;
  linkType:     "section" | "page" | "external";
  sectionId?:   string;
  pageSlug?:    string;
  externalUrl?: string;
  openInNewTab?: boolean;
}

export interface PostPreview {
  _id:           string;
  title:         string;
  slug:          { current: string };
  excerpt?:      string;
  category?:     string;
  readTime?:     number;
  publishedAt?:  string;
  featured?:     boolean;
  coverImage?:   unknown;
  externalLink?: string;
}

export interface GalleryPhoto {
  _id:          string;
  title?:       string;
  description?: string;
  category?:    string;
  featured?:    boolean;
  takenAt?:     string;
  image:        unknown;
}
