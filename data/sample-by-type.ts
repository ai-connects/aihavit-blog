/**
 * Article TYPE별 검수 샘플 5건 — 사용자 시각 검수용 (/blog/sample).
 *
 * 5종 type: guide / tip / challenge / science / reference
 * - 각 샘플은 ArticleEntity 8개 컨텐츠 키 전부 채움 (어떤 type이든 모든 섹션 렌더링 확인 가능)
 * - ko_kr / en_us / ja_jp 풀 3개 언어 시드 (fallback 안 거치도록)
 * - 컴플라이언스: '진단/diagnose/measured/InBody' 0건 (PRD §10.2)
 *
 * 진단 (Iteration #9):
 *   기존 seed-articles.ts의 50개는 모두 type='educational' + ja_jp 시드의 action=null 다수
 *   → 타입별 시각 검증이 불가능했음. 본 파일이 검수 페이지 데이터 소스.
 */

import type { Article } from '../lib/types';

function fullLangs(en: any, ko: any, ja: any): Article['langs'] {
  return { en_us: en, ko_kr: ko, ja_jp: ja };
}

export const SAMPLE_ARTICLES: Article[] = [
  // ============================================================
  // [1/5] GUIDE — 단계별 실행 가이드 (action.parts 풍부)
  // ============================================================
  {
    article_id: 'SAMPLE_GUIDE_001',
    type: 'guide',
    category: 'Medication Guide',
    slug: 'sample-guide-glp1-injection-technique',
    image_group_id: 'samples/guide_001',
    is_active: true,
    solution_codes: 'GUIDE,MEDICATION',
    target_s_types: ['S2', 'S3'],
    target_m_types: ['M1', 'M2'],
    target_l_problems: ['L_Medication'],
    published_at: '2026-05-10T09:00:00Z',
    updated_at: '2026-05-22T12:00:00Z',
    langs: fullLangs(
      {
        category_emoji: '💉',
        title: 'A Step-by-Step Guide to GLP-1 Self-Injection',
        summary:
          'Proper injection technique matters more than dose timing. Here is a 3-phase routine that minimizes site reactions and improves absorption.',
        mission: 'Try the rotation map this week — track which sites feel best.',
        action: {
          type: 'guide',
          section_title: 'The 3-Phase Routine',
          parts: [
            {
              part_number: 1,
              title: 'Preparation (5 minutes)',
              items: [
                'Let the pen sit at room temperature for 15–30 minutes.',
                'Wash hands with warm water and soap for 20 seconds.',
                'Clean the chosen injection site with an alcohol swab in a circular outward motion.',
                'Wait until the alcohol fully dries (not wiping).',
              ],
            },
            {
              part_number: 2,
              title: 'Injection (30 seconds)',
              items: [
                'Pinch a 2 cm fold of subcutaneous tissue.',
                'Insert the needle at a 90-degree angle in one quick motion.',
                'Press and hold the button for the full 10 seconds.',
                'Withdraw straight without changing angle.',
              ],
            },
            {
              part_number: 3,
              title: 'Aftercare (2 minutes)',
              items: [
                'Apply gentle pressure with dry gauze — do not rub.',
                'Log the site on the rotation map (abdomen → thigh → upper arm).',
                'Discard the pen needle in a sharps container.',
                'Hydrate 250 mL of water within the next hour.',
              ],
            },
          ],
        },
        science: {
          question: 'Why does the 10-second hold matter?',
          mechanism:
            'GLP-1 pens deliver the dose under spring pressure. The 10-second hold ensures the full volume leaves the cartridge and disperses into the subcutaneous fat. Early withdrawal can leave 10–20% of the dose on the surface.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'Rotation Map: Why and How',
              body: 'Injecting in the same area repeatedly causes fibrosis in subcutaneous fat, which slows absorption and creates lumps (lipohypertrophy). The simplest rotation is a 3-zone cycle: abdomen (week 1) → thigh (week 2) → upper arm (week 3). Within each zone, shift 2 cm each session.',
            },
            {
              title: 'When to Talk to a Clinician',
              body: 'Persistent redness, swelling > 5 cm, or warmth that lasts > 48 hours is not a normal site reaction. Photograph the site and contact your prescriber. Site reactions are common in the first 4 weeks and usually resolve.',
            },
            {
              title: 'Timing With Meals',
              body: 'Most GLP-1 formulations are dose-once-weekly and have no fixed meal timing. Injecting on the same day each week (e.g., Sunday morning) builds the habit. If you forget by more than 48 hours from the usual time, contact your prescriber — do not double up.',
            },
          ],
        },
        reference: {
          text: 'Frid AH et al. (2016). New insulin delivery recommendations — implications for GLP-1 receptor agonists.',
          source: 'Mayo Clinic Proceedings, 91(9), 1231–1255.',
        },
      },
      {
        category_emoji: '💉',
        title: 'GLP-1 자가 주사 단계별 가이드',
        summary:
          '주사 기법은 용량 타이밍보다 중요합니다. 부위 반응을 최소화하고 흡수를 개선하는 3단계 루틴을 소개합니다.',
        mission: '이번 주에 로테이션 맵을 시도해보세요 — 어느 부위가 가장 편안한지 기록.',
        action: {
          type: 'guide',
          section_title: '3단계 루틴',
          parts: [
            {
              part_number: 1,
              title: '준비 (5분)',
              items: [
                '펜을 실온에서 15~30분간 두세요.',
                '따뜻한 물과 비누로 20초간 손을 씻으세요.',
                '알코올 스왑으로 주사 부위를 원형 바깥쪽으로 닦으세요.',
                '알코올이 완전히 마를 때까지 기다리세요 (닦지 않고).',
              ],
            },
            {
              part_number: 2,
              title: '주사 (30초)',
              items: [
                '피하 조직 2cm를 살짝 잡으세요.',
                '90도 각도로 한 번에 신속하게 주삽니다.',
                '버튼을 10초간 꾹 누른 상태로 유지하세요.',
                '각도를 바꾸지 않고 똑바로 빼세요.',
              ],
            },
            {
              part_number: 3,
              title: '사후 관리 (2분)',
              items: [
                '마른 거즈로 부드럽게 압박 — 문지르지 마세요.',
                '로테이션 맵에 부위 기록 (복부 → 허벅지 → 위팔).',
                '주사 바늘은 의료폐기물 용기에 폐기.',
                '1시간 내에 250ml 물 섭취.',
              ],
            },
          ],
        },
        science: {
          question: '왜 10초 유지가 중요한가요?',
          mechanism:
            'GLP-1 펜은 스프링 압력으로 용량을 전달합니다. 10초 유지는 전체 용량이 카트리지에서 빠져나와 피하 지방으로 분산되도록 합니다. 너무 일찍 빼면 용량의 10~20%가 표면에 남을 수 있습니다.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '로테이션 맵 — 왜 그리고 어떻게',
              body: '같은 부위에 반복 주사 시 피하 지방의 섬유화로 흡수가 느려지고 덩어리(지방위축)가 생깁니다. 가장 간단한 로테이션은 3존 사이클: 복부(1주차) → 허벅지(2주차) → 위팔(3주차). 각 존 내에서 매번 2cm씩 이동합니다.',
            },
            {
              title: '의료진과 상의해야 할 때',
              body: '지속되는 발적, 5cm 이상의 부종, 48시간 이상의 열감은 정상 반응이 아닙니다. 부위 사진을 찍고 처방의에게 연락하세요. 첫 4주의 부위 반응은 흔하며 보통 해소됩니다.',
            },
            {
              title: '식사와의 타이밍',
              body: '대부분의 GLP-1 제형은 주 1회이며 식사 타이밍은 고정되지 않습니다. 매주 같은 요일(예: 일요일 오전)에 주사하면 습관이 만들어집니다. 평소 시간보다 48시간 이상 늦었다면 처방의에게 연락 — 두 배로 맞지 마세요.',
            },
          ],
        },
        reference: {
          text: 'Frid AH 등 (2016). 인슐린 전달 새 권고 — GLP-1 수용체 작용제 시사점.',
          source: 'Mayo Clinic Proceedings, 91(9), 1231–1255.',
        },
      },
      {
        category_emoji: '💉',
        title: 'GLP-1 自己注射の3ステップガイド',
        summary:
          '注射技術はタイミングより重要です。部位反応を最小化し吸収を改善する3段階ルーティン。',
        mission: '今週ローテーションマップを試して、どの部位が一番快適か記録してみましょう。',
        action: {
          type: 'guide',
          section_title: '3段階ルーティン',
          parts: [
            {
              part_number: 1,
              title: '準備 (5分)',
              items: [
                'ペンを室温で15~30分置きます。',
                '温水と石鹸で20秒間手を洗います。',
                'アルコール綿で注射部位を円形外向きに拭きます。',
                'アルコールが完全に乾くまで待ちます(拭かずに)。',
              ],
            },
            {
              part_number: 2,
              title: '注射 (30秒)',
              items: [
                '皮下組織を2cm軽くつまみます。',
                '90度の角度で素早く一回で刺します。',
                'ボタンを10秒間しっかり押し続けます。',
                '角度を変えずまっすぐ抜きます。',
              ],
            },
            {
              part_number: 3,
              title: 'アフターケア (2分)',
              items: [
                '乾いたガーゼで優しく圧迫 — こすらないでください。',
                'ローテーションマップに部位を記録 (腹部 → 太もも → 上腕)。',
                '注射針は医療廃棄物容器に廃棄。',
                '1時間以内に250ml の水を摂取。',
              ],
            },
          ],
        },
        science: {
          question: 'なぜ10秒の保持が重要ですか?',
          mechanism:
            'GLP-1ペンはバネ圧で薬剤を送ります。10秒保持で全量がカートリッジから出て皮下脂肪に分散します。早く抜くと10~20%が表面に残る可能性があります。',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'ローテーションマップ',
              body: '同じ部位への反復注射は皮下脂肪の線維化を起こし、吸収を遅らせ、しこり(脂肪萎縮)を作ります。3ゾーン・サイクル: 腹部(1週目) → 太もも(2週目) → 上腕(3週目)。各ゾーン内では毎回2cmずつ移動。',
            },
            {
              title: '医療従事者に相談すべき時',
              body: '持続する発赤、5cm以上の腫脹、48時間以上続く熱感は正常な部位反応ではありません。部位の写真を撮り、処方医に連絡してください。',
            },
            {
              title: '食事との関係',
              body: 'ほとんどのGLP-1製剤は週1回投与で、食事タイミングは固定されていません。毎週同じ曜日(例: 日曜午前)に注射すれば習慣化しやすくなります。',
            },
          ],
        },
        reference: {
          text: 'Frid AH ら (2016). インスリン投与の新推奨 — GLP-1作動薬への示唆.',
          source: 'Mayo Clinic Proceedings, 91(9), 1231–1255.',
        },
      }
    ),
  },

  // ============================================================
  // [2/5] TIP — 짧은 팁 (summary + mission 중심, action 단순)
  // ============================================================
  {
    article_id: 'SAMPLE_TIP_001',
    type: 'tip',
    category: 'Hydration & Beverages',
    slug: 'sample-tip-the-glass-of-water-rule',
    image_group_id: 'samples/tip_001',
    is_active: true,
    solution_codes: 'TIP,HYDRATION',
    target_s_types: ['S0', 'S1'],
    target_m_types: ['M0'],
    target_l_problems: ['L_Hydration'],
    published_at: '2026-05-12T09:00:00Z',
    updated_at: '2026-05-20T09:00:00Z',
    langs: fullLangs(
      {
        category_emoji: '💧',
        title: 'The Glass of Water Rule: One Glass Before Every Meal',
        summary:
          'Drinking 250 mL of water 15 minutes before each meal reduces calorie intake by an average of 75 kcal — without changing what you eat.',
        mission: 'Place a water glass next to your plate for one full day.',
        action: {
          type: 'tip',
          section_title: 'One Habit, Three Wins',
          parts: [
            {
              part_number: 1,
              title: 'Build the Cue',
              items: [
                'Keep a 250 mL glass on the dining table at all times.',
                'Fill it as the first step of meal preparation.',
                'Drink it while waiting for food to be served.',
              ],
            },
          ],
        },
        science: {
          question: 'Why does a glass of water reduce intake?',
          mechanism:
            'The stomach has stretch receptors that signal early satiety to the brain. Water adds volume without calories, triggering a partial fullness signal 15 minutes before the meal begins.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'The Pre-Meal Window',
              body: 'The 15-minute window matters because gastric emptying for water is faster than for solid food. Drinking too far in advance (>30 min) loses the volume effect; drinking during the meal can dilute digestive enzymes.',
            },
          ],
        },
        reference: {
          text: 'Dennis EA et al. (2010). Water consumption increases weight loss during a hypocaloric diet intervention.',
          source: 'Obesity, 18(2), 300–307.',
        },
      },
      {
        category_emoji: '💧',
        title: '식전 물 한 잔 규칙',
        summary:
          '매 식사 15분 전 250ml의 물을 마시면 무엇을 먹는지 바꾸지 않고도 평균 75kcal 칼로리 섭취가 줄어듭니다.',
        mission: '하루 동안 식탁 옆에 물잔을 두어보세요.',
        action: {
          type: 'tip',
          section_title: '하나의 습관, 세 가지 효과',
          parts: [
            {
              part_number: 1,
              title: '신호를 만들기',
              items: [
                '식탁에 항상 250ml 물잔을 두세요.',
                '식사 준비의 첫 단계로 잔을 채우세요.',
                '음식이 나오기를 기다리는 동안 마시세요.',
              ],
            },
          ],
        },
        science: {
          question: '왜 물 한 잔이 섭취량을 줄이나요?',
          mechanism:
            '위는 신장 수용체로 조기 포만감을 뇌에 전달합니다. 물은 칼로리 없이 부피를 더해 식사 15분 전 부분 포만 신호를 유발합니다.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '식전 15분의 의미',
              body: '15분 창이 중요한 이유: 물의 위 배출 속도는 고형식보다 빠릅니다. 너무 일찍(>30분) 마시면 부피 효과가 사라지고, 식사 중에 마시면 소화 효소가 희석될 수 있습니다.',
            },
          ],
        },
        reference: {
          text: 'Dennis EA 등 (2010). 저칼로리 식이 중 물 섭취가 체중 감량을 증가시킨다.',
          source: 'Obesity, 18(2), 300–307.',
        },
      },
      {
        category_emoji: '💧',
        title: '食前のコップ一杯ルール',
        summary:
          '毎食15分前に250mlの水を飲むと、食べる内容を変えずに平均75kcalの摂取が減ります。',
        mission: '1日だけお皿の隣にコップを置いてみましょう。',
        action: {
          type: 'tip',
          section_title: '一つの習慣、三つの効果',
          parts: [
            {
              part_number: 1,
              title: '合図を作る',
              items: [
                '食卓に常に250mlコップを置きます。',
                '食事準備の最初のステップとして注ぎます。',
                '料理を待つ間に飲みます。',
              ],
            },
          ],
        },
        science: {
          question: 'なぜコップ一杯で摂取量が減るのですか?',
          mechanism:
            '胃の伸展受容体が早期満腹を脳に伝えます。水はカロリーなしで容量を加え、食事15分前に部分的な満腹信号を引き起こします。',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '食前15分の意味',
              body: '15分の窓が重要な理由: 水の胃排出速度は固形食より速いです。早すぎる(>30分)と容量効果が消え、食事中に飲むと消化酵素が希釈される可能性があります。',
            },
          ],
        },
        reference: {
          text: 'Dennis EA ら (2010).',
          source: 'Obesity, 18(2), 300–307.',
        },
      }
    ),
  },

  // ============================================================
  // [3/5] CHALLENGE — 도전 미션 (mission + action.parts 강조)
  // ============================================================
  {
    article_id: 'SAMPLE_CHAL_001',
    type: 'challenge',
    category: 'Lifestyle Habits',
    slug: 'sample-challenge-7-day-no-screen-after-9pm',
    image_group_id: 'samples/chal_001',
    is_active: true,
    solution_codes: 'CHALLENGE,SLEEP,HABIT',
    target_s_types: ['S1', 'S2'],
    target_m_types: ['M1'],
    target_l_problems: ['L_Sleep', 'L_Lifestyle'],
    published_at: '2026-05-14T09:00:00Z',
    updated_at: '2026-05-21T09:00:00Z',
    langs: fullLangs(
      {
        category_emoji: '🌙',
        title: '7-Day Challenge: No Screens After 9 PM',
        summary:
          'A single-rule challenge that improves sleep quality by 23% on average within 7 days. The rule: no phones, no TV, no tablets after 9 PM.',
        mission: 'Commit to 7 consecutive nights — pick the start date today.',
        action: {
          type: 'challenge',
          section_title: 'The 7-Day Protocol',
          parts: [
            {
              part_number: 1,
              title: 'Setup (Day 0 — Today)',
              items: [
                'Place a small basket near the bedroom door.',
                'Set your phone alarm to "9:00 PM — drop the phone".',
                'Charge your phone outside the bedroom from tonight.',
                'Tell one friend you are doing the challenge.',
              ],
            },
            {
              part_number: 2,
              title: 'Replace, Not Suppress',
              items: [
                'Have an alternative ready: a book, a journal, a puzzle, or a hot tea.',
                'Pre-decide tomorrow morning\'s first task to reduce evening anxiety.',
                'If you live with someone, ask them to join even one night.',
              ],
            },
            {
              part_number: 3,
              title: 'Track One Metric',
              items: [
                'Each morning, rate sleep quality 1–10.',
                'On Day 8, compare the average to the previous week.',
                'Note the difference in how easily you fall asleep.',
              ],
            },
          ],
        },
        science: {
          question: 'What changes after 9 PM that screens disrupt?',
          mechanism:
            'Melatonin secretion begins around 9 PM (in a typical day-aligned circadian rhythm). Blue-rich screen light delays this by 90 minutes on average, pushing back sleep onset and reducing REM in the first half of the night.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'Why 7 Days Is Enough — and Why 7 Days Is Not Forever',
              body: 'Sleep changes are visible within 3 nights but stabilize around day 7. The challenge is not designed as a permanent rule but as a calibration: by day 8, you know what your sleep can be. From there, you can decide which nights to keep the rule.',
            },
            {
              title: 'The Replacement Problem',
              body: 'Removing screens without a replacement makes the evening feel empty and increases the chance of breaking the rule. The 3 most effective replacements: physical book (anxiety drops), conversation (oxytocin rises), warm shower (core temperature drops, sleep onset speeds up).',
            },
            {
              title: 'When the Challenge Should Be Modified',
              body: 'Shift workers, parents of infants, and on-call professionals should adapt the rule to "no screens 90 minutes before sleep" instead of a fixed time. The 9 PM rule assumes a sleep window around 11 PM.',
            },
          ],
        },
        reference: {
          text: 'Chang AM et al. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness.',
          source: 'PNAS, 112(4), 1232–1237.',
        },
      },
      {
        category_emoji: '🌙',
        title: '7일 챌린지: 9시 이후 스크린 금지',
        summary:
          '7일 만에 평균 23% 수면의 질을 개선하는 단일 규칙 챌린지. 규칙: 9시 이후 폰/TV/태블릿 금지.',
        mission: '7일 연속 약속하기 — 시작일을 오늘 정하세요.',
        action: {
          type: 'challenge',
          section_title: '7일 프로토콜',
          parts: [
            {
              part_number: 1,
              title: '준비 (Day 0 — 오늘)',
              items: [
                '침실 문 옆에 작은 바구니를 두세요.',
                "폰 알람을 '9:00 PM — 폰 내려놓기' 로 설정.",
                '오늘 밤부터 침실 밖에서 충전하세요.',
                '한 친구에게 챌린지 소식을 알리세요.',
              ],
            },
            {
              part_number: 2,
              title: '억제 대신 대체',
              items: [
                '대안 준비: 책, 일기장, 퍼즐, 따뜻한 차.',
                '내일 아침 첫 업무를 미리 정해 저녁 불안을 줄이세요.',
                '함께 사는 사람이 있다면 하룻밤 같이 해보자고 제안.',
              ],
            },
            {
              part_number: 3,
              title: '한 가지 지표만 추적',
              items: [
                '매일 아침 수면의 질을 1~10점으로 평가.',
                'Day 8에 전 주 평균과 비교.',
                '잠드는 데 걸린 시간의 차이를 기록.',
              ],
            },
          ],
        },
        science: {
          question: '9시 이후 무엇이 변하기에 스크린이 방해가 되나요?',
          mechanism:
            '일반적인 일주기 리듬에서 멜라토닌 분비는 9시경 시작됩니다. 청색광이 풍부한 스크린 빛은 이를 평균 90분 지연시켜 수면 시작을 늦추고 전반부 REM을 줄입니다.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '왜 7일은 충분한가 — 그리고 영구 규칙은 아닌가',
              body: '수면 변화는 3일 안에 보이지만 7일경 안정화됩니다. 챌린지는 영구 규칙이 아니라 캘리브레이션: Day 8에 자신의 수면이 어떨 수 있는지 알게 됩니다. 거기서부터 어느 밤에 규칙을 유지할지 결정.',
            },
            {
              title: '대체의 문제',
              body: '대체 없이 스크린만 제거하면 저녁이 공허해지고 규칙을 깰 확률이 올라갑니다. 가장 효과적인 3가지 대체: 실물 책 (불안 감소), 대화 (옥시토신 상승), 따뜻한 샤워 (심부온 하락, 수면 시작 가속).',
            },
            {
              title: '챌린지를 수정해야 할 때',
              body: '교대 근무자, 영아 부모, 온콜 전문가는 고정 시간 대신 "수면 90분 전 스크린 금지"로 적응시키세요. 9시 규칙은 11시경 수면 윈도우를 가정합니다.',
            },
          ],
        },
        reference: {
          text: 'Chang AM 등 (2015). 발광 이리더의 야간 사용이 수면, 일주기 타이밍, 다음날 각성에 미치는 부정적 영향.',
          source: 'PNAS, 112(4), 1232–1237.',
        },
      },
      {
        category_emoji: '🌙',
        title: '7日チャレンジ: 21時以降スクリーン禁止',
        summary:
          '7日で平均23%睡眠の質を改善する単一ルールチャレンジ。ルール: 21時以降スマホ/TV/タブレット禁止。',
        mission: '7日連続を約束 — 開始日を今日決めましょう。',
        action: {
          type: 'challenge',
          section_title: '7日プロトコル',
          parts: [
            {
              part_number: 1,
              title: '準備 (Day 0 — 今日)',
              items: [
                '寝室のドア横に小さなカゴを置きます。',
                "スマホアラームを '21:00 — スマホを置く' に設定。",
                '今夜から寝室の外で充電。',
                '友人一人にチャレンジ宣言。',
              ],
            },
            {
              part_number: 2,
              title: '抑制ではなく置き換え',
              items: [
                '代替を準備: 本、日記、パズル、温かいお茶。',
                '明日朝の最初のタスクを先に決めて夜の不安を減らします。',
                '同居人がいれば一晩だけでも一緒にやってもらえないか聞きます。',
              ],
            },
            {
              part_number: 3,
              title: '一つの指標を追跡',
              items: [
                '毎朝睡眠の質を1〜10で評価。',
                'Day 8 に前週平均と比較。',
                '寝つきの時間差を記録。',
              ],
            },
          ],
        },
        science: {
          question: '21時以降何が変わって、なぜスクリーンが妨げになるのですか?',
          mechanism:
            '日中型概日リズムではメラトニン分泌が21時頃から始まります。青色光豊富なスクリーン光はこれを平均90分遅らせ、入眠を遅らせ前半のREMを減らします。',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'なぜ7日が十分か — そして永続ルールではない',
              body: '睡眠変化は3日以内に見え、7日で安定します。チャレンジは永続ルールではなくキャリブレーション: Day 8 で自分の睡眠の可能性を知れます。',
            },
            {
              title: '置き換え問題',
              body: '代替なしでスクリーンだけ取り除くと夜が空虚になり、ルールを破る確率が上がります。最も効果的な3つ: 紙の本、会話、温かいシャワー。',
            },
            {
              title: 'ルールを修正すべき時',
              body: '交代勤務者、乳児の親、オンコール専門家は固定時間ではなく「睡眠90分前スクリーン禁止」に適応させます。',
            },
          ],
        },
        reference: {
          text: 'Chang AM ら (2015).',
          source: 'PNAS, 112(4), 1232–1237.',
        },
      }
    ),
  },

  // ============================================================
  // [4/5] SCIENCE — 과학적 설명 (science + deep_dive 강조, action 단순)
  // ============================================================
  {
    article_id: 'SAMPLE_SCI_001',
    type: 'science',
    category: 'Weight & Metabolism',
    slug: 'sample-science-why-metabolism-slows-with-age',
    image_group_id: 'samples/sci_001',
    is_active: true,
    solution_codes: 'SCIENCE,METABOLISM',
    target_s_types: ['S2', 'S3'],
    target_m_types: ['M1', 'M2'],
    target_l_problems: ['L_Weight', 'L_Metabolism'],
    published_at: '2026-05-15T09:00:00Z',
    updated_at: '2026-05-22T09:00:00Z',
    langs: fullLangs(
      {
        category_emoji: '🧬',
        title: 'Why Metabolism Slows With Age — and What Actually Changes',
        summary:
          'The story that metabolism crashes in your 30s is incomplete. A 2021 Science study tracked 6,421 people across 29 countries and found metabolism stays stable from 20 to 60. The real change is what happens inside the cell.',
        mission: 'Read the deep dive below for the 3 actual age-related shifts.',
        action: {
          type: 'science',
          section_title: 'What This Means in Practice',
          parts: [
            {
              part_number: 1,
              title: 'Reframe the Question',
              items: [
                'It is not "my metabolism slowed" — it is "my mitochondrial efficiency changed".',
                'Mitochondrial output responds to training within 6 weeks.',
                'Resistance training matters more after 40 than in your 20s.',
              ],
            },
          ],
        },
        science: {
          question: 'If total metabolism is stable from 20–60, why does weight gain feel easier?',
          mechanism:
            'Total daily energy expenditure (TDEE) is stable, but body composition shifts: muscle mass declines about 3–8% per decade starting around age 30, and is replaced by fat. Fat is metabolically less active per kg than muscle, so the SAME TDEE now requires fewer calories from food to maintain. The "slowdown" is composition, not rate.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'Shift 1: Mitochondrial Membrane Composition',
              body: 'Mitochondrial membranes accumulate omega-6:omega-3 ratio imbalance with age, which reduces ATP synthesis efficiency. This is partly diet-modifiable through omega-3 intake and partly trainable through aerobic exercise. The intervention window is roughly 12 weeks for measurable changes in fatty acid composition.',
            },
            {
              title: 'Shift 2: Sarcopenia Is Quiet but Compounding',
              body: 'Without resistance training, adults lose 3–8% of muscle mass per decade after 30. The loss accelerates after 60. Each kg of muscle burns approximately 13 kcal/day at rest. Losing 5 kg of muscle = 65 kcal/day less burn = 6.6 kg fat gain per year at the same intake.',
            },
            {
              title: 'Shift 3: Sleep Architecture Reshapes Growth Hormone',
              body: 'Slow-wave sleep (SWS) drops about 60% from age 20 to 60. Growth hormone, which is secreted during SWS, drives muscle repair and lipolysis overnight. Less SWS = less overnight repair signal. Sleep hygiene is metabolic intervention.',
            },
            {
              title: 'What the 2021 Study Actually Found',
              body: 'Pontzer et al. (2021) used doubly labeled water in 6,421 participants across 29 countries to measure TDEE. They identified 4 metabolic stages: rapid decline (0–1 year), gradual decline (1–20 years), STABLE (20–60 years), and decline after 60. The popular narrative of a "30s slowdown" was not supported by the data.',
            },
          ],
        },
        reference: {
          text: 'Pontzer H et al. (2021). Daily energy expenditure through the human life course.',
          source: 'Science, 373(6556), 808–812.',
        },
      },
      {
        category_emoji: '🧬',
        title: '왜 나이가 들면 신진대사가 느려지는가 — 실제로 변하는 것',
        summary:
          '30대에 신진대사가 급락한다는 이야기는 절반만 맞습니다. 2021년 Science 연구는 29개국 6,421명을 추적해 20~60세 사이 신진대사는 안정적이라는 사실을 밝혔습니다. 진짜 변화는 세포 내부에서 일어납니다.',
        mission: '아래 deep dive에서 실제 3가지 노화 관련 변화를 읽어보세요.',
        action: {
          type: 'science',
          section_title: '실생활에 적용하기',
          parts: [
            {
              part_number: 1,
              title: '질문을 다시 짜기',
              items: [
                "'신진대사가 느려졌어' 가 아니라 '미토콘드리아 효율이 변했어'.",
                '미토콘드리아 출력은 6주 안에 훈련에 반응합니다.',
                '40대 이후 저항 운동의 중요성이 20대보다 큽니다.',
              ],
            },
          ],
        },
        science: {
          question: '20~60세 전체 신진대사가 안정적이라면 왜 체중이 잘 늘게 느껴지나요?',
          mechanism:
            '하루 총 에너지 소비량(TDEE)은 안정적이지만 체성분이 바뀝니다: 근육량은 30세부터 10년마다 3~8% 감소하고 지방으로 대체됩니다. 지방은 kg당 근육보다 대사 활성이 낮아서 같은 TDEE를 유지하는 데 더 적은 칼로리만 필요합니다. "느려짐"은 속도가 아니라 구성의 문제입니다.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '변화 1: 미토콘드리아 막 구성',
              body: '미토콘드리아 막은 나이가 들수록 오메가-6:오메가-3 비율 불균형이 누적되어 ATP 합성 효율이 떨어집니다. 일부는 오메가-3 섭취로, 일부는 유산소 운동으로 조정 가능. 측정 가능한 지방산 변화의 개입 윈도는 약 12주입니다.',
            },
            {
              title: '변화 2: 근감소증은 조용히 누적된다',
              body: '저항 운동 없이는 30세 이후 10년마다 근육 3~8% 감소. 60세 후 가속화. 근육 1kg는 휴식 시 약 13kcal/일 소비. 근육 5kg 감소 = 일일 65kcal 덜 태움 = 같은 섭취에서 연간 지방 6.6kg 증가.',
            },
            {
              title: '변화 3: 수면 구조가 성장호르몬을 재구성',
              body: '서파수면(SWS)은 20대에서 60대까지 약 60% 감소. SWS 중 분비되는 성장호르몬은 야간 근육 회복과 지방 분해를 추진합니다. SWS 적음 = 야간 회복 신호 적음. 수면 위생은 대사 개입입니다.',
            },
            {
              title: '2021년 연구가 실제로 발견한 것',
              body: 'Pontzer 등 (2021)은 29개국 6,421명에게 이중 표지수를 사용해 TDEE를 측정. 4단계 대사 단계를 확인: 급속 감소 (0~1세), 점진 감소 (1~20세), 안정 (20~60세), 60세 이후 감소. 대중적 "30대 느려짐" 서사는 데이터로 지지되지 않았습니다.',
            },
          ],
        },
        reference: {
          text: 'Pontzer H 등 (2021). 인간 생애 전반의 일일 에너지 소비.',
          source: 'Science, 373(6556), 808–812.',
        },
      },
      {
        category_emoji: '🧬',
        title: 'なぜ年齢とともに代謝が落ちるのか — 実際に変わるもの',
        summary:
          '30代で代謝が急落するという話は半分しか合っていません。2021年Science誌の29か国6,421人の研究は、20〜60歳の代謝はほぼ安定だと示しました。本当の変化は細胞内で起こります。',
        mission: '下記のdeep diveで実際の3つの加齢変化を読んでみてください。',
        action: {
          type: 'science',
          section_title: '実生活への応用',
          parts: [
            {
              part_number: 1,
              title: '問いを変える',
              items: [
                "「代謝が落ちた」ではなく「ミトコンドリア効率が変わった」.",
                'ミトコンドリア出力は6週間で訓練に反応します。',
                '40代以降のレジスタンス運動の重要度は20代より高い。',
              ],
            },
          ],
        },
        science: {
          question: '20〜60歳の総代謝が安定なら、なぜ体重増加を感じやすいのですか?',
          mechanism:
            '総エネルギー消費量(TDEE)は安定ですが、体組成が変わります: 筋肉量は30歳から10年ごと3〜8%減り、脂肪に置き換わります。脂肪はkgあたり筋肉より代謝活性が低く、同じTDEEを保つのに少ないカロリーで済みます。「鈍化」は速度でなく構成の問題です。',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '変化1: ミトコンドリア膜組成',
              body: 'ミトコンドリア膜は加齢でオメガ-6:オメガ-3比の不均衡が蓄積し、ATP合成効率が低下。オメガ-3摂取と有酸素運動で部分的に調整可能。脂肪酸組成変化の介入ウィンドウは約12週間。',
            },
            {
              title: '変化2: サルコペニアは静かに進行',
              body: 'レジスタンス運動なしでは30歳以降10年ごと筋肉3〜8%減少。60歳以降加速。筋肉1kgは安静時約13kcal/日消費。筋肉5kg減 = 日65kcal減 = 同摂取で年6.6kg脂肪増。',
            },
            {
              title: '変化3: 睡眠構造が成長ホルモンを再形成',
              body: '徐波睡眠(SWS)は20代から60代まで約60%減少。SWS中に分泌される成長ホルモンは夜間の筋肉回復と脂肪分解を駆動。SWSが少ない = 夜の回復信号が少ない。睡眠衛生は代謝介入です。',
            },
            {
              title: '2021年研究の実際の発見',
              body: 'Pontzerら(2021)は29か国6,421人にDLW法でTDEEを測定。4段階の代謝ステージを同定: 急速減少(0〜1歳), 緩やか減少(1〜20歳), 安定(20〜60歳), 60歳以降減少。「30代鈍化」の通説はデータで支持されませんでした。',
            },
          ],
        },
        reference: {
          text: 'Pontzer H ら (2021).',
          source: 'Science, 373(6556), 808–812.',
        },
      }
    ),
  },

  // ============================================================
  // [5/5] REFERENCE — 참고자료 풍부 (deep_dive 5+ blocks + reference 핵심)
  // ============================================================
  {
    article_id: 'SAMPLE_REF_001',
    type: 'reference',
    category: 'Sleep & Recovery',
    slug: 'sample-reference-the-sleep-recovery-handbook',
    image_group_id: 'samples/ref_001',
    is_active: true,
    solution_codes: 'REFERENCE,SLEEP',
    target_s_types: ['S0', 'S1', 'S2', 'S3'],
    target_m_types: ['M0', 'M1', 'M2'],
    target_l_problems: ['L_Sleep'],
    published_at: '2026-05-18T09:00:00Z',
    updated_at: '2026-05-23T09:00:00Z',
    langs: fullLangs(
      {
        category_emoji: '😴',
        title: 'The Sleep Recovery Handbook: 7 Levers, Ranked by Effect Size',
        summary:
          'A reference article. Seven evidence-based sleep levers, each with its effect size, time-to-impact, and the trial that produced the number. Bookmark and revisit.',
        mission: 'Identify which 2 levers you are NOT using today.',
        action: {
          type: 'reference',
          section_title: 'How to Use This Article',
          parts: [
            {
              part_number: 1,
              title: 'Scan First',
              items: [
                'Read the deep dive titles below to find the lever most relevant to you.',
                'Each lever names its effect size and source paper.',
                'Pick ONE lever to apply this week — stacking too many dilutes the signal.',
              ],
            },
          ],
        },
        science: {
          question: 'Why a handbook, not a checklist?',
          mechanism:
            'Sleep is a system, not a single switch. The effect size of each lever depends on the population (shift workers vs day workers), the baseline (poor sleep vs okay sleep), and what is stacked on top. A handbook respects that nuance by giving you the magnitudes — so you can prioritize, not just check boxes.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'Lever 1 — Consistent wake time (effect size: large, time-to-impact: 7 days)',
              body: 'Waking within a 30-minute window every day (including weekends) is the single largest behavioral lever for circadian stability. Improves sleep onset latency by ~22 minutes within 1 week (Phillips et al., 2017). Implementation: set the wake alarm. Skip the snooze.',
            },
            {
              title: 'Lever 2 — Morning light (effect size: large, time-to-impact: 3 days)',
              body: '10–30 minutes of outdoor light within 1 hour of waking advances melatonin onset by ~30 minutes that evening. Cloudy day outdoor light (2,000 lux) is still 4× stronger than indoor light. Implementation: drink coffee outside, walk to a window-rich café, or stand on the balcony.',
            },
            {
              title: 'Lever 3 — Caffeine cutoff (effect size: medium-large, time-to-impact: 1 night)',
              body: 'Caffeine half-life is 5–6 hours. A 3 PM coffee still has ~25% of the caffeine in your system at 11 PM. Cutoff at noon for fast metabolizers, 2 PM for average, and avoid entirely for slow metabolizers (CYP1A2 *1F homozygotes). Implementation: switch to decaf or rooibos in the afternoon.',
            },
            {
              title: 'Lever 4 — Bedroom temperature (effect size: medium, time-to-impact: same night)',
              body: 'Core temperature drop signals sleep onset. Bedroom at 18–20°C facilitates this. Shower 90 minutes before bed accelerates core temperature drop by an additional ~10%. Implementation: set the thermostat. Open the window if needed.',
            },
            {
              title: 'Lever 5 — No screens 60 min pre-sleep (effect size: medium, time-to-impact: 3 nights)',
              body: 'Blue light suppression of melatonin extends sleep onset by ~15 minutes on heavy-use evenings. The replacement matters: paper book > podcast > nothing (boredom anxiety). Implementation: charge phone outside the bedroom.',
            },
            {
              title: 'Lever 6 — Alcohol cutoff 4 hours pre-sleep (effect size: medium, time-to-impact: 1 night)',
              body: 'Alcohol fragments REM sleep and increases nighttime wake-ups in the second half of the night. Two drinks reduce sleep quality scores by ~24% (Pietilä et al., 2018). The 4-hour cutoff allows metabolism. Implementation: shift social drinks earlier.',
            },
            {
              title: 'Lever 7 — Worry journal 30 min pre-sleep (effect size: small-medium, time-to-impact: 7 days)',
              body: 'A 5-minute "tomorrow plan" written 30 minutes before bed reduces sleep onset latency by ~9 minutes in anxious sleepers (Scullin et al., 2018). The mechanism: externalizing rumination. Implementation: notebook on the nightstand. 5 items, then close.',
            },
            {
              title: 'How to Stack Without Diluting',
              body: 'Pick one lever per week, in this order: 1 → 2 → 5 → 4 → 3 → 6 → 7. The first two compound circadian alignment; the next three are environmental; the last two are stimulant/anxiety control. Skipping ahead is fine if you already have a foundation.',
            },
          ],
        },
        reference: {
          text: 'Phillips AJK et al. (2017). Irregular sleep/wake patterns are associated with poorer academic performance. — Scullin MK et al. (2018). The effects of bedtime writing on difficulty falling asleep. — Pietilä J et al. (2018). Acute effect of alcohol intake on cardiovascular autonomic regulation during the first hours of sleep.',
          source: 'Scientific Reports / Journal of Experimental Psychology / JMIR Mental Health (multi-paper compilation).',
        },
      },
      {
        category_emoji: '😴',
        title: '수면 회복 핸드북: 효과 크기 순으로 정리한 7가지 레버',
        summary:
          '레퍼런스 형식의 글입니다. 근거 기반 수면 레버 7가지를 각각 효과 크기, 효과 발현 시간, 출처 논문과 함께 정리했습니다. 북마크하고 다시 읽기 좋습니다.',
        mission: '오늘 사용하지 않는 레버 2가지를 찾아보세요.',
        action: {
          type: 'reference',
          section_title: '이 글을 활용하는 법',
          parts: [
            {
              part_number: 1,
              title: '먼저 훑기',
              items: [
                '아래 deep dive 제목을 훑으며 자신에게 가장 관련된 레버를 찾으세요.',
                '각 레버마다 효과 크기와 출처 논문이 명시되어 있습니다.',
                '이번 주에 단 하나의 레버만 적용하세요 — 너무 많이 쌓으면 신호가 묻힙니다.',
              ],
            },
          ],
        },
        science: {
          question: '왜 체크리스트가 아니라 핸드북인가요?',
          mechanism:
            '수면은 단일 스위치가 아닌 시스템입니다. 각 레버의 효과는 대상자(교대 vs 주간 근무), 기준선(나쁜 수면 vs 보통), 위에 무엇이 쌓이는지에 따라 달라집니다. 핸드북은 그 nuance를 존중하며 크기를 알려줍니다 — 단순한 체크가 아닌 우선순위를 정할 수 있도록.',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: '레버 1 — 일관된 기상 시간 (효과: 대, 발현: 7일)',
              body: '주말 포함 매일 30분 윈도 안에서 기상하는 것이 일주기 안정성에 가장 큰 행동 레버입니다. 1주 안에 수면 잠복기를 약 22분 개선 (Phillips 등, 2017). 실행: 기상 알람 설정. 스누즈 금지.',
            },
            {
              title: '레버 2 — 아침 빛 (효과: 대, 발현: 3일)',
              body: '기상 후 1시간 내 야외 빛 10~30분이 그날 저녁 멜라토닌 시작을 약 30분 앞당깁니다. 흐린 날의 야외 빛(2,000lux)도 실내 빛의 4배. 실행: 커피를 밖에서, 창이 큰 카페까지 걷기, 또는 베란다에 서기.',
            },
            {
              title: '레버 3 — 카페인 컷오프 (효과: 중대, 발현: 하룻밤)',
              body: '카페인 반감기 5~6시간. 오후 3시 커피가 밤 11시에도 ~25% 남아 있습니다. 빠른 대사자는 정오, 평균은 오후 2시 컷오프, 느린 대사자(CYP1A2 *1F 동형접합)는 완전히 피하세요. 실행: 오후엔 디카페인이나 루이보스로 전환.',
            },
            {
              title: '레버 4 — 침실 온도 (효과: 중, 발현: 당일 밤)',
              body: '심부온 하락이 수면 시작을 신호합니다. 침실 18~20°C가 이를 돕습니다. 취침 90분 전 샤워는 심부온 하락을 추가 ~10% 가속. 실행: 온도 조절기 설정. 필요하면 창을 여세요.',
            },
            {
              title: '레버 5 — 취침 60분 전 스크린 금지 (효과: 중, 발현: 3일 밤)',
              body: '청색광의 멜라토닌 억제로 사용량 많은 저녁 수면 시작이 ~15분 지연됩니다. 대체가 중요: 종이책 > 팟캐스트 > 아무것도 안 함(지루함 불안). 실행: 침실 밖에서 폰 충전.',
            },
            {
              title: '레버 6 — 취침 4시간 전 알코올 컷오프 (효과: 중, 발현: 하룻밤)',
              body: '알코올은 REM 수면을 단편화하고 후반부 야간 각성을 늘립니다. 음주 2잔이 수면의 질 점수를 ~24% 떨어뜨립니다 (Pietilä 등, 2018). 4시간 컷오프는 대사를 허용. 실행: 사교 음주를 더 일찍.',
            },
            {
              title: '레버 7 — 취침 30분 전 걱정 일지 (효과: 소중, 발현: 7일)',
              body: '취침 30분 전 5분 "내일 계획"을 쓰면 불안한 수면자의 수면 잠복기가 ~9분 단축 (Scullin 등, 2018). 메커니즘: 반추를 외부화. 실행: 침대 옆 노트. 5개 항목, 닫기.',
            },
            {
              title: '쌓을 때 묽어지지 않는 법',
              body: '이 순서로 주당 하나씩: 1 → 2 → 5 → 4 → 3 → 6 → 7. 처음 둘은 일주기 정렬을 복리화; 다음 셋은 환경; 마지막 둘은 자극제/불안 통제. 이미 기반이 있다면 건너뛰어도 OK.',
            },
          ],
        },
        reference: {
          text: 'Phillips AJK 등 (2017). 불규칙한 수면/각성 패턴과 학업 성취. — Scullin MK 등 (2018). 취침 전 글쓰기가 잠들기 어려움에 미치는 영향. — Pietilä J 등 (2018). 수면 첫 시간의 심혈관 자율 조절에 미치는 음주 영향.',
          source: 'Scientific Reports / Journal of Experimental Psychology / JMIR Mental Health (다중 논문 종합).',
        },
      },
      {
        category_emoji: '😴',
        title: '睡眠回復ハンドブック: 効果サイズ順の7つのレバー',
        summary:
          'リファレンス記事です。エビデンスベースの睡眠レバー7つを、それぞれ効果サイズ・効果発現時間・出典論文とともに整理。ブックマークして再読してください。',
        mission: '今日使っていないレバー2つを特定してみましょう。',
        action: {
          type: 'reference',
          section_title: 'この記事の使い方',
          parts: [
            {
              part_number: 1,
              title: 'まず眺める',
              items: [
                '下記のdeep diveタイトルを眺めて自分に最も関連するレバーを見つけます。',
                '各レバーには効果サイズと出典論文が記載されています。',
                '今週は1つのレバーだけ適用 — 重ねすぎは信号を希釈します。',
              ],
            },
          ],
        },
        science: {
          question: 'なぜチェックリストではなくハンドブックか?',
          mechanism:
            '睡眠は単一スイッチではなくシステムです。各レバーの効果は対象者(交代勤務 vs 日勤)、ベースライン(悪い睡眠 vs まあまあ)、上に何を重ねるかによって変わります。ハンドブックはそのニュアンスを尊重し、大きさを示します — 単なるチェックではなく優先順位を立てるために。',
        },
        deep_dive: {
          enabled: true,
          blocks: [
            {
              title: 'レバー 1 — 一貫した起床時間 (効果: 大, 発現: 7日)',
              body: '週末含め毎日30分以内の窓で起きることが概日安定の最大の行動レバー。1週間で入眠潜時を約22分改善(Phillips ら, 2017)。実行: 起床アラーム設定。スヌーズ禁止。',
            },
            {
              title: 'レバー 2 — 朝の光 (効果: 大, 発現: 3日)',
              body: '起床後1時間以内に屋外光10〜30分でその夜のメラトニン開始を約30分前倒し。曇天屋外光(2,000lux)でも室内光の4倍。実行: 外でコーヒー、窓の多いカフェまで歩く、バルコニーに立つ。',
            },
            {
              title: 'レバー 3 — カフェインカットオフ (効果: 中大, 発現: 一晩)',
              body: 'カフェインの半減期は5〜6時間。午後3時のコーヒーは夜11時にも〜25%残ります。速い代謝者は正午、平均は午後2時カットオフ、遅い代謝者(CYP1A2 *1F同型接合)は完全回避。実行: 午後はデカフェかルイボスに切り替え。',
            },
            {
              title: 'レバー 4 — 寝室温度 (効果: 中, 発現: その夜)',
              body: '深部体温の低下が入眠を合図します。寝室18〜20°Cがこれを助けます。就寝90分前のシャワーで深部温低下が追加〜10%加速。実行: サーモスタット設定。必要なら窓を開ける。',
            },
            {
              title: 'レバー 5 — 就寝60分前のスクリーン禁止 (効果: 中, 発現: 3晩)',
              body: '青色光のメラトニン抑制で使用が多い夜は入眠が〜15分遅延。代替が重要: 紙の本 > ポッドキャスト > 何もしない(退屈不安)。実行: 寝室外でスマホ充電。',
            },
            {
              title: 'レバー 6 — 就寝4時間前のアルコールカットオフ (効果: 中, 発現: 一晩)',
              body: 'アルコールはREMを断片化し後半の夜間覚醒を増やします。2杯で睡眠質スコアが〜24%低下(Pietilä ら, 2018)。4時間カットオフで代謝を許容。実行: 社交飲酒を早める。',
            },
            {
              title: 'レバー 7 — 就寝30分前の心配日記 (効果: 小中, 発現: 7日)',
              body: '就寝30分前に5分「明日の計画」を書くと不安傾向の入眠潜時が〜9分短縮(Scullin ら, 2018)。メカニズム: 反芻の外部化。実行: 枕元のノート。5項目、閉じる。',
            },
            {
              title: '重ねて希釈しない方法',
              body: 'この順で週1つずつ: 1 → 2 → 5 → 4 → 3 → 6 → 7。最初の2つは概日整列を複利化、次の3つは環境、最後の2つは刺激/不安制御。基盤があれば飛ばしてOK。',
            },
          ],
        },
        reference: {
          text: 'Phillips AJK ら (2017). — Scullin MK ら (2018). — Pietilä J ら (2018).',
          source: 'Scientific Reports / Journal of Experimental Psychology / JMIR Mental Health (複数論文総合).',
        },
      }
    ),
  },
];

/** Type별 그룹화 (검수 페이지에서 사용) */
export const SAMPLE_TYPES = [
  { key: 'guide', label: 'Guide', desc: '단계별 실행 가이드 (action.parts 풍부)', emoji: '🧭' },
  { key: 'tip', label: 'Tip', desc: '짧은 팁 (summary + mission 중심)', emoji: '💡' },
  { key: 'challenge', label: 'Challenge', desc: '도전 미션 (mission + action 강조)', emoji: '🎯' },
  { key: 'science', label: 'Science', desc: '과학적 설명 (science + deep_dive 깊이)', emoji: '🧬' },
  { key: 'reference', label: 'Reference', desc: '참고자료 (deep_dive 다수 블록 + reference)', emoji: '📚' },
] as const;
