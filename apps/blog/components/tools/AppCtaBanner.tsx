import { APP_CTA, type ToolLang } from '@/lib/tool-labels';

export default function AppCtaBanner({ lang }: { lang: ToolLang }) {
  const t = APP_CTA[lang];
  return (
    <div className="mt-6 p-5 rounded-2xl border-2 border-primary-500 bg-primary-50">
      <div className="font-bold text-base mb-1.5">{t.title}</div>
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{t.body}</p>
      <a href="https://app.aihavit.com/" target="_blank" rel="noopener" className="inline-block px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-gray-900 font-semibold text-sm transition-colors">
        {t.button}
      </a>
    </div>
  );
}
