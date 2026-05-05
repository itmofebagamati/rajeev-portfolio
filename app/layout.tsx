import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Er. Rajeev Kumar Sah — Software Developer & Computer Officer",
  description:
    "Portfolio of Er. Rajeev Kumar Sah — Computer Officer at Government of Bagmati Province, Software Developer, and Freelancer based in Kathmandu, Nepal.",
  keywords: ["Rajeev Kumar Sah", "Software Developer", "Nepal", "Computer Officer", "Freelancer"],
  authors: [{ name: "Er. Rajeev Kumar Sah", url: "https://rajeevsah.com.np" }],
  openGraph: {
    title: "Er. Rajeev Kumar Sah — Software Developer",
    description: "Computer Officer · Software Developer · Freelancer based in Kathmandu, Nepal.",
    url: "https://rajeevsah.com.np",
    siteName: "Rajeev Kumar Sah",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
              window.onbeforeunload = function() {
                window.scrollTo(0, 0);
              };
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}