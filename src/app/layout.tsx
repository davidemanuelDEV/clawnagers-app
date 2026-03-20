import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clawnagers | K-12 AI Agent Building Curriculum for Schools",
  description:
    "8-week curriculum that teaches high school students to build real AI agents. Powered by OpenClaw. Demo Day in San Francisco. Title IV-A eligible. $899/year.",
  metadataBase: new URL("https://clawnagers.com"),
  alternates: {
    canonical: "https://clawnagers.com",
  },
  icons: {
    icon: "/bot-favicon.svg",
    shortcut: "/bot-favicon.svg",
    apple: "/bot-favicon.svg",
  },
  openGraph: {
    title: "Clawnagers | K-12 AI Agent Building Curriculum for Schools",
    description:
      "Your students don't just use AI. They build it. 8-week curriculum, real AI agents, Demo Day in San Francisco.",
    url: "https://clawnagers.com",
    siteName: "Clawnagers",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://clawnagers.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clawnagers - K-12 AI Agent Building Curriculum",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawnagers | K-12 AI Agent Building Curriculum for Schools",
    description:
      "Your students don't just use AI. They build it. 8-week curriculum, real AI agents, Demo Day in San Francisco.",
    images: ["https://clawnagers.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
