import { useState } from 'react';
import { Globe, Shield, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ThemePanel() {
  const { theme, setTheme, themePresets, isAdmin, setIsAdmin } = useTheme();
  const [open, setOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (adminPin === 'admin123') {
      setIsAdmin(true);
      setShowAdminInput(false);
      setAdminPin('');
      setOpen(false);
    } else {
      alert('Invalid PIN');
    }
  };

  const handleOpenDashboard = () => {
    navigate('/admin');
    setOpen(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminInput(false);
    setAdminPin('');
  };

  return (
    <>
      {/* Floating trigger button – positioned lower-right to avoid overlap */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-[60] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow rounded-full"
        style={{
          bottom: 32,
          right: 32,
          width: 48,
          height: 48,
          backgroundColor: 'var(--medium-blue)',
        }}
        aria-label="Open theme panel"
      >
        <Globe size={22} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-black/20"
              onClick={() => setOpen(false)}
            />

            {/* Panel – slides in from right */}
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="fixed top-0 right-0 bottom-0 z-[80] bg-white shadow-2xl overflow-y-auto"
              style={{ width: 320 }}
            >
              <div className="p-6">
                {/* Panel header */}
                <div className="flex items-center justify-between mb-8">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Settings
                  </h3>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close panel"
                  >
                    <X size={18} style={{ color: 'var(--text-secondary)' }} />
                  </button>
                </div>

                {/* Theme Selection */}
                <div className="mb-8">
                  <p className="label-caption mb-4">SELECT THEME</p>
                  <div className="space-y-3">
                    {Object.entries(themePresets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className="w-full flex items-center gap-3 p-3 rounded border transition-all hover:shadow-md text-left"
                        style={{
                          borderColor:
                            theme === key
                              ? 'var(--medium-blue)'
                              : 'var(--border)',
                          backgroundColor:
                            theme === key ? 'var(--bg-grey)' : 'white',
                        }}
                      >
                        <div className="flex gap-1 shrink-0">
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{
                              backgroundColor: preset.primaryBlue,
                            }}
                          />
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{
                              backgroundColor: preset.mediumBlue,
                            }}
                          />
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{
                              backgroundColor: preset.accentGold,
                            }}
                          />
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Access */}
                <div>
                  <p className="label-caption mb-4">ADMIN ACCESS</p>

                  {!isAdmin ? (
                    <>
                      {!showAdminInput ? (
                        <button
                          onClick={() => setShowAdminInput(true)}
                          className="w-full flex items-center gap-3 p-3 rounded border hover:shadow-md transition-all"
                          style={{ borderColor: 'var(--border)' }}
                        >
                          <Shield
                            size={18}
                            style={{ color: 'var(--medium-blue)' }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            Admin Login
                          </span>
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="password"
                            value={adminPin}
                            onChange={(e) => setAdminPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full h-10 px-3 text-sm border rounded"
                            style={{ borderColor: 'var(--border)' }}
                            onKeyDown={(e) =>
                              e.key === 'Enter' && handleAdminLogin()
                            }
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleAdminLogin}
                              className="flex-1 h-9 text-sm text-white rounded transition-opacity hover:opacity-90"
                              style={{
                                backgroundColor: 'var(--medium-blue)',
                              }}
                            >
                              Login
                            </button>
                            <button
                              onClick={() => {
                                setShowAdminInput(false);
                                setAdminPin('');
                              }}
                              className="flex-1 h-9 text-sm rounded border transition-colors"
                              style={{
                                borderColor: 'var(--border)',
                                color: 'var(--text-secondary)',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div
                        className="flex items-center gap-2 p-3 rounded border border-green-200"
                        style={{ backgroundColor: '#f0fdf4' }}
                      >
                        <Shield size={16} style={{ color: '#16a34a' }} />
                        <span
                          className="text-sm"
                          style={{ color: '#16a34a' }}
                        >
                          Logged in as Admin
                        </span>
                      </div>
                      <button
                        onClick={handleOpenDashboard}
                        className="w-full h-10 text-sm text-white rounded transition-opacity hover:opacity-90"
                        style={{
                          backgroundColor: 'var(--medium-blue)',
                        }}
                      >
                        Open Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full h-9 text-sm rounded border transition-colors"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
