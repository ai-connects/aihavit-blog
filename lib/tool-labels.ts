/**
 * i18n labels for Wellness Tools — 6 primary languages.
 */

import type { ActivityLevel } from './calculators';

export type ToolLang = 'ko' | 'en' | 'ja' | 'zh' | 'zh-tw' | 'es';

export interface BmrLabels {
  pageTitle: string;
  pageIntro: string;
  sex: string;
  male: string;
  female: string;
  age: string;
  weight: string;
  height: string;
  units: string;
  metric: string;
  imperial: string;
  activity: string;
  activityLevels: Record<ActivityLevel, string>;
  calculate: string;
  result: string;
  bmrLabel: string;
  tdeeLabel: string;
  bmrHelp: string;
  tdeeHelp: string;
  feet: string;
  inches: string;
  aboutHeader: string;
  aboutBody: string;
  formulaHeader: string;
  formulaBody: string;
}

export const BMR_LABELS: Record<ToolLang, BmrLabels> = {
  ko: {
    pageTitle: '기초대사량(BMR) + 일일 칼로리(TDEE) 계산기',
    pageIntro: '성별·나이·체중·키·활동량을 입력하면 Mifflin-St Jeor 공식으로 BMR과 TDEE를 계산합니다. 다이어트·근육 증량 목표 설정의 기준이 됩니다.',
    sex: '성별', male: '남자', female: '여자',
    age: '나이', weight: '체중', height: '키',
    units: '단위', metric: '미터법(kg/cm)', imperial: '야드파운드(lb/ft)',
    activity: '활동량',
    activityLevels: { sedentary: '좌식 (운동 거의 없음)', light: '가벼움 (주 1–3회)', moderate: '보통 (주 3–5회)', active: '활동적 (주 6–7회)', very_active: '매우 활동적 (하루 2회 또는 육체노동)' },
    calculate: '계산하기',
    result: '결과',
    bmrLabel: 'BMR (기초대사량)',
    tdeeLabel: 'TDEE (일일 총 소비)',
    bmrHelp: '안정 상태에서 하루 동안 생명 유지에 필요한 최소 에너지입니다.',
    tdeeHelp: '활동량까지 포함한 하루 총 칼로리 소비량. 다이어트·증량 목표의 기준입니다.',
    feet: '피트', inches: '인치',
    aboutHeader: '이 계산기에 대해',
    aboutBody: 'Mifflin-St Jeor 공식(1990)은 비-DEXA 환경에서 가장 정확한 BMR 추정 식으로, 미국임상영양학회(ACSM)와 국제스포츠영양학회(ISSN)가 권장합니다. TDEE는 WHO/IOM의 표준 활동 계수를 적용합니다.',
    formulaHeader: '계산 공식',
    formulaBody: 'BMR (남): 10×체중(kg) + 6.25×키(cm) − 5×나이 + 5\nBMR (여): 10×체중(kg) + 6.25×키(cm) − 5×나이 − 161\nTDEE: BMR × 활동 계수 (1.2 ~ 1.9)',
  },
  en: {
    pageTitle: 'BMR + TDEE Calculator — Daily Calorie Needs',
    pageIntro: 'Enter sex, age, weight, height, and activity to get your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation — the basis for any cut, maintenance, or bulk plan.',
    sex: 'Sex', male: 'Male', female: 'Female',
    age: 'Age', weight: 'Weight', height: 'Height',
    units: 'Units', metric: 'Metric (kg/cm)', imperial: 'Imperial (lb/ft)',
    activity: 'Activity level',
    activityLevels: { sedentary: 'Sedentary (little or no exercise)', light: 'Light (1–3 days/week)', moderate: 'Moderate (3–5 days/week)', active: 'Active (6–7 days/week)', very_active: 'Very active (2×/day or physical job)' },
    calculate: 'Calculate',
    result: 'Result',
    bmrLabel: 'BMR (Basal Metabolic Rate)',
    tdeeLabel: 'TDEE (Total Daily Energy)',
    bmrHelp: 'The minimum daily energy your body needs at rest to keep core functions running.',
    tdeeHelp: 'Total calories burned per day including activity. Use this as the baseline for cut/maintain/bulk targets.',
    feet: 'ft', inches: 'in',
    aboutHeader: 'About this calculator',
    aboutBody: 'The Mifflin-St Jeor equation (1990) is the most accurate BMR estimator without lab equipment and is recommended by ACSM and ISSN. TDEE applies the standard WHO/IOM physical-activity multipliers.',
    formulaHeader: 'Formula',
    formulaBody: 'BMR (male): 10×kg + 6.25×cm − 5×age + 5\nBMR (female): 10×kg + 6.25×cm − 5×age − 161\nTDEE: BMR × activity factor (1.2 to 1.9)',
  },
  ja: {
    pageTitle: '基礎代謝量(BMR)＋一日総消費カロリー(TDEE)計算機',
    pageIntro: '性別・年齢・体重・身長・活動量を入力すると、Mifflin-St Jeor式でBMRとTDEEを計算します。ダイエットや増量目標設定の基準値です。',
    sex: '性別', male: '男性', female: '女性',
    age: '年齢', weight: '体重', height: '身長',
    units: '単位', metric: 'メートル法(kg/cm)', imperial: 'ヤードポンド法(lb/ft)',
    activity: '活動レベル',
    activityLevels: { sedentary: '座位中心(運動ほぼなし)', light: '軽い運動(週1〜3回)', moderate: '中程度(週3〜5回)', active: '活発(週6〜7回)', very_active: '非常に活発(1日2回または肉体労働)' },
    calculate: '計算する',
    result: '結果',
    bmrLabel: 'BMR (基礎代謝量)',
    tdeeLabel: 'TDEE (1日総消費)',
    bmrHelp: '安静時に生命維持のために必要な1日の最低エネルギー量。',
    tdeeHelp: '活動量を含む1日の総消費カロリー。ダイエット・増量目標の基準値です。',
    feet: 'フィート', inches: 'インチ',
    aboutHeader: 'この計算機について',
    aboutBody: 'Mifflin-St Jeor式(1990)は、検査機器なしで最も正確なBMR推定式とされ、ACSMとISSNが推奨しています。TDEEはWHO/IOMの標準活動係数を適用します。',
    formulaHeader: '計算式',
    formulaBody: 'BMR (男性): 10×kg + 6.25×cm − 5×年齢 + 5\nBMR (女性): 10×kg + 6.25×cm − 5×年齢 − 161\nTDEE: BMR × 活動係数 (1.2 〜 1.9)',
  },
  zh: {
    pageTitle: '基础代谢率(BMR)+ 每日总消耗(TDEE)计算器',
    pageIntro: '输入性别、年龄、体重、身高和活动量,使用 Mifflin-St Jeor 公式计算 BMR 和 TDEE — 减脂、维持、增肌目标的基础数据。',
    sex: '性别', male: '男', female: '女',
    age: '年龄', weight: '体重', height: '身高',
    units: '单位', metric: '公制(kg/cm)', imperial: '英制(lb/ft)',
    activity: '活动量',
    activityLevels: { sedentary: '久坐(几乎不运动)', light: '轻度(每周1–3次)', moderate: '中等(每周3–5次)', active: '活跃(每周6–7次)', very_active: '非常活跃(每日2次或体力劳动)' },
    calculate: '计算',
    result: '结果',
    bmrLabel: 'BMR (基础代谢率)',
    tdeeLabel: 'TDEE (每日总消耗)',
    bmrHelp: '静息状态下,身体维持基本功能所需的最低每日能量。',
    tdeeHelp: '包含活动量的每日总消耗。这是设定减脂/维持/增肌目标的基线。',
    feet: '英尺', inches: '英寸',
    aboutHeader: '关于本计算器',
    aboutBody: 'Mifflin-St Jeor 公式(1990)是无需仪器条件下最准确的 BMR 估算法,ACSM 和 ISSN 均推荐。TDEE 采用 WHO/IOM 标准活动系数。',
    formulaHeader: '计算公式',
    formulaBody: 'BMR (男): 10×kg + 6.25×cm − 5×年龄 + 5\nBMR (女): 10×kg + 6.25×cm − 5×年龄 − 161\nTDEE: BMR × 活动系数 (1.2 ~ 1.9)',
  },
  'zh-tw': {
    pageTitle: '基礎代謝率(BMR)＋每日總消耗(TDEE)計算機',
    pageIntro: '輸入性別、年齡、體重、身高和活動量,使用 Mifflin-St Jeor 公式計算 BMR 和 TDEE — 減脂、維持、增肌目標的基礎數據。',
    sex: '性別', male: '男', female: '女',
    age: '年齡', weight: '體重', height: '身高',
    units: '單位', metric: '公制(kg/cm)', imperial: '英制(lb/ft)',
    activity: '活動量',
    activityLevels: { sedentary: '久坐(幾乎不運動)', light: '輕度(每週1–3次)', moderate: '中等(每週3–5次)', active: '活躍(每週6–7次)', very_active: '非常活躍(每日2次或體力勞動)' },
    calculate: '計算',
    result: '結果',
    bmrLabel: 'BMR (基礎代謝率)',
    tdeeLabel: 'TDEE (每日總消耗)',
    bmrHelp: '靜息狀態下,身體維持基本功能所需的最低每日能量。',
    tdeeHelp: '包含活動量的每日總消耗。這是設定減脂/維持/增肌目標的基線。',
    feet: '英尺', inches: '英寸',
    aboutHeader: '關於本計算機',
    aboutBody: 'Mifflin-St Jeor 公式(1990)是無需儀器條件下最準確的 BMR 估算法,ACSM 與 ISSN 均推薦。TDEE 採用 WHO/IOM 標準活動係數。',
    formulaHeader: '計算公式',
    formulaBody: 'BMR (男): 10×kg + 6.25×cm − 5×年齡 + 5\nBMR (女): 10×kg + 6.25×cm − 5×年齡 − 161\nTDEE: BMR × 活動係數 (1.2 ~ 1.9)',
  },
  es: {
    pageTitle: 'Calculadora de TMB + TDEE (calorías diarias)',
    pageIntro: 'Introduce sexo, edad, peso, altura y actividad para obtener tu Tasa Metabólica Basal (TMB) y el Gasto Energético Total Diario (TDEE) con la ecuación de Mifflin-St Jeor — la base de cualquier déficit, mantenimiento o superávit calórico.',
    sex: 'Sexo', male: 'Hombre', female: 'Mujer',
    age: 'Edad', weight: 'Peso', height: 'Altura',
    units: 'Unidades', metric: 'Métrico (kg/cm)', imperial: 'Imperial (lb/ft)',
    activity: 'Nivel de actividad',
    activityLevels: { sedentary: 'Sedentario (poco o ningún ejercicio)', light: 'Ligero (1–3 días/semana)', moderate: 'Moderado (3–5 días/semana)', active: 'Activo (6–7 días/semana)', very_active: 'Muy activo (2×/día o trabajo físico)' },
    calculate: 'Calcular',
    result: 'Resultado',
    bmrLabel: 'TMB (Tasa Metabólica Basal)',
    tdeeLabel: 'TDEE (Gasto Total Diario)',
    bmrHelp: 'Energía mínima diaria que tu cuerpo necesita en reposo para mantener las funciones vitales.',
    tdeeHelp: 'Calorías totales quemadas al día incluyendo actividad. Usa esto como base para tus objetivos.',
    feet: 'pies', inches: 'pulgadas',
    aboutHeader: 'Sobre esta calculadora',
    aboutBody: 'La ecuación de Mifflin-St Jeor (1990) es la estimación de TMB más precisa sin equipo de laboratorio y es recomendada por ACSM e ISSN. TDEE aplica los multiplicadores estándar de actividad de la OMS/IOM.',
    formulaHeader: 'Fórmula',
    formulaBody: 'TMB (hombre): 10×kg + 6.25×cm − 5×edad + 5\nTMB (mujer): 10×kg + 6.25×cm − 5×edad − 161\nTDEE: TMB × factor de actividad (1.2 a 1.9)',
  },
};
