import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { useAuthStore } from '@core/stores/authStore';
import { useBookingStore } from '@core/stores/bookingStore';
import { FiCalendar, FiMapPin, FiUsers, FiDownload, FiClock } from 'react-icons/fi';
import jsPDF from 'jspdf';

export default function MyBookings() {
  const { user } = useAuthStore();
  const { bookings, fetchUserBookings, loading } = useBookingStore();

  useEffect(() => {
    if (user) fetchUserBookings(user.uid);
  }, [user, fetchUserBookings]);

  const downloadTicket = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Sonny Travel - Booking Confirmation', 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking Ref: ${booking.bookingRef}`, 20, 40);
    doc.text(`Tour: ${booking.tourTitle}`, 20, 50);
    doc.text(`Location: ${booking.tourLocation}`, 20, 60);
    doc.text(`Guests: ${booking.guests}`, 20, 70);
    doc.text(`Total: $${booking.pricing.total}`, 20, 80);
    doc.text(`Status: ${booking.status}`, 20, 90);
    doc.text(`Date: ${new Date(booking.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}`, 20, 100);
    doc.save(`sonny-travel-${booking.bookingRef}.pdf`);
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center"><h2 className="text-2xl font-bold text-white mb-4">Please sign in</h2>
        <Link to="/login" className="btn-premium px-6 py-3 rounded-xl text-white">Sign In</Link></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">My Bookings</h1>
          <p className="text-dark-400 mb-8">Your travel history and upcoming trips</p>
        </AnimatedSection>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}</div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking, i) => (
              <AnimatedSection key={booking.id} delay={i * 0.1}>
                <motion.div whileHover={{ scale: 1.01 }} className="glass-card rounded-2xl p-5 flex flex-col md:flex-row gap-4">
                  <img src={booking.tourImage} alt={booking.tourTitle} className="w-full md:w-40 h-28 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{booking.tourTitle}</h3>
                        <p className="text-sm text-dark-400 flex items-center gap-1"><FiMapPin className="w-3 h-3" />{booking.tourLocation}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-dark-400 mb-3">
                      <span className="flex items-center gap-1"><FiCalendar /> Ref: {booking.bookingRef}</span>
                      <span className="flex items-center gap-1"><FiUsers /> {booking.guests} guests</span>
                      <span className="flex items-center gap-1"><FiClock /> {new Date(booking.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 font-bold text-lg">${booking.pricing.total.toLocaleString()}</span>
                      <button onClick={() => downloadTicket(booking)} className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-white hover:bg-white/10 transition-colors">
                        <FiDownload className="w-4 h-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-white mb-2">No bookings yet</h3>
            <p className="text-dark-400 mb-6">Start planning your dream trip!</p>
            <Link to="/tours" className="btn-premium px-6 py-3 rounded-xl text-white font-semibold">Browse Tours</Link>
          </div>
        )}
      </div>
    </div>
  );
}
