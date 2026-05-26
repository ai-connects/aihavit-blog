/**
 * MedicalDisclaimer — YMYL/non-YMYL 일관 표시 (PRD §5.2.2 / §16.2 / INV-002).
 *
 * Render: body 직전 (ArticleView §7.3).
 * i18n: 인라인 const DISCLAIMER_I18N (6 lang 자체포함, lib/i18n.ts 미사용).
 * 컴플라이언스 (SKILL.md D8-M7): "diagnosis"는 부정문으로만 사용 (substitute for ... diagnosis).
 * a11y: role="note" + aria-label="Medical disclaimer" (§16.5).
 */

interface Props {
  shortLang: string;
}

// PRD §5.2.2 — 6 lang Medical Disclaimer 텍스트 SSOT (1바이트도 PRD 명시값 그대로).
const DISCLAIMER_I18N: Record<string, string> = {
  en: 'This article is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with questions about a medical condition.',
  ko: '이 글은 일반적인 정보 제공 목적이며, 전문 의료인의 진료·진단·치료를 대체하지 않습니다. 건강 관련 결정은 반드시 의료 전문가와 상의하세요.',
  ja: '本記事は一般的な情報提供のみを目的としており、専門医による診療・診断・治療の代わりとはなりません。健康に関する判断は必ず医療従事者にご相談ください。',
  zh: '本文仅供一般信息参考，不能替代专业医疗建议、诊断或治疗。如有任何健康相关问题，请务必咨询合格的医疗专业人员。',
  'zh-tw':
    '本文僅供一般資訊參考，不能替代專業醫療建議、診斷或治療。如有任何健康相關問題，請務必諮詢合格的醫療專業人員。',
  es: 'Este artículo tiene fines informativos generales y no sustituye el consejo, diagnóstico o tratamiento médico profesional. Consulte siempre a un profesional sanitario cualificado.',
  'pt-br':
    'Este artigo tem fins informativos gerais e não substitui aconselhamento, diagnóstico ou tratamento médico profissional. Sempre consulte um profissional de saúde qualificado para questões sobre uma condição médica.',
  id: 'Artikel ini hanya untuk informasi umum dan bukan pengganti nasihat, diagnosis, atau perawatan medis profesional. Selalu konsultasikan dengan tenaga kesehatan yang berkualifikasi untuk pertanyaan tentang kondisi medis.',
  de: 'Dieser Artikel dient ausschließlich allgemeinen Informationszwecken und ersetzt keine professionelle medizinische Beratung, Diagnose oder Behandlung. Wenden Sie sich bei gesundheitlichen Fragen stets an qualifiziertes medizinisches Fachpersonal.',
  fr: "Cet article est fourni à titre d'information générale uniquement et ne remplace pas un avis, un diagnostic ou un traitement médical professionnel. Consultez toujours un professionnel de santé qualifié pour toute question concernant une affection médicale.",
};

function pickText(shortLang: string): string {
  // PRD E-003 — lang 누락 시 en fallback
  return DISCLAIMER_I18N[shortLang] ?? DISCLAIMER_I18N.en;
}

export default function MedicalDisclaimer({ shortLang }: Props) {
  const text = pickText(shortLang);
  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border-l-4 border-gray-300 dark:border-gray-700"
    >
      <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}
