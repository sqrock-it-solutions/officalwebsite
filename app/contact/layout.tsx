import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | SQROCK IT Solutions',

  description:
    'Get in touch with SQROCK IT Solutions to discuss your website, mobile app, custom software, IT consulting, or digital transformation project. Book a free consultation today.',

  keywords: [
    'contact SQROCK IT Solutions',
    'SQROCK IT Solutions contact',
    'software development consultation',
    'web development company contact',
    'mobile app development company',
    'custom software development',
    'IT consulting',
    'free software consultation',
    'technology solutions India',
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
    canonical: '/contact',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/contact',
    siteName: 'SQROCK IT Solutions',

    title: 'Contact Us | SQROCK IT Solutions',

    description:
      'Have a project in mind? Talk to SQROCK IT Solutions about your software, web, mobile app, or IT requirements and book a free consultation.',

    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact SQROCK IT Solutions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Contact Us | SQROCK IT Solutions',

    description:
      'Discuss your project with SQROCK IT Solutions and book a free consultation.',

    images: ['/og-contact.png'],
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

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}