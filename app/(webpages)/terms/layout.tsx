import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SQROCK IT Solutions',

  description:
    'Read the Terms & Conditions of SQROCK IT Solutions covering website usage, services, payments, intellectual property, user responsibilities, and other important terms.',

  keywords: [
    'SQROCK IT Solutions terms and conditions',
    'SQROCK terms',
    'terms and conditions',
    'website terms',
    'service terms',
    'software development terms',
    'IT services terms',
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
    canonical: '/terms-and-conditions',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/terms-and-conditions',
    siteName: 'SQROCK IT Solutions',

    title: 'Terms & Conditions | SQROCK IT Solutions',

    description:
      'Review the terms and conditions governing the use of SQROCK IT Solutions services and website.',

    images: [
      {
        url: '/og-terms.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions Terms & Conditions',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Terms & Conditions | SQROCK IT Solutions',

    description:
      'Review the terms and conditions for using SQROCK IT Solutions services and website.',

    images: ['/og-terms.png'],
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

export default function TermsAndConditionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}