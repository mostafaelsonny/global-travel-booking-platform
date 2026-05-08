import { Link } from 'react-router-dom';
import { MdFlight } from 'react-icons/md';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

const footerLinks = {
  Destinations: [
    { label: 'Europe', path: '/tours?continent=Europe' },
    { label: 'Asia', path: '/tours?continent=Asia' },
    { label: 'Africa', path: '/tours?continent=Africa' },
    { label: 'Americas', path: '/tours?continent=South America' },
    { label: 'Oceania', path: '/tours?continent=Oceania' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Careers', path: '#' },
    { label: 'Blog', path: '#' },
  ],
  Support: [
    { label: 'Help Center', path: '#' },
    { label: 'Cancellation', path: '#' },
    { label: 'Travel Insurance', path: '#' },
    { label: 'FAQs', path: '#' },
    { label: 'Privacy Policy', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <MdFlight className="text-white text-xl rotate-45" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Sonny</span>
                <span className="text-xl font-light text-primary-400">Travel</span>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed mb-6 max-w-sm">
              Premium luxury travel experiences to over 50 destinations worldwide.
              Creating unforgettable memories since 2020.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-dark-400">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span>hello@sonnytravel.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-400">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-400">
                <FiMapPin className="w-4 h-4 text-primary-400" />
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-dark-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} Sonny Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
