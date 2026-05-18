import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import BlogSection from "@/components/BlogSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import { client } from "@/sanity/lib/client";
import { homeQuery, navQuery, postsPreviewQuery, galleryQuery } from "@/sanity/lib/queries";
import { fallbackData, fallbackNav, fallbackPosts, fallbackGallery } from "@/sanity/lib/fallback";
import type { HomeData, NavItem, PostPreview, GalleryPhoto } from "@/sanity/lib/types";

export const revalidate = 60;

async function getAllData() {
  if (!client) {
    return {
      home:    fallbackData,
      nav:     fallbackNav,
      posts:   fallbackPosts,
      gallery: fallbackGallery,
    };
  }
  try {
    const [home, nav, posts, gallery] = await Promise.all([
      client.fetch<HomeData>(homeQuery),
      client.fetch<NavItem[]>(navQuery),
      client.fetch<PostPreview[]>(postsPreviewQuery),
      client.fetch<GalleryPhoto[]>(galleryQuery),
    ]);
    return {
      home: {
        hero:       { ...fallbackData.hero,       ...home?.hero },
        about:      { ...fallbackData.about,      ...home?.about },
        experience: home?.experience?.length ? home.experience : fallbackData.experience,
        education:  home?.education?.length  ? home.education  : fallbackData.education,
        skills:     home?.skills?.length     ? home.skills     : fallbackData.skills,
      },
      nav:     nav?.length     ? nav     : fallbackNav,
      posts:   posts?.length   ? posts   : fallbackPosts,
      gallery: gallery?.length ? gallery : fallbackGallery,
    };
  } catch {
    return {
      home:    fallbackData,
      nav:     fallbackNav,
      posts:   fallbackPosts,
      gallery: fallbackGallery,
    };
  }
}

export default async function Home() {
  const { home, nav, posts, gallery } = await getAllData();

  return (
    <>
      <ScrollToTop />
      <Navbar navItems={nav} />
      <main>
        <HeroSection       data={home.hero}       />
        <AboutSection      data={home.about}      />
        <ExperienceSection data={home.experience} />
        <SkillsSection     data={home.skills}     />
        <EducationSection  data={home.education}  />
        <BlogSection       posts={posts}          />
        <GallerySection    photos={gallery}       />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
