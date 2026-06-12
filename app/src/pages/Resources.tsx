import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  BookOpen,
  Wrench,
  Video,
  Image,
  BarChart3,
  Download,
  ClipboardCheck,
  Smartphone,
  Shield,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── animation helpers ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return { ref, inView };
}

/* ─── category filter ─── */
type Category = 'All' | 'Reports' | 'Studies' | 'Tools' | 'Media' | 'Publications';
const categories: Category[] = ['All', 'Reports', 'Studies', 'Tools', 'Media', 'Publications'];

/* ─── featured resources ─── */
const featuredResources = [
  {
    id: 'f1',
    title: 'Meridian Global Development — Annual Results Report 2024',
    category: 'REPORT',
    description:
      'Comprehensive annual report covering all program activities, financial disbursements, indicator achievements, and country-level results for the 2024 calendar year.',
    meta: 'PDF | 48 pages | July 2025',
    icon: FileText,
    color: 'var(--medium-blue)',
  },
  {
    id: 'f2',
    title: 'Impact of Rural Road Investment on Agricultural Incomes — A Cross-Country Analysis',
    category: 'STUDY',
    description:
      'Rigorous econometric analysis of the relationship between road infrastructure and smallholder agricultural incomes across San Marova, Kaledonia, and Terres Vertes.',
    meta: 'PDF | 72 pages | March 2025',
    icon: BookOpen,
    color: 'var(--success)',
  },
  {
    id: 'f3',
    title: 'Community Resilience Assessment Toolkit — Field Practitioner\'s Guide',
    category: 'TOOL',
    description:
      'A practical guide for assessing community-level disaster preparedness, climate vulnerability, and adaptive capacity. Includes worksheets, scoring rubrics, and case studies.',
    meta: 'PDF + Excel | 34 pages | January 2025',
    icon: Wrench,
    color: 'var(--warning)',
  },
];

/* ─── resource library (12 items) ─── */
const libraryResources = [
  {
    id: '1',
    title: 'Annual Results Report 2024',
    category: 'Reports',
    date: 'Jul 2025',
    format: 'PDF',
    size: '4.2 MB',
    pages: '48 pages',
    description: 'Comprehensive overview of program activities, financials, and results across all partner countries.',
  },
  {
    id: '2',
    title: 'Mid-Term Evaluation Report',
    category: 'Reports',
    date: 'Dec 2024',
    format: 'PDF',
    size: '3.8 MB',
    pages: '56 pages',
    description: 'Key findings and recommendations from the independent mid-term evaluation.',
  },
  {
    id: '3',
    title: 'Infrastructure Impact Study',
    category: 'Studies',
    date: 'Mar 2025',
    format: 'PDF',
    size: '2.1 MB',
    pages: '72 pages',
    description: 'Econometric analysis of road infrastructure on agricultural incomes across three countries.',
  },
  {
    id: '4',
    title: "Women's Cooperative Handbook",
    category: 'Tools',
    date: 'Jan 2025',
    format: 'PDF',
    size: '1.5 MB',
    pages: '34 pages',
    description: 'Practical guide for establishing and strengthening women\'s cooperatives and civic institutions.',
  },
  {
    id: '5',
    title: 'Climate Resilience Toolkit',
    category: 'Tools',
    date: 'Jan 2025',
    format: 'PDF',
    size: '2.3 MB',
    pages: '28 pages',
    description: 'Field guide for assessing disaster preparedness, climate vulnerability, and adaptive capacity.',
  },
  {
    id: '6',
    title: 'Country Scorecard Q2 2025',
    category: 'Reports',
    date: 'Jul 2025',
    format: 'PDF',
    size: '1.8 MB',
    pages: '12 pages',
    description: 'Quarterly performance scorecard with key indicators for all five focus countries.',
  },
  {
    id: '7',
    title: 'San Marova Country Profile',
    category: 'Publications',
    date: 'Jun 2025',
    format: 'PDF',
    size: '3.1 MB',
    pages: '24 pages',
    description: 'Statistical profile and development indicators for San Marova.',
  },
  {
    id: '8',
    title: 'Kaledonia Baseline Assessment',
    category: 'Studies',
    date: 'Aug 2023',
    format: 'PDF',
    size: '4.5 MB',
    pages: '88 pages',
    description: 'Comprehensive baseline study conducted at program inception in Kaledonia.',
  },
  {
    id: '9',
    title: 'Digital Connectivity Guide',
    category: 'Tools',
    date: 'Nov 2024',
    format: 'PDF',
    size: '1.2 MB',
    pages: '20 pages',
    description: 'Technical standards for broadband connectivity and digital hub implementation.',
  },
  {
    id: '10',
    title: 'Partnership Framework',
    category: 'Publications',
    date: 'Jan 2024',
    format: 'PDF',
    size: '2.0 MB',
    pages: '16 pages',
    description: 'Official partnership framework document outlining roles, responsibilities, and governance.',
  },
  {
    id: '11',
    title: 'Financial Disbursement Report',
    category: 'Reports',
    date: 'Apr 2025',
    format: 'PDF',
    size: '1.6 MB',
    pages: '18 pages',
    description: 'Detailed financial disbursement data by country, partner, and program pillar.',
  },
  {
    id: '12',
    title: 'Monitoring & Evaluation Manual',
    category: 'Tools',
    date: 'Sep 2024',
    format: 'PDF',
    size: '2.7 MB',
    pages: '42 pages',
    description: 'Comprehensive M&E manual with indicators, data collection protocols, and reporting templates.',
  },
];

/* ─── practical tools ─── */
const practicalTools = [
  {
    id: 't1',
    title: 'Project Planning Template',
    description:
      'Standardized project planning framework for all consortium partners. Includes logframe templates, risk matrices, and stakeholder mapping tools.',
    format: 'Excel + Word',
    icon: ClipboardCheck,
  },
  {
    id: 't2',
    title: 'Data Collection Mobile App',
    description:
      'Android-based data collection tool for field enumerators. Supports offline data capture, GPS tagging, and photo documentation.',
    format: 'APK + Manual',
    icon: Smartphone,
  },
  {
    id: 't3',
    title: 'Community Facilitation Guide',
    description:
      'Step-by-step guide for community mobilizers covering participatory planning, conflict resolution, and inclusive facilitation techniques.',
    format: 'PDF | 56 pages',
    icon: BookOpen,
  },
  {
    id: 't4',
    title: 'Safeguarding Policy Framework',
    description:
      'Comprehensive safeguarding policies covering child protection, sexual exploitation, environmental safeguards, and grievance mechanisms.',
    format: 'PDF | 28 pages',
    icon: Shield,
  },
];

/* ─── media gallery ─── */
const mediaItems = [
  { id: 'm1', title: 'Road construction in Kaledonia', type: 'PHOTO', icon: Image },
  { id: 'm2', title: 'Community empowerment workshop', type: 'VIDEO', icon: Video },
  { id: 'm3', title: 'Program results at a glance', type: 'INFOGRAPHIC', icon: BarChart3 },
  { id: 'm4', title: "Women's cooperative meeting", type: 'PHOTO', icon: Image },
  { id: 'm5', title: 'Climate resilience training', type: 'VIDEO', icon: Video },
  { id: 'm6', title: 'Funding breakdown', type: 'INFOGRAPHIC', icon: BarChart3 },
  { id: 'm7', title: 'Digital hub launch', type: 'PHOTO', icon: Image },
  { id: 'm8', title: 'Watershed management site', type: 'PHOTO', icon: Image },
];

/* ─── icon helper for library ─── */
function categoryIcon(category: string) {
  switch (category) {
    case 'Reports':
      return FileText;
    case 'Studies':
      return BookOpen;
    case 'Tools':
      return Wrench;
    case 'Media':
      return Video;
    case 'Publications':
      return FileText;
    default:
      return FileText;
  }
}

/* ═══════════════════════════════════════════
   Main Resources Page
   ═══════════════════════════════════════════ */
export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    let filtered = libraryResources;
    if (activeCategory !== 'All') {
      filtered = filtered.filter((r) => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <div>
      {/* ── Section 1: Page Hero ── */}
      <section
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Resources</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="text-3xl md:text-5xl font-normal mb-4"
            style={{ color: 'var(--text-on-dark)', fontFamily: 'Merriweather, serif' }}
          >
            Resources
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
            className="text-base md:text-lg max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Publications, reports, tools, and media from the Meridian program
          </motion.p>
        </div>
      </section>

      {/* ── Section 2: Category Filter Bar ── */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main py-8 md:py-12">
          <FilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </section>

      {/* ── Section 3: Featured Resources ── */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main py-12 md:py-16">
          <FeaturedSection />
        </div>
      </section>

      {/* ── Section 4: Resource Library Grid ── */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <LibrarySection
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            filteredResources={filteredResources}
          />
        </div>
      </section>

      {/* ── Section 5: Tools & Guidelines ── */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <ToolsSection />
        </div>
      </section>

      {/* ── Section 6: Media Gallery ── */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <MediaGallerySection />
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section Components
   ═══════════════════════════════════════════ */

function FilterBar({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: {
  activeCategory: Category;
  onCategoryChange: (c: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}) {
  const { ref, inView } = useScrollReveal();

  return (
    <div ref={ref}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-lg font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          Browse by Category
        </motion.h2>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
          className="relative max-w-sm w-full"
        >
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-sm border rounded"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-white)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
      >
        <Tabs value={activeCategory} onValueChange={(v) => onCategoryChange(v as Category)}>
          <TabsList
            className="flex flex-wrap h-auto gap-2 p-1"
            style={{ backgroundColor: 'transparent' }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, ease: easeOutExpo, delay: 0.1 + i * 0.05 }}
              >
                <TabsTrigger
                  value={cat}
                  className="px-4 py-2 text-xs font-medium uppercase tracking-wider border transition-colors"
                  style={{
                    borderRadius: 9999,
                    backgroundColor:
                      activeCategory === cat ? 'var(--medium-blue)' : 'var(--bg-grey)',
                    color:
                      activeCategory === cat ? '#fff' : 'var(--text-primary)',
                    borderColor: activeCategory === cat ? 'var(--medium-blue)' : 'var(--border)',
                  }}
                >
                  {cat}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>
    </div>
  );
}

function FeaturedSection() {
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
        FEATURED
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        Highlighted resources
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredResources.map((res, i) => {
          const Icon = res.icon;
          return (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.1 }}
            >
              <Card
                className="h-full border transition-shadow duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-white)',
                  borderColor: 'var(--border)',
                  borderRadius: 0,
                }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center rounded"
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: `${res.color}15`,
                      }}
                    >
                      <Icon size={24} style={{ color: res.color }} />
                    </div>
                    <Badge
                      className="rounded-sm px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase border-0"
                      style={{
                        backgroundColor: res.color,
                        color: '#fff',
                      }}
                    >
                      {res.category}
                    </Badge>
                  </div>

                  <CardTitle
                    className="text-base font-semibold leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {res.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {res.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {res.meta}
                    </span>
                    <Button
                      size="sm"
                      className="gap-1 text-xs h-8 px-3 border-0"
                      style={{
                        backgroundColor: 'var(--medium-blue)',
                        color: '#fff',
                        borderRadius: 0,
                      }}
                      onClick={() => alert(`Downloading: ${res.title}`)}
                    >
                      <Download size={14} />
                      Download
                    </Button>
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

function LibrarySection({
  activeCategory,
  filteredResources,
}: {
  activeCategory: Category;
  searchQuery: string;
  filteredResources: typeof libraryResources;
}) {
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
        RESOURCE LIBRARY
      </motion.span>

n      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        Browse all resources
        {activeCategory !== 'All' && (
          <span
            className="text-lg font-normal ml-3"
            style={{ color: 'var(--text-muted)' }}
          >
            — {activeCategory}
          </span>
        )}
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredResources.map((res, i) => {
            const Icon = categoryIcon(res.category);
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  ease: easeOutExpo,
                  delay: Math.min(i * 0.06, 0.4),
                }}
              >
                <Card
                  className="h-full border transition-shadow duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--bg-grey)',
                    borderColor: 'var(--border)',
                    borderRadius: 0,
                  }}
                >
                  <CardContent className="p-5">
                    {/* Category badge */}
                    <span
                      className="inline-block text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 mb-3"
                      style={{
                        backgroundColor: 'var(--bg-white)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {res.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-sm font-semibold leading-snug mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {res.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-xs leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {res.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={14} style={{ color: 'var(--text-muted)' }} />
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {res.format} · {res.size} · {res.pages}
                      </span>
                    </div>

                    {/* Date */}
                    <span
                      className="text-[11px] block mb-3"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {res.date}
                    </span>

                    {/* Download link */}
                    <button
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline"
                      style={{ color: 'var(--medium-blue)' }}
                      onClick={() => alert(`Downloading: ${res.title}`)}
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No resources found matching your criteria.
          </p>
          <button
            className="text-sm mt-2 underline"
            style={{ color: 'var(--medium-blue)' }}
            onClick={() => {
              /* these would be lifted if needed; state is in parent */
            }}
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ToolsSection() {
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
        TOOLS & GUIDELINES
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        Practical resources for practitioners
      </motion.h2>

      <div className="space-y-4">
        {practicalTools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 + i * 0.1 }}
            >
              <Card
                className="border transition-shadow duration-200 hover:shadow-md"
                style={{
                  backgroundColor: 'var(--bg-white)',
                  borderColor: 'var(--border)',
                  borderRadius: 0,
                }}
              >
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="shrink-0"
                  >
                    <div
                      className="w-12 h-12 rounded flex items-center justify-center"
                      style={{ backgroundColor: 'var(--bg-grey)' }}
                    >
                      <Icon size={22} style={{ color: 'var(--medium-blue)' }} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-semibold mb-1"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {tool.description}
                    </p>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Format: {tool.format}
                    </span>
                  </div>

                  {/* CTA */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 gap-1 text-xs h-8 px-3"
                    style={{
                      borderColor: 'var(--medium-blue)',
                      color: 'var(--medium-blue)',
                      borderRadius: 0,
                      backgroundColor: 'transparent',
                    }}
                    onClick={() => alert(`Downloading: ${tool.title}`)}
                  >
                    <Download size={14} />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MediaGallerySection() {
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
        MEDIA
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        Photos, videos, and infographics
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 + i * 0.08 }}
              className="group cursor-pointer"
              onClick={() => alert(`Opening: ${item.title}`)}
            >
              <div
                className="relative overflow-hidden border"
                style={{
                  aspectRatio: '1 / 1',
                  backgroundColor: 'var(--bg-grey)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Placeholder with icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <Icon
                    size={36}
                    style={{ color: 'var(--text-muted)', opacity: 0.5 }}
                  />
                  <span
                    className="mt-2 text-[10px] uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: 'var(--overlay)' }}
                >
                  <Icon size={28} style={{ color: '#fff', marginBottom: 8 }} />
                  <p
                    className="text-center text-xs font-medium leading-snug"
                    style={{ color: '#fff' }}
                  >
                    {item.title}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[10px]" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span>View</span>
                    <ChevronRight size={12} />
                  </div>
                </div>

                {/* Category label */}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
                  style={{
                    backgroundColor: 'var(--primary-blue)',
                    color: '#fff',
                  }}
                >
                  {item.type}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
