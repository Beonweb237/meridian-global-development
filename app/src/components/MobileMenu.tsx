import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { siteData } = useTheme();
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleNavigate = (href: string) => {
    navigate(href);
    onClose();
    setExpandedIndex(null);
  };

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/30"
              onClick={onClose}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="fixed top-0 right-0 bottom-0 w-full z-[70] bg-white overflow-y-auto"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 h-16 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <div>
                  <div
                    className="text-lg font-bold tracking-[0.12em]"
                    style={{ color: 'var(--primary-blue)' }}
                  >
                    MERIDIAN
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    GLOBAL DEVELOPMENT
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={24} style={{ color: 'var(--text-primary)' }} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="p-6 space-y-1">
                {siteData.navItems.map((item, idx) => (
                  <div
                    key={item.label}
                    className="border-b"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <button
                      onClick={() => {
                        if (item.megaMenu && item.megaMenu.length > 0) {
                          setExpandedIndex(
                            expandedIndex === idx ? null : idx
                          );
                        } else {
                          handleNavigate(item.href);
                        }
                      }}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span
                        className="nav-link-style"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.label}
                      </span>
                      {item.megaMenu && item.megaMenu.length > 0 && (
                        <motion.span
                          animate={{
                            rotate:
                              expandedIndex === idx ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            size={18}
                            style={{ color: 'var(--text-muted)' }}
                          />
                        </motion.span>
                      )}
                    </button>

                    {/* Accordion children */}
                    <AnimatePresence>
                      {item.megaMenu &&
                        expandedIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: 'easeOut',
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-4 space-y-1">
                              {item.megaMenu.map((sub) => (
                                <button
                                  key={sub.label}
                                  onClick={() =>
                                    handleNavigate(sub.href)
                                  }
                                  className="block w-full text-left py-2"
                                >
                                  <span
                                    className="text-sm"
                                    style={{
                                      color: 'var(--text-secondary)',
                                    }}
                                  >
                                    {sub.label}
                                  </span>
                                  {sub.description && (
                                    <span
                                      className="block text-xs mt-0.5"
                                      style={{
                                        color: 'var(--text-muted)',
                                      }}
                                    >
                                      {sub.description}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
