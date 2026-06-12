import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  Users,
  ShieldCheck,
  FileText,
  Landmark,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Timeline data                                                      */
/* ------------------------------------------------------------------ */
const timelineItems = [
  {
    year: '2019',
    text: 'Meridian Global Development founded as a multi-stakeholder partnership framework',
  },
  {
    year: '2020',
    text: 'Atlas International Foundation commits initial $150M funding envelope',
  },
  {
    year: '2021',
    text: 'First country programs launched in San Marova and Kaledonia',
  },
  {
    year: '2022',
    text: 'Terres Vertes and Nubara Coast join as focus countries',
  },
  {
    year: '2023',
    text: 'Ostmark added as fifth partner country; Climate Resilience pillar formally established',
  },
  {
    year: '2024',
    text: 'Mid-term evaluation reports 87% indicator targets on track',
  },
  {
    year: '2025',
    text: 'Phase II expansion approved; total program value reaches $450M',
  },
];

/* ------------------------------------------------------------------ */
/*  Core values data                                                   */
/* ------------------------------------------------------------------ */
const coreValues = [
  {
    num: '01',
    title: 'Country Ownership',
    desc: 'Development agendas are set by national and local stakeholders, not imposed externally.',
  },
  {
    num: '02',
    title: 'Evidence-Based Action',
    desc: 'Every investment decision is informed by rigorous research, data, and independent evaluation.',
  },
  {
    num: '03',
    title: 'Inclusive Partnership',
    desc: 'We actively seek diverse voices — especially women, youth, and marginalized communities.',
  },
  {
    num: '04',
    title: 'Transparency',
    desc: 'Financial flows, decision processes, and results data are openly shared with all stakeholders.',
  },
  {
    num: '05',
    title: 'Environmental Stewardship',
    desc: 'Climate impact is considered in every program design and implementation choice.',
  },
  {
    num: '06',
    title: 'Accountability',
    desc: 'Clear targets, independent verification, and public reporting keep us accountable to communities and donors.',
  },
];

/* ------------------------------------------------------------------ */
/*  Leadership data                                                    */
/* ------------------------------------------------------------------ */
const leaders = [
  {
    initials: 'EV',
    name: 'Dr. Elena Vasquez',
    role: 'Executive Director, Meridian Global Development',
    bio: 'Former World Bank infrastructure specialist with 20+ years leading multi-country development programs across Latin America and Africa.',
  },
  {
    initials: 'JO',
    name: 'James Okafor',
    role: 'Program Director, Infrastructure & Connectivity',
    bio: 'Civil engineer and former government minister of public works. Led the design of Kaledonia\u2019s national road network modernization.',
  },
  {
    initials: 'AO',
    name: 'Dr. Amara Osei',
    role: 'Director, Climate Resilience & Research',
    bio: 'Climate scientist specializing in adaptation strategies for smallholder agriculture. Former lead researcher at Pacifica Research Institute.',
  },
];

/* ------------------------------------------------------------------ */
/*  Governance principles                                              */
/* ------------------------------------------------------------------ */
const govPrinciples = [
  {
    icon: Users,
    title: 'Consensus-Based Decision Making',
  },
  {
    icon: ShieldCheck,
    title: 'Independent Evaluation Oversight',
  },
  {
    icon: Landmark,
    title: 'Country-Level Ownership',
  },
  {
    icon: FileText,
    title: 'Transparent Financial Reporting',
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable animation wrapper                                         */
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
/*  ABOUT PAGE                                                         */
/* ================================================================== */
export default function About() {
  const { siteData } = useTheme();

  return (
    <div>
      {/* ============================================================ */}
      {/* SECTION 1 — Page Hero                                        */}
      {/* ============================================================ */}
      <section
        className="flex items-end"
        style={{
          backgroundColor: 'var(--primary-blue)',
          minHeight: 200,
        }}
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
            <span>About</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="text-white"
          >
            About Meridian
          </motion.h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Vision & Mission                                 */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Vision — 60% on desktop */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <span
                  className="label-caption block mb-4"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  OUR VISION
                </span>
                <blockquote
                  className="pl-6 italic text-xl md:text-2xl leading-relaxed"
                  style={{
                    borderLeft: '4px solid var(--accent)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Merriweather', serif",
                    fontWeight: 700,
                  }}
                >
                  A world where every community, regardless of geography or
                  circumstance, has the infrastructure, agency, and resilience
                  to determine its own future.
                </blockquote>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <span
                  className="label-caption block mt-12 mb-4"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  OUR MISSION
                </span>
                <p
                  className="text-base leading-relaxed max-w-[600px]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Meridian Global Development mobilizes international
                  partnerships to deliver integrated infrastructure, community
                  empowerment, and climate resilience programs. We coordinate
                  multi-stakeholder action across donors, implementers,
                  researchers, and evaluators to maximize coherence,
                  accountability, and impact for the world&rsquo;s most
                  vulnerable populations.
                </p>

                {/* Mission stats */}
                <div className="flex flex-wrap gap-8 mt-8">
                  {[
                    { value: '2019', label: 'Launched' },
                    { value: String(siteData.partners.length), label: 'Partners' },
                    { value: String(siteData.countries.length), label: 'Countries' },
                  ].map((s, i) => (
                    <ScrollReveal key={s.label} delay={0.3 + i * 0.1}>
                      <div>
                        <span
                          className="block text-3xl md:text-4xl font-bold"
                          style={{ color: 'var(--accent)' }}
                        >
                          {s.value}
                        </span>
                        <span
                          className="label-caption mt-1 block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {s.label}
                        </span>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Decorative right side */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <ScrollReveal direction="right" delay={0.3}>
                <div
                  className="w-full max-w-[320px] aspect-square rounded flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-grey)' }}
                >
                  <Building2
                    size={80}
                    strokeWidth={1}
                    style={{ color: 'var(--medium-blue)' }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Our History (Timeline)                           */}
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
              OUR HISTORY
            </span>
            <h2 className="mb-12" style={{ color: 'var(--text-primary)' }}>
              From concept to global partnership
            </h2>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line — desktop center, mobile left */}
            <div
              className="absolute hidden md:block left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
              style={{ backgroundColor: 'var(--border)' }}
            />
            <div
              className="absolute md:hidden left-[19px] top-0 bottom-0 w-[2px]"
              style={{ backgroundColor: 'var(--border)' }}
            />

            <div className="space-y-12">
              {timelineItems.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className={`relative flex items-center ${
                      isLeft
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                    } flex-row`}
                  >
                    {/* Desktop content */}
                    <ScrollReveal
                      delay={idx * 0.15}
                      direction={isLeft ? 'left' : 'right'}
                      className="hidden md:block w-1/2"
                    >
                      <div
                        className={`${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                      >
                        <span
                          className="text-3xl font-bold block mb-2"
                          style={{ color: 'var(--accent)' }}
                        >
                          {item.year}
                        </span>
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* Dot on timeline */}
                    <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 z-10">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: 'var(--medium-blue)' }}
                      />
                    </div>

                    {/* Mobile content */}
                    <ScrollReveal
                      delay={idx * 0.1}
                      className="md:hidden ml-10"
                    >
                      <span
                        className="text-2xl font-bold block mb-1"
                        style={{ color: 'var(--accent)' }}
                      >
                        {item.year}
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.text}
                      </p>
                    </ScrollReveal>

                    {/* Spacer for right side on desktop */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Governance Structure                             */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: text */}
            <div>
              <ScrollReveal>
                <span
                  className="label-caption block mb-4"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  GOVERNANCE
                </span>
                <h2 className="mb-6" style={{ color: 'var(--text-primary)' }}>
                  A transparent, multi-layered governance model
                </h2>
                <p
                  className="text-base leading-relaxed max-w-[560px] mb-10"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Meridian operates under a three-tier governance structure
                  ensuring accountability, technical rigor, and inclusive
                  decision-making across all partner organizations.
                </p>
              </ScrollReveal>

              {/* Org chart */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-4">
                  {/* Tier 1 */}
                  <OrgTier
                    level={1}
                    title="Board of Directors"
                    desc="Representatives from all 6 consortium partners + 2 independent members"
                  />
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div
                      className="w-[2px] h-6"
                      style={{ backgroundColor: 'var(--medium-blue)' }}
                    />
                  </div>
                  {/* Tier 2 */}
                  <OrgTier
                    level={2}
                    title="Executive Committee"
                    desc="Program directors from 3 lead implementing partners"
                  />
                  {/* Connector */}
                  <div className="flex justify-center">
                    <div
                      className="w-[2px] h-6"
                      style={{ backgroundColor: 'var(--medium-blue)' }}
                    />
                  </div>
                  {/* Tier 3 */}
                  <OrgTier
                    level={3}
                    title="Country Coordination Units"
                    desc="In-country teams in each of the 5 focus countries"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right: governance principles cards */}
            <div className="flex items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {govPrinciples.map((p, i) => (
                  <ScrollReveal key={p.title} delay={0.3 + i * 0.08}>
                    <div
                      className="p-6 border h-full"
                      style={{
                        backgroundColor: 'var(--bg-grey)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <p.icon
                        size={28}
                        className="mb-4"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <h4
                        className="text-sm font-semibold uppercase tracking-wide mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {p.title}
                      </h4>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Core Values (Dark)                               */}
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
              OUR VALUES
            </span>
            <h2 className="mb-12 text-white">
              The principles that guide everything we do
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreValues.map((v, i) => (
              <ScrollReveal key={v.num} delay={0.1 + i * 0.1}>
                <div>
                  <span
                    className="block text-5xl font-bold mb-3"
                    style={{ color: 'var(--accent)' }}
                  >
                    {v.num}
                  </span>
                  <h4
                    className="text-lg font-semibold uppercase tracking-wide mb-3 text-white"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {v.title}
                  </h4>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Leadership Team                                  */}
      {/* ============================================================ */}
      <section className="bg-white section-padding">
        <div className="container-main">
          <ScrollReveal>
            <span
              className="label-caption block mb-4"
              style={{ color: 'var(--medium-blue)' }}
            >
              LEADERSHIP
            </span>
            <h2 className="mb-12" style={{ color: 'var(--text-primary)' }}>
              Meet the Executive Committee
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader, i) => (
              <ScrollReveal key={leader.name} delay={0.1 + i * 0.1}>
                <div
                  className="p-6 border h-full"
                  style={{
                    backgroundColor: 'var(--bg-grey)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* Initials circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                    style={{ backgroundColor: 'var(--medium-blue)' }}
                  >
                    {leader.initials}
                  </motion.div>

                  <h4
                    className="text-lg font-semibold mb-1"
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {leader.name}
                  </h4>
                  <span
                    className="label-caption block mb-3"
                    style={{ color: 'var(--medium-blue)' }}
                  >
                    {leader.role}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {leader.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  Org tier sub-component                                             */
/* ================================================================== */
function OrgTier({
  level,
  title,
  desc,
}: {
  level: number;
  title: string;
  desc: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative border p-4 cursor-default"
      style={{
        borderColor: 'var(--medium-blue)',
        backgroundColor: 'var(--bg-grey)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: 'var(--medium-blue)' }}
        >
          {level}
        </span>
        <div>
          <h4
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h4>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="text-xs mt-1 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {desc}
            </motion.p>
          )}
          {!hovered && (
            <p
              className="text-xs mt-1 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
