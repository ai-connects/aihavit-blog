import type { Metadata, Viewport } from 'next';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.aihavit.com'),
  title: {
    default: 'HAVIT Blog — Science-backed wellness guidance',
    template: '%s',
  },
  description:
    'Evidence-based guides on habits, sleep, nutrition, and movement. From the HAVIT wellness team.',
  applicationName: 'HAVIT',
  authors: [{ name: 'HAVIT Editorial' }],
  keywords: ['wellness', 'habits', 'nutrition', 'sleep', 'exercise', 'health', 'HAVIT'],
  robots: { index: true, follow: true },
  verification: {
    other: {
      'naver-site-verification': '0533a1862dda218c0632edc4109743f9138bf2ad',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'HAVIT Blog',
    url: 'https://blog.aihavit.com',
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
        <GoogleAnalytics />
        {children}
        <CookieConsent lang="en_us" />
      </body>
    </html>
  );
}
