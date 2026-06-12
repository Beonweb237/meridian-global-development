export interface Partner {
  id: string;
  name: string;
  role: string;
  type: string;
  description: string;
}

export interface Country {
  id: string;
  name: string;
  region: string;
  population: string;
  description: string;
  stats: { label: string; value: string; target: string }[];
}

export interface Indicator {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  status: 'On Track' | 'In Progress' | 'At Risk';
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
}

export interface ProgramComponent {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  objectives: string[];
  results: string;
}

export interface MegaMenuItem {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: MegaMenuItem[];
}

export interface SiteData {
  partners: Partner[];
  countries: Country[];
  indicators: Indicator[];
  news: NewsArticle[];
  resources: Resource[];
  programComponents: ProgramComponent[];
  navItems: NavItem[];
  heroHeadline: string[];
  heroDescription: string;
  stats: { value: string; label: string }[];
}

export const defaultSiteData: SiteData = {
  partners: [
    {
      id: '1',
      name: 'Meridian Global Development',
      role: 'Program Lead',
      type: 'Lead Institution',
      description: 'Oversees program strategy, coordination, and country-level implementation across all five focus nations.',
    },
    {
      id: '2',
      name: 'Atlas International Foundation',
      role: 'Infrastructure & Funding Partner',
      type: 'Funding Partner',
      description: 'Provides major capital investment for roads, bridges, water systems, and digital connectivity infrastructure.',
    },
    {
      id: '3',
      name: 'Horizon Cooperative Alliance',
      role: 'Community Empowerment Lead',
      type: 'Implementing Partner',
      description: 'Specializes in strengthening local institutions, women\'s cooperatives, and civic participation frameworks.',
    },
    {
      id: '4',
      name: 'Pacifica Research Institute',
      role: 'Research & Knowledge Partner',
      type: 'Knowledge Partner',
      description: 'Conducts applied research, monitors program outcomes, and generates evidence-based policy recommendations.',
    },
    {
      id: '5',
      name: 'Solara Community Partners',
      role: 'Climate Resilience Lead',
      type: 'Implementing Partner',
      description: 'Designs and delivers climate-smart agriculture, disaster preparedness, and sustainable resource programs.',
    },
    {
      id: '6',
      name: 'Vertex Evaluation Group',
      role: 'Monitoring & Evaluation Partner',
      type: 'Evaluation Partner',
      description: 'Independent third-party evaluator responsible for performance tracking, impact assessment, and accountability reporting.',
    },
  ],

  countries: [
    {
      id: 'san-marova',
      name: 'San Marova',
      region: 'East Africa',
      population: '4.2 million',
      description: 'A coastal nation with significant agricultural potential, investing heavily in rural road networks and irrigation systems to boost smallholder productivity.',
      stats: [
        { label: 'Households Connected', value: '3,200', target: '4,000' },
        { label: 'Km Roads Built', value: '210', target: '300' },
        { label: 'Women\'s Cooperatives', value: '42', target: '50' },
      ],
    },
    {
      id: 'kaledonia',
      name: 'Kaledonia',
      region: 'Southern Africa',
      population: '2.8 million',
      description: 'An inland country prioritizing community empowerment and women\'s economic participation through cooperative development and skills training.',
      stats: [
        { label: 'Households Connected', value: '2,800', target: '3,500' },
        { label: 'Km Roads Built', value: '156', target: '200' },
        { label: 'Women\'s Cooperatives', value: '38', target: '45' },
      ],
    },
    {
      id: 'terres-vertes',
      name: 'Terres Vertes',
      region: 'West Africa',
      population: '6.1 million',
      description: 'A forest-rich nation focused on climate resilience, sustainable agriculture, and disaster preparedness in vulnerable districts.',
      stats: [
        { label: 'Households Connected', value: '3,600', target: '4,200' },
        { label: 'Km Roads Built', value: '245', target: '280' },
        { label: 'Women\'s Cooperatives', value: '48', target: '55' },
      ],
    },
    {
      id: 'nubara-coast',
      name: 'Nubara Coast',
      region: 'Southeast Asia',
      population: '8.5 million',
      description: 'An archipelago nation building climate-resilient infrastructure and expanding digital connectivity across remote island communities.',
      stats: [
        { label: 'Households Connected', value: '4,100', target: '5,000' },
        { label: 'Km Roads Built', value: '178', target: '250' },
        { label: 'Women\'s Cooperatives', value: '51', target: '60' },
      ],
    },
    {
      id: 'ostmark',
      name: 'Ostmark',
      region: 'Central Asia',
      population: '3.4 million',
      description: 'A mountainous country developing strategic infrastructure and water management systems to support highland agricultural communities.',
      stats: [
        { label: 'Households Connected', value: '2,100', target: '3,000' },
        { label: 'Km Roads Built', value: '134', target: '200' },
        { label: 'Women\'s Cooperatives', value: '29', target: '35' },
      ],
    },
  ],

  indicators: [
    {
      id: 'households',
      label: 'Households connected to services',
      current: 12400,
      target: 14000,
      unit: '',
      status: 'On Track',
    },
    {
      id: 'roads',
      label: 'Kilometers of road constructed',
      current: 847,
      target: 1000,
      unit: 'km',
      status: 'On Track',
    },
    {
      id: 'cooperatives',
      label: 'Women\'s cooperatives supported',
      current: 156,
      target: 180,
      unit: '',
      status: 'At Risk',
    },
    {
      id: 'disaster',
      label: 'Districts with disaster preparedness plans',
      current: 18,
      target: 25,
      unit: '',
      status: 'In Progress',
    },
  ],

  news: [
    {
      id: '1',
      title: 'Rural Connectivity Program Reaches 8,000 Households in San Marova',
      excerpt: 'The latest phase of infrastructure investment has connected remote villages to reliable road networks and clean water systems, improving market access for thousands of farming families.',
      category: 'INFRASTRUCTURE',
      date: 'June 28, 2025',
      image: '/news-thumb-1.jpg',
      slug: 'rural-connectivity-sanmarova',
    },
    {
      id: '2',
      title: "Women's Cooperatives in Kaledonia Report 40% Income Increase",
      excerpt: 'New impact data from the Community Empowerment pillar shows significant gains in women\'s economic participation and household decision-making power across target districts.',
      category: 'COMMUNITY',
      date: 'June 15, 2025',
      image: '/news-thumb-2.jpg',
      slug: 'women-cooperatives-kaledonia',
    },
    {
      id: '3',
      title: 'New Climate Resilience Framework Adopted Across All Five Partner Countries',
      excerpt: 'The Meridian board has approved a comprehensive climate adaptation strategy integrating disaster preparedness, sustainable agriculture, and ecosystem restoration into all program activities.',
      category: 'CLIMATE',
      date: 'June 3, 2025',
      image: '/news-thumb-3.jpg',
      slug: 'climate-resilience-framework',
    },
    {
      id: '4',
      title: 'Atlas International Foundation Commits Additional $200M to Infrastructure Fund',
      excerpt: 'The expanded commitment will accelerate road construction, bridge building, and digital connectivity projects in the program\'s two most underserved countries.',
      category: 'FUNDING',
      date: 'May 20, 2025',
      image: '/news-thumb-1.jpg',
      slug: 'atlas-additional-funding',
    },
    {
      id: '5',
      title: 'Pacifica Research Institute Publishes Mid-Term Impact Assessment',
      excerpt: 'The comprehensive evaluation finds strong progress on infrastructure targets with recommendations to accelerate community empowerment activities in three focus countries.',
      category: 'RESEARCH',
      date: 'May 8, 2025',
      image: '/news-thumb-2.jpg',
      slug: 'midterm-impact-assessment',
    },
    {
      id: '6',
      title: 'Solara Partners Launch Climate-Smart Agriculture Training Program',
      excerpt: 'A new regional training hub will deliver climate adaptation techniques to agricultural extension workers across all five partner countries.',
      category: 'CLIMATE',
      date: 'April 22, 2025',
      image: '/news-thumb-3.jpg',
      slug: 'climate-smart-agriculture-training',
    },
  ],

  resources: [
    {
      id: '1',
      title: 'Meridian Global Development Annual Report 2024',
      type: 'Report',
      date: 'March 2025',
      description: 'Comprehensive overview of program activities, financials, and results across all partner countries during the 2024 fiscal year.',
    },
    {
      id: '2',
      title: 'Infrastructure Investment Guidelines',
      type: 'Guideline',
      date: 'February 2025',
      description: 'Technical standards and procurement procedures for road, bridge, and water system investments under the program.',
    },
    {
      id: '3',
      title: 'Community Empowerment Toolkit',
      type: 'Tool',
      date: 'January 2025',
      description: 'Practical guide for establishing and strengthening women\'s cooperatives and local civic institutions.',
    },
    {
      id: '4',
      title: 'Climate Resilience Framework Document',
      type: 'Framework',
      date: 'December 2024',
      description: 'The approved climate adaptation strategy integrating disaster preparedness and sustainable resource management.',
    },
    {
      id: '5',
      title: 'Mid-Term Evaluation Summary',
      type: 'Evaluation',
      date: 'November 2024',
      description: 'Key findings and recommendations from the independent mid-term program evaluation conducted by Vertex Evaluation Group.',
    },
    {
      id: '6',
      title: 'Country Profiles 2024',
      type: 'Data',
      date: 'October 2024',
      description: 'Statistical profiles and development indicators for each of the five focus countries.',
    },
  ],

  programComponents: [
    {
      id: 'infrastructure',
      title: 'Infrastructure & Connectivity',
      description: 'Building roads, bridges, water systems, and digital infrastructure to connect isolated communities to markets, services, and opportunity.',
      icon: 'road',
      link: '/what-we-do#infrastructure',
      objectives: [
        'Construct 1,000km of all-weather rural roads',
        'Install clean water systems in 200 villages',
        'Provide broadband connectivity to 50 communities',
      ],
      results: '847km of roads completed, 156 villages with water access',
    },
    {
      id: 'community',
      title: 'Community Empowerment',
      description: 'Strengthening local institutions, women\'s cooperatives, and civic participation to ensure communities lead their own development.',
      icon: 'users',
      link: '/what-we-do#community',
      objectives: [
        'Support 180 women\'s cooperatives',
        'Train 500 local leaders in governance',
        'Establish civic forums in all 28 districts',
      ],
      results: '156 cooperatives active, 420 leaders trained',
    },
    {
      id: 'resilience',
      title: 'Climate Resilience',
      description: 'Implementing climate-smart agriculture, disaster preparedness, and sustainable resource management to protect livelihoods.',
      icon: 'shield',
      link: '/what-we-do#resilience',
      objectives: [
        'Develop disaster plans for all 25 target districts',
        'Train 10,000 farmers in climate-smart techniques',
        'Restore 5,000 hectares of degraded watershed',
      ],
      results: '18 districts with disaster plans, 7,200 farmers trained',
    },
    {
      id: 'partnerships',
      title: 'Strategic Partnerships',
      description: 'Coordinating multi-stakeholder collaboration between donors, implementers, researchers, and evaluators for maximum coherence and impact.',
      icon: 'handshake',
      link: '/what-we-do#partnerships',
      objectives: [
        'Maintain active partnerships across all 6 institutions',
        'Align $450M in coordinated investments',
        'Produce 12 joint research publications annually',
      ],
      results: 'All partnerships active, $380M aligned to date',
    },
  ],

  navItems: [
    {
      label: 'Who We Are',
      href: '/about',
      megaMenu: [
        {
          label: 'About',
          href: '/about',
          description: 'Learn about Meridian\'s mission, vision, and approach to global development.',
          children: [
            { label: 'About Meridian', href: '/about' },
            { label: 'Our Team', href: '/about#team' },
            { label: 'Careers', href: '/about#careers' },
          ],
        },
        {
          label: 'Governance',
          href: '/about#governance',
          children: [
            { label: 'Board of Directors', href: '/about#board' },
            { label: 'Organizational Chart', href: '/about#org-chart' },
            { label: 'Annual Reports', href: '/resources' },
          ],
        },
      ],
    },
    {
      label: 'What We Do',
      href: '/what-we-do',
      megaMenu: [
        {
          label: 'Infrastructure & Connectivity',
          href: '/what-we-do#infrastructure',
          description: 'Roads, bridges, water systems, and digital infrastructure.',
        },
        {
          label: 'Community Empowerment',
          href: '/what-we-do#community',
          description: 'Local institutions, women\'s cooperatives, and civic participation.',
        },
        {
          label: 'Climate Resilience',
          href: '/what-we-do#resilience',
          description: 'Climate-smart agriculture and disaster preparedness.',
        },
        {
          label: 'Strategic Partnerships',
          href: '/what-we-do#partnerships',
          description: 'Multi-stakeholder collaboration and coordination.',
        },
        {
          label: 'Our Theory of Change',
          href: '/what-we-do',
          description: 'Learn how our integrated approach drives lasting impact.',
        },
      ],
    },
    {
      label: 'Where We Work',
      href: '/where-we-work',
      megaMenu: [
        { label: 'San Marova', href: '/where-we-work#san-marova', description: 'East Africa' },
        { label: 'Kaledonia', href: '/where-we-work#kaledonia', description: 'Southern Africa' },
        { label: 'Terres Vertes', href: '/where-we-work#terres-vertes', description: 'West Africa' },
        { label: 'Nubara Coast', href: '/where-we-work#nubara-coast', description: 'Southeast Asia' },
        { label: 'Ostmark', href: '/where-we-work#ostmark', description: 'Central Asia' },
        { label: 'View All Countries', href: '/where-we-work', description: 'See all five focus countries' },
      ],
    },
    {
      label: 'Results',
      href: '/results',
      megaMenu: [
        {
          label: 'Impact Scorecard',
          href: '/results',
          description: 'Track progress on key development indicators.',
        },
        {
          label: 'Indicator Dashboard',
          href: '/results#indicators',
          description: 'Detailed data on program performance metrics.',
        },
      ],
    },
    {
      label: 'Partners',
      href: '/partners',
      megaMenu: [
        {
          label: 'Consortium Members',
          href: '/partners',
          description: 'Meet our six partner institutions.',
        },
        {
          label: 'Funding Partners',
          href: '/partners#funding',
          description: 'Learn about our funding model and donors.',
        },
      ],
    },
    {
      label: 'Resources',
      href: '/resources',
      megaMenu: [
        { label: 'Publications', href: '/resources#publications', description: 'Reports, studies, and briefing papers' },
        { label: 'Data Portal', href: '/resources#data', description: 'Open data and statistical resources' },
        { label: 'Tools & Guidelines', href: '/resources#tools', description: 'Practical implementation guides' },
        { label: 'Newsroom', href: '/news', description: 'Latest news and press releases' },
        { label: 'Press Releases', href: '/news#press', description: 'Official announcements and statements' },
        { label: 'Events', href: '/resources#events', description: 'Upcoming conferences and workshops' },
      ],
    },
  ],

  heroHeadline: [
    'Poverty reduction and sustainable',
    'development for the most',
    'vulnerable communities.',
  ],

  heroDescription:
    'Meridian Global Development brings together six international partners to deliver infrastructure, empower communities, and build climate resilience across five focus countries.',

  stats: [
    { value: '12,000+', label: 'Households Connected' },
    { value: '$450M', label: 'Total Program Value' },
    { value: '87%', label: 'Indicators On Track' },
    { value: '5', label: 'Partner Countries' },
  ],
};
