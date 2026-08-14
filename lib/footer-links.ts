/**
 * SEO footer link clusters.
 *
 * A sitewide footer is the strongest internal-linking surface a content site
 * has: every one of the ~10k article URLs links back to whatever sits here, so
 * these pages accumulate internal PageRank and get crawled far more often than
 * a link buried in an archive page ever would.
 *
 * WHY THESE ARTICLES
 * A full pass over the 1,035 deployed articles showed content depth is
 * essentially uniform (every article ships FAQ + key stats + references in 4
 * languages), so depth cannot rank them. What does vary is whether the article
 * targets a query a person would actually type. Selection therefore scored
 * `primary_keyword_en` on: how short/head-term it is, whether it names a drug
 * brand (ozempic / wegovy / mounjaro / semaglutide / tirzepatide …), and
 * whether it carries commercial-decision intent (vs, side effects, how much,
 * insurance). The GLP-1 cluster dominated that ranking, which is also where
 * HAVIT's product story lives — so the footer leans into it rather than trying
 * to represent all 15 blog categories equally (the TOPICS column already does
 * that job).
 *
 * WHY ~36 LINKS
 * Enough to cover the money clusters, few enough that each still receives a
 * meaningful share of link equity. Adding the long tail here would dilute every
 * link and bloat 10k pages.
 *
 * LABELS
 * Anchor text is derived from each article's own title in the reader's
 * language (see shortLabel in components/Footer.tsx) instead of a hand-kept
 * table — 36 links × 10 languages of hand-written labels would drift the moment
 * a title changes, and the localized title already contains the entity the
 * anchor needs to carry.
 *
 * To add a link: append the slug. To retire one: delete the line. A slug that
 * no longer resolves is skipped at render time rather than throwing.
 */

export interface FooterLinkGroup {
  /** i18n key for the column heading (see FOOTER_GROUP_LABELS in Footer.tsx). */
  key: string
  slugs: string[]
}

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    // Practical "I just started" questions — highest-intent, lowest-competition.
    key: 'glp1Start',
    slugs: [
      'glp1-injection-site-rotation-absorption-2026',
      'glp1-injection-technique-pain-reduction-2026',
      'tirzepatide-dose-titration-schedule-minimize-nausea-2026',
      'glp1-traveling-storage-temperature-guide-2026',
      'wegovy-insurance-coverage-prior-authorization-tips-2026',
      'glp1-exercise-timing-medication-effectiveness-2026',
    ],
  },
  {
    // "<drug> side effects" is the highest-volume GLP-1 query family.
    key: 'sideEffects',
    slugs: [
      'glp1-nausea-management-evidence-based-strategies-2026',
      'glp1-hair-loss-telogen-effluvium-management-2026',
      'glp1-constipation-fiber-strategy-balance-2026',
      'glp1-gallbladder-symptoms-recognition-prevention-2026',
      'glp1-pancreatitis-warning-signs-risk-reduction-2026',
      'glp1-gastroparesis-symptoms-recognition-2026',
    ],
  },
  {
    // Comparison queries convert: the searcher is choosing between options.
    key: 'compare',
    slugs: [
      'glp1-type2-diabetes-vs-obesity-indication-dose-difference-2026',
      'tirzepatide-vs-semaglutide-gi-side-effects-duration-comparison-2026',
      'glp1-retatrutide-triple-agonist-comparison-2026',
      'compounded-semaglutide-vs-brand-wegovy-safety-efficacy-2026',
      'glp1-switching-brands-equivalence-guide-2026',
      'transitioning-from-ozempic-to-mounjaro-protocol-2026',
    ],
  },
  {
    // "can I take X with GLP-1" — safety questions people search before asking a doctor.
    key: 'interactions',
    slugs: [
      'glp1-metformin-combination-therapy-synergy-2026',
      'glp1-antidepressant-ssri-interaction-serotonin-2026',
      'glp1-levothyroxine-thyroid-medication-interaction-2026',
      'glp1-statin-cholesterol-medication-synergy-2026',
      'glp1-alcohol-interaction-safety-limits-2026',
      'glp1-caffeine-interaction-appetite-effects-2026',
    ],
  },
  {
    // Stopping / maintaining — where HAVIT's own product value sits.
    key: 'afterGlp1',
    slugs: [
      'glp1-rebound-weight-gain-prevention-2026',
      'stopping-semaglutide-weight-regain-prevention-protocol-2026',
      'glp1-muscle-preservation-protein-timing-resistance-training-2026',
      'glp1-sarcopenia-screening-dexa-grip-strength-protocol-2026',
      'weight-regain-prevention-maintenance-phase-protocol-2026',
      'glp1-behavior-change-m0-m1-m2',
    ],
  },
  {
    // Persona / condition modifiers — long-tail with low competition.
    key: 'conditions',
    slugs: [
      'glp1-pcos-weight-loss-insulin-resistance-improvement-2026',
      'glp1-menstrual-cycle-changes-fertility-considerations-2026',
      'glp1-thyroid-function-monitoring-protocol-2026',
      'glp1-sleep-quality-changes-mechanisms-2026',
      'glp1-mental-health-effects-depression-anxiety-2026',
      'glp1-hair-loss-protein-intake-connection-2026',
    ],
  },
]

/** Flat slug list — used by tests / sitemap priority if ever needed. */
export const FOOTER_LINK_SLUGS: string[] = FOOTER_LINK_GROUPS.flatMap((g) => g.slugs)
