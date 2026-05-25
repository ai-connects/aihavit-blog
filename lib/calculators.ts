/**
 * Wellness calculators — pure formula helpers (no UI / no I/O).
 *
 * References:
 *   - BMR: Mifflin-St Jeor (1990), the most accurate non-DEXA equation
 *   - TDEE: BMR × PAL factor (WHO/IOM standard activity multipliers)
 *   - Protein: ISSN 2017 position stand on protein and exercise
 *   - Water: NAM 2004 adequate intake + activity adjustment
 */

export type Sex = 'male' | 'female';
export type Unit = 'metric' | 'imperial';

export interface BMRInput {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
}

export function bmrMifflinStJeor({ sex, weightKg, heightCm, age }: BMRInput): number {
  const s = sex === 'male' ? 5 : -161;
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + s);
}

export type ActivityLevel =
  | 'sedentary'    // desk job, little/no exercise
  | 'light'        // 1–3 days/week light exercise
  | 'moderate'     // 3–5 days/week moderate exercise
  | 'active'       // 6–7 days/week
  | 'very_active'; // 2×/day, heavy training or physical job

export const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function tdee(bmr: number, level: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIER[level]);
}

export type Goal = 'cut' | 'maintain' | 'bulk';
export const GOAL_CALORIE_DELTA: Record<Goal, number> = {
  cut: -500,        // ~0.5 kg/week loss
  maintain: 0,
  bulk: 300,        // ~0.25 kg/week gain (lean)
};

export function targetCalories(tdeeKcal: number, goal: Goal): number {
  return tdeeKcal + GOAL_CALORIE_DELTA[goal];
}

/* ─── unit conversion helpers ─── */
export const lbToKg = (lb: number) => lb * 0.45359237;
export const kgToLb = (kg: number) => kg / 0.45359237;
export const inToCm = (inch: number) => inch * 2.54;
export const ftInToCm = (ft: number, inch: number) => (ft * 12 + inch) * 2.54;
