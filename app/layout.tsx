import type { Metadata, Viewport } from 'next';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aihavit.com'),
  title: {
    default: 'HAVIT Blog — Wellness, Science, Habits',
    template: '%s',
  },
  description:
    'HAVIT Wellness Blog — 12 categories × 35 languages of science-backed habit guidance. Prototype based on LOCKED PRD v0.3.0.',
  applicationName: 'HAVIT',
  authors: [{ name: 'HAVIT Editorial' }],
  generator: 'Next.js 14',
  keywords: ['wellness', 'habits', 'nutrition', 'sleep', 'exercise', 'health', 'HAVIT'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'HAVIT',
    url: 'https://www.aihavit.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored ? stored === 'dark' : sys) document.documentElement.classList.add('dark');
              } catch {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent lang="en_us" />
      </body>
    </html>
  );
}
