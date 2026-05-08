import { create } from 'zustand';
import { firestoreService } from '../firebase/firestore';

export const useDestinationStore = create((set, get) => ({
  destinations: [],
  tours: [],
  featuredTours: [],
  loading: false,
  error: null,
  unsubscribe: null,

  // Fetch all destinations
  fetchDestinations: async () => {
    set({ loading: true });
    try {
      const data = await firestoreService.getAll('destinations');
      set({ destinations: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch all tours with real-time updates
  subscribeToTours: () => {
    const unsub = firestoreService.onSnapshot('tours', (data) => {
      const featured = data.filter((t) => t.featured);
      set({ tours: data, featuredTours: featured, loading: false });
    });
    set({ unsubscribe: unsub });
    return unsub;
  },

  // Fetch tours once
  fetchTours: async () => {
    set({ loading: true });
    try {
      const data = await firestoreService.getAll('tours');
      const featured = data.filter((t) => t.featured);
      set({ tours: data, featuredTours: featured, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Get single tour
  getTourById: async (id) => {
    return await firestoreService.getById('tours', id);
  },

  // Search & filter
  searchTours: (filters) => {
    const { tours } = get();
    let filtered = [...tours];

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.location?.toLowerCase().includes(loc) ||
          t.country?.toLowerCase().includes(loc) ||
          t.city?.toLowerCase().includes(loc) ||
          t.title?.toLowerCase().includes(loc)
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((t) => (t.afterDiscount || t.price) >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((t) => (t.afterDiscount || t.price) <= filters.maxPrice);
    }

    if (filters.checkIn && filters.checkOut) {
      // Filter by availability dates
      filtered = filtered.filter((t) => t.seatsLeft > 0);
    }

    if (filters.rating) {
      filtered = filtered.filter((t) => t.rating >= filters.rating);
    }

    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => (a.afterDiscount || a.price) - (b.afterDiscount || b.price));
          break;
        case 'price-high':
          filtered.sort((a, b) => (b.afterDiscount || b.price) - (a.afterDiscount || a.price));
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          break;
      }
    }

    return filtered;
  },

  cleanup: () => {
    const { unsubscribe } = get();
    if (unsubscribe) unsubscribe();
  },
}));
