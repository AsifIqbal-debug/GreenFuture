import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Facebook, Instagram, Mail } from 'lucide-react';
import GreenGuideChat from './GreenGuideChat';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it Works', path: '/#how-it-works' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'CSR', path: '/csr' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-5 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100/50">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-600 transition-colors">
              <Leaf size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">GreenFuture</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden gap-8 text-sm font-medium md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors hover:text-emerald-600 ${
                  isActive(link.path) ? 'text-emerald-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Plant a Tree
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-b border-emerald-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-700 hover:text-emerald-600 px-2"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white"
            >
              Plant a Tree
            </Link>
          </div>
        )}

        {/* Main Content */}
        <main className="min-h-[calc(100vh-300px)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-24 border-t border-emerald-100 py-12 text-sm text-slate-600">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Leaf size={12} fill="currentColor" />
                 </div>
                 <span className="font-bold text-slate-800">GreenFuture</span>
              </div>
              <p className="text-slate-500">
                Planting trees, empowering communities, and restoring nature across Bangladesh.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/donate" className="hover:text-emerald-600">Donate</Link></li>
                <li><Link to="/track" className="hover:text-emerald-600">Track Trees</Link></li>
                <li><Link to="/dashboard" className="hover:text-emerald-600">My Impact</Link></li>
                <li><Link to="/csr" className="hover:text-emerald-600">Corporate Partners</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-emerald-600">FAQ</Link></li>
                <li><Link to="#" className="hover:text-emerald-600">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-emerald-600">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-emerald-50 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} GreenFuture Foundation. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Floating Chat Assistant */}
      <GreenGuideChat />
    </div>
  );
};

export default Layout;