import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import TiltCard from '@shared/components/TiltCard';
import { useAuthStore } from '@core/stores/authStore';
import { toursData } from '@core/data/seedData';
import { FiMapPin, FiStar, FiHeart, FiFilter, FiX, FiClock, FiUsers, FiSearch, FiChevronDown } from 'react-icons/fi';

const categories = ['All', 'Cultural', 'Adventure', 'Beach', 'Luxury', 'Wellness'];
const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const { user, toggleWishlist, isInWishlist } = useAuthStore();
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [maxPrice, setMaxPrice] = useState(8000);

  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setSearchQuery(loc);
  }, [searchParams]);

  const filteredTours = useMemo(() => {
    let result = [...toursData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q) || t.city.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') result = result.filter(t => t.category === category);
    result = result.filter(t => (t.afterDiscount || t.price) <= maxPrice);
    if (sortBy === 'price-low') result.sort((a, b) => (a.afterDiscount || a.price) - (b.afterDiscount || b.price));
    if (sortBy === 'price-high') result.sort((a, b) => (b.afterDiscount || b.price) - (a.afterDiscount || a.price));
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'popular') result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [searchQuery, category, sortBy, maxPrice]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Explore <span className="text-gradient">All Tours</span>
            </h1>
            <p className="text-dark-400 text-lg">{toursData.length} premium tours across 50+ countries</p>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search destinations..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-10 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white"><FiX /></button>}
          </div>
          <div className="flex items-center gap-3">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer">
              {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-dark-800">{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === c ? 'btn-premium text-white' : 'glass text-dark-300 hover:text-white'}`}>
              {c}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-dark-400">Max: ${maxPrice.toLocaleString()}</span>
            <input type="range" min="500" max="8000" step="100" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-32 accent-primary-500" />
          </div>
        </div>

        <p className="text-sm text-dark-400 mb-6">Showing <span className="text-white font-semibold">{filteredTours.length}</span> tours</p>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour, i) => (
              <motion.div key={tour.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}>
                <TiltCard intensity={6}>
                  <Link to={`/tours/${tour.id}`} className="glass-card rounded-2xl overflow-hidden group block">
                    <div className="relative h-56 overflow-hidden">
                      <img loading="lazy" src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {tour.afterDiscount && <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold">{Math.round(((tour.price - tour.afterDiscount) / tour.price) * 100)}% OFF</span>}
                        <span className="px-3 py-1 rounded-full glass text-white text-xs font-medium">{tour.category}</span>
                      </div>
                      {user && <button onClick={e => { e.preventDefault(); toggleWishlist(tour.id); }} className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/20">
                        <FiHeart className={`w-4 h-4 ${isInWishlist(tour.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>}
                      {tour.seatsLeft <= 5 && <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold flex items-center gap-1"><FiUsers className="w-3 h-3" />{tour.seatsLeft} left</div>}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-dark-400 text-sm mb-2"><FiMapPin className="w-3.5 h-3.5 text-primary-400" />{tour.location}</div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors mb-1">{tour.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-dark-400 mb-3">
                        <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{tour.duration}</span>
                        <span className="flex items-center gap-1"><FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />{tour.rating} ({tour.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          {tour.afterDiscount && <span className="text-sm text-dark-500 line-through">${tour.price.toLocaleString()}</span>}
                          <span className="text-xl font-bold text-primary-400">${(tour.afterDiscount || tour.price).toLocaleString()}</span>
                        </div>
                        <span className="px-4 py-2 rounded-xl btn-premium text-white text-sm font-semibold">Details</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No tours found</h3>
            <p className="text-dark-400 mb-4">Try adjusting your filters</p>
            <button onClick={() => { setSearchQuery(''); setCategory('All'); setMaxPrice(8000); }} className="px-6 py-3 rounded-xl glass text-white hover:bg-white/10">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
