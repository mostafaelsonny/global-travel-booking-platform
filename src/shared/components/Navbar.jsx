import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@core/stores/authStore';
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart, FiCalendar, FiShield } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/tours', label: 'Tours' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, userProfile, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <MdFlight className="text-white text-xl rotate-45" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">Sonny</span>
              <span className="text-xl font-light text-primary-400">Travel</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === path
                    ? 'text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {location.pathname === path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-dark-200 max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 glass-card rounded-2xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-sm font-semibold text-white truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-dark-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors">
                          <FiUser className="w-4 h-4" /> Profile
                        </Link>
                        <Link to="/bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors">
                          <FiCalendar className="w-4 h-4" /> My Bookings
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-200 hover:bg-white/5 hover:text-white transition-colors">
                          <FiHeart className="w-4 h-4" /> Wishlist
                        </Link>
                        {userProfile?.role === 'admin' && (
                          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-400 hover:bg-white/5 hover:text-primary-300 transition-colors">
                            <FiShield className="w-4 h-4" /> Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors"
                        >
                          <FiLogOut className="w-4 h-4" /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-dark-200 hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-premium px-5 py-2.5 text-sm font-semibold text-white rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-dark-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === path
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-dark-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-3 rounded-xl text-sm text-dark-300 hover:text-white hover:bg-white/5">Profile</Link>
                    <Link to="/bookings" className="block px-4 py-3 rounded-xl text-sm text-dark-300 hover:text-white hover:bg-white/5">My Bookings</Link>
                    {userProfile?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-3 rounded-xl text-sm text-primary-400 hover:bg-white/5">Admin Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10">Sign out</button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1 px-4 py-3 text-center rounded-xl text-sm text-dark-200 glass hover:bg-white/10">Sign in</Link>
                    <Link to="/register" className="flex-1 px-4 py-3 text-center rounded-xl text-sm text-white btn-premium">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
