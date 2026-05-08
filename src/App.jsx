import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@core/stores/authStore';
import Layout from '@shared/components/Layout';
import { PageLoader } from '@shared/components/Loading';
import { seedTours } from './db/seeder';
// Lazy load pages for code splitting
const Home = lazy(() => import('@features/home/Home'));
const Tours = lazy(() => import('@features/tours/Tours'));
const TourDetail = lazy(() => import('@features/tours/TourDetail'));
const Login = lazy(() => import('@features/auth/Login'));
const Register = lazy(() => import('@features/auth/Register'));
const Profile = lazy(() => import('@features/profile/Profile'));
const MyBookings = lazy(() => import('@features/profile/MyBookings'));
const Wishlist = lazy(() => import('@features/profile/Wishlist'));
const About = lazy(() => import('@features/about/About'));
const Contact = lazy(() => import('@features/contact/Contact'));
const Gallery = lazy(() => import('@features/gallery/Gallery'));
const AdminDashboard = lazy(() => import('@features/admin/AdminDashboard'));

export default function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    // seedTours();
    const unsubscribe = init();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [init]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
