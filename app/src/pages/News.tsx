import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';


const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  'All',
  'Feature Story',
  'Announcement',
  'Program Update',
  'Research',
  'Awards',
  'Partnership',
];

const allArticles = [
  {
    id: '1',
    title: "Women's Cooperatives in Kaledonia Report 40% Income Increase",
    excerpt:
      "New impact data shows significant gains in women's economic participation across 35 cooperatives, with average household incomes rising by 40% over 18 months.",
    category: 'Program Update',
    date: 'June 15, 2025',
    readTime: '6 min read',
    image: '/news-thumb-2.jpg',
    slug: 'women-cooperatives-kaledonia',
  },
  {
    id: '2',
    title:
      'New Climate Resilience Framework Adopted Across All Five Partner Countries',
    excerpt:
      'The board approved a comprehensive adaptation strategy integrating disaster preparedness, sustainable agriculture, and ecosystem restoration into all program activities.',
    category: 'Announcement',
    date: 'June 3, 2025',
    readTime: '5 min read',
    image: '/news-thumb-3.jpg',
    slug: 'climate-resilience-framework',
  },
  {
    id: '3',
    title: 'Ostmark Digital Hub Program Launches in Three Districts',
    excerpt:
      'Eight new digital connectivity hubs are now operational, providing internet access, digital skills training, and e-government services to remote communities.',
    category: 'Program Update',
    date: 'May 22, 2025',
    readTime: '4 min read',
    image: '/news-thumb-1.jpg',
    slug: 'ostmark-digital-hubs',
  },
  {
    id: '4',
    title: 'Pacifica Research Institute Publishes Cross-Country Impact Study',
    excerpt:
      'The study confirms a 23% average increase in agricultural incomes in districts with new road access, validating the program infrastructure investment model.',
    category: 'Research',
    date: 'May 10, 2025',
    readTime: '8 min read',
    image: '/news-thumb-2.jpg',
    slug: 'cross-country-impact-study',
  },
  {
    id: '5',
    title: 'Vertex Evaluation Group Completes Mid-Term Assessment',
    excerpt:
      'Independent evaluators find the program 87% on track with strong marks for governance, financial management, and community engagement indicators.',
    category: 'Research',
    date: 'Apr 28, 2025',
    readTime: '7 min read',
    image: '/news-thumb-3.jpg',
    slug: 'midterm-assessment',
  },
  {
    id: '6',
    title: 'Terres Vertes Reforestation Program Surpasses 1,800 Hectare Target',
    excerpt:
      'Community-led reforestation efforts have exceeded the Phase I target two years ahead of schedule, with 2,340 hectares now under restoration.',
    category: 'Program Update',
    date: 'Apr 15, 2025',
    readTime: '5 min read',
    image: '/news-thumb-1.jpg',
    slug: 'terres-vertes-reforestation',
  },
  {
    id: '7',
    title: 'Nubara Coast Women\'s Fishing Cooperative Expands to Five Villages',
    excerpt:
      'A successful pilot program in coastal communities is scaling to additional villages, with 340 women now participating in sustainable fishing enterprises.',
    category: 'Feature Story',
    date: 'Apr 2, 2025',
    readTime: '6 min read',
    image: '/news-thumb-2.jpg',
    slug: 'nubara-fishing-cooperative',
  },
  {
    id: '8',
    title: 'Atlas International Foundation Commits Additional $200M for Phase II',
    excerpt:
      'The lead donor announced expanded funding to support program scale-up through 2028, enabling accelerated infrastructure delivery in underserved regions.',
    category: 'Partnership',
    date: 'Mar 18, 2025',
    readTime: '4 min read',
    image: '/news-thumb-3.jpg',
    slug: 'atlas-additional-funding',
  },
  {
    id: '9',
    title: 'Meridian Hosts Annual Consortium Retreat in Geneva',
    excerpt:
      'All six partner organizations convened for the annual strategic planning retreat, aligning on Phase II priorities and resource allocation frameworks.',
    category: 'Partnership',
    date: 'Mar 5, 2025',
    readTime: '5 min read',
    image: '/news-thumb-1.jpg',
    slug: 'annual-consortium-retreat',
  },
];

const featuredArticle = {
  category: 'Feature Story',
  date: 'June 28, 2025',
  readTime: '10 min read',
  title: 'Rural Connectivity Program Reaches 8,000 Households in San Marova',
  excerpt:
    'The latest phase of infrastructure investment has connected remote highland villages to reliable all-weather road networks, clean water systems, and mobile internet hubs — transforming daily life for over 8,000 households across six districts.',
  image: '/news-thumb-1.jpg',
  slug: 'rural-connectivity-sanmarova',
};

const pressReleases = [
  {
    id: '1',
    date: 'Jul 8, 2025',
    title: 'Meridian Global Development Announces Phase II Expansion Plan',
  },
  {
    id: '2',
    date: 'Jun 30, 2025',
    title: 'Statement on Climate Resilience Framework Adoption',
  },
  {
    id: '3',
    date: 'May 25, 2025',
    title: 'Partnership Agreement Signed with Regional Development Bank',
  },
  {
    id: '4',
    date: 'Apr 20, 2025',
    title: 'Mid-Term Evaluation Results Published',
  },
  {
    id: '5',
    date: 'Mar 22, 2025',
    title: 'Atlas International Foundation Announces Additional Funding Commitment',
  },
];

const upcomingEvents = [
  {
    id: '1',
    month: 'SEP',
    day: '15',
    title: 'Annual Consortium Retreat 2025',
    location: 'Geneva, Switzerland',
    description:
      'Strategic planning retreat for all consortium partners to align on Phase II priorities and resource allocation.',
  },
  {
    id: '2',
    month: 'OCT',
    day: '22',
    title: 'Climate Resilience Summit',
    location: 'Nairobi, Kaledonia',
    description:
      'Regional summit on climate adaptation strategies, featuring presentations from all five partner countries.',
  },
  {
    id: '3',
    month: 'NOV',
    day: '10',
    title: 'Results & Impact Conference',
    location: 'Virtual Event',
    description:
      'Public presentation of 2025 annual results, featuring country-level dashboards and independent evaluation findings.',
  },
];

const ARTICLES_PER_PAGE = 6;

/* ------------------------------------------------------------------ */
/*  Category badge color helper                                        */
/* ------------------------------------------------------------------ */

function getCategoryStyle(category: string) {
  switch (category) {
    case 'Feature Story':
      return { backgroundColor: '#EAAA00', color: '#0A1628' };
    case 'Announcement':
      return { backgroundColor: '#0056A4', color: '#fff' };
    case 'Program Update':
      return { backgroundColor: '#2E8B57', color: '#fff' };
    case 'Research':
      return { backgroundColor: '#6B4C9A', color: '#fff' };
    case 'Awards':
      return { backgroundColor: '#C0392B', color: '#fff' };
    case 'Partnership':
      return { backgroundColor: '#0071CE', color: '#fff' };
    default:
      return { backgroundColor: '#F5F7FA', color: '#5A6677' };
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles =
    activeCategory === 'All'
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: easeOutExpo,
      },
    }),
  };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        className="w-full flex items-center"
        style={{
          backgroundColor: 'var(--primary-blue)',
          minHeight: 200,
        }}
      >
        <div className="container-main py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link
                to="/"
                className="hover:underline"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Home
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>
                News & Events
              </span>
            </nav>
            <h1
              className="text-3xl md:text-4xl font-normal mb-2"
              style={{
                color: '#fff',
                fontFamily: 'Merriweather, serif',
              }}
            >
              Newsroom
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              Latest updates, press releases, and events from Meridian Global
              Development
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURED ARTICLE ============ */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Image */}
            <motion.div
              className="lg:col-span-3 overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              style={{
                border: '1px solid var(--border)',
              }}
            >
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
                style={{ minHeight: 320 }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="lg:col-span-2 flex flex-col justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            >
              <span
                className="label-caption mb-3"
                style={{ color: 'var(--accent)' }}
              >
                FEATURED STORY
              </span>
              <Badge
                className="mb-3 w-fit rounded-sm text-xs font-medium"
                style={{
                  backgroundColor: 'var(--medium-blue)',
                  color: '#fff',
                }}
              >
                {featuredArticle.category.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-3 text-xs mb-3">
                <span style={{ color: 'var(--text-muted)' }}>
                  {featuredArticle.date}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  {featuredArticle.readTime}
                </span>
              </div>
              <h2
                className="text-xl md:text-2xl font-bold mb-3"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Barlow, sans-serif',
                  lineHeight: 1.3,
                }}
              >
                {featuredArticle.title}
              </h2>
              <p
                className="text-sm md:text-base mb-5 leading-relaxed"
                style={{
                  color: 'var(--text-secondary)',
                }}
              >
                {featuredArticle.excerpt}
              </p>
              <Link
                to={`/news/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
                style={{
                  backgroundColor: 'var(--medium-blue)',
                  color: '#fff',
                  padding: '12px 24px',
                }}
              >
                Read Full Article
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ NEWS GRID ============ */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          {/* Section header */}
          <div className="mb-8">
            <span
              className="label-caption block mb-2"
              style={{ color: 'var(--medium-blue)' }}
            >
              LATEST NEWS
            </span>
            <h2
              className="text-xl md:text-2xl font-bold mb-6"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'Merriweather, serif',
              }}
            >
              Recent updates from across the program
            </h2>

            {/* Category tabs */}
            <Tabs
              value={activeCategory}
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="px-3 py-1.5 text-xs font-medium rounded-none border transition-colors data-[state=active]:shadow-none"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginatedArticles.map((article, i) => (
              <motion.div
                key={article.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
              >
                <Link to={`/news/${article.slug}`} className="group block h-full">
                  <Card
                    className="h-full overflow-hidden border bg-white transition-shadow duration-200 hover:shadow-lg"
                    style={{
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Image */}
                    <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 flex flex-col gap-2">
                      {/* Category + date row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5"
                          style={getCategoryStyle(article.category)}
                        >
                          {article.category}
                        </span>
                        <span
                          className="text-[11px]"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {article.date}
                        </span>
                      </div>
                      {/* Title */}
                      <h3
                        className="text-base font-semibold leading-snug group-hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {article.title}
                      </h3>
                      {/* Excerpt */}
                      <p
                        className="text-sm leading-relaxed line-clamp-2"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {article.excerpt}
                      </p>
                      {/* Read time */}
                      <div className="flex items-center gap-1 mt-1">
                        <Clock
                          size={12}
                          style={{ color: 'var(--text-muted)' }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40"
                style={{
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors"
                    style={
                      page === currentPage
                        ? {
                            backgroundColor: 'var(--medium-blue)',
                            color: '#fff',
                          }
                        : {
                            backgroundColor: 'var(--bg-grey)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                          }
                    }
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40"
                style={{
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ============ PRESS RELEASES ============ */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main py-12 md:py-16">
          <span
            className="label-caption block mb-2"
            style={{ color: 'var(--medium-blue)' }}
          >
            PRESS RELEASES
          </span>
          <h2
            className="text-xl md:text-2xl font-bold mb-8"
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'Merriweather, serif',
            }}
          >
            Official statements and announcements
          </h2>

          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {pressReleases.map((pr, i) => (
              <motion.div
                key={pr.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: easeOutExpo,
                    },
                  },
                }}
              >
                <Link
                  to={`/news/press/${pr.id}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 px-4 -mx-4 transition-colors duration-150 hover:bg-gray-50"
                >
                  <span
                    className="label-caption shrink-0"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {pr.date}
                  </span>
                  <span
                    className="text-sm font-medium leading-snug group-hover:underline"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {pr.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UPCOMING EVENTS ============ */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <span
            className="label-caption block mb-2"
            style={{ color: 'var(--medium-blue)' }}
          >
            UPCOMING EVENTS
          </span>
          <h2
            className="text-xl md:text-2xl font-bold mb-8"
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'Merriweather, serif',
            }}
          >
            Join us at these upcoming events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
              >
                <Card
                  className="h-full border bg-white p-6"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-start gap-4">
                    {/* Date badge */}
                    <motion.div
                      className="shrink-0 flex flex-col items-center justify-center w-16 h-16 text-center"
                      style={{
                        backgroundColor: 'var(--accent)',
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.1,
                        duration: 0.3,
                        ease: easeOutExpo,
                      }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white leading-none">
                        {event.month}
                      </span>
                      <span className="text-xl font-bold text-white leading-none mt-0.5">
                        {event.day}
                      </span>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-semibold mb-1"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin
                          size={13}
                          style={{ color: 'var(--medium-blue)' }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: 'var(--medium-blue)' }}
                        >
                          {event.location}
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {event.description}
                      </p>
                      <Link
                        to={`/news/events/${event.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--medium-blue)' }}
                      >
                        {event.location === 'Virtual Event' ? 'Register' : 'Learn More'}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
