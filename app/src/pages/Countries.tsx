import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { MapPin, Users, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface CountryDetail {
  id: string;
  name: string;
  region: string;
  programSince: string;
  beneficiaries: string;
  budget: string;
  description: string[];
  sectors: string[];
  stats: { label: string; value: string }[];
  initials: string;
  color: string;
}

const countries: CountryDetail[] = [
  {
    id: 'san-marova',
    name: 'San Marova',
    region: 'West Africa',
    programSince: '2021',
    beneficiaries: '28,400',
    budget: '$8.2M',
    description: [
      'San Marova is a lower-middle-income country with significant rural infrastructure gaps. Meridian\'s program focuses on connecting isolated highland communities to markets through road construction, establishing women\'s cooperatives in the agricultural sector, and building climate resilience against increasingly severe monsoon seasons.',
      'Since 2021, the program has constructed 234 kilometers of all-weather roads, linking previously inaccessible villages to regional trade routes. The establishment of 28 women-led agricultural cooperatives has transformed local food systems, increasing average household incomes by 34% in target districts.',
      'Climate adaptation remains a priority, with early warning systems now operational in 12 at-risk communities and watershed restoration covering 450 hectares of degraded land.',
    ],
    sectors: ['Agriculture', 'Infrastructure', 'Disaster Resilience'],
    stats: [
      { label: 'Population', value: '4.2 million' },
      { label: 'Rural Population', value: '62%' },
      { label: 'Program Investment', value: '$98M' },
      { label: 'Districts Covered', value: '6 of 12' },
      { label: 'Households Connected', value: '3,800+' },
      { label: 'Roads Constructed', value: '234 km' },
    ],
    initials: 'SM',
    color: '#0056A4',
  },
  {
    id: 'kaledonia',
    name: 'Kaledonia',
    region: 'East Africa',
    programSince: '2021',
    beneficiaries: '19,200',
    budget: '$6.1M',
    description: [
      'Kaledonia faces critical infrastructure deficits in its northern regions, where dispersed rural communities lack reliable road access and clean water. The Meridian program has prioritized the construction of all-weather roads, community water systems, and digital connectivity hubs to bridge the urban-rural divide.',
      'The Northern Connectivity Corridor project has emerged as a flagship initiative, combining road infrastructure with fiber-optic cable laying to simultaneously improve physical and digital access. Community water point installation has reduced average walking time to clean water from 47 minutes to 12 minutes in beneficiary villages.',
      'Digital connectivity hubs in 18 locations now provide internet access, e-government services, and distance learning opportunities to populations that previously had no reliable connection.',
    ],
    sectors: ['Infrastructure', 'Water & Sanitation', 'Digital Connectivity'],
    stats: [
      { label: 'Population', value: '8.7 million' },
      { label: 'Rural Population', value: '71%' },
      { label: 'Program Investment', value: '$112M' },
      { label: 'Districts Covered', value: '8 of 15' },
      { label: 'Water Points Installed', value: '89' },
      { label: 'Digital Hubs', value: '18' },
    ],
    initials: 'KA',
    color: '#3D6B4F',
  },
  {
    id: 'terres-vertes',
    name: 'Terres Vertes',
    region: 'Central Africa',
    programSince: '2022',
    beneficiaries: '15,600',
    budget: '$5.4M',
    description: [
      'Terres Vertes is a biodiversity-rich nation where agricultural livelihoods are increasingly threatened by changing rainfall patterns and soil degradation. Meridian\'s climate resilience pillar is the strongest here, with extensive reforestation programs, climate-smart agriculture adoption, and watershed management across three priority basins.',
      'The Green Belt Initiative has reforested 1,800 hectares of degraded hillside, stabilizing soils and creating carbon sinks while generating sustainable livelihoods through community forestry enterprises. Climate-smart agriculture techniques have been adopted by over 3,200 farming households, improving yields by an average of 28% while reducing water usage.',
      'Forty-two community cooperatives now manage shared irrigation infrastructure and serve as knowledge exchange networks, strengthening the social fabric of rural adaptation to climate change.',
    ],
    sectors: ['Climate Resilience', 'Agriculture', 'Environmental Protection'],
    stats: [
      { label: 'Population', value: '3.1 million' },
      { label: 'Rural Population', value: '45%' },
      { label: 'Program Investment', value: '$76M' },
      { label: 'Districts Covered', value: '4 of 8' },
      { label: 'Reforested Area', value: '1,800 ha' },
      { label: 'Cooperatives Formed', value: '42' },
    ],
    initials: 'TV',
    color: '#5BA86C',
  },
  {
    id: 'nubara-coast',
    name: 'Nubara Coast',
    region: 'Southeast Asia',
    programSince: '2022',
    beneficiaries: '22,100',
    budget: '$7.8M',
    description: [
      'Nubara Coast combines coastal economic zones with deeply rural interior regions where infrastructure and services are scarce. The Meridian program focuses on building market linkages between coastal trade hubs and inland agricultural communities, while strengthening women\'s economic participation in both fishing and farming sectors.',
      'Twelve new market infrastructure facilities have been constructed or upgraded, reducing post-harvest losses by an average of 40% and improving price transparency for rural producers. Thirty-eight women\'s cooperatives operate across the fisheries and agricultural value chains, with collective bargaining power improving member incomes by 45% on average.',
      'The Market Linkages Program has connected 1,600 farming households directly to coastal exporters, creating stable demand for high-value crops and reducing intermediary costs.',
    ],
    sectors: ['Trade Infrastructure', 'Women\'s Economic Empowerment', 'Market Linkages'],
    stats: [
      { label: 'Population', value: '6.4 million' },
      { label: 'Rural Population', value: '53%' },
      { label: 'Program Investment', value: '$91M' },
      { label: 'Districts Covered', value: '5 of 10' },
      { label: 'Market Infrastructure', value: '12 facilities' },
      { label: 'Women\'s Cooperatives', value: '38' },
    ],
    initials: 'NC',
    color: '#B85C2E',
  },
  {
    id: 'ostmark',
    name: 'Ostmark',
    region: 'Eastern Europe',
    programSince: '2023',
    beneficiaries: '12,800',
    budget: '$4.3M',
    description: [
      'Ostmark is the newest addition to the Meridian partnership. As a transitioning economy with significant regional disparities, Ostmark presents unique opportunities for integrated infrastructure-energy-digital connectivity programming. Phase I focuses on establishing the foundational governance structures and launching pilot projects in three districts.',
      'Eight mini-grid solar energy projects have been commissioned, providing reliable electricity to communities previously dependent on diesel generators. The digital governance platform pilot has streamlined land registration and agricultural extension services, reducing processing times by 60%.',
      'Training programs have equipped 1,400 local officials, technicians, and community leaders with the skills needed to manage and sustain infrastructure investments. Phase II planning is underway with district-level consultations scheduled for Q3 2025.',
    ],
    sectors: ['Digital Connectivity', 'Energy Infrastructure', 'Governance'],
    stats: [
      { label: 'Population', value: '2.8 million' },
      { label: 'Rural Population', value: '38%' },
      { label: 'Program Investment', value: '$73M' },
      { label: 'Districts Covered', value: '3 of 6' },
      { label: 'Energy Projects', value: '8 mini-grids' },
      { label: 'People Trained', value: '1,400' },
    ],
    initials: 'OM',
    color: '#5C2E15',
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */

/* AnimatedCounter component available for future use */

/* ------------------------------------------------------------------ */
/*  Section Reveal Wrapper                                             */
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
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
/*  Country Pills                                                      */
/* ------------------------------------------------------------------ */

function CountryPills({ activeCountry, onSelect }: { activeCountry: string | null; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {countries.map((country) => {
        const isActive = activeCountry === country.id;
        return (
          <motion.button
            key={country.id}
            onClick={() => onSelect(country.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 px-5 py-3 border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: isActive ? 'var(--medium-blue)' : 'var(--border)',
              backgroundColor: isActive ? 'var(--medium-blue)' : 'var(--bg-white)',
              color: isActive ? '#fff' : 'var(--text-primary)',
              boxShadow: isActive ? '0 4px 16px rgba(0,0,0,0.12)' : 'none',
            }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : country.color,
                color: '#fff',
              }}
            >
              {country.initials}
            </span>
            <span className="text-sm font-semibold">{country.name}</span>
            {isActive && <ChevronRight size={14} />}
          </motion.button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Country Detail Section                                             */
/* ------------------------------------------------------------------ */

function CountrySection({
  country,
  index,
}: {
  country: CountryDetail;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      id={country.id}
      className="scroll-mt-20"
      style={{ backgroundColor: index % 2 === 0 ? 'var(--bg-white)' : 'var(--bg-grey)' }}
    >
      <div className="container-main section-padding">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16`}>
          {/* Content Column */}
          <motion.div
            className="lg:w-[58%]"
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            {/* Country Header */}
            <div className="flex items-start gap-5 mb-6">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold text-white shrink-0"
                style={{ backgroundColor: country.color }}
              >
                {country.initials}
              </div>
              <div>
                <span
                  className="label-caption block mb-1.5"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  {country.region}
                </span>
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
                >
                  {country.name}
                </h2>
                <span
                  className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-grey)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  Program since {country.programSince}
                </span>
              </div>
            </div>

            {/* Key Sectors */}
            <div className="flex flex-wrap gap-2 mb-6">
              {country.sectors.map((sector) => (
                <span
                  key={sector}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-grey)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {sector}
                </span>
              ))}
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              {country.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights Row */}
            <div className="flex flex-wrap gap-6 mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-grey)' }}
                >
                  <Users size={18} style={{ color: 'var(--medium-blue)' }} />
                </div>
                <div>
                  <span className="block text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    {country.beneficiaries}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    BENEFICIARIES
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-grey)' }}
                >
                  <DollarSign size={18} style={{ color: 'var(--medium-blue)' }} />
                </div>
                <div>
                  <span className="block text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    {country.budget}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    PROGRAM BUDGET
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div
            className="lg:w-[42%]"
            initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
          >
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{
                backgroundColor: 'var(--bg-white)',
                border: '1px solid var(--border)',
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-6"
                style={{ color: 'var(--text-muted)' }}
              >
                Country Statistics
              </h3>
              <div className="space-y-5">
                {country.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: easeOutExpo }}
                    className="flex items-center justify-between pb-4"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {stat.label}
                    </span>
                    <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Quick Action */}
              <div
                className="mt-6 pt-6"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <Link
                  to="/results"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: 'var(--medium-blue)' }}
                >
                  <TrendingUp size={16} />
                  View Results for {country.name}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Overview Card                                                      */
/* ------------------------------------------------------------------ */

function OverviewCard({
  country,
  index,
  onClick,
}: {
  country: CountryDetail;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOutExpo }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      onClick={onClick}
      className="p-6 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-white)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: country.color }}
        >
          {country.initials}
        </div>
        <div>
          <h3
            className="text-base font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {country.name}
          </h3>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {country.region}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
        <span>{country.beneficiaries} beneficiaries</span>
        <span>{country.budget}</span>
      </div>
      <div
        className="mt-4 flex items-center gap-1 text-xs font-semibold"
        style={{ color: 'var(--medium-blue)' }}
      >
        <MapPin size={14} />
        View Profile
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function Countries() {
  const { siteData } = useTheme();
  const [activePill, setActivePill] = useState<string | null>(null);

  const scrollToCountry = useCallback((id: string) => {
    setActivePill(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => setActivePill(null), 2000);
  }, []);

  // Override some site data for display purposes
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
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>Where We Work</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Merriweather, serif' }}
          >
            Where We Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
            className="text-base md:text-lg"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Five partner countries across three continents
          </motion.p>
        </div>
      </section>

      {/* ====== INTERACTIVE COUNTRY PILLS ====== */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main py-10 md:py-12">
          <SectionReveal>
            <CountryPills activeCountry={activePill} onSelect={scrollToCountry} />
          </SectionReveal>
        </div>
      </section>

      {/* ====== OVERVIEW CARDS ====== */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <SectionReveal className="mb-10">
            <span
              className="label-caption block mb-3"
              style={{ color: 'var(--medium-blue)' }}
            >
              PARTNER COUNTRIES
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Merriweather, serif', color: 'var(--text-primary)' }}
            >
              Our five focus countries
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {countries.map((country, i) => (
              <OverviewCard
                key={country.id}
                country={country}
                index={i}
                onClick={() => scrollToCountry(country.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====== COUNTRY DETAIL SECTIONS ====== */}
      {countries.map((country, i) => (
        <CountrySection key={country.id} country={country} index={i} />
      ))}
    </div>
  );
}
