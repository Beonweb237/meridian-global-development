import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Slide {
  image: string;
  tagline: string;
  title: string[];
  description: string;
  cta: { label: string; href: string };
}

const slides: Slide[] = [
  {
    image: '/hero-slide-1.jpg',
    tagline: 'SUSTAINABLE AGRICULTURE',
    title: ['Transforming Rural', 'Livelihoods Through', 'Climate-Smart Farming'],
    description:
      'Partnering with 12,000+ smallholder farmers across five nations to adopt resilient agricultural practices, improve food security, and build sustainable value chains.',
    cta: { label: 'EXPLORE OUR PROGRAM', href: '/what-we-do' },
  },
  {
    image: '/hero-slide-2.jpg',
    tagline: 'CLEAN WATER & SANITATION',
    title: ['Bringing Clean Water', 'to Underserved', 'Communities'],
    description:
      'Over 1,089 clean water access points installed, benefiting 45,000+ people. Our community-led water management model ensures long-term sustainability and local ownership.',
    cta: { label: 'SEE OUR IMPACT', href: '/results' },
  },
  {
    image: '/hero-slide-3.jpg',
    tagline: 'CLIMATE RESILIENCE',
    title: ['Building Infrastructure', 'for a Resilient', 'Future'],
    description:
      '287 km of climate-resilient infrastructure completed — roads, bridges, and renewable energy systems connecting rural communities to opportunity and growth.',
    cta: { label: 'WHERE WE WORK', href: '/where-we-work' },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '70vh', maxHeight: '85vh' }}>
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="absolute inset-0"
        >
          {/* Background Image with Ken Burns */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 8, ease: 'linear' }}
          >
            <img src={slide.image} alt={slide.tagline} className="w-full h-full object-cover" />
          </motion.div>

          {/* Dark Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,33,71,0.88) 0%, rgba(0,33,71,0.5) 50%, rgba(0,33,71,0.2) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,33,71,0.6) 0%, transparent 40%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content (sits above the sliding background) */}
      <div className="relative container-main flex flex-col justify-center" style={{ minHeight: '70vh', paddingTop: 80, paddingBottom: 160 }}>
        <div className="max-w-[720px]">
          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`tag-${current}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="label-caption mb-4"
              style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}
            >
              {slide.tagline}
            </motion.p>
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-3xl md:text-5xl text-white mb-6"
              style={{
                fontFamily: 'Merriweather, serif',
                fontWeight: 400,
                lineHeight: 1.2,
                textShadow: '0 2px 16px rgba(0,0,0,0.3)',
                maxWidth: 640,
              }}
            >
              {slide.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
              className="text-base md:text-lg mb-8"
              style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: 520 }}
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          {/* CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            >
              <Link
                to={slide.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border-2 bg-white transition-colors duration-200 hover:text-white"
                style={{ borderColor: 'var(--bright-blue)', color: 'var(--bright-blue)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bright-blue)';
                  (e.currentTarget as HTMLElement).style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'white';
                  (e.currentTarget as HTMLElement).style.color = 'var(--bright-blue)';
                }}
              >
                {slide.cta.label}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 hidden md:flex"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110 hidden md:flex"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
            style={{
              width: i === current ? 40 : 12,
              backgroundColor: i === current ? 'transparent' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <>
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: 'var(--bright-blue)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  key={`progress-${current}`}
                />
              </>
              
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
