import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | SQROCK IT Solutions',

  description:
    'Learn about SQROCK IT Solutions, our story, expertise, values, and commitment to building reliable and scalable technology solutions for growing businesses.',

  keywords: [
    'about SQROCK',
    'SQROCK IT Solutions',
    'software development company',
    'IT solutions company',
    'software development team',
    'technology company India',
    'web development company',
    'IT consulting company',
  ],

  authors: [
    {
      name: 'SQROCK IT Solutions',
      url: 'https://sqrock.cloud',
    },
  ],

  creator: 'SQROCK IT Solutions',
  publisher: 'SQROCK IT Solutions',

  alternates: {
    canonical: '/about',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/about',
    siteName: 'SQROCK IT Solutions',

    title: 'About Us | SQROCK IT Solutions',

    description:
      'Discover the story, expertise, and values behind SQROCK IT Solutions and how we help businesses grow through technology.',

    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About SQROCK IT Solutions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'About Us | SQROCK IT Solutions',

    description:
      'Discover the story, expertise, and values behind SQROCK IT Solutions.',

    images: ['/og-about.png'],
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
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}