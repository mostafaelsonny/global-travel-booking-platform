import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { destinationsData } from '@core/data/seedData';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const images = destinationsData.slice(0, 24);

  const navigate = (dir) => {
    const idx = images.findIndex(d => d.id === selected.id);
    const next = dir === 'next' ? (idx + 1) % images.length : (idx - 1 + images.length) % images.length;
    setSelected(images[next]);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Visual Journey</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3 mb-4">
            Photo <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-dark-400 text-lg">Stunning visuals from our destinations around the world</p>
        </AnimatedSection>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((dest, i) => (
            <AnimatedSection key={dest.id} delay={Math.min(i * 0.05, 0.5)}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(dest)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
              >
                <img src={dest.image} alt={dest.name} className="w-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy"
                  style={{ height: `${200 + (i % 3) * 80}px` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold">{dest.name}</h3>
                  <p className="text-sm text-dark-300">{dest.country}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-950/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 z-10"><FiX /></button>
            <button onClick={(e) => { e.stopPropagation(); navigate('prev'); }} className="absolute left-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10"><FiChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); navigate('next'); }} className="absolute right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10"><FiChevronRight /></button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="max-w-4xl max-h-[80vh]">
              <img src={selected.image} alt={selected.name} className="max-w-full max-h-[70vh] object-contain rounded-2xl" />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                <p className="text-dark-400">{selected.country} · {selected.continent}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
