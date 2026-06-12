import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  HeartHandshake,
  Users,
  FlaskConical,
  TreePine,
  ClipboardCheck,
  Check,
  CircleDot,
  Minus,
  ArrowRight,
  Download,
  Mail,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── animation helpers ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return { ref, inView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: easeOutExpo },
  }),
};

/* ─── partner data ─── */
const partners = [
  {
    id: 'meridian',
    name: 'Meridian Global Development',
    badge: 'COORDINATING BODY',
    badgeColor: 'var(--primary-blue)',
    role: 'Lead coordinating body',
    description:
      'The coordinating entity responsible for overall program management, consortium governance, donor relations, and strategic direction. Meridian chairs the Board of Directors and manages the secretariat.',
    contribution: 'Program coordination, governance, monitoring & evaluation framework',
    countries: 'All 5 countries',
    since: '2019',
    icon: Building2,
  },
  {
    id: 'atlas',
    name: 'Atlas International Foundation',
    badge: 'LEAD DONOR',
    badgeColor: 'var(--medium-blue)',
    role: 'Primary funding partner',
    description:
      'The primary funding partner providing the core financial envelope for all program activities. Atlas brings over 30 years of international development experience and also contributes technical expertise in infrastructure finance and economic analysis.',
    contribution: '$280M funding commitment, infrastructure finance expertise',
    countries: 'All 5 countries',
    since: '2020',
    icon: HeartHandshake,
  },
  {
    id: 'horizon',
    name: 'Horizon Cooperative Alliance',
    badge: 'TECHNICAL PARTNER',
    badgeColor: 'var(--light-blue)',
    role: 'Community-led development expertise',
    description:
      'The lead implementing partner for the Infrastructure & Connectivity pillar. Horizon brings deep engineering expertise and a proven track record in rural infrastructure delivery across developing contexts.',
    contribution: 'Infrastructure design & implementation, engineering oversight',
    countries: 'San Marova, Kaledonia, Ostmark',
    since: '2021',
    icon: Users,
  },
  {
    id: 'pacifica',
    name: 'Pacifica Research Institute',
    badge: 'RESEARCH PARTNER',
    badgeColor: 'var(--success)',
    role: 'Research, monitoring & learning',
    description:
      'The knowledge and research arm of the consortium, providing evidence-based analysis, impact evaluations, and policy research to inform program design and adaptation.',
    contribution: 'Research, impact evaluation, policy analysis, knowledge products',
    countries: 'All 5 countries',
    since: '2021',
    icon: FlaskConical,
  },
  {
    id: 'solara',
    name: 'Solara Community Partners',
    badge: 'FIELD PARTNER',
    badgeColor: 'var(--warning)',
    role: 'On-the-ground implementation',
    description:
      'The lead implementing partner for the Community Empowerment pillar. Solara specializes in grassroots community mobilization, women\'s cooperative development, and participatory planning.',
    contribution: 'Community mobilization, cooperative development, training delivery',
    countries: 'Kaledonia, Terres Vertes, Nubara Coast',
    since: '2021',
    icon: TreePine,
  },
  {
    id: 'vertex',
    name: 'Vertex Evaluation Group',
    badge: 'EVALUATION PARTNER',
    badgeColor: 'var(--error)',
    role: 'Independent evaluation',
    description:
      'An independent evaluation organization providing objective, third-party assessment of program performance. Vertex reports directly to the Board of Directors to ensure accountability.',
    contribution: 'Independent evaluation, performance auditing, recommendations',
    countries: 'All 5 countries',
    since: '2021',
    icon: ClipboardCheck,
  },
];

/* ─── funding data ─── */
const fundingSources = [
  { name: 'Atlas International Foundation', amount: '$280M', pct: 62 },
  { name: 'Bilateral donor contributions', amount: '$95M', pct: 21 },
  { name: 'National government co-funding', amount: '$50M', pct: 11 },
  { name: 'Private sector partnerships', amount: '$25M', pct: 6 },
];

/* ─── roles matrix data ─── */
const rolesColumns = ['Strategy', 'Funding', 'Implementation', 'Research', 'Evaluation'];
const rolesMatrix = [
  { partner: 'Meridian Global Development', marks: ['lead', 'partial', 'check', 'check', 'check'] },
  { partner: 'Atlas International Foundation', marks: ['check', 'lead', 'partial', 'partial', 'none'] },
  { partner: 'Horizon Cooperative Alliance', marks: ['partial', 'none', 'lead', 'none', 'none'] },
  { partner: 'Pacifica Research Institute', marks: ['partial', 'none', 'none', 'lead', 'none'] },
  { partner: 'Solara Community Partners', marks: ['partial', 'none', 'lead', 'none', 'none'] },
  { partner: 'Vertex Evaluation Group', marks: ['none', 'none', 'none', 'none', 'lead'] },
];

function RoleCell({ mark }: { mark: string }) {
  if (mark === 'lead')
    return <Check size={18} className="mx-auto" style={{ color: 'var(--accent)' }} />;
  if (mark === 'check')
    return <Check size={18} className="mx-auto" style={{ color: 'var(--success)' }} />;
  if (mark === 'partial')
    return <CircleDot size={18} className="mx-auto" style={{ color: 'var(--warning)' }} />;
  return <Minus size={18} className="mx-auto" style={{ color: 'var(--text-muted)', opacity: 0.3 }} />;
}

/* ─── process steps ─── */
const processSteps = [
  {
    num: '01',
    title: 'Joint Planning',
    desc: 'Annual joint planning retreats where all partners align on priorities, targets, and resource allocation.',
  },
  {
    num: '02',
    title: 'Co-Implementation',
    desc: 'Country-level coordination units ensure seamless collaboration between partners operating in the same districts.',
  },
  {
    num: '03',
    title: 'Shared Monitoring',
    desc: 'Unified monitoring framework with common indicators, joint data collection, and real-time dashboards.',
  },
  {
    num: '04',
    title: 'Joint Learning',
    desc: 'Quarterly learning forums, annual reviews, and cross-partner staff exchanges to embed lessons.',
  },
];

/* ═══════════════════════════════════════════
   Animated Progress Bar
   ═══════════════════════════════════════════ */
function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [animated, setAnimated] = useState(0);
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setAnimated(value), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  return (
    <div ref={ref}>
      <Progress
        value={animated}
        className="h-2"
        style={{ backgroundColor: 'var(--border)' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Partners Page
   ═══════════════════════════════════════════ */
export default function Partners() {
  return (
    <div>
      {/* ── Section 1: Page Hero ── */}
      <section
        className="relative"
        style={{
          backgroundColor: 'var(--primary-blue)',
          minHeight: 200,
        }}
      >
        <div className="container-main py-16 md:py-20">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link
              to="/"
              className="transition-colors hover:underline"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Home
            </Link>
            <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Partners</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="text-3xl md:text-5xl font-normal mb-4"
            style={{ color: 'var(--text-on-dark)', fontFamily: 'Merriweather, serif' }}
          >
            Our Partners
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Six organizations united by a shared commitment to sustainable development
          </motion.p>
        </div>
      </section>

      {/* ── Section 2: Partnership Framework ── */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <FrameworkSection />
        </div>
      </section>

      {/* ── Section 3: Partner Cards Grid ── */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <PartnerCardsSection />
        </div>
      </section>

      {/* ── Section 4: Funding Model ── */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <FundingModelSection />
        </div>
      </section>

      {/* ── Section 5: Partner Roles Diagram ── */}
      <section style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="container-main section-padding">
          <RolesMatrixSection />
        </div>
      </section>

      {/* ── Section 6: Collaboration Process ── */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <ProcessSection />
        </div>
      </section>

      {/* ── Section 7: Become a Partner CTA ── */}
      <section style={{ backgroundColor: 'var(--primary-blue)' }}>
        <div className="container-main section-padding">
          <CTASection />
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section Components
   ═══════════════════════════════════════════ */

function FrameworkSection() {
  const { ref, inView } = useScrollReveal();

  const principles = [
    {
      title: 'Complementary Expertise',
      desc: 'Each partner specializes in a distinct domain, eliminating overlap and maximizing efficiency.',
    },
    {
      title: 'Shared Accountability',
      desc: 'Joint targets, joint reporting, and independent verification create mutual accountability.',
    },
    {
      title: 'Local Ownership',
      desc: 'Country-level coordination ensures national priorities guide all partnership activities.',
    },
  ];

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="label-caption block mb-3"
        style={{ color: 'var(--medium-blue)' }}
      >
        THE CONSORTIUM
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        A multi-stakeholder partnership model
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        className="text-base leading-relaxed mb-12 max-w-3xl"
        style={{ color: 'var(--text-secondary)' }}
      >
        Meridian Global Development operates as a coordinated consortium of six international
        organizations, each bringing unique expertise, resources, and networks. This model ensures
        comprehensive coverage across all development domains — from infrastructure engineering to
        community mobilization to independent evaluation — while maintaining unified strategic
        direction and accountability.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.15 + i * 0.1 }}
            className="p-6 border"
            style={{
              backgroundColor: 'var(--bg-grey)',
              borderColor: 'var(--border)',
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {p.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PartnerCardsSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="label-caption block mb-3"
        style={{ color: 'var(--medium-blue)' }}
      >
        CONSORTIUM MEMBERS
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-10"
        style={{ color: 'var(--text-primary)' }}
      >
        Meet our six partner organizations
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, i) => {
          const Icon = partner.icon;
          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.1 }}
            >
              <Card
                className="h-full border transition-shadow duration-200 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-white)',
                  borderColor: 'var(--border)',
                  borderRadius: 0,
                }}
              >
                <CardHeader className="pb-4">
                  {/* Logo area with icon */}
                  <div
                    className="flex items-center justify-center mb-4 transition-all duration-200"
                    style={{ height: 80 }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 64,
                        height: 64,
                        backgroundColor: `${partner.badgeColor}15`,
                      }}
                    >
                      <Icon
                        size={32}
                        style={{ color: partner.badgeColor }}
                      />
                    </div>
                  </div>

                  {/* Role badge */}
                  <Badge
                    className="self-start rounded-sm px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase border-0 mb-3"
                    style={{
                      backgroundColor: partner.badgeColor,
                      color: '#fff',
                    }}
                  >
                    {partner.badge}
                  </Badge>

                  <CardTitle
                    className="text-lg font-semibold leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {partner.name}
                  </CardTitle>

                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {partner.role}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {partner.description}
                  </p>

                  <div
                    className="pt-4 border-t text-xs"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>Contribution: </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{partner.contribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>
                        Active: <span style={{ color: 'var(--text-secondary)' }}>{partner.countries}</span>
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        Since: <span style={{ color: 'var(--text-secondary)' }}>{partner.since}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FundingModelSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="label-caption block mb-3"
        style={{ color: 'var(--medium-blue)' }}
      >
        FUNDING MODEL
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-10"
        style={{ color: 'var(--text-primary)' }}
      >
        How resources flow through the consortium
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        >
          <div
            className="p-6 md:p-8 border"
            style={{
              backgroundColor: 'var(--bg-grey)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="mb-8">
              <span
                className="stat-number text-4xl md:text-5xl block mb-1"
                style={{ color: 'var(--accent)' }}
              >
                $450M
              </span>
              <span
                className="label-caption"
                style={{ color: 'var(--text-muted)' }}
              >
                TOTAL PROGRAM VALUE
              </span>
            </div>

            <div className="space-y-6">
              {fundingSources.map((src, i) => (
                <div key={src.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {src.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {src.amount}
                      </span>
                      <span
                        className="text-xs w-8 text-right"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {src.pct}%
                      </span>
                    </div>
                  </div>
                  <AnimatedProgress value={src.pct} delay={200 + i * 150} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
        >
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Funding Flow
          </h3>

          <div className="flex flex-col gap-3">
            {['Donors', 'Meridian Secretariat', 'Country Units', 'Implementing Partners', 'Field Projects'].map(
              (step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex-1 py-3 px-4 border text-center text-sm font-medium"
                    style={{
                      borderColor: 'var(--medium-blue)',
                      color: 'var(--text-primary)',
                      backgroundColor: i === 0 ? 'var(--primary-blue)' : 'var(--bg-white)',
                      colorScheme: i === 0 ? 'white' : undefined,
                    }}
                  >
                    <span style={{ color: i === 0 ? '#fff' : 'var(--text-primary)' }}>
                      {step.toUpperCase()}
                    </span>
                  </div>
                  {i < 4 && (
                    <ArrowRight
                      size={18}
                      style={{ color: 'var(--medium-blue)', minWidth: 18 }}
                    />
                  )}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RolesMatrixSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="label-caption block mb-3"
        style={{ color: 'var(--accent)' }}
      >
        ROLES & RESPONSIBILITIES
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-10"
        style={{ color: 'var(--text-on-dark)' }}
      >
        How each partner contributes
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        className="overflow-x-auto"
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: 'var(--medium-blue)' }}>
              <TableHead
                className="text-left font-semibold text-sm"
                style={{ color: 'var(--text-on-dark)' }}
              >
                Partner
              </TableHead>
              {rolesColumns.map((col) => (
                <TableHead
                  key={col}
                  className="text-center font-semibold text-sm"
                  style={{ color: 'var(--text-on-dark)' }}
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesMatrix.map((row, ri) => (
              <TableRow
                key={row.partner}
                style={{ borderColor: 'rgba(0,86,164,0.3)' }}
              >
                <TableCell
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-on-dark)' }}
                >
                  {row.partner}
                </TableCell>
                {row.marks.map((mark, ci) => (
                  <TableCell key={ci} style={{ color: 'var(--text-on-dark)' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        ease: easeOutExpo,
                        delay: 0.2 + ri * 0.08 + ci * 0.05,
                      }}
                    >
                      <RoleCell mark={mark} />
                    </motion.div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.6 }}
        className="flex flex-wrap gap-6 mt-6"
      >
        <div className="flex items-center gap-2">
          <Check size={16} style={{ color: 'var(--accent)' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Lead role
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Check size={16} style={{ color: 'var(--success)' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Contributing
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDot size={16} style={{ color: 'var(--warning)' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Partial involvement
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Minus size={16} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Not involved
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ProcessSection() {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="label-caption block mb-3"
        style={{ color: 'var(--medium-blue)' }}
      >
        HOW WE WORK TOGETHER
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-12"
        style={{ color: 'var(--text-primary)' }}
      >
        Collaboration mechanisms across the consortium
      </motion.h2>

      {/* Desktop: horizontal with connecting line */}
      <div className="hidden md:block relative">
        {/* connecting line */}
        <div
          className="absolute top-8 left-0 right-0 h-[2px]"
          style={{
            backgroundColor: 'var(--border)',
            marginLeft: '8%',
            marginRight: '8%',
          }}
        />

        <div className="grid grid-cols-4 gap-8 relative">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.15 }}
              className="text-center"
            >
              {/* Number circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold"
                style={{
                  backgroundColor: 'var(--primary-blue)',
                  color: 'var(--accent)',
                  border: '3px solid var(--bg-grey)',
                }}
              >
                {step.num}
              </div>

              <h3
                className="text-base font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden space-y-8 relative">
        <div
          className="absolute left-7 top-0 bottom-0 w-[2px]"
          style={{ backgroundColor: 'var(--border)' }}
        />
        {processSteps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.15 }}
            className="flex gap-5"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: 'var(--accent)',
              }}
            >
              {step.num}
            </div>
            <div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CTASection() {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref} className="text-center max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="text-2xl md:text-3xl font-bold mb-5"
        style={{ color: 'var(--text-on-dark)' }}
      >
        Join the consortium
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
        className="text-base leading-relaxed mb-8"
        style={{ color: 'rgba(255,255,255,0.8)' }}
      >
        We are always open to new partnerships with organizations that share our commitment to
        sustainable development. Whether you&apos;re a donor, implementer, researcher, or evaluator,
        there&apos;s a role for you in the Meridian network.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link to="/contact">
          <Button
            className="gap-2 px-6 py-3 h-auto text-sm font-medium border-0"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--text-primary)',
              borderRadius: 0,
            }}
          >
            <Mail size={16} />
            Contact Us About Partnership
          </Button>
        </Link>

        <button
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: 'rgba(255,255,255,0.8)' }}
          onClick={() => alert('Download started: Partnership Framework PDF')}
        >
          <Download size={16} />
          Download Partnership Framework PDF
        </button>
      </motion.div>
    </div>
  );
}
