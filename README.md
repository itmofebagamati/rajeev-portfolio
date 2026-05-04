# Er. Rajeev Kumar Sah — Portfolio

A modern portfolio website built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS v4**.

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework with file-based routing |
| TypeScript | Type safety across all components |
| Tailwind CSS v4 | Utility-first styling |
| `next/font` | Optimized font loading (Syne) |
| Framer Motion ready | Animations via CSS + IntersectionObserver |

## Project Structure

```
rajeev-portfolio/
├── app/
│   ├── layout.tsx       # Root layout, metadata, fonts
│   ├── page.tsx         # Main page — composes all sections
│   └── globals.css      # Global styles, CSS variables, keyframes
├── components/
│   ├── Navbar.tsx       # Fixed nav with scroll detection + mobile menu
│   ├── HeroSection.tsx  # Landing hero
│   ├── AboutSection.tsx # About + info card
│   ├── ResumeSection.tsx# Timeline (desktop) + list (mobile)
│   ├── ServicesSection.tsx
│   ├── SkillsSection.tsx# Animated skill bars (IntersectionObserver)
│   ├── ContactSection.tsx# Contact form + info
│   ├── Footer.tsx
│   ├── AnimSection.tsx  # Reusable scroll-reveal wrapper
│   └── SectionLabel.tsx # Reusable section heading block
├── lib/
│   └── data.ts          # All content data (resume, skills, services…)
└── next.config.ts       # Static export enabled
```

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build (outputs to /out/ — deploy anywhere)
npm run build
```

## Deployment Options

### Vercel (recommended — zero config)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build        # generates /out/
# Drag and drop the /out/ folder at netlify.com/drop
```

### Static host / cPanel / VPS
```bash
npm run build
# Upload contents of /out/ to your public_html or web root
```

### GitHub Pages
Set `basePath` in `next.config.ts` to your repo name, then:
```bash
npm run build
# Deploy /out/ via gh-pages branch
```

## Customization

All site content lives in `lib/data.ts` — update your resume, skills, services, and contact info there without touching any components.
