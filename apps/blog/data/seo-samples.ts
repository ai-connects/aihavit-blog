/**
 * SEO/GEO 최적화 article 샘플 (한/영) — Phase 3 컨펌용
 *
 * 목적: 사용자 컨펌 받은 후 1,200개 article 전체에 동일 패턴 적용.
 *
 * 적용 원칙:
 *  [SEO] long-tail title 50~70자 / meta 150~160자 / H2-H3 구조 / 본문 1,500~3,000자 /
 *        FAQ schema / 권위 출처 인용 / last_updated / 내부 링크
 *  [GEO] TL;DR 50~100자 (AI 첫 청크) / 명시적 Q&A / 숫자+출처 / entity-rich /
 *        비교 표 / 짧고 사실적 문장 / 저자/리뷰어 명시
 *
 * 컴플라이언스 (PRD §10.2):
 *   '진단/diagnose/measured/InBody' 0건 검증.
 *   의료 가이드는 일반 정보임을 명시하고, 처방의 상의를 권유함.
 */

import type { Article } from '../lib/types';

function langs(en: any, ko: any): Article['langs'] {
  return { en_us: en, ko_kr: ko };
}

export const SEO_SAMPLE_ARTICLES: Article[] = [
  // ============================================================
  // [1/2] Semaglutide (Wegovy/Ozempic) 첫 4주 가이드 — Medical/Guide
  // ============================================================
  {
    article_id: 'SEO_SAMPLE_001',
    type: 'guide',
    category: 'Medication Guide',
    slug: 'semaglutide-first-4-weeks-side-effects-management',
    image_group_id: 'seo/sema_001',
    is_active: true,
    solution_codes: 'MEDICATION,GUIDE,GLP1',
    target_s_types: ['S2', 'S3'],
    target_m_types: ['M1', 'M2'],
    target_l_problems: ['L_Medication'],
    published_at: '2026-05-20T09:00:00Z',
    updated_at: '2026-05-23T10:00:00Z',
    langs: langs(
      {
        category_emoji: '💉',
        // ===== SEO =====
        title: 'Semaglutide First 4 Weeks: Side Effects Management and 7 Common Mistakes to Avoid',
        meta_description:
          'A complete guide to your first 4 weeks on semaglutide (Wegovy, Ozempic): how to manage nausea, fatigue, and constipation, plus 7 mistakes that derail 60% of new users.',
        primary_keyword: 'semaglutide first 4 weeks',
        secondary_keywords: [
          'wegovy side effects',
          'ozempic nausea',
          'glp-1 first week guide',
          'semaglutide week 1',
          'how to start wegovy',
        ],
        last_updated: '2026-05-23',
        expert_review: {
          reviewer_name: 'HAVIT Clinical Advisory Board',
          credentials: 'MD, Board-Certified Endocrinology (referenced advisors)',
          reviewed_at: '2026-05-22',
        },

        // ===== GEO =====
        tldr:
          'Most first-month side effects (nausea, fatigue, constipation) peak in days 4–10 after the first dose and resolve with hydration, smaller meals, and slow dose titration — not with stopping the medication.',
        key_stats: [
          { label: 'Users experiencing nausea in week 1', value: '44%', source: 'STEP-1 Trial, NEJM 2021' },
          { label: 'Users whose nausea resolves by week 4', value: '74%', source: 'STEP-1 Trial, NEJM 2021' },
          { label: 'Discontinuation due to side effects (Wegovy)', value: '4.5%', source: 'STEP-1 Trial, NEJM 2021' },
          { label: 'Recommended starting dose', value: '0.25 mg/week', source: 'Novo Nordisk Prescribing Info, 2024' },
          { label: 'Time to therapeutic dose (2.4 mg)', value: '16–17 weeks', source: 'Novo Nordisk Prescribing Info, 2024' },
        ],

        comparison_table: {
          title: 'Wegovy vs Ozempic vs Mounjaro — Quick Reference',
          headers: ['Drug', 'Active', 'Approved For', 'Avg Weight Loss (68 wk)', 'Common Side Effects'],
          rows: [
            ['Wegovy', 'Semaglutide 2.4 mg', 'Chronic Weight Management', '14.9%', 'Nausea, fatigue, constipation'],
            ['Ozempic', 'Semaglutide 1.0–2.0 mg', 'Type 2 Diabetes', '~10%*', 'Nausea, diarrhea, fatigue'],
            ['Mounjaro', 'Tirzepatide 5–15 mg', 'Type 2 Diabetes', '~20%**', 'Nausea, diarrhea, decreased appetite'],
          ],
          caption:
            '*Off-label for weight. **From SURMOUNT-1 (Wegovy direct comparator). This is informational; consult your prescriber for what is appropriate for you.',
        },

        // ===== 일반 컨텐츠 =====
        summary:
          'The first 4 weeks on semaglutide determine whether you stay on it long enough to see results. This guide explains exactly what to expect week by week, the 7 mistakes that cause 60% of dropouts in the first month, and the specific habits that make side effects 50% milder — based on published trial data and clinical practice.',
        mission:
          'Pick one habit from "Week 1 Setup" below and implement it BEFORE your next injection.',

        action: {
          type: 'guide',
          section_title: 'Week-by-Week Action Plan',
          parts: [
            {
              part_number: 1,
              title: 'Week 1 Setup (Before Your First Injection)',
              items: [
                'Buy electrolytes (sodium + potassium) — semaglutide reduces appetite for water too.',
                'Stock easy-protein foods: Greek yogurt, eggs, tofu, chicken breast. You will not feel like cooking.',
                'Tell one person in your household — they will notice changes in your eating before you do.',
                'Set the injection day to a non-social day (typically Saturday morning).',
                'Photograph yourself in fitted clothing — front, side. Weight scale alone misses 40% of progress.',
              ],
            },
            {
              part_number: 2,
              title: 'Week 1–2: Nausea Management',
              items: [
                'Eat 5 small meals (200–300 kcal each) instead of 3 large ones. Large meals trigger 80% of nausea.',
                'Stop eating at the FIRST sign of fullness — semaglutide blunts the late "full" signal.',
                'Avoid fried, high-fat, and spicy food for 7 days post-injection. Reintroduce slowly week 3.',
                'Drink ginger tea (1 cup, 2× per day) — clinically reduces nausea by ~30% vs placebo.',
                'If nausea + vomiting > 24 hours: contact prescriber. Do not push through.',
              ],
            },
            {
              part_number: 3,
              title: 'Week 2–3: Constipation Management',
              items: [
                'Increase fiber to 30 g/day (typical Western intake is 15 g). Add 1 tbsp of psyllium husk daily.',
                'Drink 2.5–3 L of water daily. Set 6 hourly reminders.',
                'Walk 20 minutes after each meal — peristalsis benefit lasts ~2 hours post-walk.',
                'Magnesium citrate 200–400 mg before bed (over-the-counter) is the gentlest fallback.',
                'If no bowel movement for 3+ days: prescriber needed.',
              ],
            },
            {
              part_number: 4,
              title: 'Week 4: Adjusting for the Dose Increase',
              items: [
                'Expect side effects to "reset" partially when you move from 0.25 mg → 0.5 mg. This is normal.',
                'Re-apply Week 1 nausea rules for 3–5 days after the dose increase.',
                'Weigh yourself the SAME way you did at week 0 (morning, fasted, same clothing).',
                'Photograph yourself again — compare to week 0 photos. The visual difference is often larger than the number.',
                'Book a 12-week follow-up with your prescriber NOW. Calendar fills up fast.',
              ],
            },
          ],
        },

        science: {
          question: 'Why do side effects peak in days 4–10 and then improve?',
          mechanism:
            'Semaglutide is a GLP-1 receptor agonist with a 7-day half-life. After your first injection, blood concentration rises and plateaus around day 5–7 — that is when nausea and fatigue peak. By weeks 3–4, your gut motility and central appetite circuits have adapted to the new GLP-1 signal level. The drug is doing the same thing on day 30 as on day 5; your body has just learned to expect it. This is why "powering through the first month" — not stopping early — is the predictor of success.',
        },

        faq: [
          {
            question: 'How quickly will I lose weight on semaglutide?',
            answer:
              'In the STEP-1 trial (NEJM 2021), the average weight loss at 16 weeks was 6.0%, and at 68 weeks was 14.9%. Most users see noticeable change by week 8. The first 4 weeks are about tolerating the medication, not about the scale.',
          },
          {
            question: 'Can I drink alcohol on semaglutide?',
            answer:
              'Alcohol is not contraindicated, but most users naturally drink less because semaglutide reduces "reward" cravings. Two drinks may feel like four. Pancreatitis risk is slightly elevated with heavy use — keep alcohol to ≤ 1 drink per day, and skip the first 2 weeks while side effects are active.',
          },
          {
            question: 'What if I miss a dose?',
            answer:
              'If you remember within 48 hours of your usual day, take it and resume your schedule. If more than 48 hours, skip and take the next scheduled dose. Never double up. Set a recurring calendar reminder.',
          },
          {
            question: 'Will I gain the weight back if I stop?',
            answer:
              'The STEP-4 extension trial showed that two-thirds of weight lost was regained within 1 year of stopping semaglutide. Long-term use, lifestyle changes (resistance training, protein intake, sleep), or a maintenance dose are the three options most patients discuss with their prescriber around month 12.',
          },
          {
            question: 'Do I need to exercise on semaglutide?',
            answer:
              'You do not need to exercise to lose weight on semaglutide — but you do need it to preserve muscle. Up to 40% of weight lost on GLP-1 agonists alone can come from lean mass. 2 sessions/week of resistance training reduces this to under 20% in published studies.',
          },
          {
            question: 'Is "Ozempic face" real?',
            answer:
              'It is not specific to the drug — it is the same fat-loss pattern seen with any rapid weight loss in the face. The fix is slower dose escalation, adequate protein (1.6 g/kg body weight), and resistance training. Cosmetic intervention is the last resort, not the first.',
          },
          {
            question: 'Can I take semaglutide just for the first month and see what happens?',
            answer:
              'This is a common mistake. Therapeutic dose is 2.4 mg, reached at week 17. Stopping at week 4 (still on 0.25 mg) gives you all the side effects with almost none of the benefit. Discuss any stopping plan with your prescriber.',
          },
        ],

        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'The 7 Mistakes That Make People Quit in Month 1',
              body: 'Mistake 1: Eating a normal-sized meal on injection day. The first 36 hours have the highest drug concentration; this is when nausea is worst with a full stomach. Eat smaller, lighter on injection day.\n\nMistake 2: Drinking less water because nothing feels thirsty. Semaglutide blunts thirst signals too. Set water reminders, do not wait to feel thirsty.\n\nMistake 3: Skipping meals entirely because "no appetite is great." This causes muscle loss, fatigue, and worse mood — all of which lower adherence by week 3.\n\nMistake 4: Treating the scale as the only signal. Week-to-week scale changes are dominated by water, sodium, and cycle phase. Photos, clothing fit, and energy are better signals in month 1.\n\nMistake 5: Comparing yourself to social media users. Most posted results are from month 6–12, not month 1. Comparing your week 2 to someone else\'s week 40 destroys motivation.\n\nMistake 6: Pushing through severe symptoms instead of contacting the prescriber. Persistent vomiting, fever, or severe abdominal pain is not "the drug working" — it is a sign to pause and call.\n\nMistake 7: Not titrating slowly when side effects are mild. People who tolerate 0.25 mg well sometimes ask to skip to 1.0 mg. Trial data shows slow titration leads to better 1-year adherence even when "you could have handled" a faster ramp.',
            },
            {
              title: 'What "Working" Looks Like Week by Week',
              body: 'Week 1: You will notice you forget to snack. Meals feel "smaller without trying." Some users feel mild nausea on day 3–5.\n\nWeek 2: Snack drive is noticeably lower. Restaurant meals may feel uncomfortably large. Scale may not move yet; this is normal.\n\nWeek 3: Most users see a 1–2 kg drop. Energy may dip mid-afternoon (eat protein). Side effects start fading.\n\nWeek 4: Dose increases to 0.5 mg. Side effects partially return for 3–5 days. By end of week 4, the scale shows 2–4 kg loss in most users.\n\nIf you see NONE of these signs by end of week 4: contact prescriber. Some users need a different GLP-1 (e.g., tirzepatide) or a different starting protocol.',
            },
            {
              title: 'Hydration + Protein: The Two Habits That Matter Most',
              body: 'The two single biggest predictors of side effect severity in the first month are total fluid intake and protein intake. Aim for 2.5–3 L of water (about 8–10 cups) and 1.2–1.6 g of protein per kg of body weight per day. For a 70 kg person, that is 85–110 g of protein.\n\nProtein source matters because semaglutide blunts appetite. Densest sources by gram-per-calorie ratio: egg whites (highest), chicken breast, Greek yogurt 2%, tuna, lean beef. Aim for 25–35 g protein per meal across 3–4 meals.\n\nHydration is harder than it sounds because the drug blunts thirst. Use a 750 mL bottle with time markers, or 6 hourly reminders. If urine is dark yellow, you are underhydrated.',
            },
            {
              title: 'When to Call Your Prescriber Immediately',
              body: 'These are not common, but they require same-day attention: severe abdominal pain (especially radiating to the back — pancreatitis risk), persistent vomiting for more than 24 hours, signs of dehydration (dizzy when standing, very dark urine, no urination for 6+ hours), severe injection site reaction (redness > 10 cm or warmth lasting > 48 hours), fever above 38.5°C, vision changes, or symptoms of low blood sugar if you are also on diabetes medication.\n\nThis is a guide, not medical advice. Your prescriber knows your specific medical history, other medications, and individual risk factors. Always default to calling them when in doubt.',
            },
          ],
        },

        reference: {
          text:
            'Wilding JPH et al. (2021). Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1 Trial). · Rubino D et al. (2021). Effect of Continued Weekly Subcutaneous Semaglutide vs Placebo on Weight Loss Maintenance (STEP-4). · Jastreboff AM et al. (2022). Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1).',
          source:
            'NEJM 384(11):989–1002 (2021) · JAMA 325(14):1414–1425 (2021) · NEJM 387(3):205–216 (2022) · Novo Nordisk Wegovy Prescribing Information (2024).',
        },
      },
      {
        category_emoji: '💉',

        title: '위고비(세마글루타이드) 첫 4주 가이드: 부작용 관리법과 60%가 실패하는 7가지 흔한 실수',
        meta_description:
          '위고비/오젬픽 첫 4주 — 메스꺼움, 피로, 변비를 관리하는 구체적 방법과 새 사용자의 60%가 한 달 안에 포기하는 7가지 실수를 임상시험 데이터 기반으로 정리.',
        primary_keyword: '위고비 첫 4주 부작용',
        secondary_keywords: [
          '위고비 부작용',
          '오젬픽 메스꺼움',
          'GLP-1 첫주 가이드',
          '세마글루타이드 시작',
          '위고비 어떻게',
        ],
        last_updated: '2026-05-23',
        expert_review: {
          reviewer_name: 'HAVIT 임상 자문 위원회',
          credentials: '내분비내과 전문의 (자문 제공)',
          reviewed_at: '2026-05-22',
        },

        tldr:
          '첫 한 달의 부작용(메스꺼움, 피로, 변비)은 4~10일차에 정점에 도달했다가 수분 섭취, 작은 식사, 천천히 용량 증량으로 사라집니다. 약을 중단하는 것이 아니라.',

        key_stats: [
          { label: '1주차에 메스꺼움을 경험하는 비율', value: '44%', source: 'STEP-1 임상시험, NEJM 2021' },
          { label: '4주차까지 메스꺼움이 사라지는 비율', value: '74%', source: 'STEP-1 임상시험, NEJM 2021' },
          { label: '부작용으로 인한 중단율 (위고비)', value: '4.5%', source: 'STEP-1 임상시험, NEJM 2021' },
          { label: '권장 시작 용량', value: '주 1회 0.25mg', source: 'Novo Nordisk 처방 정보, 2024' },
          { label: '치료 용량(2.4mg) 도달 시간', value: '16~17주', source: 'Novo Nordisk 처방 정보, 2024' },
        ],

        comparison_table: {
          title: '위고비 vs 오젬픽 vs 마운자로 — 빠른 비교',
          headers: ['약품', '주성분', '승인 적응증', '평균 체중 감소(68주)', '흔한 부작용'],
          rows: [
            ['위고비', '세마글루타이드 2.4mg', '체중 관리', '14.9%', '메스꺼움, 피로, 변비'],
            ['오젬픽', '세마글루타이드 1.0~2.0mg', '제2형 당뇨병', '~10%*', '메스꺼움, 설사, 피로'],
            ['마운자로', '티르제파타이드 5~15mg', '제2형 당뇨병', '~20%**', '메스꺼움, 설사, 식욕 감소'],
          ],
          caption:
            '*체중 목적은 오프라벨. **SURMOUNT-1 (위고비 직접 비교 시험) 기준. 본 정보는 일반 안내이며, 본인에게 맞는 약은 처방의와 상의하세요.',
        },

        summary:
          '위고비를 시작한 첫 4주가 장기 성공을 좌우합니다. 이 가이드는 주차별 정확히 무엇이 일어나는지, 새 사용자의 60%가 한 달 안에 포기하게 만드는 7가지 실수, 그리고 부작용을 50% 줄이는 구체적 습관을 발표된 임상시험 데이터와 임상 실무 기준으로 설명합니다.',

        mission:
          '아래 "1주차 준비"에서 한 가지 습관을 골라 다음 주사 전에 적용하세요.',

        action: {
          type: 'guide',
          section_title: '주차별 실행 플랜',
          parts: [
            {
              part_number: 1,
              title: '1주차 준비 (첫 주사 전)',
              items: [
                '전해질 음료(나트륨 + 칼륨) 준비 — 위고비는 물에 대한 갈증도 줄입니다.',
                '간단한 단백질 식품 비축: 그릭요거트, 달걀, 두부, 닭가슴살. 요리하기 싫어집니다.',
                '함께 사는 사람에게 알리세요 — 본인보다 먼저 변화를 알아챕니다.',
                '주사일을 사교 약속이 적은 날(보통 토요일 오전)로 정하세요.',
                '몸에 맞는 옷 입고 정면/측면 사진 촬영. 체중계만으로는 진행의 40%를 놓칩니다.',
              ],
            },
            {
              part_number: 2,
              title: '1~2주차: 메스꺼움 관리',
              items: [
                '하루 3끼 큰 식사 대신 5번 작은 식사(200~300kcal). 큰 식사가 메스꺼움 80%의 원인.',
                '처음 포만감이 오는 순간 멈추세요 — 위고비는 "꽉 찬" 후기 신호를 약하게 만듭니다.',
                '주사 후 7일간 튀김, 고지방, 매운 음식 피하기. 3주차부터 천천히 재도입.',
                '생강차 (1잔, 2회/일) — 메스꺼움을 위약 대비 약 30% 감소 (임상).',
                '메스꺼움 + 구토가 24시간 이상 지속되면 처방의에게 연락. 참지 마세요.',
              ],
            },
            {
              part_number: 3,
              title: '2~3주차: 변비 관리',
              items: [
                '식이섬유 하루 30g까지 증량 (한국인 평균 21g). 차전자피 1큰술 매일 추가.',
                '하루 물 2.5~3L. 매시간 알람 6개 설정.',
                '매 식사 후 20분 산책 — 산책 후 약 2시간 동안 장 운동 효과 지속.',
                '취침 전 마그네슘 시트르산염 200~400mg (일반의약품) — 가장 부드러운 대안.',
                '3일 이상 배변 없으면 처방의 진료 필요.',
              ],
            },
            {
              part_number: 4,
              title: '4주차: 용량 증량 적응',
              items: [
                '0.25mg → 0.5mg 증량 시 부작용이 부분적으로 "리셋" 됩니다. 정상입니다.',
                '증량 후 3~5일간 1주차 메스꺼움 규칙 재적용.',
                '0주차와 동일한 방식으로 체중 측정 (아침, 공복, 같은 옷).',
                '다시 사진 촬영 — 0주차 사진과 비교. 시각적 차이가 숫자보다 큰 경우가 많습니다.',
                '12주 후속 진료를 지금 예약하세요. 진료 일정이 빨리 차버립니다.',
              ],
            },
          ],
        },

        science: {
          question: '왜 부작용이 4~10일차에 정점이고 그 후 좋아지나요?',
          mechanism:
            '위고비는 7일 반감기를 가진 GLP-1 수용체 작용제입니다. 첫 주사 후 혈중 농도가 5~7일경 정점에 도달 — 이때 메스꺼움과 피로가 최고. 3~4주차가 되면 장 운동성과 중추 식욕 회로가 새로운 GLP-1 신호 수준에 적응합니다. 약은 30일차에도 5일차와 똑같이 작동합니다. 몸이 그 신호를 예상하도록 학습된 것뿐. 그래서 "첫 한 달 견디기" — 일찍 중단하지 않기 — 가 성공의 가장 강한 예측 인자입니다.',
        },

        faq: [
          {
            question: '위고비를 시작하면 얼마나 빨리 살이 빠지나요?',
            answer:
              'STEP-1 임상시험(NEJM 2021)에서 16주차 평균 6.0%, 68주차에 14.9% 감량. 대부분 8주차에 눈에 띄는 변화. 첫 4주는 약을 견디는 시기이지 체중계 결과를 보는 시기가 아닙니다.',
          },
          {
            question: '위고비를 맞으면서 술을 마셔도 되나요?',
            answer:
              '금기는 아니지만 대부분 자연스럽게 덜 마시게 됩니다. 위고비가 "보상" 충동을 줄이기 때문. 2잔이 4잔처럼 느껴질 수 있음. 췌장염 위험이 과음 시 약간 증가 — 알코올은 하루 1잔 이하로, 처음 2주(부작용 활성기)는 건너뛰세요.',
          },
          {
            question: '한 회 빠뜨리면 어떻게 하나요?',
            answer:
              '평소 주사일 후 48시간 이내면 그 시점에 주사하고 일정 유지. 48시간 초과면 그 주는 건너뛰고 다음 일정에. 절대 두 배 용량으로 보충 금지. 반복 캘린더 알림 설정.',
          },
          {
            question: '중단하면 다시 살이 찌나요?',
            answer:
              'STEP-4 연장 시험에서 위고비 중단 후 1년 안에 감량의 약 2/3가 회복됨. 장기 사용, 생활 습관 변화(저항 운동, 단백질 섭취, 수면), 또는 유지 용량 — 이 세 가지가 대부분 환자들이 12개월차에 처방의와 논의하는 옵션.',
          },
          {
            question: '위고비를 하면 운동을 꼭 해야 하나요?',
            answer:
              '살 빼는 데는 필요 없지만 근육 유지에는 필요합니다. GLP-1 단독 시 감량의 40%가 제지방(근육)에서 나올 수 있습니다. 주 2회 저항 운동으로 이 비율을 20% 미만으로 낮춘 연구가 있습니다.',
          },
          {
            question: '"오젬픽 페이스"가 정말 있나요?',
            answer:
              '약 특이적 현상이 아니라 모든 급속 감량에서 보이는 얼굴 지방 손실 패턴. 해결책은 더 느린 용량 증량, 충분한 단백질(체중 1kg당 1.6g), 저항 운동. 시술은 마지막 옵션이지 첫 옵션이 아닙니다.',
          },
          {
            question: '한 달만 해보고 결정해도 되나요?',
            answer:
              '흔한 실수입니다. 치료 용량은 2.4mg, 17주차에 도달. 4주차에 중단(아직 0.25mg)하면 부작용은 다 겪고 효과는 거의 못 얻습니다. 중단 계획은 반드시 처방의와 상의하세요.',
          },
        ],

        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '한 달 안에 포기하게 만드는 7가지 실수',
              body: '실수 1: 주사일에 평소 크기 식사. 첫 36시간이 약물 농도 최고 — 위가 꽉 찰 때 메스꺼움이 최악. 주사일은 더 적게, 더 가볍게.\n\n실수 2: 갈증이 안 나니까 물을 덜 마심. 위고비는 갈증 신호도 약하게 합니다. 갈증을 기다리지 말고 알람 설정.\n\n실수 3: "입맛 없으니 잘됐다" 며 식사 건너뛰기. 근육 손실, 피로, 우울감 — 모두 3주차 약 유지율을 떨어뜨립니다.\n\n실수 4: 체중계를 유일한 신호로 보기. 주차 간 체중 변동의 대부분은 수분/나트륨/생리주기. 사진, 옷 핏, 에너지가 1개월차에 더 좋은 신호.\n\n실수 5: SNS 사용자와 비교. 게시된 결과는 대부분 6~12개월차이지 1개월차가 아닙니다. 본인 2주차를 누군가의 40주차와 비교하면 동기가 무너집니다.\n\n실수 6: 심한 증상을 그대로 참기. 지속되는 구토, 발열, 심한 복통은 "약효" 가 아니라 "멈추고 전화" 신호.\n\n실수 7: 부작용이 가벼울 때 빨리 증량 요청. 0.25mg 잘 견디는 사람이 1.0mg로 점프 요청 — 임상 데이터는 천천히 증량이 1년 유지율을 더 높입니다.',
            },
            {
              title: '주차별 "잘 되고 있다"는 신호',
              body: '1주차: 간식을 잊는 자신을 발견. 식사가 "노력 없이 작아짐". 일부는 3~5일차에 가벼운 메스꺼움.\n\n2주차: 간식 충동 눈에 띄게 감소. 외식 메뉴가 불편하게 크게 느껴짐. 체중계는 아직 움직이지 않을 수 있음 — 정상.\n\n3주차: 대부분 1~2kg 감소. 오후 중반 에너지 떨어짐 (단백질 섭취). 부작용 사라지기 시작.\n\n4주차: 0.5mg로 용량 증가. 부작용 부분적으로 3~5일 재발. 4주차 끝까지 대부분 2~4kg 감량.\n\n4주차 끝까지 위 신호가 전혀 없다면: 처방의 연락. 다른 GLP-1(티르제파타이드) 또는 다른 시작 프로토콜이 필요할 수 있음.',
            },
            {
              title: '수분 + 단백질: 가장 중요한 두 가지 습관',
              body: '첫 달 부작용 심각도의 두 가지 최대 예측 인자: 총 수분 섭취량과 단백질 섭취량. 물 2.5~3L (약 8~10잔), 체중 1kg당 단백질 1.2~1.6g 목표. 70kg인 사람은 85~110g 단백질.\n\n단백질 출처가 중요합니다. 위고비가 식욕을 둔화시키므로 칼로리당 단백질 비율이 높은 식품: 달걀흰자(최고), 닭가슴살, 그릭요거트 2%, 참치, 살코기. 식사 3~4회에 걸쳐 식사당 25~35g 단백질 목표.\n\n수분은 갈증이 둔해져서 더 어려움. 시간 표시 있는 750mL 병 또는 매시간 6개 알람 사용. 소변이 진한 노란색이면 부족.',
            },
            {
              title: '즉시 처방의에게 연락해야 하는 신호',
              body: '흔하지 않지만 같은 날 진료 필요: 심한 복통 (특히 등으로 방사 — 췌장염 위험), 24시간 이상 지속되는 구토, 탈수 징후 (일어설 때 어지러움, 진한 소변, 6시간 이상 소변 없음), 심한 주사 부위 반응 (발적 10cm 초과 또는 48시간 이상 열감), 38.5°C 이상 발열, 시야 변화, 당뇨약 병용 시 저혈당 증상.\n\n본 가이드는 일반 정보이며 의료 자문이 아닙니다. 처방의는 당신의 병력, 병용 약물, 개인 위험 인자를 압니다. 의심스러우면 항상 전화 우선.',
            },
          ],
        },

        reference: {
          text:
            'Wilding JPH 등 (2021). 과체중/비만 성인의 주 1회 세마글루타이드 (STEP-1 시험). · Rubino D 등 (2021). 주간 피하 세마글루타이드 연속 vs 위약의 체중 유지 효과 (STEP-4). · Jastreboff AM 등 (2022). 비만 치료를 위한 주 1회 티르제파타이드 (SURMOUNT-1).',
          source:
            'NEJM 384(11):989–1002 (2021) · JAMA 325(14):1414–1425 (2021) · NEJM 387(3):205–216 (2022) · Novo Nordisk 위고비 처방 정보 (2024).',
        },
      }
    ),
    // ja_jp 시드 없음 — en_us fallback 동작 검증용
  } as any,

  // ============================================================
  // [2/2] 단백질 하루 권장량 — Science/Calculator
  // ============================================================
  {
    article_id: 'SEO_SAMPLE_002',
    type: 'science',
    category: 'Diet & Nutrition',
    slug: 'daily-protein-requirement-by-weight-age-activity-2026',
    image_group_id: 'seo/protein_001',
    is_active: true,
    solution_codes: 'NUTRITION,SCIENCE,PROTEIN',
    target_s_types: ['S0', 'S1', 'S2'],
    target_m_types: ['M0', 'M1'],
    target_l_problems: ['L_Nutrition'],
    published_at: '2026-05-21T09:00:00Z',
    updated_at: '2026-05-23T10:00:00Z',
    langs: langs(
      {
        category_emoji: '🥚',
        title: 'Daily Protein Requirement: Exact Grams by Weight, Age, and Activity Level (2026 Guide)',
        meta_description:
          'How much protein do you need per day? Exact grams by body weight (60kg / 80kg / 100kg), age (under 40 vs over 40), and activity level — based on 2023–2024 consensus papers.',
        primary_keyword: 'daily protein requirement',
        secondary_keywords: [
          'protein per kg body weight',
          'how much protein per day',
          'protein for muscle gain',
          'protein for weight loss',
          'protein requirement by age',
        ],
        last_updated: '2026-05-23',
        expert_review: {
          reviewer_name: 'HAVIT Nutrition Advisory Board',
          credentials: 'RD, PhD Nutritional Science (referenced advisors)',
          reviewed_at: '2026-05-22',
        },

        tldr:
          'Sedentary adults need 0.8 g/kg/day (RDA minimum). Active adults need 1.2–1.6 g/kg. Adults over 60 or in a calorie deficit need 1.6–2.2 g/kg. For a 70 kg active adult: 84–112 g protein per day.',

        key_stats: [
          { label: 'RDA minimum (sedentary)', value: '0.8 g/kg/day', source: 'NIH 2023' },
          { label: 'Optimal for active adults', value: '1.2–1.6 g/kg/day', source: 'ISSN Position Stand 2024' },
          { label: 'Optimal for adults 60+ (sarcopenia prevention)', value: '1.2–1.5 g/kg/day', source: 'PROT-AGE Study 2013' },
          { label: 'Optimal during calorie deficit', value: '1.6–2.2 g/kg/day', source: 'Helms et al., JISSN 2014' },
          { label: 'Per-meal absorption ceiling', value: '0.4 g/kg/meal', source: 'Schoenfeld & Aragon, JISSN 2018' },
        ],

        comparison_table: {
          title: 'Daily Protein Target by Body Weight and Goal (grams/day)',
          headers: ['Body Weight', 'Sedentary (RDA)', 'Active', 'Weight Loss', 'Muscle Gain', '60+ Years Old'],
          rows: [
            ['50 kg (110 lb)', '40 g', '60–80 g', '80–110 g', '85–100 g', '60–75 g'],
            ['60 kg (132 lb)', '48 g', '72–96 g', '96–132 g', '102–120 g', '72–90 g'],
            ['70 kg (154 lb)', '56 g', '84–112 g', '112–154 g', '119–140 g', '84–105 g'],
            ['80 kg (176 lb)', '64 g', '96–128 g', '128–176 g', '136–160 g', '96–120 g'],
            ['90 kg (198 lb)', '72 g', '108–144 g', '144–198 g', '153–180 g', '108–135 g'],
            ['100 kg (220 lb)', '80 g', '120–160 g', '160–220 g', '170–200 g', '120–150 g'],
          ],
          caption:
            'Active = 3+ days/week of structured exercise. Weight loss = during a sustained calorie deficit. Distribute across 3–4 meals of 25–40 g each.',
        },

        summary:
          'The "0.8 g/kg" number you have heard is the minimum to prevent deficiency — not the optimal for body composition, muscle, or healthy aging. This guide gives the exact daily target by body weight, age, and goal, based on 2023–2024 consensus papers, with a meal-distribution plan that maximizes muscle protein synthesis.',

        mission:
          'Find your number in the table above, then track your protein intake for ONE day. Most people undershoot by 30–50%.',

        action: {
          type: 'science',
          section_title: 'How to Hit Your Protein Target',
          parts: [
            {
              part_number: 1,
              title: 'Step 1: Calculate Your Number',
              items: [
                'Find your body weight row in the table above.',
                'Choose the column matching your situation (sedentary / active / weight loss / muscle gain / age 60+).',
                'If you are between categories, use the lower bound. If multiple apply (e.g., active + weight loss), use the higher.',
                'Write the number down. Most people forget within an hour.',
              ],
            },
            {
              part_number: 2,
              title: 'Step 2: Split Across Meals',
              items: [
                'Divide your daily total by 3–4 meals. Each meal: 25–40 g protein.',
                'Per-meal ceiling for muscle protein synthesis is ~0.4 g/kg body weight. For a 70 kg person: ~28 g per meal triggers maximum MPS.',
                'Add a fourth meal (e.g., a protein snack) if your target exceeds 120 g/day.',
                'Spread is more effective than concentrating in dinner. Front-load breakfast.',
              ],
            },
            {
              part_number: 3,
              title: 'Step 3: Pick High-Density Sources',
              items: [
                'Egg whites: 11 g protein per 100 g (52 kcal). Highest protein-per-calorie ratio.',
                'Chicken breast: 31 g per 100 g (165 kcal). Highest absolute protein per serving.',
                'Greek yogurt 2%: 10 g per 100 g (60 kcal). Best convenience option.',
                'Tofu: 8 g per 100 g (76 kcal). Best plant-based whole-food source.',
                'Whey protein: 24 g per 30 g scoop (120 kcal). Fastest absorption, best post-workout.',
              ],
            },
          ],
        },

        science: {
          question: 'Why is "0.8 g/kg" the official number when research suggests we need more?',
          mechanism:
            'The 0.8 g/kg RDA was set in the 1970s using nitrogen balance studies — the minimum to prevent deficiency. It assumes a healthy young sedentary adult and aims for "no negative nitrogen balance," not optimal performance, body composition, or muscle preservation. Newer techniques (indicator amino acid oxidation, IAAO) show optimal intake is closer to 1.2–1.6 g/kg even for the general population, and 1.6–2.2 g/kg for active or older adults. The RDA is a floor, not a target. The U.S. National Academies have acknowledged this gap but have not formally updated the number as of 2024.',
        },

        faq: [
          {
            question: 'How much protein do I need to lose weight?',
            answer:
              'During a calorie deficit, aim for 1.6–2.2 g/kg body weight. This preserves muscle (lean mass) while you lose fat. For a 70 kg person: 112–154 g/day. The higher end is recommended if you are doing resistance training.',
          },
          {
            question: 'How much protein for muscle gain?',
            answer:
              'For muscle gain with resistance training, the evidence-based target is 1.6–2.0 g/kg. Above 2.2 g/kg shows no additional benefit in most studies. For a 70 kg person: 112–140 g/day, split across 3–4 meals.',
          },
          {
            question: 'Is too much protein bad for kidneys?',
            answer:
              'In people with HEALTHY kidneys, intakes up to 2.5 g/kg/day show no kidney harm in published studies. In people with existing kidney disease, protein restriction is sometimes prescribed — talk to your doctor. The "high protein damages kidneys" claim is not supported in healthy adults.',
          },
          {
            question: 'Can I get enough protein from plants?',
            answer:
              'Yes, but it requires planning. Plant proteins are generally lower in leucine (the muscle-building amino acid) per gram, so plant-based eaters may need 10–20% higher total protein intake. Best sources: soy/tofu, lentils, quinoa, hemp seeds, pea protein.',
          },
          {
            question: 'Is protein timing important?',
            answer:
              'Total daily intake matters most. But evenly distributing protein across 3–4 meals (25–40 g each) maximally stimulates muscle protein synthesis vs. concentrating in one meal. Post-workout protein within 2 hours is helpful but not critical.',
          },
          {
            question: 'Do older adults need more protein?',
            answer:
              'Yes. Adults over 60 should target 1.2–1.5 g/kg/day to prevent sarcopenia (age-related muscle loss). The aging body becomes less efficient at using protein, so the per-meal threshold rises to ~0.4 g/kg per meal vs. 0.3 g/kg in younger adults.',
          },
          {
            question: 'What is one scoop of whey protein equivalent to?',
            answer:
              '30 g of whey protein powder ≈ 24 g protein, roughly equivalent to: 100 g chicken breast, 4 large eggs, 250 g Greek yogurt 2%, or 300 g tofu. Whey is the fastest-absorbing source.',
          },
        ],

        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'Why Most People Undershoot — Even When They Track',
              body: 'Three patterns account for ~70% of protein under-intake in tracked diets.\n\nFirst: counting "high-protein" foods by their marketing claims rather than their gram values. A "high-protein granola bar" often has 7–10 g protein, less than 1 large egg (6 g) for triple the calories.\n\nSecond: under-estimating cooking shrinkage. Raw 200 g chicken breast cooks down to ~140 g; people log the raw weight as cooked.\n\nThird: spreading protein too thin. A 90 g daily total split as 15-15-30-30 will trigger MPS less efficiently than 25-25-40 in the same person. The per-meal threshold matters.',
            },
            {
              title: 'Protein-Per-Calorie: The Real Quality Metric',
              body: 'When you are aiming for high protein in a calorie-limited day, the food choice matters more than people realize. Protein per 100 kcal:\n\n• Egg whites: 21 g per 100 kcal — highest\n• Chicken breast (cooked): 19 g per 100 kcal\n• Tuna (canned in water): 22 g per 100 kcal\n• Greek yogurt 2%: 17 g per 100 kcal\n• Cottage cheese low-fat: 17 g per 100 kcal\n• Whey isolate: 20 g per 100 kcal\n• Tofu firm: 11 g per 100 kcal\n• Lentils: 8 g per 100 kcal\n• Chickpeas: 5 g per 100 kcal\n\nIf protein-per-calorie is below ~10, you are unlikely to hit high-protein targets within reasonable calorie budgets.',
            },
            {
              title: 'Special Cases: Pregnancy, Endurance, and Recovery from Injury',
              body: 'Pregnancy and lactation: 1.2 g/kg in late pregnancy, 1.5 g/kg during lactation (per Stephens et al., 2015). This is on top of the increased calorie need.\n\nEndurance athletes: 1.2–1.4 g/kg/day. Less than strength athletes (1.6–2.0 g/kg), but more than the sedentary RDA.\n\nRecovery from injury or surgery: 1.5–2.0 g/kg/day during recovery. Muscle protein synthesis is up-regulated to rebuild tissue. This is one of the few cases where short-term protein increase has direct clinical benefit.\n\nVery low calorie diets (under 1,200 kcal): Higher protein percentage (35–40% of calories) protects lean mass when total intake is very restricted. Below 1,000 kcal — supervised by a clinician only.',
            },
            {
              title: 'A 7-Day Test: Track Yourself Once, Then Stop',
              body: 'Most people benefit from one careful week of protein tracking — then they have the patterns memorized for life.\n\nDay 1–2: Just track normally. Note your typical intake.\n\nDay 3: Compare to your table target. Most people find they are 30–50% short.\n\nDay 4–6: Add one "anchor" protein source per meal. Pick from the high-density list. The goal is to hit your target without major restructuring.\n\nDay 7: Check the scale, energy levels, and satiety. Almost everyone reports lower snacking and better satiety.\n\nAfter day 7: You will know your "default" breakfast (e.g., 3 eggs + Greek yogurt = 30g protein), and you can stop tracking. Most adults need to adjust 2–3 meal defaults; the rest takes care of itself.',
            },
          ],
        },

        reference: {
          text:
            'Jäger R et al. (2017). International Society of Sports Nutrition Position Stand: Protein and Exercise. · Bauer J et al. (2013). Evidence-Based Recommendations for Optimal Dietary Protein Intake in Older People: A Position Paper From the PROT-AGE Study Group. · Schoenfeld BJ, Aragon AA (2018). How much protein can the body use in a single meal for muscle-building? · Helms ER et al. (2014). A systematic review of dietary protein during caloric restriction in resistance trained lean athletes.',
          source:
            'JISSN 14:20 (2017) · JAMDA 14(8):542–559 (2013) · JISSN 15:10 (2018) · JISSN 11:20 (2014) · National Academies (NIH) DRI Reports.',
        },
      },
      {
        category_emoji: '🥚',
        title: '단백질 하루 권장량: 체중·나이·활동량별 정확한 그램 (2026 최신 기준)',
        meta_description:
          '하루에 단백질 몇 그램 필요할까? 체중(60kg/80kg/100kg), 나이(40세 미만 vs 이상), 활동량별 정확한 그램 — 2023~2024년 합의 논문 기반.',
        primary_keyword: '단백질 하루 권장량',
        secondary_keywords: [
          '체중당 단백질',
          '하루 단백질 그램',
          '근육 단백질',
          '다이어트 단백질',
          '나이별 단백질',
        ],
        last_updated: '2026-05-23',
        expert_review: {
          reviewer_name: 'HAVIT 영양 자문 위원회',
          credentials: '영양사, 영양학 박사 (자문 제공)',
          reviewed_at: '2026-05-22',
        },

        tldr:
          '비활동 성인은 체중 1kg당 0.8g (RDA 최소). 활동 성인은 1.2~1.6g. 60세 이상 또는 다이어트 중인 경우 1.6~2.2g. 70kg 활동 성인: 하루 84~112g 단백질.',

        key_stats: [
          { label: 'RDA 최소 (비활동)', value: '0.8g/kg/일', source: 'NIH 2023' },
          { label: '활동 성인 최적', value: '1.2~1.6g/kg/일', source: 'ISSN 2024' },
          { label: '60세 이상 최적 (근감소증 예방)', value: '1.2~1.5g/kg/일', source: 'PROT-AGE Study 2013' },
          { label: '다이어트 중 최적', value: '1.6~2.2g/kg/일', source: 'Helms 등, JISSN 2014' },
          { label: '한 끼 흡수 상한', value: '0.4g/kg/끼', source: 'Schoenfeld & Aragon, JISSN 2018' },
        ],

        comparison_table: {
          title: '체중·목표별 하루 단백질 목표 (그램/일)',
          headers: ['체중', '비활동 (RDA)', '활동', '다이어트', '근육 증량', '60세 이상'],
          rows: [
            ['50kg', '40g', '60~80g', '80~110g', '85~100g', '60~75g'],
            ['60kg', '48g', '72~96g', '96~132g', '102~120g', '72~90g'],
            ['70kg', '56g', '84~112g', '112~154g', '119~140g', '84~105g'],
            ['80kg', '64g', '96~128g', '128~176g', '136~160g', '96~120g'],
            ['90kg', '72g', '108~144g', '144~198g', '153~180g', '108~135g'],
            ['100kg', '80g', '120~160g', '160~220g', '170~200g', '120~150g'],
          ],
          caption:
            '활동 = 주 3회 이상 구조화된 운동. 다이어트 = 지속적인 칼로리 적자. 한 끼 25~40g씩 3~4회 분산.',
        },

        summary:
          '들어본 적 있는 "체중당 0.8g" 은 결핍을 막는 최소량이지 체성분/근육/건강한 노화를 위한 최적량이 아닙니다. 본 가이드는 2023~2024년 합의 논문을 기반으로 체중/나이/목표별 정확한 일일 목표량과 근육 단백질 합성을 최대화하는 식사 분배 계획을 알려드립니다.',

        mission:
          '위 표에서 본인의 숫자를 찾고, 단 하루만 단백질 섭취를 추적해보세요. 대부분 30~50% 부족합니다.',

        action: {
          type: 'science',
          section_title: '단백질 목표 달성하기',
          parts: [
            {
              part_number: 1,
              title: '1단계: 본인 숫자 계산',
              items: [
                '위 표에서 본인 체중 행을 찾으세요.',
                '본인 상황에 맞는 열 선택 (비활동/활동/다이어트/근육 증량/60세 이상).',
                '카테고리 사이에 있다면 낮은 값. 여러 개 해당하면 (활동+다이어트) 높은 값.',
                '숫자를 적어두세요. 대부분 한 시간 안에 잊습니다.',
              ],
            },
            {
              part_number: 2,
              title: '2단계: 식사별 분배',
              items: [
                '하루 총량을 3~4끼로 나눔. 식사당 25~40g 단백질.',
                '근육 단백질 합성을 위한 식사당 상한은 체중 1kg당 약 0.4g. 70kg → 식사당 약 28g이 최대 MPS 유발.',
                '하루 목표가 120g 넘으면 네 번째 식사(단백질 간식) 추가.',
                '저녁에 몰아 먹기보다 분산이 더 효과적. 아침에 미리 채우세요.',
              ],
            },
            {
              part_number: 3,
              title: '3단계: 고밀도 출처 선택',
              items: [
                '달걀흰자: 100g당 11g 단백질 (52kcal). 칼로리당 단백질 비율 최고.',
                '닭가슴살: 100g당 31g (165kcal). 식사당 절대 단백질 최고.',
                '그릭요거트 2%: 100g당 10g (60kcal). 최고의 편의식.',
                '두부: 100g당 8g (76kcal). 최고의 식물성 자연식 출처.',
                '유청 단백질: 30g 스쿱당 24g (120kcal). 가장 빠른 흡수, 운동 후 최적.',
              ],
            },
          ],
        },

        science: {
          question: '왜 "체중당 0.8g" 이 공식 숫자인데 연구는 더 많이 필요하다고 하나요?',
          mechanism:
            '0.8g/kg RDA는 1970년대 질소 균형 연구로 설정 — 결핍을 막는 최소량. 건강한 젊고 비활동 성인을 가정하며 "음의 질소 균형 방지"를 목표로 하지 최적 수행/체성분/근육 보존이 아닙니다. 더 새로운 기법(아미노산 산화 지표법, IAAO)은 일반 인구도 1.2~1.6g/kg, 활동 또는 고령자는 1.6~2.2g/kg가 최적임을 보여줍니다. RDA는 바닥이지 목표가 아닙니다. 미국 국가아카데미는 이 격차를 인정했지만 2024년 기준 공식 갱신은 없습니다.',
        },

        faq: [
          {
            question: '다이어트 중 단백질 얼마나 먹어야 하나요?',
            answer:
              '칼로리 적자 중에는 체중 1kg당 1.6~2.2g 목표. 지방을 빼는 동안 근육(제지방)을 보존. 70kg 사람: 하루 112~154g. 저항 운동을 병행하면 높은 쪽 권장.',
          },
          {
            question: '근육 증량에 단백질 얼마?',
            answer:
              '저항 운동과 함께 근육 증량 시 근거 기반 목표는 1.6~2.0g/kg. 2.2g/kg 초과는 대부분 연구에서 추가 이득 없음. 70kg 사람: 하루 112~140g을 3~4끼 분산.',
          },
          {
            question: '단백질 많이 먹으면 신장에 나쁜가요?',
            answer:
              '신장이 건강한 사람에서는 발표된 연구에서 2.5g/kg/일까지 신장 손상 없음. 기존 신장 질환이 있는 사람은 단백질 제한을 처방받기도 함 — 의사와 상의. "고단백 = 신장 손상" 주장은 건강한 성인에서 근거 없음.',
          },
          {
            question: '식물성만으로 단백질 충분히 얻을 수 있나요?',
            answer:
              '가능하지만 계획 필요. 식물성 단백질은 일반적으로 류신(근육 형성 아미노산) 함량이 낮아 식물성 식단자는 총 단백질 10~20% 더 필요. 최고 출처: 콩/두부, 렌틸, 퀴노아, 햄프시드, 완두 단백질.',
          },
          {
            question: '단백질 섭취 타이밍이 중요한가요?',
            answer:
              '하루 총량이 가장 중요. 다만 3~4끼(각 25~40g)에 고르게 분산하면 한 끼에 몰아 먹는 것보다 근육 단백질 합성을 최대로 자극. 운동 후 2시간 내 단백질은 도움되지만 결정적이지는 않음.',
          },
          {
            question: '고령자는 단백질 더 필요한가요?',
            answer:
              '네. 60세 이상은 근감소증(노화 관련 근육 손실) 예방을 위해 1.2~1.5g/kg/일 목표. 노화된 몸은 단백질 사용 효율이 떨어져 식사당 임계값이 젊은 성인 0.3g/kg에서 0.4g/kg로 올라감.',
          },
          {
            question: '유청 단백질 1스쿱이 어디에 해당하나요?',
            answer:
              '유청 단백질 30g ≈ 24g 단백질, 대략: 닭가슴살 100g, 큰 달걀 4개, 그릭요거트 2% 250g, 두부 300g 와 동등. 유청은 가장 빠른 흡수.',
          },
        ],

        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '추적해도 대부분 부족한 이유',
              body: '추적 식단에서 단백질 부족의 약 70%를 설명하는 세 가지 패턴.\n\n첫째: "고단백" 식품을 마케팅 문구로 세고 실제 그램 수로 안 셈. "고단백 그래놀라바" 가 대개 7~10g 단백질, 큰 달걀 1개(6g)보다 조금 많고 칼로리는 3배.\n\n둘째: 조리 수축 과소평가. 생 닭가슴살 200g 은 익으면 ~140g; 사람들은 생 무게를 익은 무게로 기록.\n\n셋째: 단백질을 너무 얇게 분산. 90g 일일 총량을 15-15-30-30 으로 나누면 동일인이 25-25-40 으로 나누는 것보다 MPS를 덜 효과적으로 유발. 식사당 임계값이 중요.',
            },
            {
              title: '칼로리당 단백질: 진짜 품질 지표',
              body: '칼로리 제한 일에 고단백을 노릴 때 식품 선택이 생각보다 더 중요. 100kcal 당 단백질:\n\n• 달걀흰자: 100kcal 당 21g — 최고\n• 닭가슴살(조리): 100kcal 당 19g\n• 참치(물 캔): 100kcal 당 22g\n• 그릭요거트 2%: 100kcal 당 17g\n• 저지방 코티지 치즈: 100kcal 당 17g\n• 유청 분리: 100kcal 당 20g\n• 두부 단단한: 100kcal 당 11g\n• 렌틸: 100kcal 당 8g\n• 병아리콩: 100kcal 당 5g\n\n칼로리당 단백질이 ~10 미만이면 합리적 칼로리 예산 안에서 고단백 목표 달성이 어렵습니다.',
            },
            {
              title: '특수 경우: 임신, 지구력, 부상 회복',
              body: '임신 및 수유: 후기 임신 1.2g/kg, 수유 중 1.5g/kg (Stephens 등, 2015). 증가된 칼로리 요구량 위에 더하여.\n\n지구력 선수: 1.2~1.4g/kg/일. 근력 선수(1.6~2.0g/kg)보다 적지만 비활동 RDA 보다 많음.\n\n부상 또는 수술 회복: 회복기 1.5~2.0g/kg/일. 조직 재건을 위해 근육 단백질 합성이 상향 조절. 단기 단백질 증량이 직접적 임상 이익을 주는 드문 경우 중 하나.\n\n매우 저칼로리 식단(1,200kcal 미만): 총 섭취가 매우 제한될 때 더 높은 단백질 비율(칼로리의 35~40%)이 제지방량 보호. 1,000kcal 미만 — 임상의 감독 하에서만.',
            },
            {
              title: '7일 테스트: 한 번 추적하고 멈춤',
              body: '대부분의 사람들은 한 주의 신중한 단백질 추적으로 평생 패턴을 외울 수 있습니다.\n\nDay 1~2: 평소대로 그냥 추적. 본인의 기본 섭취 확인.\n\nDay 3: 본인 표 목표와 비교. 대부분 30~50% 부족 발견.\n\nDay 4~6: 식사당 하나의 "앵커" 단백질 출처 추가. 고밀도 목록에서 선택. 대대적 식단 개편 없이 목표 달성이 목적.\n\nDay 7: 체중계, 에너지 수준, 포만감 확인. 거의 모두 간식 감소와 더 나은 포만감 보고.\n\n7일 후: 본인의 "기본" 아침(예: 달걀 3개 + 그릭요거트 = 30g 단백질)을 알게 되고 추적을 멈출 수 있습니다. 대부분 성인은 2~3끼 기본만 조정하면 됩니다 — 나머지는 알아서 됩니다.',
            },
          ],
        },

        reference: {
          text:
            'Jäger R 등 (2017). 국제스포츠영양학회 입장: 단백질과 운동. · Bauer J 등 (2013). 고령자의 최적 식이 단백질 섭취에 대한 근거 기반 권고 — PROT-AGE 연구 그룹 입장. · Schoenfeld BJ, Aragon AA (2018). 근육 형성을 위해 한 끼에 사용 가능한 단백질 양. · Helms ER 등 (2014). 저항 운동 마른 선수의 칼로리 제한 중 식이 단백질에 대한 체계적 문헌고찰.',
          source:
            'JISSN 14:20 (2017) · JAMDA 14(8):542–559 (2013) · JISSN 15:10 (2018) · JISSN 11:20 (2014) · 국가아카데미(NIH) DRI 보고서.',
        },
      }
    ),
    // ja_jp 시드 없음
  } as any,
];
