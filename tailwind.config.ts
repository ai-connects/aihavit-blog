import type { Config } from 'tailwindcss';

// PRD §16.5 디자인 토큰 (정량) — LOCKED v0.3.0
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // PRD §16.5 정량 breakpoint
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        // HAVIT primary — aihavit.com marketing site (--color-primary #d4ff50).
        // 500 is the brand fill. Lime is very light, so 600+ are the darkened
        // olives used wherever the color has to carry TEXT: 700 (#5f7a00) is
        // the lightest step that clears WCAG AA 4.5:1 on white, so it — not
        // 500/600 — is the correct token for links and inline emphasis.
        primary: {
          50: '#FBFFEE',
          100: '#F6FFDC', // marketing --tint-pale
          200: '#EDFFB9',
          300: '#E5FF96', // marketing --tint-lime
          400: '#DCFF73',
          500: '#D4FF50', // brand default
          600: '#7A9D00', // 3.2:1 on white — large text / UI accents only
          700: '#5F7A00', // 4.9:1 on white — body-size text
          800: '#4A5F00',
          900: '#354400',
        },
        secondary: { 500: '#1243EE' },
        // 12 카테고리 액센트 (PRD §5.1.2 12개 enum)
        category: {
          c01: '#7C3AED', // Tracking & Insights — violet
          c02: '#F59E0B', // Mindset & Motivation — amber
          c03: '#EF4444', // Weight & Metabolism — red
          c04: '#10B981', // Lifestyle Habits — emerald
          c05: '#3B82F6', // Personalized Strategies — blue
          c06: '#EC4899', // Situational Tips — pink
          c07: '#84CC16', // Diet & Nutrition — lime
          c08: '#06B6D4', // Hydration & Beverages — cyan
          c09: '#F97316', // Health & Conditions — orange
          c10: '#A855F7', // Medication Guide — purple
          c11: '#6366F1', // Sleep & Recovery — indigo
          c12: '#14B8A6', // Exercise & Activity — teal
        },
      },
      fontSize: {
        // PRD §16.5 typography 토큰
        'display-2xl': ['3.75rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-xl': ['3rem', { lineHeight: '1.15', fontWeight: '700' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['1.875rem', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.43' }], // 14px/20px — §16.4 ReferenceFooter
        caption: ['0.75rem', { lineHeight: '1.33' }],
      },
      spacing: {
        // PRD §16.5 4-base scale (Tailwind default 호환)
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        '2xl': '24px',
      },
      fontFamily: {
        sans: [
          // Poppins first to match aihavit.com; it has no CJK glyphs, so
          // Pretendard/Noto behind it cover ko/ja/zh.
          'Poppins',
          'Pretendard',
          'Pretendard Variable',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'Noto Sans JP',
          'Noto Sans',
          'sans-serif',
        ],
      },
      maxWidth: {
        prose: '65ch', // PRD §16.4 ReferenceFooter
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
