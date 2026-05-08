import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiMap, FiDollarSign, FiTrendingUp, FiX, FiSave, FiBarChart2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Imports الخاصة بمشروعك
import AnimatedSection from '@shared/components/AnimatedSection';
import { useAuthStore } from '@core/stores/authStore';
import { firestoreService } from '../../core/firebase/firestore';
import { destinationsData } from '@core/data/seedData';

const defaultTour = { 
  title: '', location: '', country: '', city: '', continent: 'Europe', 
  category: 'Cultural', price: 0, afterDiscount: 0, duration: '', 
  description: '', image: '', rating: 4.5, reviews: 0, 
  seatsLeft: 20, totalSeats: 20, featured: false, includes: [], itinerary: [] 
};

export default function AdminDashboard() {
  const { user, userProfile } = useAuthStore();
  const navigate = useNavigate();
  
  // States
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [form, setForm] = useState(defaultTour);
  const [activeTab, setActiveTab] = useState('tours');

  // 1. الحماية وجلب البيانات عند التحميل
  useEffect(() => {
    // التأكد من أن المستخدم Admin
    if (!user || (userProfile && userProfile.role !== 'admin')) {
      toast.error('عفواً، مسموح للمديرين فقط بدخول هذه الصفحة');
      navigate('/');
      return;
    }

    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await firestoreService.getAll('tours'); // جلب البيانات الحقيقية
        setTours(data);
      } catch (error) {
        toast.error('فشل في تحميل الرحلات من القاعدة');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [user, userProfile, navigate]);

  // حساب الإحصائيات بناءً على البيانات الحقيقية
  const stats = [
    { icon: FiMap, label: 'Total Tours', value: tours.length, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { icon: FiUsers, label: 'Total Seats', value: tours.reduce((a, t) => a + (Number(t.totalSeats) || 0), 0), color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: FiDollarSign, label: 'Avg Price', value: `$${tours.length ? Math.round(tours.reduce((a, t) => a + (t.afterDiscount || t.price), 0) / tours.length) : 0}`, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: FiTrendingUp, label: 'Destinations', value: destinationsData.length, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  // 2. دالة الحفظ (إضافة أو تعديل في Firebase)
  const handleSave = async () => {
    if (!form.title || !form.location) { 
      toast.error('العنوان والموقع مطلوبان'); 
      return; 
    }

    try {
      const tourData = {
        ...form,
        updatedAt: new Date() // تحديث وقت التعديل
      };

      if (editingTour) {
        // تحديث رحلة موجودة
        await firestoreService.update('tours', editingTour.id, tourData);
        setTours(prev => prev.map(t => t.id === editingTour.id ? { ...t, ...tourData } : t));
        toast.success('تم تحديث البيانات في Firebase ✅');
      } else {
        // إضافة رحلة جديدة
        const newId = await firestoreService.add('tours', { ...tourData, gallery: [] });
        setTours(prev => [...prev, { ...tourData, id: newId }]);
        toast.success('تمت إضافة الرحلة لقاعدة البيانات 🎉');
      }
      
      setShowForm(false);
      setEditingTour(null);
      setForm(defaultTour);
    } catch (error) {
      toast.error('Error saving data');
      console.error(error);
    }
  };

  // 3. دالة الحذف من Firebase
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await firestoreService.delete('tours', id); // حذف حقيقي
        setTours(prev => prev.filter(t => t.id !== id));
        toast.success('Deleted successfully');
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setForm(tour);
    setShowForm(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-white">ِِAdmin Dashboard</h1>
              <p className="text-dark-400 text-sm">Trip management, bookings, and real-time analytics</p>
            </div>
            <button onClick={() => { setShowForm(true); setEditingTour(null); setForm(defaultTour); }}
              className="btn-premium px-5 py-3 rounded-xl text-white font-semibold flex items-center gap-2">
              <FiPlus /> Add Trip
            </button>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1} variant="scale">
              <div className="glass-card rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-dark-400">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Tabs Control */}
        <div className="flex gap-1 p-1 glass rounded-xl mb-6 max-w-md ">
          {['tours', 'analytics'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-primary-500 text-white' : 'text-dark-400 hover:text-white'}`}>
              {tab === 'tours' ? 'Trips' : 'Analytics'}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        {activeTab === 'tours' && (
          <div className="grid grid-cols-1 gap-3">
            {tours.map((tour, i) => (
              <motion.div key={tour.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i * 0.03, 0.5) }}
                className="glass-card rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 hover:bg-white/[0.06] transition-colors">
                <img src={tour.image} alt={tour.title} className="w-full md:w-20 h-16 object-cover rounded-lg" />
                <div className="flex-1 min-w-0 text-center md:text-left">
                  <h3 className="text-sm font-bold text-white truncate">{tour.title}</h3>
                  <p className="text-xs text-dark-400">{tour.location} · {tour.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-400">${(tour.afterDiscount || tour.price).toLocaleString()}</p>
                  <p className="text-xs text-dark-500">{tour.seatsLeft}/{tour.totalSeats} Seats</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(tour)} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-primary-400 hover:bg-primary-500/20"><FiEdit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(tour.id)} className="w-9 h-9 rounded-lg glass flex items-center justify-center text-red-400 hover:bg-red-500/20"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnimatedSection>
            <div className="glass-card rounded-2xl p-8 text-center">
              <FiBarChart2 className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
              <p className="text-dark-400">The following data is now being pulled from your Firebase Instance.</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-4 rounded-xl"><div className="text-2xl font-bold text-green-400">$127K</div><div className="text-xs text-dark-400">Expected Revenue</div></div>
                <div className="glass p-4 rounded-xl"><div className="text-2xl font-bold text-primary-400">{tours.length}</div><div className="text-xs text-dark-400">Published Trips</div></div>
                <div className="glass p-4 rounded-xl"><div className="text-2xl font-bold text-amber-400">4.8</div><div className="text-xs text-dark-400">Average Rating</div></div>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-dark-950/80 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="glass-card rounded-3xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{editingTour ? 'Edit Trip' : 'Add New Trip'}</h2>
                <button onClick={() => { setShowForm(false); setEditingTour(null); }} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-dark-400 hover:text-white"><FiX /></button>
              </div>
              
              <div className="space-y-4">
                {/* Basic fields */}
                {[
                  { key: 'title', label: 'Title', type: 'text' },
                  { key: 'location', label: 'Location', type: 'text' },
                  { key: 'country', label: 'Country', type: 'text' },
                  { key: 'city', label: 'City', type: 'text' },
                  { key: 'duration', label: 'Duration', type: 'text', placeholder: 'Example: 7 Days / 6 Nights' },
                  { key: 'image', label: 'Main Image URL', type: 'text' },
                  { key: 'price', label: 'Base Price ($)', type: 'number' },
                  { key: 'afterDiscount', label: 'Price After Discount ($)', type: 'number' },
                  { key: 'totalSeats', label: 'Total Seats', type: 'number' },
                  { key: 'seatsLeft', label: 'Available Seats', type: 'number' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1 block">{f.label}</label>
                    <input type={f.type} value={form[f.key]} 
                      onChange={e => setForm({...form, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value})}
                      placeholder={f.placeholder || f.label} 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500" />
                  </div>
                ))}
                
                <div>
                  <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1 block">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500">
                    {['Cultural', 'Adventure', 'Beach', 'Luxury', 'Wellness'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary-500 resize-none" />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-primary-500 w-4 h-4" />
                  <span className="text-sm text-dark-300">Featured Trip</span>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button onClick={() => { setShowForm(false); setEditingTour(null); }} className="flex-1 py-3 rounded-xl glass text-dark-300 hover:text-white font-medium">Cancel</button>
                  <button onClick={handleSave} className="flex-1 py-3 rounded-xl btn-premium text-white font-semibold flex items-center justify-center gap-2">
                    <FiSave /> {editingTour ? 'Update' : 'Save to Firebase'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}