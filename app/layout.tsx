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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
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
        {/* impact.com affiliate site verification (non-standard `value` attr required by impact.com) */}
        <meta {...{ name: 'impact-site-verification', value: 'cf5ec2a5-ad3b-4112-9e9a-c9451e7c7029' }} />
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
