import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { useAuthStore } from '@core/stores/authStore';
import { useBookingStore } from '@core/stores/bookingStore';
import { toursData, reviewsData } from '@core/data/seedData';
import { FiMapPin, FiStar, FiHeart, FiClock, FiUsers, FiCheck, FiChevronLeft, FiCalendar, FiDollarSign, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, toggleWishlist, isInWishlist } = useAuthStore();
  const { calculatePrice, createBooking } = useBookingStore();
  const [tour, setTour] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const found = toursData.find(t => t.id === id);
    if (found) setTour(found);
    else navigate('/tours');
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!tour) return null;

  const pricing = calculatePrice(tour, guests);
  const tourReviews = reviewsData.filter(r => r.tourId === tour.id);
  const allImages = [tour.image, ...(tour.gallery || [])];

  const handleBooking = async () => {
    if (!user) { navigate('/login'); return; }
    if (tour.seatsLeft < guests) { toast.error('Not enough seats!'); return; }
    setBooking(true);
    try {
      await createBooking({ tourId: tour.id, userId: user.uid, guests, checkIn: new Date().toISOString() });
      toast.success('Booking confirmed! 🎉');
      navigate('/bookings');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark-400 hover:text-white mt-6 mb-6 transition-colors">
          <FiChevronLeft /> Back to tours
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Images & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <AnimatedSection>
              <div className="rounded-2xl overflow-hidden relative h-[400px] md:h-[500px]">
                <motion.img key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={allImages[selectedImage]} alt={tour.title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent" />
                {user && <button onClick={() => toggleWishlist(tour.id)} className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors">
                  <FiHeart className={`w-5 h-5 ${isInWishlist(tour.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>}
              </div>
              <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-hide">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-primary-500' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-2 text-dark-400 text-sm mb-2"><FiMapPin className="text-primary-400" />{tour.location}</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="flex items-center gap-1 text-amber-400"><FiStar className="fill-amber-400" /><b>{tour.rating}</b><span className="text-dark-400">({tour.reviews})</span></span>
                <span className="flex items-center gap-1 text-dark-400"><FiClock />{tour.duration}</span>
                <span className="flex items-center gap-1 text-dark-400"><FiUsers />{tour.seatsLeft}/{tour.totalSeats} seats</span>
                <span className="px-3 py-1 rounded-full glass text-xs text-primary-400 font-medium">{tour.category}</span>
              </div>
            </AnimatedSection>

            {/* Tabs */}
            <div className="flex gap-1 p-1 glass rounded-xl mb-6">
              {['overview', 'itinerary', 'reviews'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}>{tab}</button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <AnimatedSection>
                <p className="text-dark-300 leading-relaxed mb-6">{tour.description}</p>
                <h3 className="text-lg font-bold text-white mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-dark-300"><FiCheck className="text-green-400 flex-shrink-0" />{item}</div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {activeTab === 'itinerary' && (
              <AnimatedSection>
                <div className="space-y-4">
                  {tour.itinerary.map((day, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex gap-4 glass-card rounded-xl p-4">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold text-sm flex-shrink-0">{i + 1}</div>
                      <p className="text-dark-300 pt-2">{day}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {activeTab === 'reviews' && (
              <AnimatedSection>
                {tourReviews.length > 0 ? tourReviews.map(r => (
                  <div key={r.id} className="glass-card rounded-xl p-5 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">{r.avatar}</div>
                      <div><p className="text-white font-semibold text-sm">{r.userName}</p><p className="text-xs text-dark-500">{r.date}</p></div>
                      <div className="ml-auto flex gap-0.5">{[...Array(r.rating)].map((_, j) => <FiStar key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                    </div>
                    <p className="text-dark-300 text-sm">{r.comment}</p>
                  </div>
                )) : <p className="text-dark-400 text-center py-8">No reviews yet. Be the first!</p>}
              </AnimatedSection>
            )}
          </div>

          {/* Right - Booking Card */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.2}>
              <div className="glass-card rounded-2xl p-6 sticky top-28 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    {tour.afterDiscount && <span className="text-sm text-dark-500 line-through">${tour.price.toLocaleString()}</span>}
                    <div className="text-3xl font-bold text-primary-400">${(tour.afterDiscount || tour.price).toLocaleString()}<span className="text-sm text-dark-400 font-normal"> / person</span></div>
                  </div>
                  {tour.afterDiscount && <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">Save ${pricing.savings.toLocaleString()}</span>}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2 block">Guests</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white hover:bg-white/10 text-lg">-</button>
                      <span className="text-white font-bold text-lg w-8 text-center">{guests}</span>
                      <button onClick={() => setGuests(Math.min(tour.seatsLeft, guests + 1))} className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white hover:bg-white/10 text-lg">+</button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-sm"><span className="text-dark-400">${(tour.afterDiscount || tour.price).toLocaleString()} × {guests}</span><span className="text-white">${pricing.subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-dark-400">Tax (12%)</span><span className="text-white">${pricing.tax.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-dark-400">Service fee</span><span className="text-white">${pricing.serviceFee}</span></div>
                    <div className="flex justify-between font-bold text-lg pt-3 border-t border-white/5"><span className="text-white">Total</span><span className="text-primary-400">${pricing.total.toLocaleString()}</span></div>
                  </div>
                </div>

                <button onClick={handleBooking} disabled={booking || tour.seatsLeft === 0}
                  className="w-full btn-premium py-4 rounded-xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {tour.seatsLeft === 0 ? 'Sold Out' : booking ? 'Processing...' : 'Book Now'}
                </button>

                {tour.seatsLeft <= 5 && tour.seatsLeft > 0 && (
                  <p className="text-center text-amber-400 text-sm animate-pulse">⚡ Only {tour.seatsLeft} seats remaining!</p>
                )}

                <div className="flex items-center gap-2 text-xs text-dark-400 justify-center"><FiShield className="text-green-400" />Free cancellation up to 48h before</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
