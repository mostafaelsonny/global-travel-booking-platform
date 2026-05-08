import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3 mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">Have a question or want to plan your dream trip? We'd love to hear from you.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: FiMail, label: 'Email', value: 'hello@sonnytravel.com', sub: 'We reply within 24 hours' },
              { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', sub: 'Mon-Fri 9am-6pm EST' },
              { icon: FiMapPin, label: 'Office', value: '123 Travel Blvd, San Francisco', sub: 'CA 94105, USA' },
              { icon: FiClock, label: 'Hours', value: 'Mon-Fri: 9AM-6PM', sub: 'Weekend: By appointment' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1} variant="fadeLeft">
                <div className="glass-card rounded-2xl p-5 flex items-start gap-4 group hover:bg-white/[0.08] transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                    <p className="text-xs text-dark-400">{item.sub}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.2}>
              <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2 block">Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2 block">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2 block">Subject</label>
                  <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-2 block">Message</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required placeholder="Tell us about your dream trip..." rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-premium px-8 py-3.5 rounded-xl text-white font-semibold flex items-center gap-2 disabled:opacity-50">
                  <FiSend />{loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
