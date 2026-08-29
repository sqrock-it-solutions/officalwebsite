import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Insights | SQROCK IT Solutions',

  description:
    'Explore SQROCK IT Solutions insights on AI, web development, cloud computing, software engineering, technology trends, and digital business growth.',

  keywords: [
    'SQROCK IT Solutions blog',
    'technology blog',
    'software development blog',
    'web development insights',
    'AI in web development',
    'cloud computing',
    'TypeScript',
    'software engineering',
    'technology trends',
    'digital business insights',
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
    canonical: '/blog',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sqrock.cloud/blog',
    siteName: 'SQROCK IT Solutions',

    title: 'Blog & Insights | SQROCK IT Solutions',

    description:
      'Insights, ideas, and industry trends covering AI, software development, cloud computing, web technologies, and digital growth.',

    images: [
      {
        url: '/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'SQROCK IT Solutions Blog & Insights',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Blog & Insights | SQROCK IT Solutions',

    description:
      'Explore technology insights, development trends, AI, cloud computing, and digital business strategies.',

    images: ['/og-blog.png'],
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

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}