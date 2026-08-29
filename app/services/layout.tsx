import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Services & Software Solutions | SQROCK IT Solutions',

  description:
    'Explore SQROCK IT Solutions services including custom software development, web development, mobile app development, IT consulting, and digital marketing.',

  keywords: [
    'SQROCK IT Solutions services',
    'custom software development',
    'web development services',
    'mobile app development',
    'Android app development',
    'iOS app development',
    'IT consulting',
    'technology consulting',
    'digital marketing services',
    'software development services India',
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
    canonical: '/services',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/services',
    siteName: 'SQROCK IT Solutions',

    title: 'IT Services & Software Solutions | SQROCK IT Solutions',

    description:
      'Custom software, web and mobile app development, IT consulting, and digital marketing solutions built to help your business grow.',

    images: [
      {
        url: '/og-services.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions Services',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'IT Services & Software Solutions | SQROCK IT Solutions',

    description:
      'Custom software, web development, mobile apps, IT consulting, and digital marketing solutions.',

    images: ['/og-services.png'],
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

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}