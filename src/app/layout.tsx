import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proof-of-meeting.vercel.app';

export const metadata: Metadata = {
  title: "Proof of Meeting - Verify Real-world Meetings",
  description: "Verify real-world meetings and build reputation using EAS on Base with NFC support",
  manifest: `${baseUrl}/manifest.json`,
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/api/icon/192', sizes: '192x192', type: 'image/png' },
      { url: '/api/icon/512', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Proof of Meeting - Verify Real-world Meetings",
    description: "Verify real-world meetings and build reputation using EAS on Base with NFC support",
    images: [`${baseUrl}/api/og`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Meeting - Verify Real-world Meetings",
    description: "Verify real-world meetings and build reputation using EAS on Base with NFC support",
    images: [`${baseUrl}/api/og`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}

