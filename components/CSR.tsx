import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, FileText, Globe, ArrowRight } from 'lucide-react';

const CSRPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-12">
        {/* Hero */}
        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-900/50 to-transparent"></div>
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Make your company <span className="text-emerald-400">Climate Positive</span></h1>
                <p className="text-lg text-slate-300 mb-8">
                    Partner with GreenFuture to meet your ESG goals. We offer verifiable tree planting solutions with branded impact reports and dedicated forests.
                </p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                    Contact Our CSR Team
                </button>
            </div>
        </div>

        {/* Benefits */}
        <div className="grid gap-8 md:grid-cols-3">
            {[
                { icon: FileText, title: "ESG Reporting", desc: "Get audit-ready data on carbon sequestration and social impact for your annual reports." },
                { icon: Globe, title: "Branded Forests", desc: "Create a '[YourCompany] Forest' with a dedicated landing page to share with stakeholders." },
                { icon: Building2, title: "Employee Engagement", desc: "Organize planting days or gift trees to employees for birthdays and work anniversaries." }
            ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                        <item.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                </div>
            ))}
        </div>

        {/* Packages */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Corporate Packages</h2>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Startup", trees: "1,000", price: "Contact" },
                    { title: "Enterprise", trees: "10,000", price: "Contact" },
                    { title: "Global Partner", trees: "100,000+", price: "Custom" }
                ].map((pkg, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-emerald-500 hover:shadow-lg transition-all">
                        <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-2">{pkg.title}</h3>
                        <p className="text-4xl font-bold text-slate-900 mb-6">{pkg.trees} <span className="text-lg font-normal text-slate-500">Trees</span></p>
                        <ul className="text-sm text-slate-600 space-y-3 mb-8">
                            <li>Digital Certificates</li>
                            <li>Impact Dashboard</li>
                            <li>{i > 0 ? 'Dedicated Account Manager' : 'Email Support'}</li>
                            {i > 1 && <li>Custom Site Branding</li>}
                        </ul>
                        <Link to="#" className="flex items-center justify-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
                            Get a Quote <ArrowRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CSRPage;