import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Route, Users, Shield, Handshake, ArrowRight, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import WorldMap from '../components/WorldMap';
import HeroCarousel from '../components/HeroCarousel';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericMatch = value.replace(/[^0-9.]/g, '');
  const hasComma = value.includes(',');
  const prefix = value.replace(/[0-9.,]/g, '');
  const target = parseFloat(numericMatch) || 0;
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(hasComma ? current.toLocaleString() : String(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, hasComma]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ─── Section Header ─── */
function SectionHeader({
  label,
  title,
  description,
  centered = false,
  action,
}: {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  action?: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={centered ? 'text-center' : ''}
    >
      <p className="label-caption mb-3" style={{ color: 'var(--medium-blue)' }}>
        {label}
      </p>
      <div className={`flex items-end gap-4 mb-3 ${centered ? 'justify-center' : 'justify-between'}`}>
        <h2
          className="text-2xl md:text-3xl"
          style={{ color: 'var(--text-primary)', fontFamily: 'Merriweather, serif', fontWeight: 700 }}
        >
          {title}
        </h2>
        {action && <div className="hidden md:block shrink-0">{action}</div>}
      </div>
      {description && (
        <p className="text-base max-w-3xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {description}
        </p>
      )}
      {action && <div className="mt-4 md:hidden">{action}</div>}
    </motion.div>
  );
}

/* ─── Program Card ─── */
const programIcons: Record<string, React.ElementType> = {
  road: Route,
  users: Users,
  shield: Shield,
  handshake: Handshake,
};

function ProgramCard({
  component,
  index,
}: {
  component: { id: string; title: string; description: string; icon: string; link: string };
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = programIcons[component.icon] || Globe;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOutExpo }}
    >
      <Link
        to={component.link}
        className="group block h-full p-6 border bg-white transition-all duration-200 hover:-translate-y-0.5"
        style={{
          borderColor: 'var(--border)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--medium-blue)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        <div
          className="w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
          style={{ color: 'var(--accent)' }}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {component.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {component.description}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--medium-blue)' }}>
          Learn More <ArrowRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}

/* ─── News Card ─── */
function NewsCard({ article, index }: { article: { id: string; title: string; excerpt: string; category: string; date: string; image: string; slug: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
    >
      <Link to={`/news/${article.slug}`} className="group block h-full bg-white border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-hidden aspect-video">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="label-caption mb-2" style={{ color: 'var(--medium-blue)' }}>
            {article.category}
          </p>
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            {article.date}
          </p>
          <h3 className="text-base font-semibold mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
            {article.title}
          </h3>
          <p className="text-sm line-clamp-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Top Bar ─── */
const topStories = [
  'Meridian launches Phase II of Rural Connectivity Program',
  'New climate resilience framework adopted across all partner countries',
  'Atlas International Foundation commits additional $200M to infrastructure fund',
];

function TopBar() {
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % topStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="hidden md:block border-b"
      style={{ backgroundColor: 'var(--bg-grey)', borderColor: 'var(--border)', height: 40 }}
    >
      <div className="container-main h-full flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <span className="label-caption shrink-0" style={{ color: 'var(--accent)' }}>
            TOP STORIES
          </span>
          <div className="relative h-5 overflow-hidden flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={storyIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="block text-sm truncate cursor-pointer hover:underline"
                style={{ color: 'var(--text-primary)' }}
              >
                {topStories[storyIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="label-caption">{today}</span>
          <span className="label-caption hover:underline cursor-pointer" style={{ color: 'var(--text-muted)' }}>
            Press Center
          </span>
          <span className="label-caption hover:underline cursor-pointer" style={{ color: 'var(--text-muted)' }}>
            Careers
          </span>
          <Link to="/contact" className="label-caption hover:underline" style={{ color: 'var(--text-muted)' }}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  const { siteData } = useTheme();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const [selectedCountryPill, setSelectedCountryPill] = useState<string | null>(null);

  // Animated counters for hero stats bar
  const heroStats = [
    { raw: '12000', display: '12,000+', label: 'Households Connected' },
    { raw: '450', display: '$450M', label: 'Total Program Value' },
    { raw: '87', display: '87%', label: 'Indicators On Track' },
    { raw: '5', display: '5', label: 'Partner Countries' },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'var(--success)';
      case 'At Risk': return 'var(--error)';
      case 'In Progress': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div>
      {/* Section 1: Top Bar */}
      <TopBar />

      {/* Section 3: Hero Carousel */}
      <HeroCarousel />

      {/* Section 3b: Stats Bar */}
      <section className="border-b" style={{ backgroundColor: 'var(--bg-grey)', borderColor: 'var(--border)' }}>
        <div className="container-main">
          <div className="bg-white border grid grid-cols-2 md:grid-cols-4" style={{ borderColor: 'var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-6 md:py-8 px-4 border-r last:border-r-0" style={{ borderColor: 'var(--border-light)' }}>
                <span className="stat-number text-2xl md:text-4xl">
                  {stat.display.includes('%') ? (
                    <span><AnimatedCounter value={stat.raw} />%</span>
                  ) : stat.display.includes('$') ? (
                    <span>$<AnimatedCounter value={stat.raw} />M</span>
                  ) : stat.display.includes(',') ? (
                    <span><AnimatedCounter value={stat.raw} />+</span>
                  ) : (
                    <AnimatedCounter value={stat.raw} />
                  )}
                </span>
                <span className="label-caption mt-2 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Program Components */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <SectionHeader
            label="WHAT WE DO"
            title="Four pillars driving transformational change"
            description="Our integrated approach combines infrastructure investment, community empowerment, climate adaptation, and strategic partnership to deliver lasting impact."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {siteData.programComponents.map((component, idx) => (
              <ProgramCard key={component.id} component={component} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Global Stats Bar */}
      <section style={{ backgroundColor: 'var(--bg-dark)' }} className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: '12000+', suffix: '', label: 'Households Connected to Services' },
              { num: '450', suffix: 'M', prefix: '$', label: 'Total Program Investment' },
              { num: '340', suffix: '', label: 'Infrastructure Projects Completed' },
              { num: '28', suffix: '', label: 'District-Level Partnerships Active' },
            ].map((stat, idx) => (
              <StatBlock key={stat.label} {...stat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Interactive Map */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <SectionHeader
            label="WHERE WE WORK"
            title="Active in five focus countries across three continents"
            centered
          />

          {/* Country pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
            {siteData.countries.map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountryPill(selectedCountryPill === country.id ? null : country.id)}
                className="px-4 py-2 text-sm font-medium border transition-all duration-200"
                style={{
                  borderColor: selectedCountryPill === country.id ? 'var(--medium-blue)' : 'var(--border)',
                  backgroundColor: selectedCountryPill === country.id ? 'var(--bg-grey)' : 'white',
                  color: selectedCountryPill === country.id ? 'var(--medium-blue)' : 'var(--text-primary)',
                }}
              >
                {country.name}
              </button>
            ))}
          </div>

          <div className="relative mt-8">
            <WorldMap />
          </div>

          {/* Featured country cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {siteData.countries.slice(0, 3).map((country, idx) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: easeOutExpo }}
                className="p-6 border bg-white"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--medium-blue)' }}
                  >
                    {country.name.charAt(0)}
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {country.name}
                  </h3>
                </div>
                <p className="label-caption mb-2">{country.region}</p>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {country.description}
                </p>
                <Link
                  to={`/where-we-work#${country.id}`}
                  className="text-sm font-medium hover:underline"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  View Details &rarr;
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Top Stories */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main">
          <SectionHeader
            label="TOP STORIES"
            title="Latest updates from the field"
            action={
              <Link
                to="/news"
                className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: 'var(--medium-blue)' }}
              >
                View All News <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {siteData.news.slice(0, 3).map((article, idx) => (
              <NewsCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Consortium Partners */}
      <section className="py-16 bg-white">
        <div className="container-main text-center">
          <SectionHeader label="CONSORTIUM PARTNERS" title="Six organizations, one shared mission" centered />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 mt-10">
            {siteData.partners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: 'var(--medium-blue)' }}
                >
                  {partner.name.charAt(0)}
                </div>
                <span
                  className="text-xs font-medium text-center transition-opacity duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {partner.name.split(' ').slice(0, 2).join(' ')}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border-2 bg-white transition-colors duration-200 hover:text-white"
              style={{ borderColor: 'var(--medium-blue)', color: 'var(--medium-blue)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--medium-blue)';
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                (e.currentTarget as HTMLElement).style.color = 'var(--medium-blue)';
              }}
            >
              Learn more about our partnership model
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Development Goals */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <SectionHeader
            label="IMPACT SCORECARD"
            title="Tracking progress toward our 2025 targets"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-10">
            {siteData.indicators.map((indicator, idx) => (
              <IndicatorRow key={indicator.id} indicator={indicator} index={idx} statusColor={statusColor} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/results"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--medium-blue)' }}
            >
              View Complete Scorecard <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Stat Block (dark section) ─── */
function StatBlock({
  num,
  suffix,
  prefix,
  label,
  index,
}: {
  num: string;
  suffix: string;
  prefix?: string;
  label: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const numericValue = parseFloat(num.replace(/[^0-9.]/g, ''));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="text-center"
    >
      <div className="stat-number text-3xl md:text-5xl">
        {prefix}
        <AnimatedCounter value={String(numericValue)} />
        {suffix}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1 + index * 0.15 }}
        className="text-sm mt-2"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

/* ─── Indicator Row ─── */
function IndicatorRow({
  indicator,
  index,
  statusColor,
}: {
  indicator: { id: string; label: string; current: number; target: number; status: string };
  index: number;
  statusColor: (s: string) => string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const pct = Math.min(Math.round((indicator.current / indicator.target) * 100), 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {indicator.label}
        </span>
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: statusColor(indicator.status) }}
        >
          {indicator.status}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
        </div>
        <span className="text-xs font-medium shrink-0" style={{ color: 'var(--text-secondary)' }}>
          {indicator.current.toLocaleString()} / {indicator.target.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}
