import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_STATS, DONATION_PACKAGES } from '../constants';
import { MapPin, ArrowRight, ShieldCheck, Heart, Users, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="mt-8 grid gap-12 lg:grid-cols-2 items-center">
        <div className="flex flex-col justify-center space-y-8 animate-in slide-in-from-left-5 duration-700">
          <div className="inline-flex max-w-max items-center rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Globe size={12} className="mr-1.5" />
            Make the world greener today
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl text-slate-900 leading-[1.1]">
            Plant a Tree. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Grow a Future.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-slate-600 leading-relaxed">
            Your donation funds real trees, planted by local communities in
            Bangladesh. Get a digital certificate, GPS tracking, and see your impact grow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/donate"
              className="rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-emerald-700 hover:shadow-emerald-200/50 transition-all"
            >
              Plant a Tree Now
            </Link>
            <Link
              to="/donate?mode=subscription"
              className="rounded-full border-2 border-emerald-100 bg-white px-8 py-4 text-base font-bold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
            >
              Monthly Impact
            </Link>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            Verified photos & GPS coordinates for every campaign.
          </p>
        </div>

        <div className="relative flex items-center justify-center animate-in zoom-in-95 duration-1000">
          <div className="relative h-[500px] w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
             <img 
               src="https://picsum.photos/800/1000?random=1" 
               alt="Nature" 
               className="h-full w-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
             
             {/* Floating Certificate Card */}
             <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Certificate Issued</p>
                    <p className="text-slate-900 font-semibold mt-1">In honor of Someone Special</p>
                    <p className="text-xs text-slate-500 mt-1">Gazipur Community Forest • <span className="font-mono">23.8°N, 90.4°E</span></p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="grid gap-8 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {MOCK_STATS.map((stat, idx) => (
              <div key={idx} className="pt-4 md:pt-0 md:pl-6 first:pl-0 text-center md:text-left">
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-emerald-700">{stat.value}</p>
                {stat.subtext && <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>}
              </div>
            ))}
            <div className="pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
              <Link to="/track" className="group flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                <span>View Live Map</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">Simple steps to big impact</h2>
          <p className="mt-3 text-slate-600">Transparency is at our core. Track your specific trees from sapling to maturity.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Users, title: "Choose Trees", desc: "Select a package or custom amount for any occasion." },
            { icon: Heart, title: "Donate Securely", desc: "100% of funds go to verified planting partners." },
            { icon: MapPin, title: "Track Growth", desc: "Get GPS coords and photo updates of your forest." }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors group">
              <div className="h-14 w-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <step.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section id="occasion" className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">Plant for every occasion</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {DONATION_PACKAGES.map((pkg) => (
            <Link
              key={pkg.slug}
              to={`/donate?occasion=${pkg.slug}&trees=${pkg.trees}`}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="h-10 w-10 rounded-full bg-emerald-50 mb-4 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <Leaf size={20} />
                </div>
                <p className="font-bold text-lg text-slate-900">{pkg.label}</p>
                <p className="text-sm text-slate-500 mt-1">{pkg.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50">
                 <p className="text-emerald-700 font-semibold text-sm">Start with {pkg.trees} trees →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Function definitions to fix React syntax issues in loops */}
    </div>
  );
};

// Helper for icon usage
const Leaf = ({ size = 24, fill="none" }: {size?:number, fill?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 5.2 6.1A7 7 0 0 1 11 20z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);

export default LandingPage;