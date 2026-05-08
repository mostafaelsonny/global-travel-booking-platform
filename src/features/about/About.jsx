import { motion } from 'framer-motion';
import AnimatedSection from '@shared/components/AnimatedSection';
import { FiUsers, FiAward, FiGlobe, FiHeart, FiTarget, FiTrendingUp } from 'react-icons/fi';

const team = [
  { name: 'Sonny Thompson', role: 'Founder & CEO', avatar: 'ST', bio: 'Former travel journalist with 15+ years of global exploration.' },
  { name: 'Amara Singh', role: 'Head of Operations', avatar: 'AS', bio: 'Expert in luxury hospitality and client experience.' },
  { name: 'Marcus Chen', role: 'Lead Developer', avatar: 'MC', bio: 'Full-stack engineer building seamless travel tech.' },
  { name: 'Elena Volkov', role: 'Creative Director', avatar: 'EV', bio: 'Award-winning designer crafting premium brand experiences.' },
];

const values = [
  { icon: FiHeart, title: 'Passion', desc: 'Travel is our life. We live and breathe exploration.' },
  { icon: FiTarget, title: 'Excellence', desc: 'Every detail is curated to perfection.' },
  { icon: FiGlobe, title: 'Sustainability', desc: 'Responsible tourism that gives back.' },
  { icon: FiTrendingUp, title: 'Innovation', desc: 'Leveraging technology for seamless experiences.' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950" />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mt-3 mb-6">
              About <span className="text-gradient">Sonny Travel</span>
            </h1>
            <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Founded in 2020, we've been crafting extraordinary travel experiences that transform ordinary vacations into life-changing adventures.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-white">Our <span className="text-gradient">Values</span></h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 0.1} variant="scale">
              <div className="glass-card rounded-2xl p-6 text-center group hover:bg-white/[0.08] transition-all h-full">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <v.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-dark-400">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-900/20 to-purple-900/20 py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ n: '50K+', l: 'Happy Travelers' },{ n: '52+', l: 'Countries' },{ n: '200+', l: 'Premium Tours' },{ n: '99%', l: 'Satisfaction' }].map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.1}><div className="text-3xl font-bold text-white">{s.n}</div><div className="text-sm text-dark-400">{s.l}</div></AnimatedSection>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-white">Meet Our <span className="text-gradient">Team</span></h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">{m.avatar}</div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-primary-400 text-sm font-medium mb-2">{m.role}</p>
                <p className="text-xs text-dark-400">{m.bio}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
