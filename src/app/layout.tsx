import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import FarcasterSDK from "@/components/FarcasterSDK";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://proof-of-meeting.vercel.app';

export const metadata: Metadata = {
  title: "Proof of Meeting",
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
    title: "Proof of Meeting",
    description: "Verify real-world meetings and build reputation using EAS on Base with NFC support",
    images: [
      {
        url: `${baseUrl}/api/og/miniapp`,
        width: 1200,
        height: 630,
        alt: "Proof of Meeting",
      },
    ],
    type: "website",
    url: `${baseUrl}/`,
    siteName: "Proof of Meeting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Meeting",
    description: "Verify real-world meetings and build reputation using EAS on Base with NFC support",
    images: [`${baseUrl}/api/og/miniapp`],
  },
  other: {
    'base:app_id': '695a94c34d3a403912ed8cf0',
    // Embed metadata for Base App miniapp (required by Base.org documentation)
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: `${baseUrl}/api/og/miniapp`,
      button: {
        title: 'Launch Proof of Meeting',
        action: {
          type: 'launch_miniapp',
          name: 'Proof of Meeting',
          url: `${baseUrl}/`,
          splashImageUrl: `${baseUrl}/api/og`,
          splashBackgroundColor: '#ffffff',
        },
      },
    }),
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
        <UserProvider>
          <FarcasterSDK />
          <ThemeToggle />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

