/**
 * 50개 mock article — PRD §5.1 + §5.1.1 schema 준수.
 * 컴플라이언스: '진단/diagnose/measured/InBody' 0건 (PRD §10.2).
 * BigQuery 인증 만료로 fallback B 적용.
 *
 * 언어 시드: ko_kr, en_us, ja_jp (3개). 나머지 32개는 en_us fallback (INV-005).
 */

import type { Article } from '../lib/types';

// Helper: 35개 lang 중 3개 시드만, 나머지는 null (fallback)
function langs(en: any, ko?: any, ja?: any): Article['langs'] {
  return {
    en_us: en,
    ko_kr: ko ?? null,
    ja_jp: ja ?? null,
  };
}

export const ARTICLES: Article[] = [
  // ============================================================
  // CAT_01 — Tracking & Insights (5건)
  // ============================================================
  {
    article_id: 'ART_TRACK_001',
    type: 'educational',
    category: 'Tracking & Insights',
    slug: 'why-daily-weight-tracking-doesnt-work-for-everyone',
    image_group_id: 'articles/track_001',
    is_active: true,
    solution_codes: 'TRACK,INSIGHT',
    target_s_types: ['S1', 'S2'],
    target_m_types: ['M0', 'M1'],
    target_l_problems: ['L_Tracking'],
    published_at: '2026-04-12T09:00:00Z',
    updated_at: '2026-05-01T14:20:00Z',
    langs: langs(
      {
        category_emoji: '📊',
        title: "Why Daily Weight Tracking Doesn't Work for Everyone",
        summary: "Daily weigh-ins can be motivating for some, but discouraging for others. Here's how to find a tracking rhythm that fits your psychology and lifestyle.",
        mission: 'Pick one weekly weigh-in time and stick to it for 4 weeks.',
        action: {
          section_title: 'Practical Tracking Routines',
          parts: [
            { part_number: 1, title: 'Set a Fixed Time', items: ['Step on the scale right after waking, before eating or drinking.', 'Wear the same minimal clothing each time.', 'Use the same scale on the same hard floor surface.'] },
            { part_number: 2, title: 'Track Trends, Not Days', items: ['Look at 7-day moving averages instead of daily numbers.', 'Note your menstrual cycle, sodium intake, and sleep quality.', 'Focus on the direction of the trend over 4 weeks.'] },
          ],
        },
        science: {
          question: 'Why does body weight fluctuate so much day to day?',
          mechanism: 'Body weight can shift 1–2 kg within 24 hours due to water retention from sodium, glycogen storage from carbohydrates, and digestive transit. These short-term changes are not changes in body composition.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            { title: 'The Psychology of the Scale', body: 'Research suggests that self-weighing can support weight management when paired with non-judgmental feedback. However, for individuals with a history of disordered eating, frequent weigh-ins can amplify anxiety. The key is to treat the number as one data point among many — alongside sleep, energy, and how clothes fit.' },
            { title: 'When Weekly Beats Daily', body: 'For people who experience mood swings tied to scale readings, weekly weigh-ins reduce the emotional noise without sacrificing trend visibility. A 12-week weekly log gives 12 data points — enough to detect a real trend without daily volatility.' },
          ],
        },
        reference: { text: 'Steinberg DM et al. (2015). Weighing every day matters: daily weighing improves weight loss and adoption of weight control behaviors.', source: 'Journal of the Academy of Nutrition and Dietetics, 115(4), 511-518.' },
      },
      {
        category_emoji: '📊',
        title: '왜 매일 체중 재기가 모두에게 맞지 않을까',
        summary: '매일 체중을 재는 것은 누군가에겐 동기부여지만, 누군가에겐 좌절감을 준다. 당신의 심리와 라이프스타일에 맞는 트래킹 리듬을 찾는 법.',
        mission: '주 1회 같은 시간에 체중을 재고 4주간 유지해보세요.',
        action: {
          section_title: '실용적 트래킹 루틴',
          parts: [
            { part_number: 1, title: '고정 시간 설정', items: ['기상 직후, 먹거나 마시기 전에 체중을 재세요.', '매번 같은 최소한의 옷차림을 입으세요.', '같은 단단한 바닥 위 같은 체중계를 사용하세요.'] },
            { part_number: 2, title: '날이 아니라 트렌드를 보세요', items: ['매일 숫자 대신 7일 이동평균을 보세요.', '생리주기, 나트륨 섭취, 수면의 질도 함께 기록하세요.', '4주간의 방향성에 집중하세요.'] },
          ],
        },
        science: { question: '왜 체중은 하루 사이에도 이렇게 많이 변할까요?', mechanism: '체중은 나트륨에 의한 수분 저류, 탄수화물의 글리코겐 저장, 소화 통과 시간 등의 영향으로 24시간 내에 1~2kg 변동할 수 있습니다. 이런 단기 변화는 체성분 변화가 아닙니다.' },
        deep_dive: {
          enabled: true,
          blocks: [
            { title: '체중계의 심리학', body: '자가 체중 측정은 비판단적 피드백과 결합될 때 체중 관리에 도움이 될 수 있다는 연구가 있습니다. 다만 식이 장애 이력이 있는 분들에겐 잦은 측정이 불안을 증폭시킬 수 있습니다. 핵심은 숫자를 수면, 에너지, 옷이 맞는 정도 같은 여러 데이터 중 하나로 다루는 것입니다.' },
            { title: '주 1회가 매일보다 나은 때', body: '체중계 숫자에 기분이 흔들리는 분들에게 주 1회 측정은 감정적 노이즈를 줄이면서 트렌드를 놓치지 않는 균형점입니다. 12주간 주 1회 = 12개 데이터 포인트, 매일의 변동성 없이도 충분한 신호를 줍니다.' },
          ],
        },
        reference: { text: 'Steinberg DM 등 (2015). 매일 체중 측정의 중요성.', source: 'Journal of the Academy of Nutrition and Dietetics, 115(4), 511-518.' },
      },
      {
        category_emoji: '📊',
        title: '毎日の体重測定が誰にでも合うとは限らない理由',
        summary: '毎日の測定はモチベーションになる人もいれば、落ち込ませる人もいる。あなたの心理とライフスタイルに合うリズムを見つける方法。',
        mission: '週1回、決まった時間に体重を測り、4週間続けてみましょう。',
        action: null,
        science: { question: 'なぜ体重は1日のうちにこんなに変動するのですか?', mechanism: '体重は塩分による水分貯留、糖質によるグリコーゲン貯蔵、消化管通過などで24時間以内に1~2kg変動します。これらは体組成の変化ではありません。' },
        deep_dive: { enabled: true, blocks: [{ title: '体重計の心理学', body: '自己体重測定は、判断を伴わないフィードバックと組み合わせれば体重管理に役立つことが研究で示されています。' }] },
        reference: { text: 'Steinberg DM ら (2015).', source: 'Journal of the Academy of Nutrition and Dietetics, 115(4), 511-518.' },
      }
    ),
  },
  {
    article_id: 'ART_TRACK_002',
    type: 'educational',
    category: 'Tracking & Insights',
    slug: 'reading-your-body-composition-trends',
    image_group_id: 'articles/track_002',
    is_active: true,
    solution_codes: 'TRACK',
    target_s_types: ['S2'],
    target_m_types: ['M1'],
    target_l_problems: ['L_Tracking'],
    published_at: '2026-04-15T10:00:00Z',
    updated_at: '2026-05-02T11:00:00Z',
    langs: langs(
      {
        category_emoji: '📈',
        title: 'Reading Your Body Composition Trends Like a Coach',
        summary: 'Body composition data is most useful as a trend, not a snapshot. Learn the three patterns that signal real progress.',
        mission: 'Log your body composition once a week for 4 weeks and chart the trend line.',
        action: { section_title: 'Trend-Reading Checklist', parts: [{ part_number: 1, title: 'Look for Direction', items: ['Fat mass should trend down over 4+ weeks.', 'Skeletal muscle mass should hold or rise.', 'Visceral fat area should trend down.'] }] },
        science: { question: 'Why is a single measurement less useful than a trend?', mechanism: 'Hydration status, recent meals, and time of day can shift composition readings by 1–2%. A 4-week trend cancels out this noise and reveals true changes.' },
        deep_dive: { enabled: true, blocks: [{ title: 'The 4-Week Window', body: 'Body composition changes happen slowly. A 4-week window with weekly logs gives you 4 data points — enough to see direction without daily noise. If the trend is flat for 8 weeks, it may be time to adjust your approach.' }] },
        reference: { text: 'Heymsfield SB et al. (2015). Body composition: research and clinical advances.', source: 'European Journal of Clinical Nutrition, 69(11), 1183-1190.' },
      },
      { category_emoji: '📈', title: '코치처럼 체성분 트렌드 읽기', summary: '체성분 데이터는 스냅샷보다 트렌드일 때 가장 유용하다. 진짜 변화를 알려주는 3가지 패턴.', mission: '4주간 주 1회 체성분을 기록하고 트렌드 라인을 그려보세요.', action: null, science: { question: '왜 단일 측정보다 트렌드가 더 유용한가요?', mechanism: '수분 상태, 최근 식사, 시간대에 따라 체성분 값은 1~2% 변동합니다. 4주 트렌드는 이 노이즈를 상쇄하고 실제 변화를 보여줍니다.' }, deep_dive: { enabled: true, blocks: [{ title: '4주 윈도우', body: '체성분 변화는 천천히 일어납니다. 주 1회 × 4주 = 4개 데이터 포인트로 매일의 노이즈 없이 방향성을 볼 수 있습니다.' }] }, reference: { text: 'Heymsfield SB 등 (2015).', source: 'European Journal of Clinical Nutrition, 69(11), 1183-1190.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_TRACK_003',
    type: 'educational',
    category: 'Tracking & Insights',
    slug: 'three-numbers-that-matter-more-than-weight',
    image_group_id: 'articles/track_003',
    is_active: true,
    solution_codes: 'INSIGHT',
    target_s_types: ['S1'],
    target_m_types: ['M0'],
    target_l_problems: ['L_Tracking'],
    published_at: '2026-04-20T08:00:00Z',
    updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🎯', title: 'Three Numbers That Matter More Than Weight', summary: 'Waist circumference, resting energy, and protein intake tell a richer story than scale weight alone.', mission: 'Pick one of the three numbers and log it daily for 7 days.', action: { section_title: 'Three Numbers to Log', parts: [{ part_number: 1, title: 'Waist (cm)', items: ['Wrap a tape just above the hip bone, breathing out.', 'Log once weekly, same time.', 'Trend down = visceral fat trending down.'] }] }, science: { question: 'Why is waist circumference so informative?', mechanism: 'Waist circumference correlates with visceral adipose tissue, which is more metabolically active than subcutaneous fat. Changes in waist often precede scale changes.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Hidden Signal', body: 'Two people at the same weight can have very different metabolic profiles. The trio of waist + resting energy + protein gives you a 3D picture that weight alone cannot.' }] }, reference: { text: 'Ross R et al. (2020). Waist circumference as a vital sign in clinical practice.', source: 'Nature Reviews Endocrinology, 16(3), 177-189.' } },
      { category_emoji: '🎯', title: '체중보다 더 중요한 세 가지 숫자', summary: '허리둘레, 휴식 에너지, 단백질 섭취량이 체중 하나보다 훨씬 풍부한 이야기를 들려준다.', mission: '세 숫자 중 하나를 골라 7일간 매일 기록해보세요.', action: null, science: { question: '왜 허리둘레가 그렇게 정보가 풍부한가요?', mechanism: '허리둘레는 피하지방보다 대사적으로 활발한 내장지방과 상관관계가 높습니다. 허리 변화는 종종 체중 변화에 앞섭니다.' }, deep_dive: { enabled: true, blocks: [{ title: '숨겨진 신호', body: '같은 체중의 두 사람이 매우 다른 대사 프로파일을 가질 수 있습니다. 허리 + 휴식 에너지 + 단백질 세 가지는 체중 하나로는 보이지 않는 3D 그림을 그려줍니다.' }] }, reference: { text: 'Ross R 등 (2020).', source: 'Nature Reviews Endocrinology, 16(3), 177-189.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_TRACK_004',
    type: 'educational',
    category: 'Tracking & Insights',
    slug: 'how-to-set-up-your-first-wellness-dashboard',
    image_group_id: 'articles/track_004',
    is_active: true,
    solution_codes: 'TRACK',
    target_s_types: ['S0'],
    target_m_types: ['M0'],
    target_l_problems: ['L_Tracking'],
    published_at: '2026-04-22T12:00:00Z',
    updated_at: '2026-05-04T10:00:00Z',
    langs: langs(
      { category_emoji: '🗂️', title: 'How to Set Up Your First Wellness Dashboard in 10 Minutes', summary: 'A simple, no-overwhelm dashboard with three rows: input, output, and feeling.', mission: 'Spend 10 minutes today setting up your three-row dashboard.', action: { section_title: 'Three Rows', parts: [{ part_number: 1, title: 'Input Row', items: ['Calories', 'Protein (g)', 'Water (mL)'] }, { part_number: 2, title: 'Output Row', items: ['Steps', 'Active minutes', 'Sleep hours'] }, { part_number: 3, title: 'Feeling Row', items: ['Energy (1-10)', 'Mood (1-10)', 'Hunger (1-10)'] }] }, science: { question: 'Why three rows and not ten?', mechanism: 'Working memory holds 3–4 items reliably. A dashboard with 9 items across 3 rows respects this limit while covering the input/output/feeling triad.' }, deep_dive: { enabled: true, blocks: [{ title: 'Start Small, Scale Up', body: 'You can always add metrics later. The biggest cause of tracker abandonment is overwhelm in week 1. Three rows is the sweet spot.' }] }, reference: { text: 'Miller GA (1956). The magical number seven, plus or minus two.', source: 'Psychological Review, 63(2), 81-97.' } },
      undefined,
      undefined
    ),
  },
  {
    article_id: 'ART_TRACK_005',
    type: 'educational',
    category: 'Tracking & Insights',
    slug: 'when-to-stop-tracking-and-trust-your-habits',
    image_group_id: 'articles/track_005',
    is_active: true,
    solution_codes: 'INSIGHT',
    target_s_types: ['S3'],
    target_m_types: ['M2'],
    target_l_problems: ['L_Tracking'],
    published_at: '2026-04-28T09:00:00Z',
    updated_at: '2026-05-05T15:00:00Z',
    langs: langs(
      { category_emoji: '🌱', title: 'When to Stop Tracking and Trust Your Habits', summary: 'Tracking is a means, not an end. Here are the three signals that you are ready for a break.', mission: 'Identify which of the three signals applies to you today.', action: null, science: { question: 'What does the research say about exit-tracking?', mechanism: 'Once a habit is automatic (typically 8–12 weeks of consistent practice), continued tracking shows diminishing returns. Periodic check-ins every 4–8 weeks are sufficient.' }, deep_dive: { enabled: true, blocks: [{ title: 'Signal 1: Automaticity', body: 'When you eat the same way without thinking, the logging stops adding new information. Your habits are doing the work.' }, { title: 'Signal 2: Anxiety', body: 'If checking the app starts making you anxious, the tool has crossed from helper to burden. A 2-week tracking break can reset your relationship with the data.' }] }, reference: { text: 'Lally P et al. (2010). How are habits formed: Modelling habit formation in the real world.', source: 'European Journal of Social Psychology, 40(6), 998-1009.' } },
      undefined,
      undefined
    ),
  },

  // ============================================================
  // CAT_02 — Mindset & Motivation (4건)
  // ============================================================
  {
    article_id: 'ART_MIND_001',
    type: 'educational',
    category: 'Mindset & Motivation',
    slug: 'the-2-minute-rule-for-restarting-after-a-break',
    image_group_id: 'articles/mind_001',
    is_active: true,
    solution_codes: 'MINDSET',
    target_s_types: ['S0', 'S1'],
    target_m_types: ['M0'],
    target_l_problems: ['L_Motivation'],
    published_at: '2026-04-10T09:00:00Z',
    updated_at: '2026-05-01T10:00:00Z',
    langs: langs(
      { category_emoji: '🔁', title: 'The 2-Minute Rule for Restarting After a Break', summary: 'When you have been off-track for days or weeks, the first action should take less than 2 minutes. Here is why and how.', mission: 'Do one 2-minute restart action today: log one meal, walk for 2 minutes, or drink one glass of water.', action: { section_title: '2-Minute Restart Menu', parts: [{ part_number: 1, title: 'Pick One', items: ['Log a single meal.', 'Walk to the mailbox and back.', 'Drink one glass of water.', 'Write down tomorrow’s breakfast plan.'] }] }, science: { question: 'Why does 2 minutes work better than 30?', mechanism: 'Activation energy — the effort required to start — is what blocks resumption. A 2-minute action keeps activation low while still creating a behavioral entry point.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Identity Vote', body: 'Every small action is a vote for the kind of person you want to be. Two minutes of logging is a vote for "I am someone who tracks." Ten such votes in a row reshape identity.' }] }, reference: { text: 'Clear J (2018). Atomic Habits: An Easy & Proven Way to Build Good Habits.', source: 'Avery, ISBN 978-0735211292.' } },
      { category_emoji: '🔁', title: '쉬었다가 다시 시작하는 2분 규칙', summary: '며칠 혹은 몇 주 쉬었을 때, 첫 행동은 2분 이하여야 한다. 그 이유와 방법.', mission: '오늘 2분짜리 재시작 행동 하나만 해보세요: 한 끼 기록, 2분 산책, 물 한 컵.', action: null, science: { question: '왜 30분보다 2분이 더 잘 통할까요?', mechanism: '시작을 가로막는 것은 활성화 에너지(시작에 필요한 노력)입니다. 2분 행동은 이 활성화 비용을 최저로 유지하면서도 행동의 진입점을 만들어 줍니다.' }, deep_dive: { enabled: true, blocks: [{ title: '정체성 투표', body: '모든 작은 행동은 "나는 어떤 사람이고 싶은가"에 대한 한 표입니다. 2분 기록은 "나는 기록하는 사람이다"에 던지는 한 표입니다.' }] }, reference: { text: 'Clear J (2018). Atomic Habits.', source: 'Avery.' } },
      { category_emoji: '🔁', title: '休んだ後の再開のための2分ルール', summary: '数日または数週間離れた後の最初の行動は2分以下であるべき。', mission: '今日2分の再開行動を1つしてみましょう。', action: null, science: { question: 'なぜ30分より2分が良いのですか?', mechanism: '行動の開始を妨げるのは活性化エネルギーです。2分の行動はこのコストを最低に保ちます。' }, deep_dive: { enabled: true, blocks: [{ title: 'アイデンティティへの一票', body: '小さな行動はすべて「どんな自分でありたいか」への一票です。' }] }, reference: { text: 'Clear J (2018).', source: 'Avery.' } }
    ),
  },
  {
    article_id: 'ART_MIND_002', type: 'educational', category: 'Mindset & Motivation',
    slug: 'why-streaks-can-backfire-and-what-to-track-instead',
    image_group_id: 'articles/mind_002', is_active: true, solution_codes: 'MINDSET',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Motivation'],
    published_at: '2026-04-18T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🔥', title: 'Why Streaks Can Backfire — and What to Track Instead', summary: 'A 30-day streak feels great until you break it. Here is a more resilient way to track consistency.', mission: 'Switch from a streak counter to a "days completed in last 30" counter.', action: { section_title: 'The 80% Rule', parts: [{ part_number: 1, title: 'Aim for 80%', items: ['Target 24 days out of 30, not 30/30.', 'A missed day does not reset the count.', 'The window rolls forward.'] }] }, science: { question: 'Why does the all-or-nothing streak fail?', mechanism: 'Cognitive psychology shows that loss-framed goals trigger avoidance once a loss occurs. A rolling-window count avoids this trap by treating each day as independent.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Comeback', body: 'When you miss a day with a rolling count, the next day is just another data point. No "ruined" streak, no guilt, no abandonment.' }] }, reference: { text: 'Kahneman D, Tversky A (1979). Prospect theory: An analysis of decision under risk.', source: 'Econometrica, 47(2), 263-291.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_MIND_003', type: 'educational', category: 'Mindset & Motivation',
    slug: 'the-real-reason-motivation-fades-by-week-3',
    image_group_id: 'articles/mind_003', is_active: true, solution_codes: 'MINDSET',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0', 'M1'], target_l_problems: ['L_Motivation'],
    published_at: '2026-04-25T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '⏳', title: 'The Real Reason Motivation Fades by Week 3', summary: 'Week 1 feels easy. Week 3 feels impossible. The neuroscience and the fix.', mission: 'Plan one "easy week" for week 3 of your next attempt.', action: null, science: { question: 'What happens to motivation in week 3?', mechanism: 'Dopamine novelty effects fade after 14–21 days. The brain has fully adapted to the new behavior, so the reward signal drops. This is biology, not weakness.' }, deep_dive: { enabled: true, blocks: [{ title: 'Engineer the Dip', body: 'Plan week 3 to be the easiest week of your cycle. Reduce the daily target by 30%. Add a small variety element. This carries you through the trough into the long-term habit phase.' }] }, reference: { text: 'Schultz W (2016). Dopamine reward prediction-error signalling.', source: 'Nature Reviews Neuroscience, 17(3), 183-195.' } },
      { category_emoji: '⏳', title: '왜 3주차에 동기가 떨어지는가', summary: '1주차는 쉽다. 3주차는 불가능해 보인다. 그 뇌과학과 해법.', mission: '다음 도전에서 3주차를 "쉬운 주"로 미리 설계해보세요.', action: null, science: { question: '3주차에 동기에 무슨 일이 일어나나요?', mechanism: '도파민의 신규성 효과는 14~21일 후 사라집니다. 뇌가 새 행동에 완전히 적응해 보상 신호가 떨어집니다. 이건 약점이 아니라 생물학입니다.' }, deep_dive: { enabled: true, blocks: [{ title: '하강 구간을 미리 설계하기', body: '3주차를 가장 쉬운 주로 만드세요. 일일 목표를 30% 줄이고 작은 변화 요소를 추가하세요. 이렇게 골짜기를 건너 장기 습관 단계로 넘어갑니다.' }] }, reference: { text: 'Schultz W (2016).', source: 'Nature Reviews Neuroscience, 17(3), 183-195.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_MIND_004', type: 'educational', category: 'Mindset & Motivation',
    slug: 'self-compassion-beats-self-criticism-for-long-term-change',
    image_group_id: 'articles/mind_004', is_active: true, solution_codes: 'MINDSET',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Motivation'],
    published_at: '2026-04-30T09:00:00Z', updated_at: '2026-05-06T09:00:00Z',
    langs: langs(
      { category_emoji: '🌿', title: 'Self-Compassion Beats Self-Criticism for Long-Term Change', summary: 'Research is clear: kindness toward yourself after a setback predicts faster recovery than harsh self-talk.', mission: 'When you next miss a goal, write one sentence of self-compassion before any analysis.', action: null, science: { question: 'Does being "tough on yourself" actually work?', mechanism: 'Studies show that self-criticism activates the threat response, narrowing focus and reducing problem-solving. Self-compassion activates the care response, broadening attention.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Compassion Reframe', body: 'Instead of "I am so weak for skipping the workout," try "Many people would have done the same after a hard day. What can I do differently tomorrow?" This shift moves you from threat mode to problem-solving mode.' }] }, reference: { text: 'Neff KD (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself.', source: 'Self and Identity, 2(2), 85-101.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_03 — Weight & Metabolism (4건)
  // ============================================================
  {
    article_id: 'ART_WEIGHT_001', type: 'educational', category: 'Weight & Metabolism',
    slug: 'why-the-scale-stalls-after-week-4',
    image_group_id: 'articles/weight_001', is_active: true, solution_codes: 'METAB',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Weight'],
    published_at: '2026-04-05T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '⚖️', title: 'Why the Scale Stalls After Week 4 (And What Actually Helps)', summary: 'The first 4 weeks often show fast progress. Then the scale slows. Here is the biology, and the gentle adjustments that restart progress.', mission: 'Identify which of the three causes (water, adaptation, accuracy) applies to your stall.', action: { section_title: 'Three Causes of a Stall', parts: [{ part_number: 1, title: 'Water Shift', items: ['Cortisol from new exercise increases water retention.', 'Sodium and carbohydrate variability hide fat loss.', 'A 7-day average smooths this out.'] }, { part_number: 2, title: 'Metabolic Adaptation', items: ['Resting energy drops 5–10% with weight loss.', 'Adding 1,000 daily steps offsets this gently.', 'A 2-week refeed (slight calorie increase) can also help.'] }] }, science: { question: 'What is metabolic adaptation?', mechanism: 'As body mass decreases, the energy required to maintain it also decreases. Hormonal shifts (leptin, thyroid) further reduce resting energy by 5–10% beyond the predicted drop.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Refeed Concept', body: 'A brief period (10–14 days) at maintenance calories can partially reverse the hormonal adaptation without significant fat regain. Use this strategically, not as a license to overeat.' }] }, reference: { text: 'Müller MJ, Bosy-Westphal A (2013). Adaptive thermogenesis with weight loss in humans.', source: 'Obesity, 21(2), 218-228.' } },
      { category_emoji: '⚖️', title: '4주차 후 체중이 멈추는 이유', summary: '첫 4주는 빠르게 빠진다. 그 후 멈춘다. 그 생물학과 다시 진전을 만드는 조정.', mission: '세 원인(수분, 적응, 측정 정확도) 중 어느 것이 적용되는지 확인해보세요.', action: null, science: { question: '대사 적응이 뭔가요?', mechanism: '체중이 줄면 그것을 유지하는 데 필요한 에너지도 줄어듭니다. 호르몬 변화(렙틴, 갑상선)가 휴식 에너지를 예측치보다 추가 5~10% 더 떨어뜨립니다.' }, deep_dive: { enabled: true, blocks: [{ title: '리피드 개념', body: '10~14일간 유지 칼로리로 잠깐 올리는 것이 호르몬 적응을 부분적으로 되돌릴 수 있습니다. 전략적으로 사용하세요.' }] }, reference: { text: 'Müller MJ, Bosy-Westphal A (2013).', source: 'Obesity, 21(2), 218-228.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_WEIGHT_002', type: 'educational', category: 'Weight & Metabolism',
    slug: 'the-metabolic-cost-of-skipping-meals',
    image_group_id: 'articles/weight_002', is_active: true, solution_codes: 'METAB',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Weight'],
    published_at: '2026-04-12T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🍳', title: 'The Metabolic Cost of Skipping Meals (It Is Not What You Think)', summary: 'Skipping meals does not "destroy" your metabolism, but it has real costs in evening overeating and protein loss.', mission: 'For 3 days, eat protein at every meal you eat, even if you skip one.', action: null, science: { question: 'Does skipping meals actually slow metabolism?', mechanism: 'Short-term fasting (under 24h) does not significantly slow resting energy. The real cost is muscle protein breakdown (without enough protein) and rebound overeating in the evening.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Real Cost', body: 'Skipping breakfast and lunch often leads to 1,500+ calorie dinners. This pattern displaces protein, reduces total satiety, and disrupts sleep.' }] }, reference: { text: 'Paoli A et al. (2019). The influence of meal frequency and timing on health in humans.', source: 'Nutrients, 11(4), 719.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_WEIGHT_003', type: 'educational', category: 'Weight & Metabolism',
    slug: 'understanding-set-point-theory-without-giving-up',
    image_group_id: 'articles/weight_003', is_active: true, solution_codes: 'METAB',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Weight'],
    published_at: '2026-04-20T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🎚️', title: 'Understanding Set-Point Theory Without Giving Up', summary: 'Yes, your body has a preferred weight range. No, it is not fixed forever.', mission: 'Pick a 5-year target weight that is sustainable, not a 6-month one that is heroic.', action: null, science: { question: 'How flexible is the body weight set point?', mechanism: 'The set point is more accurately a "settling range" influenced by genetics, environment, and history. Long-term consistent changes (months to years) can shift the range, while short bouts cannot.' }, deep_dive: { enabled: true, blocks: [{ title: 'Settling vs. Setting', body: 'Think of it less as a fixed thermostat and more as a comfort zone. Move into a new zone and stay there for 6–12 months, and the comfort zone gradually shifts to match.' }] }, reference: { text: 'Speakman JR et al. (2011). Set points, settling points and some alternative models.', source: 'Disease Models & Mechanisms, 4(6), 733-745.' } },
      { category_emoji: '🎚️', title: '셋포인트 이론을 이해하고도 포기하지 않는 법', summary: '네, 당신의 몸은 선호하는 체중 범위가 있습니다. 아니요, 그것이 영원히 고정된 것은 아닙니다.', mission: '6개월짜리 영웅적 목표 대신 5년짜리 지속 가능한 목표 체중을 정해보세요.', action: null, science: { question: '셋포인트는 얼마나 유연한가요?', mechanism: '셋포인트는 사실 유전, 환경, 이력의 영향을 받는 "정착 범위"에 더 가깝습니다. 수개월~수년의 일관된 변화는 이 범위를 옮길 수 있지만, 단기 시도는 어렵습니다.' }, deep_dive: { enabled: true, blocks: [{ title: '정착 vs 설정', body: '고정된 온도계가 아니라 편안한 구역으로 생각하세요. 새 구역으로 옮기고 6~12개월 머무르면, 편안한 구역이 점차 그쪽으로 이동합니다.' }] }, reference: { text: 'Speakman JR 등 (2011).', source: 'Disease Models & Mechanisms, 4(6), 733-745.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_WEIGHT_004', type: 'educational', category: 'Weight & Metabolism',
    slug: 'why-muscle-mass-is-your-metabolic-savings-account',
    image_group_id: 'articles/weight_004', is_active: true, solution_codes: 'METAB,EXERCISE',
    target_s_types: ['S2', 'S3'], target_m_types: ['M1'], target_l_problems: ['L_Weight'],
    published_at: '2026-04-25T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '💪', title: 'Why Muscle Mass Is Your Metabolic Savings Account', summary: 'Every kilogram of muscle burns roughly 13 kcal/day at rest. Build it once, spend it for decades.', mission: 'Add one resistance training session this week, even just 15 minutes.', action: null, science: { question: 'How much energy does muscle actually burn?', mechanism: 'Skeletal muscle has a resting metabolic rate of about 13 kcal/kg/day, compared to about 4.5 kcal/kg/day for adipose tissue. The compounding effect over years is substantial.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Compounding Effect', body: 'Adding 2 kg of muscle adds roughly 26 kcal/day, or about 9,500 kcal/year. Over a decade, that is the energy equivalent of 12 kg of fat — without changing your diet.' }] }, reference: { text: 'Wang Z et al. (2010). Specific metabolic rates of major organs and tissues.', source: 'American Journal of Clinical Nutrition, 92(6), 1369-1377.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_04 — Lifestyle Habits (4건)
  // ============================================================
  {
    article_id: 'ART_LIFE_001', type: 'educational', category: 'Lifestyle Habits',
    slug: 'the-evening-routine-that-protects-your-morning',
    image_group_id: 'articles/life_001', is_active: true, solution_codes: 'HABIT,SLEEP',
    target_s_types: ['S0', 'S1'], target_m_types: ['M0'], target_l_problems: ['L_Habits'],
    published_at: '2026-04-08T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🌙', title: 'The Evening Routine That Protects Your Morning', summary: 'A 20-minute wind-down ritual makes the next day 40% easier. Here is what to include.', mission: 'Pick three of the five steps and do them tonight.', action: { section_title: 'Five Steps', parts: [{ part_number: 1, title: 'Order', items: ['Dim lights at 9pm.', 'Set tomorrow’s clothes and water bottle.', 'Write tomorrow’s top 3 priorities.', 'No screens 30 min before bed.', 'Bed at the same time every night.'] }] }, science: { question: 'Why does evening structure matter so much for morning behavior?', mechanism: 'Decision fatigue is real. Pre-deciding evening reduces morning friction. Combined with stable sleep timing, circadian rhythm strengthens, improving morning energy.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Pre-Commitment Trick', body: 'Setting out your gym clothes is a pre-commitment device. By the time morning arrives, the decision is already made. This is willpower jiu-jitsu — use last night’s clarity to fight this morning’s fog.' }] }, reference: { text: 'Walker MP (2017). Why We Sleep: Unlocking the Power of Sleep and Dreams.', source: 'Scribner, ISBN 978-1501144318.' } },
      { category_emoji: '🌙', title: '아침을 지키는 저녁 루틴', summary: '20분의 마무리 의식이 다음 날을 40% 더 쉽게 만든다.', mission: '다섯 단계 중 세 개를 골라 오늘 밤 해보세요.', action: null, science: { question: '왜 저녁의 구조가 아침 행동에 중요한가요?', mechanism: '결정 피로는 실제로 존재합니다. 저녁에 미리 결정해두면 아침 마찰이 줄어듭니다. 안정된 수면 시간과 결합하면 일주기 리듬이 강해져 아침 에너지가 향상됩니다.' }, deep_dive: { enabled: true, blocks: [{ title: '사전 약속의 힘', body: '운동복을 미리 꺼내놓는 것은 사전 약속 장치입니다. 아침이 오면 이미 결정은 끝나 있습니다.' }] }, reference: { text: 'Walker MP (2017). Why We Sleep.', source: 'Scribner.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_LIFE_002', type: 'educational', category: 'Lifestyle Habits',
    slug: 'micro-habits-the-30-second-rule',
    image_group_id: 'articles/life_002', is_active: true, solution_codes: 'HABIT',
    target_s_types: ['S0'], target_m_types: ['M0'], target_l_problems: ['L_Habits'],
    published_at: '2026-04-15T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '⚡', title: 'Micro-Habits: The 30-Second Rule', summary: 'If a habit takes less than 30 seconds, it bypasses procrastination almost entirely.', mission: 'Build one 30-second habit attached to a daily anchor (e.g. after brushing teeth).', action: null, science: { question: 'Why does 30 seconds bypass procrastination?', mechanism: 'Procrastination is driven by anticipated effort. At 30 seconds, the brain estimates "negligible cost" and the activation barrier disappears. Repetition then builds the neural pathway.' }, deep_dive: { enabled: true, blocks: [{ title: 'Habit Stacking', body: 'Attach the new 30-second habit to an existing strong habit ("after I brush my teeth, I drink one glass of water"). The anchor provides the cue, eliminating the need for memory.' }] }, reference: { text: 'Wood W, Neal DT (2007). A new look at habits and the habit-goal interface.', source: 'Psychological Review, 114(4), 843-863.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_LIFE_003', type: 'educational', category: 'Lifestyle Habits',
    slug: 'walking-meetings-the-most-undervalued-habit',
    image_group_id: 'articles/life_003', is_active: true, solution_codes: 'HABIT,NEAT',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Habits'],
    published_at: '2026-04-20T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🚶', title: 'Walking Meetings: The Most Undervalued Habit', summary: 'Add 30 minutes of NEAT (non-exercise activity thermogenesis) to your day without changing your schedule.', mission: 'Convert one phone call this week into a walking call.', action: null, science: { question: 'What is NEAT and why does it matter?', mechanism: 'NEAT — energy expended through non-exercise movement — can vary by 2,000 kcal/day between individuals. Walking meetings are one of the easiest interventions to add 100–200 kcal/day.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Compounding NEAT', body: '30 minutes of walking adds about 120 kcal. Done 5 days a week for a year, that is 31,200 kcal — roughly 4 kg of fat. All from changing one phone call.' }] }, reference: { text: 'Levine JA (2002). Non-exercise activity thermogenesis (NEAT).', source: 'Best Practice & Research Clinical Endocrinology & Metabolism, 16(4), 679-702.' } },
      { category_emoji: '🚶', title: '걷기 미팅: 가장 저평가된 습관', summary: '일정 변경 없이 하루에 30분의 NEAT(비운동 활동 열발생)를 추가하는 법.', mission: '이번 주 전화 통화 한 건을 걷는 통화로 바꿔보세요.', action: null, science: { question: 'NEAT가 뭐고 왜 중요한가요?', mechanism: 'NEAT는 운동이 아닌 움직임으로 소비되는 에너지로, 개인 간 하루 2,000 kcal까지 차이가 납니다. 걷기 미팅은 일일 100~200 kcal를 추가하는 가장 쉬운 방법 중 하나입니다.' }, deep_dive: { enabled: true, blocks: [{ title: 'NEAT의 복리 효과', body: '30분 걷기는 약 120 kcal를 더합니다. 주 5일, 1년이면 31,200 kcal — 약 지방 4 kg에 해당합니다. 전화 한 통을 바꾸는 것에서 시작합니다.' }] }, reference: { text: 'Levine JA (2002).', source: 'Best Practice & Research Clinical Endocrinology & Metabolism, 16(4), 679-702.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_LIFE_004', type: 'educational', category: 'Lifestyle Habits',
    slug: 'the-stressor-eater-pattern-and-how-to-break-it',
    image_group_id: 'articles/life_004', is_active: true, solution_codes: 'HABIT,MINDSET',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Habits'],
    published_at: '2026-04-28T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '🧠', title: 'The Stress-Eater Pattern (And How to Break It Gently)', summary: 'If you find yourself reaching for snacks when stressed, you are not weak — you are wired. Here is the gentle rewiring approach.', mission: 'When you next feel a stress-eating urge, wait 90 seconds before acting.', action: null, science: { question: 'Why does stress drive eating, especially toward sweet and fatty foods?', mechanism: 'Cortisol from chronic stress increases appetite and biases food choice toward energy-dense items. The reward system uses sugar and fat to dampen distress.' }, deep_dive: { enabled: true, blocks: [{ title: 'The 90-Second Rule', body: 'The neurochemical surge of an emotion lasts about 90 seconds. Wait that out, and the urge often passes. Drink water, step outside, or do 10 squats during the 90 seconds.' }] }, reference: { text: 'Adam TC, Epel ES (2007). Stress, eating and the reward system.', source: 'Physiology & Behavior, 91(4), 449-458.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_05 — Personalized Strategies (4건)
  // ============================================================
  {
    article_id: 'ART_PERS_001', type: 'educational', category: 'Personalized Strategies',
    slug: 'morning-person-vs-night-owl-which-routine-suits-you',
    image_group_id: 'articles/pers_001', is_active: true, solution_codes: 'PERSONAL,SLEEP',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Personalization'],
    published_at: '2026-04-10T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🦉', title: 'Morning Person vs Night Owl: Which Routine Actually Suits You?', summary: 'Chronotype is genetic. Fighting it costs more than working with it. Take a quick self-assessment.', mission: 'Identify your chronotype using the three signals below.', action: { section_title: 'Three Signals', parts: [{ part_number: 1, title: 'Natural Wake Time', items: ['On a free weekend with no alarm, when do you wake?', 'Before 7am — likely morning type.', 'After 9am — likely evening type.'] }] }, science: { question: 'How much of chronotype is genetic?', mechanism: 'Chronotype is approximately 50% genetic, regulated by PER and CRY gene expression patterns. The remaining variation comes from light exposure and age.' }, deep_dive: { enabled: true, blocks: [{ title: 'Working With Your Type', body: 'A morning-type person doing their hardest task at 9am sees compound returns. An evening type forcing 6am workouts often quits within weeks. Schedule heavy lifts during your high-energy window.' }] }, reference: { text: 'Roenneberg T et al. (2007). Epidemiology of the human circadian clock.', source: 'Sleep Medicine Reviews, 11(6), 429-438.' } },
      { category_emoji: '🦉', title: '아침형 vs 저녁형: 어떤 루틴이 맞을까', summary: '크로노타입은 유전이다. 거스르는 데 드는 비용이 맞춰가는 것보다 크다.', mission: '아래 세 가지 신호로 당신의 크로노타입을 확인해보세요.', action: null, science: { question: '크로노타입은 얼마나 유전인가요?', mechanism: '크로노타입은 약 50% 유전으로, PER과 CRY 유전자 발현 패턴에 의해 조절됩니다. 나머지는 빛 노출과 나이에서 옵니다.' }, deep_dive: { enabled: true, blocks: [{ title: '자기 타입과 함께 일하기', body: '아침형이 9시에 가장 어려운 작업을 하면 복리 수익이 납니다. 저녁형이 6시 운동을 강행하면 몇 주 안에 포기합니다.' }] }, reference: { text: 'Roenneberg T 등 (2007).', source: 'Sleep Medicine Reviews, 11(6), 429-438.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_PERS_002', type: 'educational', category: 'Personalized Strategies',
    slug: 'how-to-design-a-routine-around-your-actual-life',
    image_group_id: 'articles/pers_002', is_active: true, solution_codes: 'PERSONAL',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0'], target_l_problems: ['L_Personalization'],
    published_at: '2026-04-18T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🛠️', title: 'How to Design a Routine Around Your Actual Life (Not Someone Else’s)', summary: 'Influencer routines optimize for influencer life. Here is how to build one for yours.', mission: 'Map your week with energy and constraint cards before adding any new habits.', action: null, science: { question: 'Why do generic routines fail?', mechanism: 'Adherence is determined by friction. A routine that ignores your work schedule, family, or energy patterns creates daily decision points where falling off is the path of least resistance.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Constraint Map', body: 'List your fixed constraints (work hours, kids, commute) before listing aspirations. Build habits in the gaps that remain, not on top of an idealized schedule.' }] }, reference: { text: 'Gardner B et al. (2012). Making health habitual: the psychology of "habit-formation" and general practice.', source: 'British Journal of General Practice, 62(605), 664-666.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_PERS_003', type: 'educational', category: 'Personalized Strategies',
    slug: 'introvert-friendly-fitness-strategies',
    image_group_id: 'articles/pers_003', is_active: true, solution_codes: 'PERSONAL,EXERCISE',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Personalization'],
    published_at: '2026-04-25T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '🤫', title: 'Introvert-Friendly Fitness Strategies That Actually Stick', summary: 'Group classes are great for some. For others, they are the reason gym memberships go unused. Here are solo-friendly alternatives.', mission: 'Choose one solo activity and schedule three sessions this week.', action: null, science: { question: 'Does social context affect exercise adherence?', mechanism: 'Personality strongly influences which exercise contexts feel rewarding versus draining. Introverts often show better long-term adherence with solo or small-group activities.' }, deep_dive: { enabled: true, blocks: [{ title: 'Solo Options That Work', body: 'Walking, swimming laps, home strength training, and cycling all offer the same physiological benefits as group classes — without the social cost. The best workout is the one you actually do.' }] }, reference: { text: 'Rhodes RE, Smith NEI (2006). Personality correlates of physical activity.', source: 'British Journal of Sports Medicine, 40(12), 958-965.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_PERS_004', type: 'educational', category: 'Personalized Strategies',
    slug: 'busy-parent-survival-guide-for-staying-healthy',
    image_group_id: 'articles/pers_004', is_active: true, solution_codes: 'PERSONAL',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0', 'M1'], target_l_problems: ['L_Personalization'],
    published_at: '2026-04-30T09:00:00Z', updated_at: '2026-05-06T09:00:00Z',
    langs: langs(
      { category_emoji: '👨‍👩‍👧', title: 'Busy Parent Survival Guide for Staying Healthy', summary: 'Ten minutes is what you have. Here is how to make it count.', mission: 'Build one 10-minute health block into your day this week.', action: null, science: { question: 'Is 10 minutes really enough?', mechanism: 'Research shows that short, frequent bouts of activity (3 × 10 min) produce comparable cardiovascular benefits to a single 30-min session, with better adherence.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Parent Stack', body: 'Combine your 10 min with an existing parent activity — squats while reading bedtime stories, push-ups while pasta boils, stretches during baby naps. The activity costs you almost nothing extra in time.' }] }, reference: { text: 'Murphy MH et al. (2009). The effect of walking on fitness, fatness and resting blood pressure.', source: 'Preventive Medicine, 48(2), 108-117.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_06 — Situational Tips (4건)
  // ============================================================
  {
    article_id: 'ART_SIT_001', type: 'educational', category: 'Situational Tips',
    slug: 'how-to-eat-well-at-restaurants-without-being-difficult',
    image_group_id: 'articles/sit_001', is_active: true, solution_codes: 'SITUATION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Situations'],
    published_at: '2026-04-12T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🍽️', title: 'How to Eat Well at Restaurants Without Being "That Person"', summary: 'You can enjoy restaurants without sacrificing goals. Six gentle strategies that work.', mission: 'Apply two of the six strategies at your next restaurant visit.', action: { section_title: 'Six Gentle Strategies', parts: [{ part_number: 1, title: 'Before', items: ['Check the menu online and pre-decide.', 'Have a small protein snack 30 min before.'] }, { part_number: 2, title: 'At the Table', items: ['Order water first.', 'Share dessert if you want it.', 'Eat the protein and vegetables before the starch.', 'Stop at "satisfied," not "full."'] }] }, science: { question: 'Why does pre-deciding work so well?', mechanism: 'Decisions made in a calm state are more aligned with long-term goals than decisions made under social pressure or hunger. Pre-deciding moves the choice to a better-quality decision moment.' }, deep_dive: { enabled: true, blocks: [{ title: 'No Special Orders Needed', body: 'You do not need to ask for the dressing on the side or grill your fish. Order normally and apply the table strategies. Simpler, less awkward, equally effective.' }] }, reference: { text: 'Wansink B, Sobal J (2007). Mindless eating: The 200 daily food decisions we overlook.', source: 'Environment and Behavior, 39(1), 106-123.' } },
      { category_emoji: '🍽️', title: '눈치 보지 않고 외식에서 건강하게 먹는 법', summary: '외식을 즐기면서도 목표를 지킬 수 있다. 효과적인 6가지 부드러운 전략.', mission: '다음 외식에서 6가지 중 2개를 적용해보세요.', action: null, science: { question: '미리 결정하는 것이 왜 효과적인가요?', mechanism: '평온한 상태에서 내린 결정이 사회적 압력이나 배고픔 속에서 내린 결정보다 장기 목표와 일치합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '특별 주문이 필요 없습니다', body: '소스 따로, 그릴로 구워달라 같은 요청 없이도 됩니다. 그냥 평범하게 주문하고 테이블 전략만 적용하세요.' }] }, reference: { text: 'Wansink B, Sobal J (2007).', source: 'Environment and Behavior, 39(1), 106-123.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_SIT_002', type: 'educational', category: 'Situational Tips',
    slug: 'travel-week-the-minimum-viable-routine',
    image_group_id: 'articles/sit_002', is_active: true, solution_codes: 'SITUATION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Situations'],
    published_at: '2026-04-19T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '✈️', title: 'Travel Week: The Minimum Viable Routine', summary: 'On the road, perfect is the enemy of "anything at all." Here is your floor — never drop below it.', mission: 'Define your personal "floor" for travel before your next trip.', action: null, science: { question: 'Why is having a "floor" more effective than a "plan"?', mechanism: 'Travel disrupts plans. A floor — a minimum you commit to no matter what — is robust to disruption. Even hitting the floor preserves identity and momentum.' }, deep_dive: { enabled: true, blocks: [{ title: 'Sample Floor', body: '20 minutes of walking + one serving of protein at one meal + 2 L water. That is it. Anything above is bonus, but the floor never moves.' }] }, reference: { text: 'Buman MP et al. (2014). Reallocating time to sleep, sedentary behaviors, or active behaviors.', source: 'American Journal of Epidemiology, 179(3), 323-334.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_SIT_003', type: 'educational', category: 'Situational Tips',
    slug: 'sick-week-recovery-without-derailing',
    image_group_id: 'articles/sit_003', is_active: true, solution_codes: 'SITUATION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Situations'],
    published_at: '2026-04-25T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '🤒', title: 'Sick Week: Recovery Without Derailing Your Routine', summary: 'Rest is the goal. But here are three small actions that keep you connected.', mission: 'Pick the one connection action that requires the least energy.', action: null, science: { question: 'Why does staying connected to a routine help recovery?', mechanism: 'Total disconnection lengthens the "restart cost" after illness. One small action per day keeps the neural pathway warm without taxing recovery energy.' }, deep_dive: { enabled: true, blocks: [{ title: 'Three Low-Energy Actions', body: 'Drink one extra glass of water. Open the app and look at last week’s data. Plan one meal for the day you feel better. Each takes 60 seconds and preserves continuity.' }] }, reference: { text: 'Kreher JB, Schwartz JB (2012). Overtraining syndrome: a practical guide.', source: 'Sports Health, 4(2), 128-138.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_SIT_004', type: 'educational', category: 'Situational Tips',
    slug: 'holidays-and-celebrations-a-realistic-approach',
    image_group_id: 'articles/sit_004', is_active: true, solution_codes: 'SITUATION',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Situations'],
    published_at: '2026-04-30T09:00:00Z', updated_at: '2026-05-06T09:00:00Z',
    langs: langs(
      { category_emoji: '🎉', title: 'Holidays and Celebrations: A Realistic Approach', summary: 'Trying to "be perfect" during a holiday usually ends in giving up entirely. Aim for "no worse than maintenance."', mission: 'Before your next celebration, set a maintenance target instead of a deficit target.', action: null, science: { question: 'What happens when we try to maintain a deficit during celebrations?', mechanism: 'Restriction during high-emotional-reward events triggers a rebound effect. Maintenance targets reduce restriction, eliminate the rebound, and preserve total trajectory.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Trajectory View', body: 'A 2-week holiday at maintenance + 50 weeks at a small deficit beats 6 weeks of perfection followed by 46 weeks of giving up. Zoom out.' }] }, reference: { text: 'Yanovski JA, Yanovski SZ (2000). A prospective study of holiday weight gain.', source: 'New England Journal of Medicine, 342(12), 861-867.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_07 — Diet & Nutrition (5건)
  // ============================================================
  {
    article_id: 'ART_DIET_001', type: 'educational', category: 'Diet & Nutrition',
    slug: 'the-protein-first-principle',
    image_group_id: 'articles/diet_001', is_active: true, solution_codes: 'PRO',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0', 'M1'], target_l_problems: ['L_Nutrition'],
    published_at: '2026-04-05T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🍗', title: 'The Protein-First Principle (And Why It Quietly Changes Everything)', summary: 'Eat your protein first at every meal. The downstream effects on appetite, body composition, and energy are larger than you think.', mission: 'For 7 days, eat the protein portion of every meal before anything else.', action: { section_title: 'Protein-First Habits', parts: [{ part_number: 1, title: 'Practical Targets', items: ['1.6 g/kg body weight per day for adults active in resistance training.', 'Distribute across 3–4 meals, 25–40 g per meal.', 'Choose lean sources: chicken, fish, tofu, Greek yogurt, eggs.'] }] }, science: { question: 'Why does eating protein first work?', mechanism: 'Protein triggers satiety hormones (PYY, GLP-1) earlier in the meal, reducing total food consumed. It also displaces lower-quality calories without explicit restriction.' }, deep_dive: { enabled: true, blocks: [{ title: 'Beyond Body Composition', body: 'Higher protein intake (1.6–2.2 g/kg) supports muscle preservation during a calorie deficit, reduces hunger between meals, and improves blood sugar stability. It is one of the highest-leverage nutrition changes available.' }, { title: 'For Vegetarians and Vegans', body: 'Tofu, tempeh, lentils, edamame, seitan, and Greek yogurt (if lacto-veg) all hit 15–25 g protein per serving. Combining sources within a day covers the full amino acid profile easily.' }] }, reference: { text: 'Morton RW et al. (2018). A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength.', source: 'British Journal of Sports Medicine, 52(6), 376-384.' } },
      { category_emoji: '🍗', title: '단백질 먼저 원칙', summary: '매 끼니에 단백질부터 먹어보세요. 식욕, 체성분, 에너지에 미치는 후속 효과가 생각보다 큽니다.', mission: '7일간 모든 끼니에서 단백질 부분을 가장 먼저 먹어보세요.', action: null, science: { question: '왜 단백질을 먼저 먹는 게 효과적인가요?', mechanism: '단백질은 식사 초반에 포만 호르몬(PYY, GLP-1)을 자극하여 총 섭취량을 줄입니다. 또한 명시적 제한 없이 저질 칼로리를 자연스럽게 밀어냅니다.' }, deep_dive: { enabled: true, blocks: [{ title: '체성분을 넘어서', body: '단백질 섭취량을 늘리면(1.6~2.2 g/kg) 칼로리 부족 시 근육 보존, 식간 허기 감소, 혈당 안정성 개선 효과가 있습니다.' }] }, reference: { text: 'Morton RW 등 (2018).', source: 'British Journal of Sports Medicine, 52(6), 376-384.' } },
      { category_emoji: '🍗', title: 'タンパク質ファースト原則', summary: '毎食タンパク質から食べる。食欲、体組成、エネルギーへの効果は予想以上に大きい。', mission: '7日間、毎食タンパク質を最初に食べてみましょう。', action: null, science: { question: 'なぜタンパク質から食べると効果的なのですか?', mechanism: 'タンパク質は食事初期に満腹ホルモン(PYY、GLP-1)を刺激し、総摂取量を減らします。' }, deep_dive: { enabled: true, blocks: [{ title: '体組成を超えて', body: '高タンパク摂取(1.6~2.2 g/kg)は減量中の筋肉保存、食間の空腹減少、血糖安定をサポートします。' }] }, reference: { text: 'Morton RW ら (2018).', source: 'British Journal of Sports Medicine, 52(6), 376-384.' } }
    ),
  },
  {
    article_id: 'ART_DIET_002', type: 'educational', category: 'Diet & Nutrition',
    slug: 'fiber-the-underrated-macronutrient',
    image_group_id: 'articles/diet_002', is_active: true, solution_codes: 'FIBER',
    target_s_types: ['S0', 'S1'], target_m_types: ['M0'], target_l_problems: ['L_Nutrition'],
    published_at: '2026-04-12T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🌾', title: 'Fiber: The Underrated Macronutrient', summary: 'Most adults consume half the recommended fiber. Closing that gap quietly improves satiety, gut health, and glucose response.', mission: 'Add one fiber-rich food (beans, oats, berries) to one meal each day this week.', action: null, science: { question: 'Why is fiber so impactful?', mechanism: 'Fiber slows gastric emptying (longer satiety), feeds beneficial gut bacteria (short-chain fatty acid production), and blunts post-meal glucose spikes by 20–40%.' }, deep_dive: { enabled: true, blocks: [{ title: 'Easy Wins', body: '½ cup of cooked black beans = 7 g fiber. ½ cup oats = 4 g. 1 cup raspberries = 8 g. Three of these in a day covers most of the gap.' }] }, reference: { text: 'Reynolds A et al. (2019). Carbohydrate quality and human health: a series of systematic reviews and meta-analyses.', source: 'The Lancet, 393(10170), 434-445.' } },
      { category_emoji: '🌾', title: '식이섬유: 저평가된 영양소', summary: '대부분의 성인은 권장량의 절반만 섭취한다. 그 격차를 메우는 것만으로 포만감, 장 건강, 혈당 반응이 개선된다.', mission: '이번 주 매일 한 끼에 섬유질이 풍부한 음식(콩, 귀리, 베리)을 추가해보세요.', action: null, science: { question: '왜 식이섬유의 영향이 크나요?', mechanism: '섬유질은 위 비움을 늦춰 포만감을 유지하고, 유익한 장내 세균에게 먹이를 주며, 식후 혈당 스파이크를 20~40% 완화합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '쉬운 승리', body: '조리한 검은콩 ½컵 = 7 g 섬유. 귀리 ½컵 = 4 g. 라즈베리 1컵 = 8 g. 하루 세 가지면 격차의 대부분이 채워집니다.' }] }, reference: { text: 'Reynolds A 등 (2019).', source: 'The Lancet, 393(10170), 434-445.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_DIET_003', type: 'educational', category: 'Diet & Nutrition',
    slug: 'reading-nutrition-labels-without-getting-lost',
    image_group_id: 'articles/diet_003', is_active: true, solution_codes: 'NUTRITION',
    target_s_types: ['S0'], target_m_types: ['M0'], target_l_problems: ['L_Nutrition'],
    published_at: '2026-04-18T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🏷️', title: 'Reading Nutrition Labels Without Getting Lost', summary: 'You do not need to memorize every number. Three quick checks tell you what matters.', mission: 'Apply the 3-check method to one packaged food at your next grocery trip.', action: { section_title: 'Three Checks', parts: [{ part_number: 1, title: 'Order', items: ['Serving size — is it realistic?', 'Protein vs. added sugar ratio.', 'Fiber per 100 g (5+ g is good).'] }] }, science: { question: 'Why these three checks specifically?', mechanism: 'Serving size deception is the #1 label trap. Protein-to-added-sugar ratio captures food quality faster than reading every nutrient. Fiber correlates with whole-food density.' }, deep_dive: { enabled: true, blocks: [{ title: 'Practical Examples', body: 'A "healthy" granola bar with 12 g sugar and 3 g protein per serving is a candy bar with marketing. A yogurt with 15 g protein and 5 g sugar is the opposite.' }] }, reference: { text: 'Roberto CA, Khandpur N (2014). Improving the design of nutrition labels.', source: 'International Journal of Obesity Supplements, 4(S1), S25-S31.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_DIET_004', type: 'educational', category: 'Diet & Nutrition',
    slug: 'meal-prep-without-the-burnout',
    image_group_id: 'articles/diet_004', is_active: true, solution_codes: 'NUTRITION,HABIT',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Nutrition'],
    published_at: '2026-04-22T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '🥘', title: 'Meal Prep Without the Burnout', summary: 'Sunday meal prep fails because it tries to do too much. Prep components, not full meals.', mission: 'Prep three components this Sunday: a protein, a grain, and a vegetable.', action: null, science: { question: 'Why is component prep more sustainable than meal prep?', mechanism: 'Eating the same meal 7 days in a row leads to "food fatigue" and abandonment. Component prep lets you assemble varied meals from prepared parts, keeping novelty without daily cooking.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Component Stack', body: 'Roast a tray of chicken, cook a pot of rice, and roast a tray of vegetables. Six different meals possible from these three pieces, varied by sauce, herb, or wrap.' }] }, reference: { text: 'Hartmann C et al. (2013). Importance of cooking skills for balanced food choices.', source: 'Appetite, 65, 125-131.' } },
      { category_emoji: '🥘', title: '번아웃 없는 식단 준비', summary: '일요일 밀프렙이 실패하는 이유는 너무 많은 걸 하려 하기 때문. 완성 메뉴 대신 구성 요소를 준비하세요.', mission: '이번 일요일에 단백질 1, 곡물 1, 채소 1 세 가지만 준비해보세요.', action: null, science: { question: '왜 완성 메뉴 대신 구성 요소가 더 지속 가능한가요?', mechanism: '같은 식사를 7일 연속 먹으면 음식 피로가 와서 포기하게 됩니다. 구성 요소 준비는 다양한 조합을 가능하게 합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '구성 요소 스택', body: '닭고기 한 판, 밥 한 솥, 채소 한 판을 구워두면 소스/허브/랩에 따라 6가지 식사가 나옵니다.' }] }, reference: { text: 'Hartmann C 등 (2013).', source: 'Appetite, 65, 125-131.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_DIET_005', type: 'educational', category: 'Diet & Nutrition',
    slug: 'snacks-that-actually-help-you-reach-your-goals',
    image_group_id: 'articles/diet_005', is_active: true, solution_codes: 'NUTRITION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Nutrition'],
    published_at: '2026-04-28T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '🥜', title: 'Snacks That Actually Help You Reach Your Goals', summary: 'A good snack has 10+ g protein, 3+ g fiber, and under 250 kcal. Here are ten that fit.', mission: 'Stock three of the ten snacks in your home or office this week.', action: null, science: { question: 'Why protein + fiber snacks?', mechanism: 'Protein + fiber combinations sustain satiety for 2–3 hours, reducing the urge for a second snack and improving meal timing.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Ten', body: '1) Greek yogurt + berries. 2) Hard-boiled egg + apple. 3) Edamame. 4) Cottage cheese + cinnamon. 5) Roasted chickpeas. 6) Tuna packet + cucumber. 7) Beef or turkey jerky + nuts. 8) Hummus + carrots. 9) Smoked salmon + cucumber rounds. 10) High-protein cottage cheese pouch.' }] }, reference: { text: 'Leidy HJ et al. (2015). The role of protein in weight loss and maintenance.', source: 'American Journal of Clinical Nutrition, 101(6), 1320S-1329S.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_08 — Hydration & Beverages (4건)
  // ============================================================
  {
    article_id: 'ART_HYD_001', type: 'educational', category: 'Hydration & Beverages',
    slug: 'the-2-liter-rule-myth-and-what-to-do-instead',
    image_group_id: 'articles/hyd_001', is_active: true, solution_codes: 'HYDRATION',
    target_s_types: ['S0'], target_m_types: ['M0'], target_l_problems: ['L_Hydration'],
    published_at: '2026-04-08T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '💧', title: 'The "2-Liter Rule" Myth (And What to Do Instead)', summary: 'The 2-liter rule is a useful starting point, but your actual needs vary by 30–50% based on size, climate, and activity.', mission: 'For 3 days, track your water intake and notice when you feel thirsty.', action: null, science: { question: 'Where did the 2-liter rule come from?', mechanism: 'A 1945 dietary recommendation suggested 1 mL water per kcal consumed. For a 2,000 kcal diet, this is 2 L — but it includes water from food (about 20%), making the actual fluid need closer to 1.6 L.' }, deep_dive: { enabled: true, blocks: [{ title: 'A Better Rule', body: 'Aim for urine that is pale yellow (not clear, not dark). This visual check beats any liter target because it adjusts automatically for your size, climate, and activity.' }] }, reference: { text: 'Valtin H (2002). "Drink at least eight glasses of water a day." Really? Is there scientific evidence for "8 × 8"?', source: 'American Journal of Physiology, 283(5), R993-R1004.' } },
      { category_emoji: '💧', title: '2리터 규칙의 신화와 대신 할 일', summary: '2리터 규칙은 시작점으로 유용하지만 실제 필요량은 체격, 기후, 활동에 따라 30~50% 다르다.', mission: '3일간 물 섭취량과 갈증 시점을 기록해보세요.', action: null, science: { question: '2리터 규칙은 어디서 왔나요?', mechanism: '1945년 권고로, 섭취 1 kcal당 1 mL 물을 권장했습니다. 2,000 kcal 식단이면 2 L이지만 음식에서 오는 수분(~20%)을 포함하므로 실제 음용량은 약 1.6 L입니다.' }, deep_dive: { enabled: true, blocks: [{ title: '더 나은 규칙', body: '소변 색이 연한 노란색(투명도, 어두움도 아닌)을 목표로 하세요. 이 시각 점검이 어떤 리터 목표보다 우수합니다.' }] }, reference: { text: 'Valtin H (2002).', source: 'American Journal of Physiology, 283(5), R993-R1004.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_HYD_002', type: 'educational', category: 'Hydration & Beverages',
    slug: 'coffee-friend-or-foe-it-depends',
    image_group_id: 'articles/hyd_002', is_active: true, solution_codes: 'HYDRATION,SLEEP',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Hydration'],
    published_at: '2026-04-15T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '☕', title: 'Coffee: Friend or Foe? (It Depends on Three Things)', summary: 'Coffee has real benefits and real costs. The cutoff time, what you add, and your genetics matter more than the cup count.', mission: 'Set a personal coffee cutoff at 2pm for one week and notice your sleep.', action: null, science: { question: 'How long does caffeine actually stay in your system?', mechanism: 'Caffeine half-life is 5–6 hours on average, but ranges from 2 hours (fast metabolizers) to 9 hours (slow metabolizers) based on CYP1A2 gene variants. A 2pm coffee leaves 25% of the caffeine in your bloodstream at midnight for an average metabolizer.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Hidden Costs', body: 'Caffeine after 2pm reduces deep sleep by 20–30% even in people who "fall asleep fine." Deep sleep is where memory consolidation and muscle recovery happen, so the cost is real even if subjectively unnoticed.' }] }, reference: { text: 'Drake C et al. (2013). Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed.', source: 'Journal of Clinical Sleep Medicine, 9(11), 1195-1200.' } },
      { category_emoji: '☕', title: '커피: 친구인가 적인가 (그건 세 가지에 달렸다)', summary: '커피에는 실제 이점과 실제 비용이 있다. 마시는 시간, 첨가물, 유전이 컵 수보다 중요하다.', mission: '일주일간 오후 2시 커피 컷오프를 설정하고 수면 변화를 관찰해보세요.', action: null, science: { question: '카페인은 실제로 얼마나 오래 몸에 남나요?', mechanism: '카페인의 반감기는 평균 5~6시간이지만, CYP1A2 유전자 변이에 따라 2시간(빠른 대사)에서 9시간(느린 대사) 사이입니다.' }, deep_dive: { enabled: true, blocks: [{ title: '숨겨진 비용', body: '오후 2시 이후 카페인은 "잠은 잘 들어도" 깊은 수면을 20~30% 줄입니다. 깊은 수면은 기억 통합과 근육 회복이 일어나는 시간이라 비용은 실재합니다.' }] }, reference: { text: 'Drake C 등 (2013).', source: 'Journal of Clinical Sleep Medicine, 9(11), 1195-1200.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_HYD_003', type: 'educational', category: 'Hydration & Beverages',
    slug: 'electrolytes-when-water-alone-isnt-enough',
    image_group_id: 'articles/hyd_003', is_active: true, solution_codes: 'HYDRATION',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0'], target_l_problems: ['L_Hydration'],
    published_at: '2026-04-22T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '⚡', title: 'Electrolytes: When Water Alone Is Not Enough', summary: 'For most people, water works. For some situations, you need sodium, potassium, and magnesium too.', mission: 'Identify which of the three situations applies to you today.', action: null, science: { question: 'When do electrolytes matter most?', mechanism: 'Electrolyte balance becomes important when you lose 2%+ of body water (heavy sweat, illness, fasted long activity), or when sodium intake is unusually low (low-carb diets shed water+sodium).' }, deep_dive: { enabled: true, blocks: [{ title: 'The Three Situations', body: '1) Workouts longer than 60 minutes in heat. 2) The first 2 weeks of a low-carb diet. 3) Recovery from illness with fever or GI symptoms. Outside these, plain water is usually fine.' }] }, reference: { text: 'Sawka MN et al. (2007). American College of Sports Medicine position stand: exercise and fluid replacement.', source: 'Medicine & Science in Sports & Exercise, 39(2), 377-390.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_HYD_004', type: 'educational', category: 'Hydration & Beverages',
    slug: 'sneaky-liquid-calories-the-300-calorie-blindspot',
    image_group_id: 'articles/hyd_004', is_active: true, solution_codes: 'HYDRATION,NUTRITION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Hydration'],
    published_at: '2026-04-26T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '🥤', title: 'Sneaky Liquid Calories: The 300-Calorie Blind Spot', summary: 'Your daily latte, juice, or smoothie can add 300 kcal without registering as "food." Audit your liquids.', mission: 'For 3 days, write down every beverage and its calories.', action: null, science: { question: 'Why do liquid calories evade satiety?', mechanism: 'The body has weaker satiety signals for liquid than solid foods. A 300-kcal smoothie creates much less fullness than a 300-kcal solid meal, so total daily intake increases without compensation.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Audit', body: 'Common surprises: a 16 oz latte (180 kcal), a "small" smoothie (350 kcal), a glass of orange juice (110 kcal). Two of these = 640 kcal — equivalent to skipping or doubling a meal.' }] }, reference: { text: 'DiMeglio DP, Mattes RD (2000). Liquid versus solid carbohydrate: effects on food intake and body weight.', source: 'International Journal of Obesity, 24(6), 794-800.' } },
      { category_emoji: '🥤', title: '몰래 들어오는 액체 칼로리: 300 kcal 사각지대', summary: '하루의 라떼, 주스, 스무디가 음식이 아닌 채로 300 kcal를 더한다. 액체를 감사하라.', mission: '3일간 모든 음료와 칼로리를 기록해보세요.', action: null, science: { question: '왜 액체 칼로리는 포만감을 피해갈까요?', mechanism: '신체는 고체보다 액체에 대해 약한 포만 신호를 보냅니다. 300 kcal 스무디는 300 kcal 고형식보다 훨씬 적은 포만감을 만들어 보상 없이 일일 섭취량이 증가합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '감사 결과', body: '흔한 놀라움: 16 oz 라떼 (180 kcal), "작은" 스무디 (350 kcal), 오렌지 주스 한 잔 (110 kcal). 이 중 두 개면 640 kcal — 한 끼를 건너뛰거나 두 배로 먹은 셈입니다.' }] }, reference: { text: 'DiMeglio DP, Mattes RD (2000).', source: 'International Journal of Obesity, 24(6), 794-800.' } },
      undefined
    ),
  },

  // ============================================================
  // CAT_09 — Health & Conditions (4건) — MedicalWebPage JSON-LD
  // ============================================================
  {
    article_id: 'ART_HEALTH_001', type: 'educational', category: 'Health & Conditions',
    slug: 'understanding-blood-sugar-without-fear',
    image_group_id: 'articles/health_001', is_active: true, solution_codes: 'HEALTH',
    target_s_types: ['S2', 'S3'], target_m_types: ['M1', 'M2'], target_l_problems: ['L_Health'],
    published_at: '2026-04-08T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🩸', title: 'Understanding Blood Sugar Without Fear', summary: 'You do not need a continuous glucose monitor to manage your blood sugar. Three lifestyle levers do most of the work.', mission: 'Add a 10-minute walk after one meal today.', action: { section_title: 'Three Lifestyle Levers', parts: [{ part_number: 1, title: 'Order', items: ['Eat protein and vegetables first, carbs last.', 'Walk 10–15 minutes after meals.', 'Aim for 25+ g fiber per day.'] }] }, science: { question: 'Why does walking after meals help blood sugar?', mechanism: 'Light movement after eating activates muscle glucose uptake without insulin, blunting the post-meal glucose rise by 10–30% in healthy adults.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Order Matters', body: 'A salad-first, protein-second, carb-last meal order can flatten the glucose curve significantly compared to eating the same foods in reverse order. Same calories, very different metabolic response.' }, { title: 'When to See a Professional', body: 'If you have persistent fatigue, intense thirst, or family history of diabetes, schedule a check-up. This article is educational — your healthcare provider can interpret your specific situation.' }] }, reference: { text: 'Shukla AP et al. (2015). Food order has a significant impact on postprandial glucose and insulin levels.', source: 'Diabetes Care, 38(7), e98-e99.' } },
      { category_emoji: '🩸', title: '두려움 없이 혈당 이해하기', summary: '연속 혈당 모니터 없이도 혈당을 관리할 수 있다. 세 가지 라이프스타일 지렛대가 대부분의 일을 한다.', mission: '오늘 한 끼 후 10분 산책을 추가해보세요.', action: null, science: { question: '왜 식후 걷기가 혈당에 도움이 되나요?', mechanism: '식후 가벼운 움직임은 인슐린 없이 근육 포도당 흡수를 활성화하여 식후 혈당 상승을 건강한 성인에서 10~30% 완화합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '순서가 중요합니다', body: '샐러드 먼저, 단백질 두 번째, 탄수화물 마지막 순서는 같은 음식을 반대 순서로 먹는 것보다 혈당 곡선을 훨씬 평탄하게 만듭니다.' }, { title: '전문가를 찾아야 할 때', body: '지속적 피로, 강한 갈증, 가족력이 있다면 검진을 받으세요. 이 글은 교육 목적이며, 의료진이 당신의 상황을 해석합니다.' }] }, reference: { text: 'Shukla AP 등 (2015).', source: 'Diabetes Care, 38(7), e98-e99.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_HEALTH_002', type: 'educational', category: 'Health & Conditions',
    slug: 'inflammation-the-silent-driver',
    image_group_id: 'articles/health_002', is_active: true, solution_codes: 'HEALTH',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Health'],
    published_at: '2026-04-16T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🔥', title: 'Inflammation: The Silent Driver Behind Many Conditions', summary: 'Chronic low-grade inflammation links to many long-term conditions. Diet and sleep are your strongest levers.', mission: 'Add one omega-3 source (salmon, walnuts, flax) to your week.', action: null, science: { question: 'What drives chronic inflammation in the first place?', mechanism: 'Persistent inflammation is driven by factors like sleep deprivation, sedentary behavior, and a diet high in ultra-processed foods. Each factor adds inflammatory signaling that the body normally clears overnight.' }, deep_dive: { enabled: true, blocks: [{ title: 'Five Anti-Inflammatory Habits', body: '1) Sleep 7–9 hours. 2) 30+ min daily movement. 3) Omega-3 weekly. 4) Colorful vegetables daily. 5) Limit ultra-processed foods. None of these are extreme, but together they shift the inflammatory tone of your week.' }] }, reference: { text: 'Calder PC et al. (2017). A consideration of biomarkers to be used for evaluation of inflammation in human nutritional studies.', source: 'British Journal of Nutrition, 109(S1), S1-S34.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_HEALTH_003', type: 'educational', category: 'Health & Conditions',
    slug: 'gut-health-101-the-microbiome-basics',
    image_group_id: 'articles/health_003', is_active: true, solution_codes: 'HEALTH,NUTRITION',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Health'],
    published_at: '2026-04-22T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🦠', title: 'Gut Health 101: The Microbiome Basics That Matter', summary: 'Your gut microbiome shapes immunity, mood, and energy. Three habits help it thrive — no expensive supplements needed.', mission: 'Eat 30 different plant foods this week (any amount counts).', action: null, science: { question: 'Why does plant diversity matter so much for gut health?', mechanism: 'Different plant fibers feed different bacterial species. Greater dietary diversity correlates with greater microbiome diversity, which correlates with stronger immune function and resilience.' }, deep_dive: { enabled: true, blocks: [{ title: 'The 30-Plant Challenge', body: 'It is easier than it sounds. One stir-fry can have 8+ plants (onion, garlic, broccoli, peppers, mushrooms, ginger, snap peas, scallions). Three meals like that in a week and you are 24 plants in.' }] }, reference: { text: 'McDonald D et al. (2018). American Gut: an open platform for citizen science microbiome research.', source: 'mSystems, 3(3), e00031-18.' } },
      { category_emoji: '🦠', title: '장 건강 입문: 마이크로바이옴 기초', summary: '장내 미생물은 면역, 기분, 에너지를 형성한다. 비싼 보충제 없이 세 가지 습관이 도움을 준다.', mission: '이번 주 식물성 식품 30가지를 섭취해보세요(양은 상관없음).', action: null, science: { question: '왜 식물 다양성이 장 건강에 중요한가요?', mechanism: '다양한 식물 섬유는 다양한 세균 종에게 먹이를 줍니다. 식이 다양성이 클수록 마이크로바이옴 다양성이 크고, 이는 더 강한 면역 기능과 회복력으로 이어집니다.' }, deep_dive: { enabled: true, blocks: [{ title: '30 식물 챌린지', body: '생각보다 쉽습니다. 볶음 한 접시에 8가지 이상(양파, 마늘, 브로콜리, 피망, 버섯, 생강, 스냅콩, 파)을 넣을 수 있습니다.' }] }, reference: { text: 'McDonald D 등 (2018).', source: 'mSystems, 3(3), e00031-18.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_HEALTH_004', type: 'educational', category: 'Health & Conditions',
    slug: 'when-to-talk-to-your-doctor-vs-your-app',
    image_group_id: 'articles/health_004', is_active: true, solution_codes: 'HEALTH',
    target_s_types: ['S0', 'S1', 'S2'], target_m_types: ['M0', 'M1'], target_l_problems: ['L_Health'],
    published_at: '2026-04-28T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '👩‍⚕️', title: 'When to Talk to Your Doctor vs Your App', summary: 'Wellness apps support habit-building. They do not replace healthcare. Here is when to seek a professional.', mission: 'Note down the three signals below and your doctor’s contact info.', action: { section_title: 'Three Signals', parts: [{ part_number: 1, title: 'Red Flags', items: ['Persistent fatigue not explained by sleep or stress.', 'Unintentional weight change of 5%+ over 3 months.', 'New or worsening symptoms (chest, breathing, pain).'] }] }, science: { question: 'What can apps actually help with?', mechanism: 'Apps excel at habit support, data collection, and behavioral nudges. They are not substitutes for clinical assessment, lab work, or imaging — those require a healthcare provider.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Right Tool for the Right Job', body: 'Use your wellness app for daily structure and trend tracking. Use your healthcare provider for symptoms, lab work, and personalized clinical advice. They are complementary, not competing.' }] }, reference: { text: 'World Health Organization (2018). Digital health intervention recommendations.', source: 'WHO Guidelines, ISBN 978-92-4-155050-5.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_10 — Medication Guide (4건) — MedicalWebPage JSON-LD
  // ============================================================
  {
    article_id: 'ART_MED_001', type: 'educational', category: 'Medication Guide',
    slug: 'taking-medication-with-food-when-it-matters',
    image_group_id: 'articles/med_001', is_active: true, solution_codes: 'MED',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Medication'],
    published_at: '2026-04-09T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '💊', title: 'Taking Medication With Food: When It Actually Matters', summary: 'The instruction "take with food" is not optional. Here is why, and what counts as food.', mission: 'Check the labels of all your current medications for food-related instructions.', action: { section_title: 'Two Categories', parts: [{ part_number: 1, title: 'Must Take With Food', items: ['NSAIDs (ibuprofen, naproxen) — reduces stomach irritation.', 'Some diabetes medications — improves absorption or reduces stomach upset.'] }] }, science: { question: 'Why does food change medication effect?', mechanism: 'Food can speed or slow absorption, neutralize stomach acid, or bind to active compounds. The instruction is based on clinical studies of that specific drug.' }, deep_dive: { enabled: true, blocks: [{ title: 'What Counts as Food', body: 'For most "take with food" instructions, a small snack (yogurt, crackers, a slice of bread) is sufficient. You do not need a full meal. The goal is to coat the stomach lining.' }, { title: 'Always Read the Label', body: 'This article is educational only. The specific timing and instructions for your medications come from your pharmacist or healthcare provider — always defer to them for your situation.' }] }, reference: { text: 'Welling PG (1996). Effects of food on drug absorption.', source: 'Annual Review of Nutrition, 16, 383-415.' } },
      { category_emoji: '💊', title: '음식과 함께 약 복용: 진짜 중요한 때', summary: '"식사와 함께" 지시는 선택이 아니다. 그 이유와 음식의 기준.', mission: '현재 복용 중인 모든 약의 라벨에서 음식 관련 지시사항을 확인해보세요.', action: null, science: { question: '왜 음식이 약 효과를 바꾸나요?', mechanism: '음식은 흡수를 빠르게 또는 느리게 하거나, 위산을 중화하거나, 활성 성분과 결합할 수 있습니다. 지시사항은 그 특정 약의 임상 연구에 기반합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '"음식"의 기준', body: '대부분의 "식사와 함께" 지시에는 작은 간식(요거트, 크래커, 빵 한 조각)이면 충분합니다.' }, { title: '항상 라벨을 읽으세요', body: '이 글은 교육 목적입니다. 당신의 약 복용 시간은 약사나 의료진에게 확인하세요.' }] }, reference: { text: 'Welling PG (1996).', source: 'Annual Review of Nutrition, 16, 383-415.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_MED_002', type: 'educational', category: 'Medication Guide',
    slug: 'common-supplement-interactions-to-know',
    image_group_id: 'articles/med_002', is_active: true, solution_codes: 'MED',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Medication'],
    published_at: '2026-04-17T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🌿', title: 'Common Supplement Interactions Worth Knowing', summary: 'Supplements feel low-risk, but they interact. Five common combinations to be aware of.', mission: 'List your current supplements and bring them to your next pharmacy visit.', action: null, science: { question: 'Why do supplements interact with medications?', mechanism: 'Supplements share metabolic pathways with medications. They can speed or slow drug breakdown in the liver, altering effective doses.' }, deep_dive: { enabled: true, blocks: [{ title: 'Five to Know', body: '1) St. John’s Wort + many medications (reduces effect). 2) Vitamin K + blood thinners (reduces effect). 3) Calcium + thyroid medication (reduces absorption). 4) Iron + thyroid medication (reduces absorption). 5) Magnesium + some antibiotics (reduces absorption). Spacing them by 4 hours often solves the issue.' }] }, reference: { text: 'Tsai HH et al. (2012). Evaluation of documented drug interactions and contraindications associated with herbs and dietary supplements.', source: 'International Journal of Clinical Practice, 66(11), 1056-1078.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_MED_003', type: 'educational', category: 'Medication Guide',
    slug: 'the-best-time-of-day-to-take-medications',
    image_group_id: 'articles/med_003', is_active: true, solution_codes: 'MED',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Medication'],
    published_at: '2026-04-24T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '⏰', title: 'The Best Time of Day to Take Common Medications', summary: 'Time-of-day can change medication effectiveness by 20–40%. Three examples of "chronopharmacology."', mission: 'Ask your pharmacist if any of your medications have a recommended time.', action: null, science: { question: 'What is chronopharmacology?', mechanism: 'The body’s circadian rhythm affects enzyme activity, hormone levels, and even disease symptoms. Aligning medication timing to these rhythms can improve effectiveness and reduce side effects.' }, deep_dive: { enabled: true, blocks: [{ title: 'Three Common Examples', body: '1) Statins — often more effective in the evening when cholesterol synthesis peaks. 2) Blood pressure medications — bedtime dosing may improve nighttime blood pressure for some patients. 3) Allergy medications — taken in the evening to peak during morning symptoms. Always confirm timing with your healthcare provider.' }] }, reference: { text: 'Smolensky MH et al. (2016). Bedtime hypertension chronotherapy: concepts and patient outcomes.', source: 'Chronobiology International, 33(5), 477-505.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_MED_004', type: 'educational', category: 'Medication Guide',
    slug: 'building-a-medication-reminder-system-that-works',
    image_group_id: 'articles/med_004', is_active: true, solution_codes: 'MED,HABIT',
    target_s_types: ['S2', 'S3'], target_m_types: ['M1', 'M2'], target_l_problems: ['L_Medication'],
    published_at: '2026-04-29T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '🔔', title: 'Building a Medication Reminder System That Actually Works', summary: 'Missed doses are a common, fixable problem. A 3-layer reminder system catches 99% of misses.', mission: 'Set up at least one layer (visual cue, alarm, or paired routine) today.', action: null, science: { question: 'Why does layering matter for reminders?', mechanism: 'Each reminder layer has a failure mode. Visual cues fail when routines change. Alarms fail when phones are silenced. Paired routines fail when the routine itself is missed. Layering catches each other’s failures.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Three Layers', body: '1) Visual: pill organizer on the counter you see at breakfast. 2) Alarm: phone notification at the same time daily. 3) Pair: link to a routine you never miss (brushing teeth, first sip of coffee). All three together = near-perfect adherence.' }] }, reference: { text: 'Demonceau J et al. (2013). Identification and assessment of adherence-enhancing interventions.', source: 'Drugs, 73(6), 545-562.' } },
      { category_emoji: '🔔', title: '진짜 효과적인 약 알림 시스템 만들기', summary: '복용 누락은 흔하지만 해결 가능하다. 3계층 알림 시스템이 99% 누락을 잡는다.', mission: '오늘 최소 한 계층(시각 단서, 알람, 결합 루틴)을 설정해보세요.', action: null, science: { question: '왜 계층화가 중요한가요?', mechanism: '각 알림 계층은 실패 모드가 있습니다. 시각 단서는 루틴이 바뀌면 실패합니다. 알람은 폰이 무음일 때 실패합니다. 계층화는 서로의 실패를 보완합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '3계층', body: '1) 시각: 아침 식사 때 보이는 약통. 2) 알람: 매일 같은 시간 폰 알림. 3) 결합: 절대 빼먹지 않는 루틴(양치, 첫 커피)과 연결. 셋 다 합치면 거의 완벽한 복약 순응도가 됩니다.' }] }, reference: { text: 'Demonceau J 등 (2013).', source: 'Drugs, 73(6), 545-562.' } },
      undefined
    ),
  },

  // ============================================================
  // CAT_11 — Sleep & Recovery (4건)
  // ============================================================
  {
    article_id: 'ART_SLEEP_001', type: 'educational', category: 'Sleep & Recovery',
    slug: 'sleep-debt-is-real-and-how-to-pay-it-down',
    image_group_id: 'articles/sleep_001', is_active: true, solution_codes: 'SLEEP',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0'], target_l_problems: ['L_Sleep'],
    published_at: '2026-04-07T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '😴', title: 'Sleep Debt Is Real (And How to Pay It Down Gently)', summary: 'You cannot fully "catch up" on sleep over the weekend, but you can recover gradually with 3 nights of focus.', mission: 'For 3 nights this week, go to bed 30 minutes earlier than usual.', action: null, science: { question: 'Can you really catch up on sleep?', mechanism: 'Recent research shows that some cognitive markers (reaction time, mood) recover with 1–2 nights of catch-up sleep, but others (metabolic and immune markers) take a week or more of consistent good sleep.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Gentle Approach', body: 'Trying to sleep 12 hours after a 4-hour night usually backfires (poor sleep quality, throws off circadian rhythm). Three nights of 8 hours works better than one night of 12.' }] }, reference: { text: 'Banks S, Dinges DF (2007). Behavioral and physiological consequences of sleep restriction.', source: 'Journal of Clinical Sleep Medicine, 3(5), 519-528.' } },
      { category_emoji: '😴', title: '수면 부채는 실재한다 (부드럽게 갚는 법)', summary: '주말 한 번에 완전히 "따라잡을" 수는 없지만, 3일간 집중하면 점진적으로 회복할 수 있다.', mission: '이번 주 3일간 평소보다 30분 일찍 잠자리에 들어보세요.', action: null, science: { question: '정말 수면을 따라잡을 수 있나요?', mechanism: '최근 연구에 따르면 일부 인지 지표(반응 시간, 기분)는 1~2일의 추가 수면으로 회복되지만, 대사 및 면역 지표는 일주일 이상의 일관된 좋은 수면이 필요합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '부드러운 접근', body: '4시간 잤다고 12시간 자려 하면 보통 역효과(수면의 질 저하, 일주기 리듬 깨짐)가 납니다. 8시간씩 3일이 12시간 한 번보다 낫습니다.' }] }, reference: { text: 'Banks S, Dinges DF (2007).', source: 'Journal of Clinical Sleep Medicine, 3(5), 519-528.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_SLEEP_002', type: 'educational', category: 'Sleep & Recovery',
    slug: 'the-90-minute-rule-of-sleep-cycles',
    image_group_id: 'articles/sleep_002', is_active: true, solution_codes: 'SLEEP',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Sleep'],
    published_at: '2026-04-14T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '🌙', title: 'The 90-Minute Rule of Sleep Cycles (Use It Smartly)', summary: 'Sleep happens in 90-minute cycles. Waking at the end of a cycle feels refreshing; waking mid-cycle feels groggy.', mission: 'Calculate your ideal wake time for 5 cycles (7.5 hours) backwards from when you need to be up.', action: null, science: { question: 'What happens in a 90-minute cycle?', mechanism: 'Each cycle progresses through light sleep, deep sleep, and REM sleep. Waking from light sleep at cycle end leaves you alert; waking from deep sleep mid-cycle leaves you groggy (sleep inertia).' }, deep_dive: { enabled: true, blocks: [{ title: 'Practical Math', body: 'Need to wake at 7am? Count back 5 cycles = 11:30pm bedtime. Add 15 min to fall asleep, so lights out at 11:15pm. Counting 4 cycles = 6 hours is enough for a busy night, but 5 cycles is better for daily energy.' }] }, reference: { text: 'Dement WC, Kleitman N (1957). The relation of eye movements during sleep to dream activity.', source: 'Journal of Experimental Psychology, 53(5), 339-346.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_SLEEP_003', type: 'educational', category: 'Sleep & Recovery',
    slug: 'temperature-the-most-overlooked-sleep-lever',
    image_group_id: 'articles/sleep_003', is_active: true, solution_codes: 'SLEEP',
    target_s_types: ['S1', 'S2'], target_m_types: ['M0'], target_l_problems: ['L_Sleep'],
    published_at: '2026-04-21T09:00:00Z', updated_at: '2026-05-03T09:00:00Z',
    langs: langs(
      { category_emoji: '🌡️', title: 'Temperature: The Most Overlooked Sleep Lever', summary: 'A cooler room (17–19°C / 63–67°F) improves deep sleep more than most supplements or apps.', mission: 'Drop your bedroom temperature by 1–2°C tonight.', action: null, science: { question: 'Why does cool sleep better?', mechanism: 'Core body temperature naturally drops 1–2°C during sleep onset. A cool room facilitates this drop, accelerating sleep onset and increasing deep sleep duration.' }, deep_dive: { enabled: true, blocks: [{ title: 'Beyond Just Cooler', body: 'Pair the cool room with breathable bedding and a warm shower 90 minutes before bed (the shower causes a rebound temperature drop after). Combined, this is one of the most reliable sleep upgrades available.' }] }, reference: { text: 'Okamoto-Mizuno K, Mizuno K (2012). Effects of thermal environment on sleep and circadian rhythm.', source: 'Journal of Physiological Anthropology, 31(1), 14.' } },
      { category_emoji: '🌡️', title: '온도: 가장 간과되는 수면 지렛대', summary: '시원한 방(17~19°C)은 대부분의 보충제나 앱보다 깊은 수면을 더 개선한다.', mission: '오늘 밤 침실 온도를 1~2°C 낮춰보세요.', action: null, science: { question: '왜 시원한 곳에서 잠이 더 잘 오나요?', mechanism: '심부체온은 수면 시작 시 자연스럽게 1~2°C 떨어집니다. 시원한 방은 이 하강을 도와 수면 시작을 가속하고 깊은 수면 시간을 늘립니다.' }, deep_dive: { enabled: true, blocks: [{ title: '시원함 + α', body: '시원한 방 + 통기성 좋은 침구 + 잠들기 90분 전 따뜻한 샤워(샤워 후 반동으로 체온이 떨어짐) = 가장 신뢰할 수 있는 수면 업그레이드.' }] }, reference: { text: 'Okamoto-Mizuno K, Mizuno K (2012).', source: 'Journal of Physiological Anthropology, 31(1), 14.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_SLEEP_004', type: 'educational', category: 'Sleep & Recovery',
    slug: 'recovery-sleep-vs-active-recovery',
    image_group_id: 'articles/sleep_004', is_active: true, solution_codes: 'SLEEP,EXERCISE',
    target_s_types: ['S2', 'S3'], target_m_types: ['M1'], target_l_problems: ['L_Sleep'],
    published_at: '2026-04-27T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '🧘', title: 'Recovery Sleep vs Active Recovery: When to Use Each', summary: 'Some recovery happens horizontally (sleep), some happens with light movement. Knowing which to use when is the skill.', mission: 'After your next hard workout, choose intentionally: 20-min nap or 20-min walk.', action: null, science: { question: 'What does active recovery actually do?', mechanism: 'Light movement (walking, easy cycling) increases blood flow without adding training stress. This clears metabolic byproducts and reduces muscle soreness by 15–25% compared to total rest.' }, deep_dive: { enabled: true, blocks: [{ title: 'Decision Rule', body: 'Slept less than 7 hours last night? Choose nap. Feel stiff but rested? Choose walk. Both? Walk first, then nap. The body needs both clearance (movement) and consolidation (sleep) — the question is sequence.' }] }, reference: { text: 'Dupuy O et al. (2018). An evidence-based approach for choosing post-exercise recovery techniques.', source: 'Frontiers in Physiology, 9, 403.' } },
      undefined, undefined
    ),
  },

  // ============================================================
  // CAT_12 — Exercise & Activity (4건)
  // ============================================================
  {
    article_id: 'ART_EX_001', type: 'educational', category: 'Exercise & Activity',
    slug: 'the-minimum-effective-dose-of-exercise',
    image_group_id: 'articles/ex_001', is_active: true, solution_codes: 'EXERCISE',
    target_s_types: ['S0', 'S1'], target_m_types: ['M0'], target_l_problems: ['L_Exercise'],
    published_at: '2026-04-04T09:00:00Z', updated_at: '2026-05-01T09:00:00Z',
    langs: langs(
      { category_emoji: '🏃', title: 'The Minimum Effective Dose of Exercise (Less Than You Think)', summary: '11 minutes of moderate activity per day reduces all-cause mortality by 25%. Anything above that is bonus.', mission: 'Add 11 minutes of brisk walking to your day this week.', action: null, science: { question: 'Why 11 minutes specifically?', mechanism: 'A 2023 meta-analysis of 30 million person-years found that 11 minutes daily of moderate activity (brisk walking, easy cycling) was associated with significantly lower mortality risk. The dose-response curve is steepest at this low end.' }, deep_dive: { enabled: true, blocks: [{ title: 'Beyond Mortality', body: 'The 11-minute dose also improves mood (more sustained than caffeine), reduces blood pressure, and improves insulin sensitivity. The return per minute at this dose is higher than at any other dose.' }, { title: 'How to Fit It In', body: 'Walk to a meeting instead of dialing in. Take stairs for one floor instead of the elevator. Park at the back of the lot. None of these feel like exercise, but they hit the threshold.' }] }, reference: { text: 'Garcia L et al. (2023). Non-occupational physical activity and risk of cardiovascular disease, cancer and mortality outcomes: a dose–response meta-analysis.', source: 'British Journal of Sports Medicine, 57(15), 979-989.' } },
      { category_emoji: '🏃', title: '운동의 최소 유효 용량 (생각보다 적다)', summary: '하루 11분의 중강도 활동이 전 원인 사망률을 25% 낮춘다. 그 이상은 보너스.', mission: '이번 주 하루에 빠른 걸음으로 11분을 추가해보세요.', action: null, science: { question: '왜 정확히 11분인가요?', mechanism: '3천만 인년의 메타분석(2023)에서 하루 11분의 중강도 활동(빠른 걷기, 가벼운 자전거)이 유의미하게 낮은 사망률 위험과 연관되었습니다. 용량-반응 곡선이 이 낮은 구간에서 가장 가파릅니다.' }, deep_dive: { enabled: true, blocks: [{ title: '사망률을 넘어서', body: '11분 용량은 기분도 개선하고(카페인보다 지속적), 혈압을 낮추고, 인슐린 감수성을 개선합니다. 이 용량에서의 분당 수익이 다른 어떤 용량보다 높습니다.' }, { title: '어떻게 끼워 넣을까', body: '회의에 전화 대신 걸어가기. 한 층은 엘리베이터 대신 계단. 주차장 안쪽에 주차. 운동처럼 느껴지지 않지만 임계값을 채웁니다.' }] }, reference: { text: 'Garcia L 등 (2023).', source: 'British Journal of Sports Medicine, 57(15), 979-989.' } },
      { category_emoji: '🏃', title: '運動の最小有効量(思ったより少ない)', summary: '1日11分の中強度の活動が、全死因死亡率を25%下げる。それ以上はボーナス。', mission: '今週、1日11分の早歩きを追加してみましょう。', action: null, science: { question: 'なぜ11分なのですか?', mechanism: '2023年の3000万人年のメタ分析で、1日11分の中強度の活動が低い死亡率リスクと関連していました。' }, deep_dive: { enabled: true, blocks: [{ title: '死亡率を超えて', body: '11分の用量は気分も改善し、血圧を下げ、インスリン感受性を改善します。この用量での分あたりのリターンが最も高いです。' }] }, reference: { text: 'Garcia L ら (2023).', source: 'British Journal of Sports Medicine, 57(15), 979-989.' } }
    ),
  },
  {
    article_id: 'ART_EX_002', type: 'educational', category: 'Exercise & Activity',
    slug: 'strength-training-for-people-who-hate-the-gym',
    image_group_id: 'articles/ex_002', is_active: true, solution_codes: 'EXERCISE',
    target_s_types: ['S1'], target_m_types: ['M0'], target_l_problems: ['L_Exercise'],
    published_at: '2026-04-11T09:00:00Z', updated_at: '2026-05-02T09:00:00Z',
    langs: langs(
      { category_emoji: '💪', title: 'Strength Training for People Who Hate the Gym', summary: 'You can build meaningful strength in your living room with zero equipment. Three movements cover 80% of the benefit.', mission: 'Do the three-movement routine three times this week.', action: { section_title: 'The Three Movements', parts: [{ part_number: 1, title: '15 minutes total', items: ['Squat: 3 × 10 reps.', 'Push-up (knee or full): 3 × 8 reps.', 'Glute bridge: 3 × 12 reps.'] }] }, science: { question: 'Is bodyweight really enough?', mechanism: 'For untrained or lightly-trained adults, bodyweight progressions (more reps, slower tempo, harder variations) produce strength gains comparable to gym-based programs for the first 6–12 months.' }, deep_dive: { enabled: true, blocks: [{ title: 'Progression Path', body: 'Month 1: regular form. Month 2: add a 3-second descent. Month 3: try the harder variation (Bulgarian split squat, decline push-up, single-leg bridge). You can keep progressing this way for a year.' }] }, reference: { text: 'Schoenfeld BJ et al. (2017). Strength and hypertrophy adaptations between low-vs. high-load resistance training.', source: 'Journal of Strength and Conditioning Research, 31(12), 3508-3523.' } },
      { category_emoji: '💪', title: '헬스장이 싫은 사람을 위한 근력 운동', summary: '거실에서 장비 없이도 의미 있는 근력을 키울 수 있다. 세 가지 동작이 80%의 이익을 커버한다.', mission: '이번 주 3회 세 동작 루틴을 해보세요.', action: null, science: { question: '맨몸 운동만으로 충분한가요?', mechanism: '비훈련자나 가벼운 훈련자에게 맨몸 운동의 점진(반복 증가, 템포 느리게, 더 어려운 변형)은 첫 6~12개월간 헬스장 프로그램과 비슷한 근력 증가를 만듭니다.' }, deep_dive: { enabled: true, blocks: [{ title: '점진 경로', body: '1개월: 기본 폼. 2개월: 3초 하강 추가. 3개월: 더 어려운 변형 (불가리안 스플릿 스쿼트, 디클라인 푸쉬업, 외다리 글루트 브릿지). 이렇게 1년간 계속 점진할 수 있습니다.' }] }, reference: { text: 'Schoenfeld BJ 등 (2017).', source: 'Journal of Strength and Conditioning Research, 31(12), 3508-3523.' } },
      undefined
    ),
  },
  {
    article_id: 'ART_EX_003', type: 'educational', category: 'Exercise & Activity',
    slug: 'why-zone-2-is-the-most-undervalued-workout',
    image_group_id: 'articles/ex_003', is_active: true, solution_codes: 'EXERCISE',
    target_s_types: ['S2'], target_m_types: ['M1'], target_l_problems: ['L_Exercise'],
    published_at: '2026-04-19T09:00:00Z', updated_at: '2026-05-04T09:00:00Z',
    langs: langs(
      { category_emoji: '🚴', title: 'Why Zone 2 Is the Most Undervalued Workout', summary: 'Conversational-pace cardio builds the mitochondria that everything else depends on. Here is how to find your zone.', mission: 'Do one 30-minute Zone 2 session this week (you can talk in full sentences while doing it).', action: null, science: { question: 'What makes Zone 2 special?', mechanism: 'Zone 2 (about 60–70% of max heart rate) preferentially stimulates mitochondrial growth and improves fat oxidation. These adaptations support every other type of training.' }, deep_dive: { enabled: true, blocks: [{ title: 'The Talk Test', body: 'You are in Zone 2 if you can speak in full sentences but not sing. This simple test works without heart rate monitors and aligns with the physiological zone almost perfectly.' }] }, reference: { text: 'San-Millán I, Brooks GA (2018). Assessment of metabolic flexibility by means of measuring blood lactate, fat, and carbohydrate oxidation responses to exercise.', source: 'Sports Medicine, 48(2), 467-479.' } },
      undefined, undefined
    ),
  },
  {
    article_id: 'ART_EX_004', type: 'educational', category: 'Exercise & Activity',
    slug: 'walking-is-not-just-cardio',
    image_group_id: 'articles/ex_004', is_active: true, solution_codes: 'EXERCISE,HABIT',
    target_s_types: ['S0', 'S1'], target_m_types: ['M0'], target_l_problems: ['L_Exercise'],
    published_at: '2026-04-25T09:00:00Z', updated_at: '2026-05-05T09:00:00Z',
    langs: langs(
      { category_emoji: '🚶‍♀️', title: 'Walking Is Not Just Cardio — It Is Recovery, Mood, and Cognition', summary: 'A 20-minute walk improves mood for 2 hours, lowers blood sugar by 10–20%, and improves creative problem-solving.', mission: 'Add a 20-minute walk to your day, ideally after lunch.', action: null, science: { question: 'Why does walking have so many downstream effects?', mechanism: 'Walking stimulates blood flow to the brain, releases endorphins, activates muscle glucose uptake, and provides the kind of "diffuse attention" that supports creativity and emotional regulation.' }, deep_dive: { enabled: true, blocks: [{ title: 'When to Walk', body: 'After a meal: blood sugar benefit. Mid-afternoon: energy and focus rescue. Before a hard conversation: mood stabilization. After work: stress decompression. Different times, different benefits — all from the same 20 minutes.' }] }, reference: { text: 'Oppezzo M, Schwartz DL (2014). Give your ideas some legs: the positive effect of walking on creative thinking.', source: 'Journal of Experimental Psychology, 40(4), 1142-1152.' } },
      { category_emoji: '🚶‍♀️', title: '걷기는 단지 유산소가 아니다 — 회복, 기분, 인지의 도구', summary: '20분 걷기는 2시간 동안 기분을 개선하고, 혈당을 10~20% 낮추고, 창의적 문제 해결을 향상시킨다.', mission: '점심 후 20분 걷기를 추가해보세요.', action: null, science: { question: '왜 걷기는 이렇게 많은 후속 효과를 가지나요?', mechanism: '걷기는 뇌로의 혈류를 자극하고, 엔도르핀을 방출하며, 근육 포도당 흡수를 활성화하고, 창의성과 감정 조절을 돕는 "확산적 주의"를 제공합니다.' }, deep_dive: { enabled: true, blocks: [{ title: '언제 걸을까', body: '식후: 혈당 효과. 오후 중반: 에너지와 집중력 회복. 어려운 대화 전: 기분 안정화. 퇴근 후: 스트레스 감압. 같은 20분, 다른 시간대, 다른 이익.' }] }, reference: { text: 'Oppezzo M, Schwartz DL (2014).', source: 'Journal of Experimental Psychology, 40(4), 1142-1152.' } },
      undefined
    ),
  },
];
