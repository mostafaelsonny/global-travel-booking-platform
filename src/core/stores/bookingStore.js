import { create } from 'zustand';
import { firestoreService } from '../firebase/firestore';

const TAX_RATE = 0.12;
const SERVICE_FEE = 29.99;

export const useBookingStore = create((set, get) => ({
  currentBooking: null,
  bookings: [],
  loading: false,
  error: null,

  // Calculate pricing
  calculatePrice: (tour, guests = 1) => {
    const basePrice = tour.afterDiscount || tour.price;
    const subtotal = basePrice * guests;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SERVICE_FEE;
    const savings = tour.afterDiscount ? (tour.price - tour.afterDiscount) * guests : 0;

    return {
      basePrice,
      subtotal,
      tax,
      serviceFee: SERVICE_FEE,
      total: Math.round(total * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      taxRate: TAX_RATE,
      guests,
    };
  },
  

  // Create booking
 // Create booking
  createBooking: async (bookingData) => {
    // 1. التأكد من وجود ID الرحلة قبل البدء
    if (!bookingData.tourId) {
      set({ error: "Tour ID is missing!", loading: false });
      return;
    }

    set({ loading: true, error: null });
    
    try {
      console.log("1. Fetching Tour with ID:", bookingData.tourId);
      
      // جلب بيانات الرحلة من Firestore
      const tour = await firestoreService.getById('tours', bookingData.tourId);
      
      console.log("2. Tour Found in DB:", tour);

      // 2. التحقق من وجود الرحلة وتوفر المقاعد
      if (!tour) {
        throw new Error('الرحلة دي مش موجودة في قاعدة البيانات، اتأكد من الـ ID');
      }

      if (tour.seatsLeft < bookingData.guests) {
        throw new Error('عفواً، لا يوجد مقاعد كافية لهذه الرحلة');
      }

      // 3. حساب الأسعار
      const pricing = get().calculatePrice(tour, bookingData.guests);
      
      const booking = {
        ...bookingData,
        pricing,
        tourTitle: tour.title,
        tourImage: tour.image,
        tourLocation: tour.location,
        status: 'confirmed',
        bookingRef: `ST-${Date.now().toString(36).toUpperCase()}`,
      };

      // 4. تنفيذ العملية في Firestore
      const id = await firestoreService.add('bookings', booking);
      await firestoreService.decrementSeats('tours', bookingData.tourId, bookingData.guests);

      // 5. تحديث الـ Store
      set({ currentBooking: { id, ...booking }, loading: false });
      return { id, ...booking };

    } catch (err) {
      console.error("Booking Logic Error:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Get user bookings
  fetchUserBookings: async (uid) => {
    set({ loading: true });
    try {
      const data = await firestoreService.query('bookings', [
        { field: 'userId', operator: '==', value: uid },
      ]);
      set({ bookings: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  clearBooking: () => set({ currentBooking: null }),
  clearError: () => set({ error: null }),
}));
