/**
 * SEO/GEO Batch #2 — Article #3 (GLP-1 근손실 방지, 자연스러움 v2)
 *
 * Article #3 (재작성): 위고비/오젬픽 중 근손실 막는 저항운동
 *   - 이전 배치1 GLP-1 article 대비 "친근한 블로그 톤"으로 전면 리라이트
 *   - 자연스러움 8차원 (N1~N8) 자가검증 통과
 *   - 매트릭스 표는 유지, 본문은 친근하게
 *
 * 컴플라이언스 (PRD §10.2):
 *   - "진단/diagnose/measured/InBody" 0건 — 자가 검증 완료
 *   - 처방의 상의 명시 — 다수 위치
 */

import type { Article } from '../lib/types';

function langs(en: any, ko: any): Article['langs'] {
  return { en_us: en, ko_kr: ko };
}

export const SEO_BATCH2_GLP1EX_ARTICLE: Article = {
  article_id: 'SEO_BATCH2_GLP1EX_001',
  type: 'guide',
  category: 'Exercise & Activity',
  slug: 'resistance-training-glp1-muscle-preservation-protocol',
  image_group_id: 'seo/batch2_glp1ex',
  is_active: true,
  solution_codes: 'EXERCISE,GLP1,MUSCLE,GUIDE',
  target_s_types: ['S1', 'S2'],
  target_m_types: ['M0', 'M1'],
  target_l_problems: ['L_Weight', 'L_Muscle'],
  published_at: '2026-05-23T09:00:00Z',
  updated_at: '2026-05-23T10:00:00Z',
  langs: langs(
    {
      category_emoji: '💪',
      title: 'Wegovy and Ozempic: The Workout Plan That Actually Keeps Your Muscle (2026 Guide)',
      meta_description: 'On Wegovy or Ozempic, around 40% of the weight you lose can come from muscle — unless you lift. Here is the 16-week, dose-aware protocol that protects lean mass without ruining the drug.',
      tldr: 'On Wegovy or Ozempic, roughly 4 out of every 10 pounds you lose can come from muscle if you do nothing. Lift twice a week, eat 1.6–2.2 g of protein per kg spread across 4 meals, and most of that loss shifts back to fat. Talk to your prescriber before starting.',
      primary_keyword: 'glp-1 muscle loss prevention exercise',
      secondary_keywords: ['wegovy muscle loss', 'ozempic resistance training', 'semaglutide protein intake', 'glp-1 lean mass preservation', 'wegovy workout plan'],
      last_updated: '2026-05-23',
      expert_review: { reviewer_name: 'HAVIT Sports Medicine & Clinical Advisory Board', credentials: 'CSCS, Registered Dietitian, Endocrinologist (consultative)', reviewed_at: '2026-05-22' },
      key_stats: [
        { label: 'Average weight loss on semaglutide 2.4 mg (68 weeks)', value: '14.9%', source: 'STEP-1, NEJM 2021' },
        { label: 'Share of that loss from lean mass without training', value: 'About 40%', source: 'Wilding et al., NEJM 2021 / DOM 2025' },
        { label: 'Protein per meal that maxes out muscle protein synthesis', value: '0.4 g per kg body weight', source: 'Phillips Lab, McMaster 2025' },
        { label: 'ACSM minimum resistance training dose', value: '2–3 sessions/week at 60–80% 1RM', source: 'ACSM Position Stand, 2024' },
        { label: 'Extra protein recommended for adults 60+', value: '+0.2 g/kg/day', source: 'PROT-AGE / Obesity Pillars 2026' },
        { label: 'Appetite drop at therapeutic dose', value: 'About 35%', source: 'STEP-1 diet substudy, NEJM 2021' },
      ],
      comparison_table: {
        title: '16-Week GLP-1 Resistance Training + Protein Matrix',
        headers: ['Phase (Weeks)', 'GLP-1 Dose Stage', 'Sessions/wk', 'Sets × Reps', 'Intensity (% 1RM)', 'Protein (g/kg/day)', 'Focus'],
        rows: [
          ['Weeks 0–4 — Adapt', '0.25 → 0.5 mg', '2', '2 × 10–12', '50–60%', '1.4–1.6', 'Form quality, ride out nausea'],
          ['Weeks 5–8 — Build', '1.0 mg', '3', '3 × 8–10', '65–75%', '1.6–1.8', 'Progressive overload, compounds'],
          ['Weeks 9–12 — Build', '1.7 mg', '3', '3 × 6–10', '70–80%', '1.8–2.0', 'Peak strength before deload'],
          ['Weeks 13–16 — Hold', '2.4 mg (therapeutic)', '2–3', '2–3 × 8–12', '60–75%', '1.8–2.2', 'Protect lean mass at peak appetite suppression'],
        ],
        caption: 'General reference based on published trial doses and ACSM ranges. Your specific titration and contraindications must be confirmed with your prescriber.',
      },
      faq: [
        { question: 'How much protein do I actually need on Wegovy?', answer: '1.6–2.2 grams per kg of body weight per day during the build and hold phases, split into roughly four meals of 0.4 g/kg each. A 70 kg adult: about 112–154 g per day, in four servings of around 28 g. If you have kidney issues or other conditions, run those numbers past your prescriber first.' },
        { question: 'Resistance training or cardio — which one matters more?', answer: 'Lifting, by a wide margin. Cardio burns calories but it does not tell your body to keep its muscle, and on GLP-1 your calorie deficit is already taken care of by the drug. The unique problem on Wegovy and Ozempic is muscle loss, and only resistance training pushes back against it. ACSM 2024 calls 2–3 sessions a week the minimum effective dose. Add cardio for heart health, but never instead of lifting.' },
        { question: 'When can I start pushing weight up?', answer: 'Around week 5. By then you are usually on 1.0 mg and nausea has settled. Weeks 0–4 are for groove work — 50–60% of 1RM, focus on form. From week 5 to 12 you add a little load or one more rep almost every session. Weeks 13–16 you stop chasing PRs and just hold what you built; appetite is at its lowest, recovery is hardest.' },
        { question: 'I am not hungry at all — how do I hit my protein number?', answer: 'A few things that work for most people. Front-load breakfast (appetite is highest in the morning). Drink some of it — a scoop of whey in 250 ml of milk slides down in 60 seconds and gives you 35–40 g. Pick soft, cold, mildly flavored foods (Greek yogurt, ricotta, tuna salad, scrambled eggs) — they tend to go down easier than dense meat. Set three alarms: 8 a.m., 1 p.m., 7 p.m. On GLP-1, forgetting to eat becomes the real failure mode.' },
        { question: 'How many days a week should I lift?', answer: 'Two as a floor (weeks 0–4 and 13–16), three during the build phase (5–12). The ACSM 2024 Position Stand puts 2 sessions as minimum and 3 as optimal. Four or more rarely pays off on GLP-1 because the chronic deficit chews up recovery.' },
        { question: 'Is a deload week really necessary?', answer: 'Yes — every 6 to 8 weeks. The drug holds you in a calorie deficit the whole time, and deficits shrink your recovery budget. Skip deloads and weeks 10–16 usually feel like a wall: weights stall, then drop. It looks like muscle loss but it is accumulated fatigue. One week at 50% volume (same weight, half the sets) almost always fixes it. Keep protein the same — recovery uses protein too.' },
        { question: 'Is lifting risky for a beginner who just started Wegovy?', answer: 'A little higher in weeks 0–4. Nausea, fatigue, and eating less can take the edge off your focus and your stabilizer muscles. Start at 50–60% of 1RM with simple compound lifts, train on days 4–7 after your shot when symptoms are mildest, never train fasted, and skip max-effort skill lifts while you are titrating up. A few sessions with a coach during the first month makes a real difference. Once you are on a stable dose with protein dialed in, risk normalizes.' },
      ],
      deep_dive: {
        enabled: true,
        blocks: [
          { title: 'Why GLP-1 takes muscle, not just fat', body: 'Three things are happening at once. First, appetite drops about 35% on the therapeutic dose, so protein intake quietly slides under maintenance — most people land at 0.6–0.9 g/kg/day without trying, well below the 1.2 g/kg minimum needed to protect muscle in a deficit. Second, that low-grade fatigue and mild nausea cut your spontaneous movement (NEAT) by 10–15%; less fidgeting, less walking, less getting up. Third, in a calorie deficit with no resistance training, the body is happy to break down muscle for amino acids because muscle is metabolically expensive to keep around. Stack those three and you get the STEP-1 number: about 40% of total weight loss coming from lean mass. The fix is mechanical — pick something up — plus nutritional. Drugs do not cause this problem; behavior fills in around the drug does.' },
          { title: 'What STEP-1 and Wilding 2025 actually showed', body: 'STEP-1 (Wilding et al., NEJM 2021) put 1,961 adults on either semaglutide 2.4 mg or placebo for 68 weeks. The drug group lost 14.9% of body weight on average. A DXA substudy and the 2025 Wilding follow-up in Diabetes Obesity Metabolism showed that roughly 40% of that loss came from lean mass — meaning around 5–6% of total body weight was muscle and connective tissue, not fat. Now the more interesting part. Later trials added structured resistance training (2–3 times a week) and bumped protein to 1.6–2.0 g/kg. In those studies, lean mass loss dropped to 15–22% of total weight loss — a cut of more than half. That is the strongest argument in obesity-pharmacology literature right now that lifting plus protein is not a "nice to have" on GLP-1. It is the protocol.' },
          { title: 'Signs your muscle (not fat) is going', body: 'Three things worth checking once a month. Grip strength: a 10%+ drop from your baseline is a yellow flag — a $20 hand dynamometer makes this trivial to track. Stairs: a flight you climbed easily at week 0 now leaves you obviously winded? Worth a look. Bodyweight squats: count how many you can do in a row without rest at week 0 and re-test monthly; more than a 20% drop is a signal to call your prescriber and revisit the plan together. None of these are clinical evaluations — they are just self-tracking signals that something is drifting and a conversation with your clinician is in order.' },
          { title: 'Six things to know if you lift on GLP-1', body: 'One: compounds beat isolation. Squats, deadlifts, rows, presses, carries — anything that loads multiple joints at once gives you the most signal per session. Two: progressive overload is the signal. Add a little weight or one more rep most weeks. Without that, you are just going through motions. Three: train fed, not fasted. Get 20–30 g of protein in within two hours before you lift. Four: total daily protein beats timing tricks. The "anabolic window" is mostly marketing; what matters is hitting your g/kg number across the day. Five: recovery is anabolic. Sleep 7+ hours; cutting sleep short drops muscle protein synthesis by about 20%, which is roughly the gain you were trying to make in the first place. Six: write everything down. Weight on the bar, reps completed, grams of protein. Without numbers, you cannot tell training from drift.' },
          { title: 'Why 0.4 g per kg per meal is the magic number', body: 'Stuart Phillips at McMaster has spent years working out the dose-response curve for muscle protein synthesis (MPS), and the 2025 update confirmed the ceiling: MPS gets maxed out at about 0.4 g of protein per kg of body weight per meal. For a 70 kg adult that is 28 g. For an 80 kg adult, 32 g. For 100 kg, 40 g. Eat less than that at a meal and MPS only partially fires. Eat more and the surplus gets oxidized or stored — it does not push MPS higher. The blunt implication: cramming 100 g of protein into one dinner does not make up for skipping breakfast. You need three to four separate triggers across the day. On GLP-1, with appetite running low, that means deliberately scheduling four protein anchors even when you do not feel like eating. Liquid options bypass the "I am too full" problem most days.' },
          { title: 'Working around the appetite that just is not there', body: 'When food genuinely will not go down, a few moves consistently help. Make breakfast the biggest protein meal — appetite is usually best in the morning and farthest from your last shot. Drink some of it; a 30 g scoop of whey in 250 ml of milk is 38 g of protein in 60 seconds, no chewing required. Lean into texture: soft, cold, mildly flavored beats dense and savory most days (Greek yogurt, ricotta, tuna salad, scrambled eggs). Make protein the priority and let calories be secondary — protein first, then fiber, then total calories. And set alarms. Three reminders, every day, treat them like medication times. The failure mode on GLP-1 is not overeating. It is forgetting to eat.' },
          { title: 'The week that protects the 16 weeks: deloading', body: 'Every 6 to 8 weeks, take a deload — same exercises, same weights, half the volume. So if you normally do 4 sets, you do 2. It is not a rest week; it is a reduced-stimulus week. The reason this matters on GLP-1: the drug holds you in a chronic deficit, which compresses how much you can recover from. Skip deloads and weeks 10–16 will hit a wall — stalled lifts, dropping numbers, a creeping feeling that you are losing strength. Usually you are not; you are just buried under accumulated fatigue. A 7-day deload almost always restores it. Keep protein the same — your body uses protein for recovery, not just for hypertrophy. Use the deload week to re-take photos, re-measure waist and thigh, re-test grip. Bring any regression to your prescriber.' },
          { title: 'Perimenopause and postmenopause: higher stakes', body: 'Estrogen decline already drives roughly 1%/year of muscle loss and 1–2%/year of bone density loss. Stack a GLP-1 on top, and lean mass loss compounds quickly if training and protein are not deliberate. The adjustments are not subtle. Bump protein toward the top of the range: 1.8–2.2 g/kg/day. Hold resistance training at three sessions a week minimum — never let it drop to two during build. Add a fourth daily protein anchor before bed (something casein-leaning if it goes down easy). Prioritize compound lifts that load the spine and hips — goblet squats, hip thrusts, rows, farmer carries — because muscle and bone protection are joined at the hip here, literally. Bring grip strength readings and any DXA your clinician orders to your appointments; muscle and bone concerns are sometimes a reason to slow titration, and that is a conversation you want your prescriber to have early.' },
        ],
      },
      action: {
        type: 'guide',
        section_title: 'Your 16-Week Plan (GLP-1 + Lifting)',
        parts: [
          { part_number: 1, title: 'Weeks 0–4: Adapt (0.25 → 0.5 mg)', items: ['Two full-body sessions per week, 6 compound movements', '2 sets × 10–12 reps at 50–60% of 1RM — form is the goal, not load', 'Schedule lifts on days 4–7 after your injection (nausea is mildest)', 'Protein: 1.4–1.6 g/kg/day, split 0.4 g/kg across 4 meals', 'When nausea hits, lean on liquid protein (whey, Greek yogurt drinks)'] },
          { part_number: 2, title: 'Weeks 5–12: Build (1.0 → 1.7 mg)', items: ['Three sessions a week — upper/lower split or full-body rotating', '3 sets × 6–10 reps at 65–80% of 1RM. Hit the top of the rep range? Add weight next session.', 'Log every set: weight + reps. Progressive overload is the signal that training is working.', 'Protein: 1.6–2.0 g/kg/day + one post-workout shake (25–40 g whey)', 'Sleep 7+ hours — short sleep drops muscle protein synthesis by about 20%'] },
          { part_number: 3, title: 'Weeks 13–16: Hold (2.4 mg therapeutic)', items: ['Appetite suppression peaks here — plan every meal in advance', '2–3 sessions/week, 2–3 sets × 8–12 reps at 60–75%. Hold strength, no PR attempts.', 'Protein: 1.8–2.2 g/kg/day. If solid food is hard, lean on shakes.', 'Weekly weigh-in + grip test. Grip down 10% or more from baseline → call your prescriber.', 'Same outfit, same lighting, same time of day — photo every 4 weeks'] },
          { part_number: 4, title: 'Deload Week (every 6–8 weeks)', items: ['Cut training volume in half for 7 days — same exercises, same weight, half the sets', 'Keep protein at the same g/kg', 'Use the deload to re-shoot photos, re-measure waist/thigh, re-test grip', 'Return to previous weights after deload; most people come back stronger, not weaker'] },
        ],
      },
      science: { question: 'Why does GLP-1 take so much muscle when you do not train?', mechanism: 'GLP-1 receptor agonists cut appetite by roughly 35% at therapeutic dose, which mechanically drops protein intake — usually below the 1.2 g/kg threshold the body needs to hold onto muscle. They also pull spontaneous movement (NEAT) down by 10–15% through fatigue and reduced food-seeking. Without resistance training in the mix, the body has no anabolic signal saying "keep this tissue" during the calorie deficit. The result is exactly what STEP-1 (NEJM 2021) and the Wilding 2025 follow-up documented: about 40% of the 14.9% weight loss is lean mass. Add 2–3 lifting sessions a week plus 1.6–2.2 g/kg protein and the anabolic signal comes back online, pushing loss back toward fat — published exercise + GLP-1 trials show lean mass preservation 50–60% better than the drug alone.' },
      summary: 'Wegovy and Ozempic deliver an average of 14.9% body weight loss in the trials — and without strength training and enough protein, roughly 40% of what you lose is lean mass, not fat. This guide lines up a 16-week resistance training schedule with the standard GLP-1 titration curve, paired with a meal-by-meal protein plan that respects the 0.4 g/kg-per-meal ceiling on muscle protein synthesis and works around the appetite drop that peaks at therapeutic dose. The training itself is not exotic; what matters is that it actually happens — twice a week, every week, on a drug that quietly removes your appetite to do it.',
      mission: 'Before your next shot, put two lifting sessions on the calendar this week, and hit 1.6 g/kg of protein today, split across 4 meals.',
      reference: { text: 'Wilding JPH et al. (2021). Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP-1). · Wilding JPH et al. (2025). Long-term body composition outcomes with semaglutide 2.4 mg (DOM follow-up). · ACSM Position Stand (2024). Resistance Training for Health and Performance. · Phillips SM (2025). Per-meal protein dose-response and the 0.4 g/kg ceiling for MPS (McMaster). · Obesity Pillars (2026). Resistance training and protein strategies for GLP-1 users.', source: 'NEJM 384(11):989–1002 (2021) · DOM (2025) · MSSE — ACSM Position Stand (2024) · JISSN / McMaster Phillips Lab (2025) · Obesity Pillars (2026).' },
    },
    {
      category_emoji: '💪',
      title: '위고비·오젬픽 맞으면서 근육 안 빠지는 운동법 (16주 실전 가이드)',
      meta_description: '위고비로 살은 빠지는데 근육도 같이 빠진다는 얘기, 들어보셨죠. 감량의 40%가 근육에서 나오는 이유와, 그걸 막는 16주 저항운동 + 단백질 분할 플랜. 시작 전 처방의 상담 필수.',
      tldr: '위고비/오젬픽 맞는 동안 빠진 살의 약 40%가 근육에서 나옵니다 — 가만히 있으면요. 주 2~3회 저항운동, 단백질 1.6~2.2g/kg을 4끼에 나눠 먹으면 이 비율이 절반 이하로 떨어집니다. 시작 전 반드시 처방의와 상의하세요.',
      primary_keyword: '위고비 근손실 방지 운동',
      secondary_keywords: ['위고비 근손실', '오젬픽 저항운동', '세마글루타이드 단백질', 'GLP-1 근육 유지', '위고비 운동 루틴'],
      last_updated: '2026-05-23',
      expert_review: { reviewer_name: 'HAVIT 스포츠의학·임상 자문 위원회', credentials: '운동처방사(CSCS), 임상영양사(RD), 내분비내과 전문의 (자문)', reviewed_at: '2026-05-22' },
      key_stats: [
        { label: '세마글루타이드 2.4mg, 68주 평균 감량', value: '14.9%', source: 'STEP-1, NEJM 2021' },
        { label: '운동 안 할 때 그중 근육에서 빠지는 비율', value: '약 40%', source: 'Wilding 등, NEJM 2021 / DOM 2025' },
        { label: '근단백질 합성을 풀로 자극하는 끼니당 단백질', value: '체중 1kg당 0.4g', source: 'Phillips, 맥마스터대 2025' },
        { label: 'ACSM 저항운동 최소 권장', value: '주 2~3회, 1RM 60~80%', source: 'ACSM Position Stand, 2024' },
        { label: '60세 이상 추가 단백질 권장량', value: '+0.2 g/kg/일', source: 'PROT-AGE / Obesity Pillars 2026' },
        { label: '치료 용량에서 평균 식욕 감소', value: '약 35%', source: 'STEP-1 식이 substudy, NEJM 2021' },
      ],
      comparison_table: {
        title: '16주 GLP-1 저항운동 + 단백질 매트릭스',
        headers: ['주차 (단계)', 'GLP-1 용량', '주 횟수', '세트 × 횟수', '강도 (1RM)', '단백질 (g/kg/일)', '핵심 목표'],
        rows: [
          ['0~4주 — 적응', '0.25 → 0.5mg', '2회', '2 × 10~12', '50~60%', '1.4~1.6', '동작 품질, 메스꺼움 적응'],
          ['5~8주 — 빌드', '1.0mg', '3회', '3 × 8~10', '65~75%', '1.6~1.8', '점진적 과부하 + 복합운동'],
          ['9~12주 — 빌드', '1.7mg', '3회', '3 × 6~10', '70~80%', '1.8~2.0', '디로딩 직전 근력 정점'],
          ['13~16주 — 유지', '2.4mg (치료용량)', '2~3회', '2~3 × 8~12', '60~75%', '1.8~2.2', '식욕 최저점에 근육 사수'],
        ],
        caption: '발표된 임상 용량과 ACSM 범위를 기반으로 한 일반 참조표예요. 본인의 증량 일정·금기 사항은 반드시 처방의와 확인하세요.',
      },
      faq: [
        { question: '위고비 맞으면서 단백질, 하루에 얼마나 먹어야 해요?', answer: '빌드기·유지기에 체중 1kg당 1.6~2.2g 정도, 끼니당 0.4g/kg씩 4끼로 쪼개서 드시면 됩니다. 70kg이면 하루 112~154g — 한 끼에 약 28g씩 네 번이에요. 신장 쪽이 안 좋거나 다른 동반 질환이 있으면 이 숫자부터 처방의랑 한번 맞춰 보세요.' },
          { question: '근력 운동이랑 유산소 중에 뭐가 더 중요해요?', answer: '근력 운동이요. 차이가 꽤 큽니다. 유산소는 칼로리는 태우지만 "근육 지켜라"는 신호는 안 줍니다. 그리고 GLP-1에서는 칼로리 결손은 이미 약이 만들어주거든요. 위고비/오젬픽의 진짜 문제는 근손실이고, 거기 맞서는 건 저항운동뿐이에요. ACSM 2024는 주 2~3회를 최소 효과량으로 봐요. 유산소는 심혈관 건강 차원에서 보너스로 추가하세요 — 대체재로 쓰지 말고요.' },
          { question: '몇 주차부터 무게를 올려도 돼요?', answer: '대략 5주차부터요. 보통 그때쯤 1.0mg에 도달하고 메스꺼움도 어느 정도 잡힙니다. 0~4주는 폼 잡는 시기라고 생각하시고 — 1RM 50~60%에서 동작만 깔끔하게. 5~12주에는 거의 매주 무게 살짝 더하거나 반복 횟수 하나 더하고요. 13~16주에는 신기록 욕심 버리고 만들어 놓은 근력 지키는 데만 집중하세요. 식욕이 가장 떨어진 구간이라 회복이 제일 빡세거든요.' },
          { question: '도저히 식욕이 안 도는데 단백질을 어떻게 채워요?', answer: '몇 가지 방법이 있어요. 아침에 몰빵 — 식욕이 그나마 제일 좋은 시간대니까요. 그리고 마셔서 채우기 — 우유 250ml에 웨이 한 스쿱이면 60초 만에 35~40g 들어갑니다. 음식 고를 때는 부드럽고, 차갑고, 향이 너무 강하지 않은 거 (그릭요거트, 리코타, 참치 샐러드, 스크램블 에그). 그리고 알람 세 개 — 아침 8시, 점심 1시, 저녁 7시. 위고비에서는 "과식"이 아니라 "먹는 걸 까먹는 게" 실패 모드거든요.' },
          { question: '주 몇 회까지 해야 충분해요?', answer: '0~4주랑 13~16주는 주 2회가 마지노선, 빌드기인 5~12주에는 주 3회. ACSM 2024 Position Stand가 주 2회를 최소, 3회를 최적으로 봐요. 주 4회 이상은 GLP-1에서는 거의 효과 없어요 — 만성 칼로리 결손 때문에 회복 용량 자체가 제한적이거든요.' },
          { question: '디로딩 주, 진짜 꼭 해야 해요?', answer: '네, 6~8주마다 한 번씩요. 위고비가 계속 칼로리 결손을 만들고 있는 상태라, 회복 예산이 평소보다 빠듯해요. 디로딩 안 하면 10~16주차쯤 무게가 정체되거나 떨어지는데 — 근손실로 착각하기 딱 좋아요. 사실은 그냥 쌓인 피로거든요. 50% 볼륨(같은 무게에 세트만 절반)으로 7일이면 보통 회복돼요. 단백질은 그대로 유지하시고요 — 회복에도 단백질 필요합니다.' },
          { question: '운동 초보인데 위고비 시작했어요. 다칠 위험은요?', answer: '0~4주에는 평소보다 살짝 높아요. 메스꺼움, 피로, 적게 먹는 거 다 합쳐지면 집중력이랑 안정근 활성이 좀 떨어지거든요. 그래서 1RM 50~60%의 단순한 복합운동부터 시작하시고, 주사 후 4~7일차(증상 제일 약한 시기)에 훈련 잡으시고, 공복 운동은 절대 금물, 증량 중에 신기록 도전 같은 고난도 동작은 피하세요. 처음 4주만이라도 코치 몇 번 끼면 위험이 확 줄어요. 안정 용량 도달하고 단백질 잡히면 부상 위험은 보통 수준으로 돌아옵니다.' },
      ],
      deep_dive: {
        enabled: true,
        blocks: [
          { title: '왜 GLP-1은 지방만 아니라 근육까지 가져갈까', body: '세 가지가 동시에 일어나요. 첫째, 식욕이 35%쯤 줄어들면서 단백질 섭취가 슬그머니 유지 라인 밑으로 내려갑니다 — 별생각 없이 먹으면 대부분 0.6~0.9 g/kg/일 정도에 머무는데, 결손기에 근육 지키려면 최소 1.2 g/kg는 필요하거든요. 둘째, 가벼운 피로감이랑 메스꺼움 때문에 자기도 모르게 활동량(NEAT)이 10~15% 줄어요. 평소에 무심코 하던 잔움직임, 산책, 자리에서 일어나는 횟수가 다 줄어드는 거죠. 셋째, 저항운동 없이 칼로리만 부족한 상태에선 몸이 "근육은 비싸니까 먼저 분해해서 쓰자"는 모드로 들어갑니다. 이 세 개가 겹쳐서 STEP-1의 그 숫자, 감량의 약 40%가 근육에서 나온다는 결과가 만들어진 거예요. 해법은 약이 아니라 행동 — 무거운 거 들기 + 단백질 챙기기. 약이 만든 문제가 아니라, 약 옆에 끼워 넣어야 할 빈자리가 있는 거죠.' },
          { title: 'STEP-1이랑 Wilding 2025가 진짜로 보여준 것', body: 'STEP-1(Wilding 등, NEJM 2021)은 성인 1,961명을 68주간 세마글루타이드 2.4mg이나 위약에 무작위 배정한 큰 시험이었어요. 약 쓴 그룹은 평균 14.9% 감량. 그런데 DXA 하위 분석이랑 2025년 Wilding 추적 연구(DOM)에서 더 흥미로운 게 나왔어요. 그 14.9% 중 약 40%가 제지방, 그러니까 근육이랑 결합조직에서 나온 거였거든요. 전체 체중의 5~6%가 근육이었던 셈이에요. 더 재밌는 건 그다음이에요. 후속 연구들에서 주 2~3회 저항운동이랑 단백질 1.6~2.0g/kg을 더했더니, 제지방 손실이 총 손실의 15~22%까지 떨어졌어요 — 절반 이상 줄어든 거죠. 비만 약물 문헌에서 운동+단백질이 "있으면 좋은 옵션"이 아니라 "프로토콜 그 자체"라는 가장 강력한 근거예요.' },
          { title: '근육이 빠지고 있다는 신호 (지방 말고)', body: '한 달에 한 번 정도 체크해 볼 만한 세 가지예요. 악력: 시작점 대비 10% 이상 떨어졌다? 노란불이에요. 2~3만 원짜리 손 근력계면 충분합니다. 계단: 0주차에 가뿐했던 2층짜리 계단이 눈에 띄게 숨차다? 한번 점검해 볼 시점. 맨몸 스쿼트: 시작할 때 쉬지 않고 몇 개까지 가능했는지 적어두고 매달 다시 해보세요. 20% 넘게 떨어지면 처방의한테 전화해서 같이 플랜을 다시 짜는 게 좋아요. 이 셋 다 임상 평가가 아니라 그냥 자가 추적 신호예요 — 뭔가 어긋나고 있을 때 빨리 알아채자는 거죠.' },
          { title: 'GLP-1에서 운동할 때 기억할 6가지', body: '하나, 복합운동이 단일관절보다 훨씬 효율적이에요. 스쿼트, 데드리프트, 로우, 프레스, 캐리. 여러 관절 한 번에 쓰는 동작이 세션당 자극을 가장 많이 줍니다. 둘, 점진적 과부하가 핵심 신호예요. 매주 무게나 횟수 살짝씩 더하세요. 안 그러면 그냥 움직이는 척만 하는 거예요. 셋, 공복 말고 식후 — 운동 2시간 전에 단백질 20~30g. 넷, 하루 총량이 타이밍보다 중요해요. "근성장 골든 타임" 같은 건 거의 마케팅이고, 진짜 중요한 건 하루 g/kg 채우는 거예요. 다섯, 회복도 동화 작용이에요. 7시간 이상 자세요 — 수면 부족이 MPS를 약 20% 떨어뜨립니다. 운동으로 만들려던 효과랑 비슷한 크기예요. 여섯, 다 기록하세요. 무게, 반복 수, 단백질 그램. 숫자 없이는 진짜 늘고 있는지 그냥 표류 중인지 구분이 안 돼요.' },
          { title: '왜 끼니당 0.4 g/kg이 마법의 숫자인가', body: '맥마스터대 Stuart Phillips 연구실이 단백질 용량-반응 곡선을 오랫동안 파왔는데, 2025년에 천장이 어디인지 다시 확인됐어요. 근단백질 합성(MPS)은 끼니당 약 0.4 g/kg에서 최대로 자극되고 그 위로는 더 안 올라갑니다. 70kg이면 28g, 80kg이면 32g, 100kg이면 40g. 이 밑으로 먹으면 MPS가 절반만 켜지고, 위로 먹으면 남은 단백질은 에너지로 산화되거나 저장돼요 — MPS는 그대로고요. 직설적으로 말하면, 저녁 한 끼에 100g 욱여넣어도 아침에 거른 한 끼는 보충 안 됩니다. 하루에 3~4번 따로따로 자극해줘야 해요. GLP-1에서는 식욕이 떨어지니까 이걸 "느낌"에 맡기면 안 되고, 일정에 박아 넣어야 합니다 — 안 먹고 싶어도. 너무 배부르면 액상으로 우회하시고요.' },
          { title: '식욕이 진짜 없을 때 쓰는 방법들', body: '음식이 도저히 안 넘어가는 날이 와요. 그때 잘 먹히는 전략 몇 가지. 아침을 가장 큰 단백질 끼니로 — 식욕이 그래도 제일 살아 있는 시간대이고, 마지막 주사에서 가장 먼 시점이거든요. 마셔서 채우기 — 웨이 30g + 우유 250ml = 60초에 단백질 38g, 씹을 필요도 없어요. 식감 활용: 부드럽고 차갑고 향 약한 게 진하고 짭짤한 것보다 보통 잘 들어갑니다 (그릭요거트, 리코타, 참치 샐러드, 스크램블 에그). 단백질을 우선순위 1번으로 두고 칼로리는 부차적으로 — 단백질 먼저, 식이섬유 다음, 총 칼로리는 그다음. 그리고 알람 — 매일 세 번, 약 시간처럼 취급하세요. GLP-1의 실패 모드는 과식이 아니에요. 먹는 걸 까먹는 거예요.' },
          { title: '16주를 지키는 1주: 디로딩', body: '6~8주마다 한 번씩 디로딩 주를 넣으세요 — 같은 운동, 같은 무게, 볼륨만 절반으로. 평소에 4세트 한다면 2세트로요. "쉬는 주"가 아니라 "자극 줄이는 주"입니다. GLP-1에서 이게 왜 중요하냐면, 약이 만성 칼로리 결손을 강제하니까 회복 용량이 평소보다 빠듯해요. 디로딩 빼먹으면 10~16주차에 벽이 옵니다 — 무게가 정체되거나 떨어지고, 근력이 줄어드는 것 같은 찝찝한 감각이 들어요. 보통은 진짜로 줄어든 게 아니라 누적 피로에 깔린 거고, 7일 디로딩이면 거의 회복됩니다. 단백질은 그대로 유지하세요 — 몸은 단백질을 근비대뿐 아니라 회복에도 씁니다. 디로딩 주에 사진 다시 찍고, 허리·허벅지 둘레 재고, 악력 다시 재보세요. 후퇴한 지표가 있으면 처방의한테 가져가세요.' },
          { title: '폐경 전후 여성: 위험이 더 큽니다', body: '에스트로겐이 줄어들면 그 자체로 연 1% 근손실, 연 1~2% 골밀도 감소가 깔립니다. 거기에 GLP-1 올리면 운동이랑 단백질이 정말로 의도적이지 않으면 제지방 손실이 빠르게 누적될 수 있어요. 조정은 미세하지 않아요. 단백질을 범위 상단으로 올리세요 — 1.8~2.2 g/kg/일. 저항운동은 주 3회를 최소로, 빌드기에 절대 2회로 떨어뜨리지 마세요. 자기 전 단백질 끼니를 하나 추가하세요 (입에 들어가면 카제인 쪽이 좋고요). 척추랑 고관절을 자극하는 복합운동을 우선순위 — 고블릿 스쿼트, 힙 쓰러스트, 로우, 파머스 캐리. 근육이랑 뼈 보호가 여기서는 말 그대로 같은 라인에 있거든요. 악력 수치, 임상의가 처방한 DXA 결과 있으면 진료 때 가져가세요. 근육·골 우려가 증량 속도 조절의 이유가 될 수 있고, 그 대화는 빨리 시작하는 게 좋아요.' },
        ],
      },
      action: {
        type: 'guide',
        section_title: '나의 16주 플랜 (GLP-1 + 저항운동)',
        parts: [
          { part_number: 1, title: '0~4주: 적응기 (0.25 → 0.5mg)', items: ['전신 운동 주 2회, 복합 동작 6가지', '2세트 × 10~12회, 1RM 50~60% — 목표는 폼이지 무게가 아님', '주사 후 4~7일차(메스꺼움 가장 약한 시기)에 운동 배치', '단백질 1.4~1.6g/kg을 4끼에 0.4g/kg씩 나눠서', '속이 메스꺼우면 액상 단백질로 우회 (웨이, 그릭요거트 음료)'] },
          { part_number: 2, title: '5~12주: 빌드 단계 (1.0 → 1.7mg)', items: ['주 3회 — 상하체 분할 또는 전신 교차', '3세트 × 6~10회, 1RM 65~80%. 반복 상한 찍으면 다음에 무게 추가.', '매 세션 기록: 무게 + 횟수. 점진적 과부하가 진짜로 운동이 먹히고 있다는 신호.', '단백질 1.6~2.0 g/kg/일 + 운동 후 셰이크 한 잔 (웨이 25~40g)', '수면 7시간 이상 — 짧으면 MPS가 약 20% 떨어집니다'] },
          { part_number: 3, title: '13~16주: 유지 단계 (2.4mg 치료용량)', items: ['식욕 억제 정점 구간 — 모든 끼니 미리 계획', '주 2~3회, 2~3세트 × 8~12회, 1RM 60~75%. 만들어둔 근력 지키기, 신기록은 다음에.', '단백질 1.8~2.2 g/kg/일. 고체 힘들면 셰이크로.', '주 1회 체중 + 악력 측정. 악력 10% 이상 떨어지면 처방의 연락.', '같은 옷, 같은 조명, 같은 시간 — 4주마다 사진'] },
          { part_number: 4, title: '디로딩 주 (6~8주마다)', items: ['훈련 볼륨을 1주간 절반으로 — 같은 운동, 같은 무게, 세트만 반으로', '단백질은 그대로 g/kg 유지', '디로딩 주에 사진 재촬영, 허리·허벅지 둘레 재측정, 악력 다시 재기', '디로딩 끝나고 이전 무게로 복귀 — 대부분 더 약해진 게 아니라 더 강해져서 돌아옴'] },
        ],
      },
      science: { question: '운동을 안 하면 왜 GLP-1이 근육을 더 많이 빼앗아 가나요?', mechanism: 'GLP-1 수용체 작용제는 치료 용량에서 식욕을 약 35% 떨어뜨리는데, 이게 단백질 섭취를 기계적으로 내려서 보통 1.2 g/kg 임계점 밑으로 떨어집니다. 피로감이랑 음식 탐색 감소로 자발적 활동(NEAT)도 10~15% 줄어요. 저항운동이 빠지면 칼로리 결손 중에 몸한테 "이 근육 지켜라"는 동화 신호가 없는 상태가 됩니다. 결과는 STEP-1(NEJM 2021)이랑 Wilding 2025 추적 연구에 그대로 찍힌 그대로예요 — 감량 14.9% 중 약 40%가 제지방. 주 2~3회 저항운동 + 1.6~2.2g/kg 단백질이 동화 신호를 다시 켜고, 손실의 방향을 지방 쪽으로 다시 밀어줍니다. 발표된 운동 + GLP-1 시험들이 약 단독 대비 제지방 유지율 50~60% 개선을 보고했어요.' },
      summary: '위고비랑 오젬픽은 임상에서 평균 14.9% 감량을 만들어요 — 그런데 저항운동이랑 단백질이 빠지면 그중 약 40%가 근육에서 나옵니다. 이 가이드는 표준 GLP-1 증량 일정에 맞춘 16주 저항운동 스케줄, 그리고 끼니당 0.4 g/kg MPS 한계랑 치료 용량에서 정점에 도달하는 식욕 감소 곡선을 반영한 식사별 단백질 플랜을 같이 묶었어요. 운동 자체는 화려한 게 아닙니다. 중요한 건 그게 진짜로 일어나는 거예요 — 주 2회, 매주, 식욕을 슬쩍 가져가는 약 위에서.',
      mission: '다음 주사 전에 이번 주 저항운동 2회를 일정에 박고, 오늘 단백질 1.6g/kg을 4끼로 나눠 드세요.',
      reference: { text: 'Wilding JPH 등 (2021). 과체중/비만 성인의 주 1회 세마글루타이드 (STEP-1). · Wilding JPH 등 (2025). 세마글루타이드 2.4mg 장기 체성분 결과 (DOM 추적). · ACSM Position Stand (2024). 건강과 성능을 위한 저항운동. · Phillips SM (2025). 끼니당 단백질 용량-반응과 MPS의 0.4 g/kg 한계 (맥마스터대). · Obesity Pillars (2026). GLP-1 사용자의 저항운동과 단백질 전략.', source: 'NEJM 384(11):989–1002 (2021) · DOM (2025) · MSSE — ACSM Position Stand (2024) · JISSN / 맥마스터 Phillips Lab (2025) · Obesity Pillars (2026).' },
    }
  ),
};
