import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { useAuthStore } from '@core/stores/authStore';
import { FiUser, FiMail, FiShield, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, userProfile } = useAuthStore();

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center"><h2 className="text-2xl font-bold text-white mb-4">Please sign in</h2>
        <Link to="/login" className="btn-premium px-6 py-3 rounded-xl text-white">Sign In</Link></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <div className="glass-card rounded-3xl p-8 text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <h1 className="text-2xl font-display font-bold text-white">{user.displayName || 'User'}</h1>
            <p className="text-dark-400 text-sm">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full glass text-xs text-primary-400 font-medium capitalize">
              {userProfile?.role || 'user'} account
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Account Details</h3>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <FiUser className="text-primary-400" /><div><p className="text-xs text-dark-500">Name</p><p className="text-white text-sm">{user.displayName || 'Not set'}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <FiMail className="text-primary-400" /><div><p className="text-xs text-dark-500">Email</p><p className="text-white text-sm">{user.email}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <FiShield className="text-primary-400" /><div><p className="text-xs text-dark-500">Role</p><p className="text-white text-sm capitalize">{userProfile?.role || 'user'}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <FiCalendar className="text-primary-400" /><div><p className="text-xs text-dark-500">Member since</p><p className="text-white text-sm">{new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString()}</p></div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-6 grid grid-cols-2 gap-4">
          <Link to="/bookings" className="glass-card rounded-xl p-5 text-center hover:bg-white/[0.08] transition-colors">
            <div className="text-2xl mb-1">📋</div><p className="text-sm text-dark-300">My Bookings</p>
          </Link>
          <Link to="/wishlist" className="glass-card rounded-xl p-5 text-center hover:bg-white/[0.08] transition-colors">
            <div className="text-2xl mb-1">❤️</div><p className="text-sm text-dark-300">Wishlist</p>
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
