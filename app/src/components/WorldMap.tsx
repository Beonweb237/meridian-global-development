import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface CountryRegion {
  id: string;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
}

const focusCountries: CountryRegion[] = [
  { id: 'san-marova', name: 'San Marova', d: 'M480,230 L485,228 L490,232 L488,238 L482,236 Z', labelX: 485, labelY: 225 },
  { id: 'kaledonia', name: 'Kaledonia', d: 'M470,260 L478,258 L482,264 L478,270 L472,268 Z', labelX: 475, labelY: 275 },
  { id: 'terres-vertes', name: 'Terres Vertes', d: 'M440,240 L448,238 L452,244 L448,250 L442,248 Z', labelX: 446, labelY: 235 },
  { id: 'nubara-coast', name: 'Nubara Coast', d: 'M720,215 L732,212 L738,220 L732,228 L724,226 Z', labelX: 730, labelY: 235 },
  { id: 'ostmark', name: 'Ostmark', d: 'M580,180 L590,178 L595,185 L590,192 L582,190 Z', labelX: 588, labelY: 175 },
];

export default function WorldMap() {
  const { siteData } = useTheme();
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const selectedData = siteData.countries.find((c) => c.id === selectedCountry);

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox="0 0 960 420"
        className="w-full h-auto"
        style={{ maxHeight: 480 }}
      >
        {/* Simplified world map silhouette */}
        <g style={{ fill: 'var(--border)', opacity: 0.25, stroke: 'var(--text-muted)', strokeWidth: 0.5 }}>
          {/* North America */}
          <path d="M80,60 L200,60 L220,100 L180,140 L140,160 L100,140 L60,100 Z" />
          {/* South America */}
          <path d="M180,200 L240,200 L260,260 L240,340 L200,360 L180,300 L160,260 Z" />
          {/* Europe */}
          <path d="M430,70 L520,70 L540,100 L520,130 L480,140 L450,130 L430,100 Z" />
          {/* Africa */}
          <path d="M420,160 L520,160 L560,200 L540,300 L480,340 L440,320 L400,260 L400,200 Z" />
          {/* Asia */}
          <path d="M540,70 L760,70 L800,100 L780,180 L720,200 L640,200 L580,180 L540,140 Z" />
          {/* Southeast Asia / Oceania */}
          <path d="M720,200 L800,200 L820,240 L780,260 L740,240 Z" />
          {/* Australia */}
          <path d="M760,280 L860,280 L880,320 L860,360 L780,360 L760,320 Z" />
        </g>

        {/* Focus countries */}
        {focusCountries.map((country) => {
          const isHovered = hoveredCountry === country.id;
          const isSelected = selectedCountry === country.id;
          const countryData = siteData.countries.find((c) => c.id === country.id);
          return (
            <g
              key={country.id}
              onMouseEnter={() => setHoveredCountry(country.id)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry(country.id)}
              className="cursor-pointer transition-all duration-200"
            >
              <path
                d={country.d}
                style={{
                  fill: isSelected || isHovered ? 'var(--medium-blue)' : 'var(--light-blue)',
                  opacity: isSelected ? 0.8 : isHovered ? 0.5 : 0.35,
                  stroke: 'var(--medium-blue)',
                  strokeWidth: isSelected ? 1.5 : 0.8,
                  transition: 'all 0.2s ease-in-out',
                }}
              />
              {/* Label dot */}
              <circle
                cx={country.labelX}
                cy={country.labelY}
                r={isSelected || isHovered ? 4 : 3}
                style={{
                  fill: 'var(--medium-blue)',
                  transition: 'all 0.2s ease-in-out',
                }}
              />
              {/* Label */}
              <text
                x={country.labelX}
                y={country.labelY - 8}
                textAnchor="middle"
                className="pointer-events-none"
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  fill: 'var(--text-primary)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              >
                {countryData?.name || country.name}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(60, 380)">
          <rect x="0" y="0" width="12" height="12" style={{ fill: 'var(--medium-blue)' }} />
          <text x="18" y="10" style={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'Barlow, sans-serif' }}>
            Focus Countries
          </text>
          <rect x="140" y="0" width="12" height="12" style={{ fill: 'var(--border)', opacity: 0.5 }} />
          <text x="158" y="10" style={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'Barlow, sans-serif' }}>
            Other Regions
          </text>
        </g>
      </svg>

      {/* Country Sidebar Panel */}
      <AnimatePresence>
        {selectedCountry && selectedData && (
          <motion.div
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-[380px] bg-white shadow-2xl z-10 overflow-y-auto"
            style={{ borderLeft: '1px solid var(--border)' }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'Merriweather, serif' }}>
                    {selectedData.name}
                  </h3>
                  <p className="label-caption mt-1">
                    {selectedData.region} &middot; {selectedData.population}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X size={18} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>

              <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {selectedData.description}
              </p>

              <div className="space-y-6 mb-8">
                {selectedData.stats.map((stat) => {
                  const pct = Math.round(
                    (parseInt(stat.value.replace(/,/g, '')) / parseInt(stat.target.replace(/,/g, ''))) * 100
                  );
                  return (
                    <div key={stat.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {stat.label}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: 'var(--medium-blue)' }}>
                          {stat.value} / {stat.target}
                        </span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(pct, 100)}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => navigate(`/where-we-work#${selectedData.id}`)}
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: 'var(--medium-blue)' }}
              >
                View Full Profile &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
