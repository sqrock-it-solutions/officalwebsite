import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | SQROCK IT Solutions',

  description:
    'Explore the complete sitemap of SQROCK IT Solutions. Quickly navigate to our services, portfolio, blog, contact, privacy policy, and other important pages.',

  keywords: [
    'SQROCK IT Solutions sitemap',
    'SQROCK sitemap',
    'website sitemap',
    'SQROCK pages',
    'IT solutions',
    'software development company',
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
    canonical: '/sitemap',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/sitemap',
    siteName: 'SQROCK IT Solutions',

    title: 'Sitemap | SQROCK IT Solutions',

    description:
      'Explore all important SQROCK IT Solutions pages, services, insights, and resources in one place.',

    images: [
      {
        url: '/og-sitemap.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions Sitemap',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Sitemap | SQROCK IT Solutions',

    description:
      'Explore all important pages and resources of SQROCK IT Solutions.',

    images: ['/og-sitemap.png'],
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

export default function SitemapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}