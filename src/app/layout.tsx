import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Manrope as primary site font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Arav Patel — AI/ML Engineer & Full‑Stack Developer",
  description: "Interactive portfolio with an AI-powered chat that answers questions about Arav Patel, his skills, projects, and experience.",
  keywords: [
    "Arav Patel",
    "Portfolio",
    "AI",
    "Machine Learning",
    "Cloud",
    "Full‑Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Terraform",
    "Kubernetes",
  ],
  authors: [
    {
      name: "Arav Patel",
      url: "https://aravpatel.com",
    },
  ],
  creator: "Arav Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aravpatel.com",
    title: "Arav Patel — AI/ML Engineer & Full‑Stack Developer",
    description: "Interactive portfolio with an AI-powered chat that answers questions about Arav Patel.",
    siteName: "Arav Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arav Patel — AI/ML Engineer & Full‑Stack Developer",
    description: "Interactive portfolio with an AI-powered chat that answers questions about Arav Patel.",
    creator: "@aravpatel_",
  },
  icons: {
    icon: [
      {
        url: "/arav-images/Arav-Logo-purple.png",
        sizes: "any",
      }
    ],
    shortcut: "/arav-images/Arav-Logo-purple.png",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/arav-images/Arav-Logo-purple.png" sizes="any" />
      </head>
      <body className={cn("min-h-screen bg-background antialiased", manrope.className)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}