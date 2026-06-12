import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import {
  ChevronRight,
  TrendingUp,
  Users,
  Globe,
  Wallet,
  FileText,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
} from 'lucide-react';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Indicator {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  status: 'On Track' | 'In Progress' | 'At Risk';
  category: 'Infrastructure' | 'Community' | 'Climate' | 'Partnerships';
}

const indicators: Indicator[] = [
  { id: '1', label: 'Households connected to services', current: 12400, target: 14000, unit: '', status: 'On Track', category: 'Infrastructure' },
  { id: '2', label: 'Kilometers of road constructed', current: 847, target: 1000, unit: 'km', status: 'On Track', category: 'Infrastructure' },
  { id: '3', label: 'Water points installed', current: 234, target: 280, unit: '', status: 'On Track', category: 'Infrastructure' },
  { id: '4', label: 'Digital hubs established', current: 45, target: 50, unit: '', status: 'On Track', category: 'Infrastructure' },
  { id: '5', label: 'Women\'s cooperatives supported', current: 156, target: 180, unit: '', status: 'On Track', category: 'Community' },
  { id: '6', label: 'People trained in skills programs', current: 8200, target: 10000, unit: '', status: 'On Track', category: 'Community' },
  { id: '7', label: 'Districts with disaster preparedness plans', current: 18, target: 25, unit: '', status: 'In Progress', category: 'Climate' },
  { id: '8', label: 'Hectares under climate-smart agriculture', current: 3400, target: 5000, unit: 'ha', status: 'At Risk', category: 'Climate' },
  { id: '9', label: 'Community plans developed', current: 42, target: 45, unit: '', status: 'On Track', category: 'Community' },
  { id: '10', label: 'Joint research publications', current: 4, target: 6, unit: '', status: 'In Progress', category: 'Partnerships' },
];

const countryTableData = [
  { country: 'San Marova', investment: '$98M', households: '3,800', roads: '234', cooperatives: '28', status: 'On Track' as const },
  { country: 'Kaledonia', investment: '$112M', households: '4,100', roads: '298', cooperatives: '35', status: 'On Track' as const },
  { country: 'Terres Vertes', investment: '$76M', households: '1,900', roads: '156', cooperatives: '42', status: 'On Track' as const },
  { country: 'Nubara Coast', investment: '$91M', households: '1,600', roads: '97', cooperatives: '38', status: 'On Track' as const },
  { country: 'Ostmark', investment: '$73M', households: '1,000', roads: '62', cooperatives: '13', status: 'On Track' as const },
];

interface SectorData {
  name: string;
  overall: number;
  topCountry: string;
  bars: number[];
  countries: string[];
}

const sectors: SectorData[] = [
  { name: 'Infrastructure & Connectivity', overall: 87, topCountry: 'Kaledonia', bars: [82, 91, 78, 85, 88], countries: ['San Marova', 'Kaledonia', 'Terres Vertes', 'Nubara Coast', 'Ostmark'] },
  { name: 'Community Empowerment', overall: 87, topCountry: 'Terres Vertes', bars: [84, 88, 92, 85, 79], countries: ['San Marova', 'Kaledonia', 'Terres Vertes', 'Nubara Coast', 'Ostmark'] },
  { name: 'Climate Resilience', overall: 70, topCountry: 'Terres Vertes', bars: [68, 65, 78, 72, 58], countries: ['San Marova', 'Kaledonia', 'Terres Vertes', 'Nubara Coast', 'Ostmark'] },
  { name: 'Strategic Partnerships', overall: 78, topCountry: 'Kaledonia', bars: [76, 82, 74, 80, 71], countries: ['San Marova', 'Kaledonia', 'Terres Vertes', 'Nubara Coast', 'Ostmark'] },
];

const progressData = [
  { year: '2021', value: 32 },
  { year: '2022', value: 48 },
  { year: '2023', value: 61 },
  { year: '2024', value: 78 },
  { year: '2025', value: 87 },
];

interface ReportCard {
  title: string;
  author: string;
  summary: string;
  status: string;
  date: string;
}

const reports: ReportCard[] = [
  {
    title: 'Mid-Term Evaluation Report (2024)',
    author: 'Vertex Evaluation Group (Independent)',
    summary: 'Comprehensive mid-term assessment finds program 87% on track with strong performance in infrastructure and community empowerment pillars. Recommendations provided for climate resilience acceleration.',
    status: 'PUBLISHED',
    date: 'December 2024',
  },
  {
    title: 'Annual Results Report 2024',
    author: 'Meridian Global Development',
    summary: 'Detailed annual reporting of all 10 key indicators, financial disbursements, and country-level achievements against the 2024 work plan.',
    status: 'PUBLISHED',
    date: 'March 2025',
  },
  {
    title: 'Country Scorecards — Q2 2025',
    author: 'Meridian Monitoring & Evaluation Unit',
    summary: 'Quarterly scorecards for all five partner countries with district-level breakdowns, trend analysis, and corrective action recommendations.',
    status: 'PUBLISHED',
    date: 'June 2025',
  },
];

const statusFilters = ['All', 'On Track', 'In Progress', 'At Risk'] as const;
type StatusFilter = (typeof statusFilters)[number];

/* ------------------------------------------------------------------ */
/*  Section Reveal                                                     */
/* ------------------------------------------------------------------ */

function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Count Up Hook                                                      */
/* ------------------------------------------------------------------ */

function useCountUp(end: number, duration: number = 1200, startCounting: boolean = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, startCounting]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Summary Card                                                       */
/* ------------------------------------------------------------------ */

function SummaryCard({
  icon: Icon,
  value,
  label,
  badge,
  badgeColor,
  detail,
  progressPercent,
  index,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  badge: string;
  badgeColor: string;
  detail: string;
  progressPercent?: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const numericMatch = value.match(/[\d]+/);
  const numericEnd = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const count = useCountUp(numericEnd, 1000, isInView);
  const displayValue = numericMatch ? value.replace(numericMatch[0], String(count)) : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOutExpo }}
    >
      <Card
        className="h-full border"
        style={{ backgroundColor: 'var(--bg-grey)', borderColor: 'var(--border)' }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--medium-blue)' }}
            >
              <Icon size={20} className="text-white" />
            </div>
            <Badge
              className="text-xs font-semibold border-0"
              style={{ backgroundColor: badgeColor, color: '#fff' }}
            >
              {badge}
            </Badge>
          </div>

          <div
            className="text-3xl md:text-4xl font-bold mb-1"
            style={{ fontFamily: 'Barlow, sans-serif', color: 'var(--medium-blue)' }}
          >
            {displayValue}
          </div>
          <div
            className="text-xs uppercase tracking-wider mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            {label}
          </div>

          {progressPercent !== undefined && (
            <div className="mb-3">
              <Progress
                value={isInView ? progressPercent : 0}
                className="h-2"
                style={{
                  backgroundColor: 'var(--border)',
                }}
              />
            </div>
          )}

          <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <TrendingUp size={14} style={{ color: 'var(--success)' }} />
            {detail}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge Helper                                                */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    'On Track': { bg: 'var(--success)', text: '#fff' },
    'In Progress': { bg: 'var(--warning)', text: '#0A1628' },
    'At Risk': { bg: 'var(--error)', text: '#fff' },
    'COMPLETE': { bg: 'var(--success)', text: '#fff' },
    'PUBLISHED': { bg: 'var(--medium-blue)', text: '#fff' },
  };
  const c = colors[status] || { bg: 'var(--text-muted)', text: '#fff' };

  return (
    <Badge
      className="text-xs font-semibold border-0 rounded-full px-3 py-1"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {status}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  Indicator Card                                                     */
/* ------------------------------------------------------------------ */

function IndicatorCard({ indicator, index }: { indicator: Indicator; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const pct = Math.round((indicator.current / indicator.target) * 100);

  const statusIcon = {
    'On Track': CheckCircle2,
    'In Progress': Clock,
    'At Risk': AlertTriangle,
  }[indicator.status];

  const StatusIcon = statusIcon || CheckCircle2;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: easeOutExpo }}
    >
      <Card
        className="h-full border hover:shadow-md transition-shadow duration-200"
        style={{ backgroundColor: 'var(--bg-white)', borderColor: 'var(--border)' }}
      >
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3
              className="text-sm font-semibold leading-snug pr-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {indicator.label}
            </h3>
            <Badge
              className="text-[10px] font-semibold border-0 shrink-0 uppercase tracking-wider"
              style={{ backgroundColor: 'var(--medium-blue)', color: '#fff' }}
            >
              {indicator.category}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Progress
              value={isInView ? pct : 0}
              className="h-2"
              style={{ backgroundColor: 'var(--border)' }}
            />
          </div>

          {/* Values Row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span
                className="block text-xl font-bold"
                style={{ color: 'var(--medium-blue)' }}
              >
                {indicator.current.toLocaleString()}
                {indicator.unit ? ` ${indicator.unit}` : ''}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Current
              </span>
            </div>
            <div className="text-right">
              <span
                className="block text-base font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {indicator.target.toLocaleString()}
                {indicator.unit ? ` ${indicator.unit}` : ''}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Target
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {pct}%
            </span>
            <div className="flex items-center gap-1.5">
              <StatusIcon size={14} style={{ color: indicator.status === 'On Track' ? 'var(--success)' : indicator.status === 'In Progress' ? 'var(--warning)' : 'var(--error)' }} />
              <StatusBadge status={indicator.status} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini Bar Chart                                                     */
/* ------------------------------------------------------------------ */

function MiniBarChart({ data, isInView }: { data: number[]; isInView: boolean }) {
  return (
    <div className="flex items-end gap-2 h-20 mt-4">
      {data.map((val, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t-sm"
            style={{ backgroundColor: 'var(--medium-blue)' }}
            initial={{ height: 0 }}
            animate={isInView ? { height: `${val}%` } : { height: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: easeOutExpo }}
          />
          <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
            {['SM', 'KA', 'TV', 'NC', 'OM'][i]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Chart (SVG)                                               */
/* ------------------------------------------------------------------ */

function ProgressChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = progressData.map((d, i) => ({
    x: padding.left + (i / (progressData.length - 1)) * chartW,
    y: padding.top + chartH - (d.value / 100) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full overflow-x-auto"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minWidth: '400px' }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = padding.top + chartH - (tick / 100) * chartH;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--border)"
                strokeWidth={1}
                strokeDasharray={tick === 100 ? '0' : '4 4'}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                style={{ fontSize: '11px', fill: 'var(--text-muted)', fontFamily: 'Barlow, sans-serif' }}
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Target line */}
        <motion.line
          x1={padding.left}
          y1={padding.top + chartH - chartH}
          x2={width - padding.right}
          y2={padding.top + chartH - chartH}
          stroke="var(--success)"
          strokeWidth={2}
          strokeDasharray="8 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.text
          x={width - padding.right}
          y={padding.top + chartH - chartH - 6}
          textAnchor="end"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.5 }}
          style={{ fontSize: '10px', fill: 'var(--success)', fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}
        >
          100% Target
        </motion.text>

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="var(--medium-blue)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.12 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--medium-blue)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.g
            key={p.year}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.25, duration: 0.3 }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={6}
              fill="var(--accent)"
              stroke="#fff"
              strokeWidth={2}
            />
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              style={{ fontSize: '11px', fill: 'var(--text-primary)', fontFamily: 'Barlow, sans-serif', fontWeight: 600 }}
            >
              {p.value}%
            </text>
            <text
              x={p.x}
              y={padding.top + chartH + 18}
              textAnchor="middle"
              style={{ fontSize: '12px', fill: 'var(--text-secondary)', fontFamily: 'Barlow, sans-serif' }}
            >
              {p.year}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Results() {
  const { siteData } = useTheme();
  const [filter, setFilter] = useState<StatusFilter>('All');

  const filteredIndicators = filter === 'All'
    ? indicators
    : indicators.filter((ind) => ind.status === filter);

  const _siteData = siteData;
  void _siteData;

  return (
    <div>
      {/* ====== PAGE HERO ====== */}
      <section style={{ backgroundColor: 'var(--primary-blue)', minHeight: '200px' }}>
        <div className="container-main py-12 md:py-16">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 text-sm mb-6"
          >
            <Link
              to="/"
              className="transition-colors hover:underline"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Home
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Results</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Results &amp; Impact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
            className="text-base md:text-lg"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Tracking our progress toward the 2025 program targets
          </motion.p>
        </div>
      </section>

      {/* ====== SUMMARY DASHBOARD ====== */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              PROGRAM DASHBOARD
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              At a glance — July 2025
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              icon={TrendingUp}
              value="87%"
              label="Overall Target Achievement"
              badge="ON TRACK"
              badgeColor="var(--success)"
              detail="↑ 4% from last quarter"
              progressPercent={87}
              index={0}
            />
            <SummaryCard
              icon={Wallet}
              value="$392M"
              label="Disbursed of $450M"
              badge="ON TRACK"
              badgeColor="var(--success)"
              detail="87% of total commitment"
              progressPercent={87}
              index={1}
            />
            <SummaryCard
              icon={Users}
              value="12,400+"
              label="Households Connected"
              badge="ON TRACK"
              badgeColor="var(--success)"
              detail="↑ 1,200 this quarter"
              index={2}
            />
            <SummaryCard
              icon={Globe}
              value="5/5"
              label="Countries Active"
              badge="COMPLETE"
              badgeColor="var(--success)"
              detail="All programs operational"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ====== INDICATOR GRID ====== */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              KEY INDICATORS
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold mb-8"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Detailed performance against targets
            </h2>

            {/* Filter Tabs */}
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as StatusFilter)}
              className="w-full"
            >
              <TabsList
                className="flex flex-wrap gap-1 h-auto p-1"
                style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border)' }}
              >
                {statusFilters.map((f) => (
                  <TabsTrigger
                    key={f}
                    value={f}
                    className="px-4 py-2 text-sm font-medium transition-all data-[state=active]:text-white data-[state=active]:shadow-none rounded-sm"
                    style={{
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {f}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </SectionReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredIndicators.map((ind, i) => (
                <IndicatorCard key={ind.id} indicator={ind} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ====== COUNTRY BREAKDOWN TABLE ====== */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              BY COUNTRY
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Results across our five partner countries
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderBottom: '2px solid var(--border)' }}>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-muted)' }}>
                      Country
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: 'var(--text-muted)' }}>
                      Investment
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: 'var(--text-muted)' }}>
                      Households
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: 'var(--text-muted)' }}>
                      Roads (km)
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: 'var(--text-muted)' }}>
                      Cooperatives
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: 'var(--text-muted)' }}>
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countryTableData.map((row, i) => (
                    <motion.tr
                      key={row.country}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.4, delay: i * 0.04, ease: easeOutExpo }}
                      className="border-b transition-colors hover:bg-gray-50"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <TableCell className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {row.country}
                      </TableCell>
                      <TableCell className="text-right font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {row.investment}
                      </TableCell>
                      <TableCell className="text-right" style={{ color: 'var(--text-secondary)' }}>
                        {row.households}
                      </TableCell>
                      <TableCell className="text-right" style={{ color: 'var(--text-secondary)' }}>
                        {row.roads}
                      </TableCell>
                      <TableCell className="text-right" style={{ color: 'var(--text-secondary)' }}>
                        {row.cooperatives}
                      </TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={row.status} />
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====== SECTOR ANALYSIS ====== */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              BY SECTOR
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Performance across program pillars
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, i) => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true, margin: '-40px' });

              return (
                <motion.div
                  key={sector.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
                >
                  <Card
                    className="h-full border"
                    style={{ backgroundColor: 'var(--bg-white)', borderColor: 'var(--border)' }}
                  >
                    <CardContent className="p-6">
                      <h3
                        className="text-sm font-semibold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {sector.name}
                      </h3>
                      <div
                        className="text-3xl font-bold mb-1"
                        style={{ fontFamily: 'Barlow, sans-serif', color: 'var(--medium-blue)' }}
                      >
                        {sector.overall}%
                      </div>
                      <div className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                        Overall achievement
                      </div>

                      <MiniBarChart data={sector.bars} isInView={isInView} />

                      <div
                        className="mt-4 pt-3 flex items-center gap-1.5 text-xs"
                        style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                      >
                        <ArrowUpRight size={14} style={{ color: 'var(--success)' }} />
                        Top performer:
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {sector.topCountry}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== ANNUAL PROGRESS ====== */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              PROGRESS OVER TIME
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Year-over-year trajectory
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{ backgroundColor: 'var(--bg-grey)', border: '1px solid var(--border)' }}
            >
              <ProgressChart />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ====== EVALUATION REPORTS ====== */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              EVALUATION &amp; REPORTING
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Independent verification of our results
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report, i) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
              >
                <Card
                  className="h-full border hover:shadow-md transition-shadow duration-200"
                  style={{ backgroundColor: 'var(--bg-white)', borderColor: 'var(--border)' }}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--bg-grey)' }}
                      >
                        <FileText size={20} style={{ color: 'var(--medium-blue)' }} />
                      </div>
                      <StatusBadge status={report.status} />
                    </div>

                    <h3
                      className="text-base font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {report.title}
                    </h3>
                    <span
                      className="label-caption block mb-3"
                      style={{ color: 'var(--medium-blue)' }}
                    >
                      {report.author}
                    </span>
                    <span className="text-xs block mb-4" style={{ color: 'var(--text-muted)' }}>
                      {report.date}
                    </span>

                    <p
                      className="text-sm leading-relaxed mb-6 flex-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {report.summary}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: 'var(--medium-blue)' }}
                    >
                      <Download size={16} />
                      Download PDF
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
