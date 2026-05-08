import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import TiltCard from '@shared/components/TiltCard';
import { CardSkeleton } from '@shared/components/Loading';
import { useDestinationStore } from '@core/stores/destinationStore';
import { useAuthStore } from '@core/stores/authStore';
import { toursData, destinationsData, statsData, testimonialsData } from '@core/data/seedData';
import { FiSearch, FiMapPin, FiCalendar, FiDollarSign, FiStar, FiHeart, FiArrowRight, FiUsers, FiGlobe, FiMap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Hero background images
const heroImages = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80',
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[current]}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/40 to-dark-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <MdFlight className="text-primary-400 rotate-45" />
            <span className="text-sm text-dark-200">Premium Travel Experiences</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6">
            <span className="block">Explore The</span>
            <span className="text-gradient">Beautiful World</span>
          </h1>

          <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover extraordinary destinations across 50+ countries. 
            Luxury tours, curated experiences, and unforgettable adventures await.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tours"
              className="btn-premium px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center gap-3 group"
            >
              Explore Tours
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-2xl glass hover:bg-white/10 text-white font-medium text-lg transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-32 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-primary-400' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}

function AdvancedSearch() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 8000]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0]);
    if (priceRange[1] < 8000) params.set('maxPrice', priceRange[1]);
    navigate(`/tours?${params.toString()}`);
  };

  return (
    <div className="relative -mt-20 z-20 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="glass-card rounded-3xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider flex items-center gap-2">
              <FiMapPin className="text-primary-400" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
            />
          </div>

          {/* Check-in */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider flex items-center gap-2">
              <FiCalendar className="text-primary-400" /> Check-in
            </label>
            <DatePicker
              selected={checkIn}
              onChange={setCheckIn}
              placeholderText="Select date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
              minDate={new Date()}
            />
          </div>

          {/* Check-out */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider flex items-center gap-2">
              <FiCalendar className="text-primary-400" /> Check-out
            </label>
            <DatePicker
              selected={checkOut}
              onChange={setCheckOut}
              placeholderText="Select date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
              minDate={checkIn || new Date()}
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full btn-premium rounded-xl py-3.5 text-white font-semibold flex items-center justify-center gap-2 group"
            >
              <FiSearch className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider flex items-center gap-2">
              <FiDollarSign className="text-primary-400" /> Price Range
            </label>
            <span className="text-sm text-primary-400 font-semibold">
              ${priceRange[0].toLocaleString()} — ${priceRange[1].toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="8000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary-500"
          />
        </div>
      </motion.div>
    </div>
  );
}

function PopularToursSection() {
  const { toggleWishlist, isInWishlist, user } = useAuthStore();
  const [hovered, setHovered] = useState(null);
  const featured = useMemo(() => toursData.filter(t => t.featured).slice(0, 6), []);
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Most Popular</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">
            Featured <span className="text-gradient">Tours</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            Hand-picked luxury experiences loved by thousands of travelers worldwide
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((tour, index) => (
            <AnimatedSection key={tour.id} delay={index * 0.1} variant="fadeUp">
              <TiltCard intensity={8}>
                <div
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHovered(tour.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {tour.afterDiscount && (
                        <span className="px-3 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold">
                          {Math.round(((tour.price - tour.afterDiscount) / tour.price) * 100)}% OFF
                        </span>
                      )}
                      {tour.seatsLeft <= 5 && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold animate-pulse">
                          Only {tour.seatsLeft} left!
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    {user && (
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(tour.id); }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <FiHeart className={`w-5 h-5 ${isInWishlist(tour.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>
                    )}

                    {/* Category */}
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs text-white font-medium">
                      {tour.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-dark-400 text-sm mb-2">
                      <FiMapPin className="w-3.5 h-3.5 text-primary-400" />
                      {tour.location}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-dark-400 line-clamp-2 mb-4">{tour.description}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-white">{tour.rating}</span>
                          <span className="text-xs text-dark-500">({tour.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {tour.afterDiscount && (
                            <span className="text-sm text-dark-500 line-through">${tour.price.toLocaleString()}</span>
                          )}
                          <span className="text-xl font-bold text-primary-400">
                            ${(tour.afterDiscount || tour.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-xl btn-premium text-white text-sm font-semibold">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass hover:bg-white/10 text-white font-semibold transition-all group"
          >
            View All Tours
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const [activeContinent, setActiveContinent] = useState('All');
  const continents = ['All', 'Europe', 'Asia', 'Africa', 'South America', 'North America', 'Oceania'];

  const filtered = useMemo(() => {
    const dests = activeContinent === 'All'
      ? destinationsData
      : destinationsData.filter(d => d.continent === activeContinent);
    return dests.slice(0, 8);
  }, [activeContinent]);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Worldwide</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-4">
            Top <span className="text-gradient">Destinations</span>
          </h2>
          <p className="text-dark-400 text-lg max-w-2xl mx-auto">
            From ancient wonders to modern marvels — discover your next dream destination
          </p>
        </AnimatedSection>

        {/* Continent Filter */}
        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => setActiveContinent(c)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeContinent === c
                  ? 'btn-premium text-white'
                  : 'glass text-dark-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </AnimatedSection>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/tours?location=${dest.name}`}
                  className="group relative block h-48 md:h-64 rounded-2xl overflow-hidden"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                    <p className="text-sm text-dark-300">{dest.country}</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 rounded-2xl transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const iconMap = { users: FiUsers, globe: FiGlobe, map: FiMap, star: FiStar };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, i) => {
          const Icon = iconMap[stat.icon] || FiStar;
          return (
            <AnimatedSection key={i} delay={i * 0.1} variant="scale">
              <div className="glass-card rounded-2xl p-6 text-center group hover:bg-white/[0.08] transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            What Travelers <span className="text-gradient">Say</span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonialsData[current].rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-dark-200 italic leading-relaxed mb-8">
                "{testimonialsData[current].text}"
              </p>
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {testimonialsData[current].avatar}
              </div>
              <div className="text-white font-semibold">{testimonialsData[current].name}</div>
              <div className="text-sm text-dark-400">{testimonialsData[current].role}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => (p === 0 ? testimonialsData.length - 1 : p - 1))}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonialsData.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection variant="scale">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
              alt="Beach paradise"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mb-8">
                Join 50,000+ travelers who have discovered extraordinary journeys with Sonny Travel
              </p>
              <Link
                to="/tours"
                className="px-8 py-4 rounded-2xl bg-white text-primary-700 font-bold text-lg hover:bg-gray-100 transition-colors shadow-2xl"
              >
                Start Exploring Now
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AdvancedSearch />
      <PopularToursSection />
      <DestinationsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
