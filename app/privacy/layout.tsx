import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SQROCK IT Solutions',

  description:
    'Read the SQROCK IT Solutions Privacy Policy to understand how we collect, use, protect, and manage your personal information and data.',

  keywords: [
    'SQROCK IT Solutions privacy policy',
    'privacy policy',
    'data protection',
    'data privacy',
    'personal information',
    'SQROCK privacy',
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
    canonical: '/privacy-policy',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/privacy-policy',
    siteName: 'SQROCK IT Solutions',

    title: 'Privacy Policy | SQROCK IT Solutions',

    description:
      'Learn how SQROCK IT Solutions collects, uses, protects, and manages your information.',

    images: [
      {
        url: '/og-privacy.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions Privacy Policy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Privacy Policy | SQROCK IT Solutions',

    description:
      'Learn how SQROCK IT Solutions protects and manages your personal information and data.',

    images: ['/og-privacy.png'],
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

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}