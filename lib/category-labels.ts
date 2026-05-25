/** Category name localization for filter chips, card badges, etc. */

export const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  'Tracking & Insights': {
    ko: '트래킹·인사이트', en: 'Tracking & Insights', ja: 'トラッキング・分析',
    zh: '追踪与洞察', 'zh-tw': '追蹤與洞察', es: 'Seguimiento e Insights',
  },
  'Mindset & Motivation': {
    ko: '마인드셋·동기부여', en: 'Mindset & Motivation', ja: 'マインドセット・動機付け',
    zh: '心态与动机', 'zh-tw': '心態與動機', es: 'Mentalidad y Motivación',
  },
  'Weight & Metabolism': {
    ko: '체중·대사', en: 'Weight & Metabolism', ja: '体重・代謝',
    zh: '体重与代谢', 'zh-tw': '體重與代謝', es: 'Peso y Metabolismo',
  },
  'Lifestyle Habits': {
    ko: '라이프스타일 습관', en: 'Lifestyle Habits', ja: 'ライフスタイル習慣',
    zh: '生活方式习惯', 'zh-tw': '生活方式習慣', es: 'Hábitos de Estilo de Vida',
  },
  'Personalized Strategies': {
    ko: '개인 맞춤 전략', en: 'Personalized Strategies', ja: 'パーソナライズ戦略',
    zh: '个性化策略', 'zh-tw': '個性化策略', es: 'Estrategias Personalizadas',
  },
  'Situational Tips': {
    ko: '상황별 팁', en: 'Situational Tips', ja: 'シチュエーション別ヒント',
    zh: '情境提示', 'zh-tw': '情境提示', es: 'Consejos por Situación',
  },
  'Diet & Nutrition': {
    ko: '식단·영양', en: 'Diet & Nutrition', ja: '食事・栄養',
    zh: '饮食与营养', 'zh-tw': '飲食與營養', es: 'Dieta y Nutrición',
  },
  'Hydration & Beverages': {
    ko: '수분·음료', en: 'Hydration & Beverages', ja: '水分・飲料',
    zh: '水分与饮料', 'zh-tw': '水分與飲料', es: 'Hidratación y Bebidas',
  },
  'Health & Conditions': {
    ko: '건강·질환', en: 'Health & Conditions', ja: '健康・疾患',
    zh: '健康与疾病', 'zh-tw': '健康與疾病', es: 'Salud y Condiciones',
  },
  'Medication Guide': {
    ko: '의약품 가이드', en: 'Medication Guide', ja: '薬剤ガイド',
    zh: '药物指南', 'zh-tw': '藥物指南', es: 'Guía de Medicamentos',
  },
  'Sleep & Recovery': {
    ko: '수면·회복', en: 'Sleep & Recovery', ja: '睡眠・回復',
    zh: '睡眠与恢复', 'zh-tw': '睡眠與恢復', es: 'Sueño y Recuperación',
  },
  'Exercise & Activity': {
    ko: '운동·활동', en: 'Exercise & Activity', ja: '運動・活動',
    zh: '运动与活动', 'zh-tw': '運動與活動', es: 'Ejercicio y Actividad',
  },
  'Gut Health & Microbiome': {
    ko: '장 건강·마이크로바이옴', en: 'Gut Health & Microbiome', ja: '腸活・マイクロバイオーム',
    zh: '肠道健康与微生物组', 'zh-tw': '腸道健康與微生物組', es: 'Salud Intestinal',
  },
  'Longevity & Healthy Aging': {
    ko: '장수·건강한 노화', en: 'Longevity & Healthy Aging', ja: '長寿・健康老化',
    zh: '长寿与健康老化', 'zh-tw': '長壽與健康老化', es: 'Longevidad',
  },
};

export function localizedCategory(category: string, shortLang: string): string {
  return CATEGORY_LABELS[category]?.[shortLang] ?? category;
}
