import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/Footer";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'SQROCK IT Solutions | Scalable Software for Growing Businesses',

  description:
    'SQROCK IT Solutions builds scalable websites, mobile apps, custom software, and IT solutions that help businesses grow, automate operations, and succeed digitally.',

  keywords: [
    'SQROCK IT Solutions',
    'software development company',
    'web development company',
    'mobile app development',
    'custom software development',
    'IT consulting',
    'digital solutions',
    'software company India',
  ],

  authors: [
    {
      name: 'SQROCK IT Solutions',
      url: 'https://sqrock.cloud',
    },
  ],

  creator: 'SQROCK IT Solutions',
  publisher: 'SQROCK IT Solutions',

  metadataBase: new URL('https://sqrock.cloud'),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud',
    siteName: 'SQROCK IT Solutions',

    title:
      'SQROCK IT Solutions | Scalable Software for Growing Businesses',

    description:
      'We build scalable websites, mobile apps, custom software, and IT solutions for startups, SMEs, and growing businesses.',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'SQROCK IT Solutions | Scalable Software for Growing Businesses',

    description:
      'Scalable websites, mobile apps, custom software, and IT solutions for growing businesses.',

    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", roboto.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
