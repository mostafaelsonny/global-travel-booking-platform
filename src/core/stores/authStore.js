import { create } from 'zustand';
import { authService } from '../firebase/auth';
import { firestoreService } from '../firebase/firestore';

export const useAuthStore = create((set, get) => ({
  user: null,
  userProfile: null,
  loading: true, 
  error: null,

  // 1. تحسين التهيئة: استخدام getById أسرع وأدق من الـ query
  init: () => {
    set({ loading: true });
    return authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // بدلاً من البحث بـ query، نبحث مباشرة بالـ ID لضمان السرعة والدقة
          const profile = await firestoreService.getById('users', firebaseUser.uid);
          console.log("Fetched Profile:", profile); // ضيف السطر ده للتأكد
          
          set({ 
            user: firebaseUser, 
            userProfile: profile || null, 
            loading: false 
          });
        } catch (err) {
          console.error("Profile Fetch Error:", err);
          set({ user: firebaseUser, userProfile: null, loading: false });
        }
      } else {
        set({ user: null, userProfile: null, loading: false });
      }
    });
  },

  login: async (email, password) => {
    if (!email || !password) {
      set({ error: "Please enter both email and password" });
      return;
    }
    set({ loading: true, error: null });
    try {
      const user = await authService.login(email, password);
      // مهم جداً: جلب البروفايل فور تسجيل الدخول لكي يظهر زر الـ Admin فوراً
      const profile = await firestoreService.getById('users', user.uid);
      set({ user, userProfile: profile, loading: false });
      return user;
    } catch (err) {
      let msg = err.message;
      if (err.code === 'auth/user-not-found') msg = "User not found";
      if (err.code === 'auth/wrong-password') msg = "Invalid password";
      
      set({ error: msg, loading: false });
      throw err;
    }
  },

  register: async (email, password, displayName) => {
    set({ loading: true, error: null });
    try {
      const user = await authService.register(email, password, displayName);
      
      const profileData = {
        uid: user.uid,
        name: displayName,
        email: email,
        role: 'user', 
        wishlist: [],
        createdAt: new Date()
      };

      // استخدام addWithId الموثوقة التي أضفناها لملف firestore.js
      await firestoreService.addWithId('users', user.uid, profileData);
      
      set({ user, userProfile: profileData, loading: false });
      return user;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  googleSignIn: async () => {
    set({ loading: true, error: null });
    try {
      const user = await authService.googleSignIn();
      
      // فحص الوجود باستخدام getById (أفضل من الـ query)
      const existingProfile = await firestoreService.getById('users', user.uid);

      if (!existingProfile) {
        const profileData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'user',
          wishlist: [],
          createdAt: new Date()
        };
        await firestoreService.addWithId('users', user.uid, profileData);
        set({ user, userProfile: profileData, loading: false });
      } else {
        set({ user, userProfile: existingProfile, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null, userProfile: null, loading: false });
    } catch (err) {
      set({ error: err.message });
    }
  },

  toggleWishlist: async (tourId) => {
    const { userProfile } = get();
    if (!userProfile?.uid) return;
    
    try {
      const wishlist = userProfile.wishlist || [];
      const updated = wishlist.includes(tourId)
        ? wishlist.filter((id) => id !== tourId)
        : [...wishlist, tourId];
        
      await firestoreService.update('users', userProfile.uid, { wishlist: updated });
      set({ userProfile: { ...userProfile, wishlist: updated } });
    } catch (err) {
      console.error("Wishlist Update Error:", err);
      set({ error: "Failed to update wishlist" });
    }
  },

  isInWishlist: (tourId) => {
    const { userProfile } = get();
    return userProfile?.wishlist?.includes(tourId) || false;
  },

  clearError: () => set({ error: null }),
}));