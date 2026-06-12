import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  Zap,
  Users,
  Shield,
  Handshake,
} from 'lucide-react';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Program pillar data — content-rich structures                     */
/* ------------------------------------------------------------------ */
interface PillarData {
  id: string;
  label: string;
  title: string;
  description: string;
  activities: string[];
  stats: { value: string; label: string }[];
  icon: React.ElementType;
}

const pillars: PillarData[] = [
  {
    id: 'infrastructure',
    label: 'PILLAR 1',
    title: 'Infrastructure & Connectivity',
    description:
      'Building the physical and digital infrastructure that connects isolated communities to markets, services, and economic opportunity. Our infrastructure investments are designed with climate resilience and community ownership built in from day one.',
    activities: [
      'Road and bridge construction in rural districts',
      'Clean water supply systems and sanitation facilities',
      'Digital connectivity — mobile network towers and community internet hubs',
      'Energy infrastructure — mini-grids and solar installations',
      'Market infrastructure — storage facilities, processing centers, and trade routes',
    ],
    stats: [
      { value: '847 km', label: 'Roads Constructed' },
      { value: '234', label: 'Water Points Installed' },
      { value: '45', label: 'Digital Hubs Established' },
      { value: '12,400+', label: 'Households Connected' },
    ],
    icon: Zap,
  },
  {
    id: 'community',
    label: 'PILLAR 2',
    title: 'Community Empowerment',
    description:
      "Strengthening the capacity of local institutions, women's groups, and civic organizations to lead their own development agendas. We believe sustainable change only happens when communities have the agency, resources, and voice to shape their own futures.",
    activities: [
      "Women's cooperative formation and business skills training",
      'Local governance capacity building and participatory planning',
      'Youth employment and entrepreneurship programs',
      'Civic education and community monitoring frameworks',
      'Savings and lending group facilitation',
    ],
    stats: [
      { value: '156', label: "Women's Cooperatives" },
      { value: '8,200', label: 'People Trained' },
      { value: '42', label: 'Community Plans Developed' },
      { value: '68%', label: 'Women in Leadership Roles' },
    ],
    icon: Users,
  },
  {
    id: 'resilience',
    label: 'PILLAR 3',
    title: 'Climate Resilience',
    description:
      'Implementing climate-smart agriculture, disaster preparedness systems, and sustainable natural resource management to protect livelihoods from an increasingly volatile climate. Our approach integrates scientific modeling with indigenous knowledge.',
    activities: [
      'Climate-smart agriculture training and seed diversification',
      'Early warning systems and disaster preparedness planning',
      'Watershed management and reforestation programs',
      'Sustainable land use planning at district level',
      'Carbon footprint monitoring and reduction targets',
    ],
    stats: [
      { value: '18', label: 'Districts with Disaster Plans' },
      { value: '4,200 ha', label: 'Reforested Land' },
      { value: '3,100', label: 'Farmers Using Climate-Smart Practices' },
      { value: '32%', label: 'Reduction in Crop Loss' },
    ],
    icon: Shield,
  },
  {
    id: 'partnerships',
    label: 'PILLAR 4',
    title: 'Strategic Partnerships',
    description:
      'Coordinating multi-stakeholder collaboration between donors, implementers, researchers, and independent evaluators. Meridian serves as the coordination hub, ensuring all partners work toward shared objectives with minimal duplication and maximum coherence.',
    activities: [
      'Consortium governance and joint planning frameworks',
      'Knowledge management and cross-partner learning',
      'Joint monitoring, evaluation, and adaptive management',
      'Resource mobilization and donor coordination',
      'Policy advocacy at national and international levels',
    ],
    stats: [
      { value: '6', label: 'Consortium Partners' },
      { value: '$450M', label: 'Total Funding Coordinated' },
      { value: '28', label: 'District-Level Partnerships' },
      { value: '4', label: 'Joint Research Publications' },
    ],
    icon: Handshake,
  },
];

/* ------------------------------------------------------------------ */
/*  Theory of Change stages                                           */
/* ------------------------------------------------------------------ */
const tocStages = [
  {
    title: 'INPUTS',
    items: ['Funding', 'Technical expertise', 'Partnerships'],
  },
  {
    title: 'ACTIVITIES',
    items: ['Infrastructure', 'Empowerment', 'Resilience programs'],
  },
  {
    title: 'OUTPUTS',
    items: ['Roads built', 'Cooperatives formed', 'Plans adopted'],
  },
  {
    title: 'OUTCOMES',
    items: ['Improved livelihoods', 'Climate adaptation', 'Self-sufficiency'],
  },
];

const tocAssumptions = [
  'Country governments remain committed to reform and investment',
  'Climate patterns follow modeled projections allowing for adaptation',
  'Consortium partners maintain funding and staffing commitments',
];

/* ------------------------------------------------------------------ */
/*  Implementation timeline data                                       */
/* ------------------------------------------------------------------ */
const timelinePhases = [
  {
    phase: 'Phase I',
    period: '2021\u20132023',
    milestones: 'Country program launch, infrastructure rollout begins, first cooperatives formed',
  },
  {
    phase: 'Phase I',
    period: '2023\u20132025',
    milestones: 'Full pillar implementation, mid-term evaluation, climate framework adopted',
  },
  {
    phase: 'Phase II',
    period: '2025\u20132026',
    milestones: 'Scale-up to new districts, Phase II funding mobilized',
  },
  {
    phase: 'Phase II',
    period: '2026\u20132028',
    milestones: 'Full coverage target, sustainability transition planning, final evaluation',
  },
];

/* ------------------------------------------------------------------ */
/*  ScrollReveal helper                                                */
/* ------------------------------------------------------------------ */
function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dx = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
  const dy = direction === 'up' ? 40 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: dx, y: dy }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  PROGRAMS PAGE                                                      */
/* ================================================================== */
export default function Programs() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Page Hero                                        */}
      {/* ============================================================ */}
      <section
        className="flex items-end"
        style={{ backgroundColor: 'var(--primary-blue)', minHeight: 200 }}
      >
        <div className="container-main w-full pb-8 pt-12">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-4 text-xs uppercase tracking-[0.1em]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight size={12} />
            <span>What We Do</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="text-white"
          >
            What We Do
          </motion.h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Program Overview                                 */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <ScrollReveal>
            <span
              className="label-caption block mb-4"
              style={{ color: 'var(--medium-blue)' }}
            >
              PROGRAM OVERVIEW
            </span>
            <h2 className="mb-6" style={{ color: 'var(--text-primary)' }}>
              An integrated approach to sustainable development
            </h2>
            <p
              className="text-base leading-relaxed max-w-[720px] mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              Meridian Global Development operates through four interconnected
              program pillars. Each pillar reinforces the others —
              infrastructure creates the physical foundation, community
              empowerment ensures local ownership, climate resilience protects
              long-term gains, and strategic partnerships coordinate resources
              and expertise for maximum impact.
            </p>
          </ScrollReveal>

          {/* Program Pillar Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollToSection(p.id)}
                  className="px-5 py-3 text-sm font-medium uppercase tracking-wide border transition-colors duration-200 hover:bg-[var(--medium-blue)] hover:text-white"
                  style={{
                    backgroundColor: 'var(--bg-grey)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTIONS 3-6 — Four Program Pillars (alternating layouts)    */}
      {/* ============================================================ */}
      {pillars.map((pillar, idx) => {
        const isReversed = idx % 2 !== 0; // pillars 1 & 3 (0-based: 1,3) are reversed
        const Icon = pillar.icon;
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className="section-padding"
            style={{
              backgroundColor:
                idx % 2 === 0 ? 'var(--bg-grey)' : 'var(--bg-white)',
            }}
          >
            <div className="container-main">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content column */}
                <div
                  className={`${
                    isReversed
                      ? 'lg:order-2 lg:col-span-7'
                      : 'lg:order-1 lg:col-span-7'
                  }`}
                >
                  <ScrollReveal
                    direction={isReversed ? 'right' : 'left'}
                  >
                    {/* Pillar icon + label */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 flex items-center justify-center border"
                        style={{
                          borderColor: 'var(--accent)',
                          backgroundColor:
                            idx % 2 === 0
                              ? 'var(--bg-white)'
                              : 'var(--bg-grey)',
                        }}
                      >
                        <Icon
                          size={32}
                          strokeWidth={1.5}
                          style={{ color: 'var(--accent)' }}
                        />
                      </div>
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--accent)' }}
                        >
                          {pillar.label}
                        </span>
                      </div>
                    </div>

                    <h2
                      className="mb-6"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {pillar.title}
                    </h2>

                    <p
                      className="text-base leading-relaxed mb-8"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {pillar.description}
                    </p>

                    {/* Key Activities */}
                    <h4
                      className="text-sm font-semibold uppercase tracking-wide mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Key Activities
                    </h4>
                    <ul className="space-y-2 mb-8">
                      {pillar.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-2 text-base"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: 'var(--accent)' }}
                          />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>

                {/* Stats column */}
                <div
                  className={`${
                    isReversed
                      ? 'lg:order-1 lg:col-span-5'
                      : 'lg:order-2 lg:col-span-5'
                  }`}
                >
                  <ScrollReveal
                    direction={isReversed ? 'left' : 'right'}
                    delay={0.2}
                  >
                    <div
                      className="p-6 border"
                      style={{
                        backgroundColor:
                          idx % 2 === 0
                            ? 'var(--bg-white)'
                            : 'var(--bg-grey)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <h4
                        className="text-sm font-semibold uppercase tracking-wide mb-6"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Results to Date
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {pillar.stats.map((s, si) => (
                          <StatCard
                            key={s.label}
                            value={s.value}
                            label={s.label}
                            delay={si * 0.1}
                          />
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ============================================================ */}
      {/* SECTION 7 — Theory of Change                                 */}
      {/* ============================================================ */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        <div className="container-main">
          <ScrollReveal>
            <span
              className="label-caption block mb-4"
              style={{ color: 'var(--accent)' }}
            >
              THEORY OF CHANGE
            </span>
            <h2 className="mb-12 text-white">
              How we create lasting impact
            </h2>
          </ScrollReveal>

          {/* Flow diagram — 4 stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {tocStages.map((stage, i) => (
              <ScrollReveal key={stage.title} delay={0.15 * i}>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div
                      className="border p-5 h-full"
                      style={{
                        borderColor: 'var(--medium-blue)',
                        backgroundColor: 'rgba(0,86,164,0.08)',
                      }}
                    >
                      <h4
                        className="text-sm font-bold uppercase tracking-wide mb-3 text-white"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {stage.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {stage.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.75)' }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Arrow between stages (hidden on last + mobile) */}
                  {i < tocStages.length - 1 && (
                    <div className="hidden lg:flex items-center h-full">
                      <ArrowRight
                        size={20}
                        style={{ color: 'var(--accent)' }}
                      />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Key Assumptions */}
          <ScrollReveal delay={0.6}>
            <div
              className="border-t pt-8"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <h4
                className="text-sm font-semibold uppercase tracking-wide mb-4 text-white"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Key Assumptions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tocAssumptions.map((assumption) => (
                  <div key={assumption} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {assumption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8 — Program Timeline                                 */}
      {/* ============================================================ */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--bg-grey)' }}
      >
        <div className="container-main">
          <ScrollReveal>
            <span
              className="label-caption block mb-4"
              style={{ color: 'var(--medium-blue)' }}
            >
              IMPLEMENTATION TIMELINE
            </span>
            <h2 className="mb-12" style={{ color: 'var(--text-primary)' }}>
              Phase I (2021&ndash;2025) and Phase II (2025&ndash;2028)
            </h2>
          </ScrollReveal>

          {/* Horizontal timeline bar */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              {/* Bar background */}
              <div
                className="h-2 w-full rounded"
                style={{ backgroundColor: 'var(--border)' }}
              >
                {/* Filled portion — up to 2025 (3 out of 4 segments = 75%) */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: easeOutExpo }}
                  className="h-full rounded"
                  style={{ backgroundColor: 'var(--medium-blue)' }}
                />
              </div>

              {/* Milestone markers */}
              <div className="grid grid-cols-4 gap-2 mt-6 relative">
                {timelinePhases.map((phase, i) => (
                  <div key={phase.period} className="text-center">
                    {/* Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + i * 0.1,
                        ease: easeOutExpo,
                      }}
                      className="w-4 h-4 rounded-full mx-auto mb-3"
                      style={{
                        backgroundColor:
                          i < 2
                            ? 'var(--medium-blue)'
                            : i === 2
                              ? 'var(--accent)'
                              : 'var(--bg-white)',
                        border:
                          i === 2
                            ? '3px solid var(--accent)'
                            : i >= 3
                              ? '2px solid var(--border)'
                              : 'none',
                      }}
                    />
                    {/* Phase label */}
                    <span
                      className="label-caption block mb-1"
                      style={{ color: 'var(--medium-blue)' }}
                    >
                      {phase.phase}
                    </span>
                    <span
                      className="text-sm font-bold block mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {phase.period}
                    </span>
                    <p
                      className="text-xs leading-relaxed hidden md:block"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {phase.milestones}
                    </p>
                  </div>
                ))}
              </div>

              {/* Current position marker (gold diamond) */}
              <motion.div
                className="absolute top-0 hidden md:block"
                style={{ left: '62.5%', transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className="w-5 h-5 rotate-45"
                  style={{
                    backgroundColor: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(234,170,0,0.5)',
                  }}
                />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  StatCard sub-component                                             */
/* ================================================================== */
function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: easeOutExpo }}
      className="p-4 border text-center"
      style={{
        backgroundColor: 'var(--bg-white)',
        borderColor: 'var(--border)',
      }}
    >
      <span
        className="block text-2xl md:text-3xl font-bold mb-1"
        style={{ color: 'var(--accent)' }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-wide block"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
