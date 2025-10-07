import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DevDash - Developer Portfolio Dashboard",
    template: "%s | DevDash",
  },
  description: "A modern developer portfolio dashboard with GitHub integration. Track your coding activity, visualize language distribution, and showcase your work with beautiful charts and analytics.",
  keywords: [
    "developer dashboard",
    "github portfolio",
    "coding analytics",
    "developer portfolio",
    "github statistics",
    "commit tracker",
    "repository insights",
    "next.js dashboard",
    "react portfolio",
  ],
  authors: [{ name: "Daniel Zverev" }],
  creator: "Daniel Zverev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-deployment-url.vercel.app",
    title: "DevDash - Developer Portfolio Dashboard",
    description: "Track your GitHub activity and showcase your work with beautiful visualizations",
    siteName: "DevDash",
    images: [
      {
        url: "https://your-deployment-url.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevDash - Developer Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDash - Developer Portfolio Dashboard",
    description: "Track your GitHub activity and showcase your work",
    images: ["https://your-deployment-url.vercel.app/og-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background transition-colors">
              <Navbar />
              <main className="transition-smooth">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
