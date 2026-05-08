import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { useAuthStore } from '@core/stores/authStore';
import { toursData } from '@core/data/seedData';
import { FiHeart, FiMapPin, FiStar, FiTrash2 } from 'react-icons/fi';

export default function Wishlist() {
  const { user, userProfile, toggleWishlist } = useAuthStore();
  const wishlistTours = useMemo(() => {
    if (!userProfile?.wishlist) return [];
    return toursData.filter(t => userProfile.wishlist.includes(t.id));
  }, [userProfile]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center"><h2 className="text-2xl font-bold text-white mb-4">Please sign in</h2>
        <Link to="/login" className="btn-premium px-6 py-3 rounded-xl text-white">Sign In</Link></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-dark-400 mb-8">{wishlistTours.length} saved tours</p>
        </AnimatedSection>

        {wishlistTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistTours.map((tour, i) => (
              <AnimatedSection key={tour.id} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="glass-card rounded-2xl overflow-hidden group">
                  <Link to={`/tours/${tour.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="text-sm text-dark-400 flex items-center gap-1 mb-1"><FiMapPin className="w-3 h-3 text-primary-400" />{tour.location}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{tour.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary-400">${(tour.afterDiscount || tour.price).toLocaleString()}</span>
                      <button onClick={() => toggleWishlist(tour.id)} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors">
                        <FiTrash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FiHeart className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No saved tours</h3>
            <p className="text-dark-400 mb-6">Heart tours to save them here</p>
            <Link to="/tours" className="btn-premium px-6 py-3 rounded-xl text-white font-semibold">Browse Tours</Link>
          </div>
        )}
      </div>
    </div>
  );
}
