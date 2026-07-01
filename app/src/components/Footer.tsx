import { useState } from 'react';
import { Link } from 'react-router';
import {
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  Rss,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  const col1 = [
    { label: 'About', href: '/about' },
    { label: 'Programs', href: '/what-we-do' },
    { label: 'Countries', href: '/where-we-work' },
    { label: 'Results', href: '/results' },
  ];

  const col2 = [
    { label: 'Partners', href: '/partners' },
    { label: 'Resources', href: '/resources' },
    { label: 'Careers', href: '/about#careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const col3 = [
    { label: 'News', href: '/news' },
    { label: 'Publications', href: '/resources#publications' },
    { label: 'Data Portal', href: '/resources#data' },
    { label: 'Events', href: '/resources#events' },
  ];

  const col4 = [
    { label: 'Press Center', href: '/news#press' },
    { label: 'Admin Login', href: '/admin' },
    { label: 'Sitemap', href: '#' },
    { label: 'FAQ', href: '#' },
  ];

  const institutionLinks = [
    { label: 'MGD', href: '/about' },
    { label: 'Atlas Fund', href: '/partners' },
    { label: 'Horizon', href: '/partners' },
    { label: 'Pacifica', href: '/partners' },
    { label: 'Solara', href: '/partners' },
  ];

  const socialIcons = [
    { Icon: Linkedin, label: 'LinkedIn', href: '#' },
    { Icon: Twitter, label: 'Twitter', href: '#' },
    { Icon: Facebook, label: 'Facebook', href: '#' },
    { Icon: Youtube, label: 'YouTube', href: '#' },
    { Icon: Instagram, label: 'Instagram', href: '#' },
    { Icon: Rss, label: 'RSS', href: '#' },
  ];

  const legalLinks = [
    'Privacy Policy',
    'Terms of Use',
    'Cookie Policy',
    'Accessibility',
  ];

  return (
    <footer style={{ backgroundColor: 'var(--bg-grey)' }}>
      {/* ── Institution links row ── */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="container-main py-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Link to="/" className="shrink-0 mr-4">
            <span
              className="text-base font-bold tracking-[0.12em]"
              style={{ color: 'var(--primary-blue)' }}
            >
              MERIDIAN
            </span>
            <span
              className="block text-[9px] tracking-[0.2em]"
              style={{ color: 'var(--text-muted)' }}
            >
              GLOBAL DEVELOPMENT
            </span>
          </Link>

          <div className="hidden sm:block h-4 w-px bg-[var(--border)] mx-2" />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {institutionLinks.map((item, i) => (
              <span key={item.label} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span
                    className="hidden sm:inline-block w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--text-muted)' }}
                  />
                )}
                <Link
                  to={item.href}
                  className="text-xs font-medium transition-colors hover:text-[var(--medium-blue)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Social icons row ── */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="container-main py-4 flex justify-center gap-3">
          {socialIcons.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-white hover:shadow-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Main links grid ── */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="label-caption mb-4">LEARN ABOUT</p>
            <ul className="space-y-2.5">
              {col1.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-[var(--medium-blue)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caption mb-4">WORK WITH US</p>
            <ul className="space-y-2.5">
              {col2.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-[var(--medium-blue)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caption mb-4">KNOWLEDGE</p>
            <ul className="space-y-2.5">
              {col3.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-[var(--medium-blue)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caption mb-4">QUICK LINKS</p>
            <ul className="space-y-2.5">
              {col4.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-[var(--medium-blue)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="container-main py-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p
              className="text-sm font-medium shrink-0"
              style={{ color: 'var(--text-secondary)' }}
            >
              Subscribe to our newsletter
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-2 flex-1 max-w-md w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 text-sm border rounded-none"
                style={{ borderColor: 'var(--border)' }}
                required
              />
              <button
                type="submit"
                className="h-11 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 shrink-0"
                style={{
                  backgroundColor: 'var(--medium-blue)',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center md:text-left"
            style={{ color: 'var(--text-muted)' }}
          >
            &copy; {new Date().getFullYear()} Meridian Global Development. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {legalLinks.map((label) => (
              <Link
                key={label}
                to="#"
                className="text-xs transition-colors hover:text-[var(--medium-blue)]"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[var(--medium-blue)]"
              style={{ color: 'var(--text-muted)' }}
            >
              Powered by Beonweb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
