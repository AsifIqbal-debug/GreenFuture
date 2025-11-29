import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRICE_PER_TREE, PRESET_AMOUNTS } from '../constants';
import { Check, CreditCard, Smartphone } from 'lucide-react';

const DonatePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const initialTrees = Number(searchParams.get("trees")) || 5;
  const initialOccasion = searchParams.get("occasion") || "none";

  const [trees, setTrees] = useState(initialTrees);
  const [customTrees, setCustomTrees] = useState("");
  const [occasion, setOccasion] = useState(initialOccasion);
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const amount = useMemo(() => trees * PRICE_PER_TREE, [trees]);

  const handleCustomTreesChange = (value: string) => {
    setCustomTrees(value);
    const n = Number(value);
    if (!Number.isNaN(n) && n > 0) {
      setTrees(n);
    }
  };

  const handleDonation = (method: string) => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        // Navigate to dashboard with query params simulating a successful transaction
        navigate('/dashboard?new_donation=true');
    }, 2000);
  };

  if (isProcessing) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
              <div className="h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="text-lg font-medium text-slate-700">Processing your contribution...</p>
              <p className="text-sm text-slate-500">Connecting to payment gateway</p>
          </div>
      )
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-16 space-y-8 animate-in fade-in duration-500">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">Plant trees, grow hope</h1>
        <p className="text-slate-600">
          Choose how many trees you want to plant. You’ll receive a digital
          certificate and unique Tree IDs immediately after payment.
        </p>
      </header>

      {/* Tree Selector */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">Number of trees</label>
            <div className="flex flex-wrap gap-3">
            {PRESET_AMOUNTS.map((option) => (
                <button
                key={option}
                type="button"
                onClick={() => {
                    setTrees(option);
                    setCustomTrees("");
                }}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    trees === option && customTrees === ""
                    ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-100"
                    : "bg-slate-50 text-slate-700 hover:bg-emerald-50 border border-slate-200"
                }`}
                >
                {option}
                </button>
            ))}
            <div className="relative">
                <input
                    type="number"
                    min={1}
                    value={customTrees}
                    onChange={(e) => handleCustomTreesChange(e.target.value)}
                    placeholder="Custom"
                    className={`w-28 rounded-full border px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 ${customTrees ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'}`}
                />
                {customTrees && <span className="absolute right-3 top-2.5 text-xs font-bold text-emerald-600">trees</span>}
            </div>
            </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="text-sm text-emerald-800">
            <span className="font-semibold block">Cost breakdown</span>
            <span className="opacity-80">{trees} trees × {PRICE_PER_TREE} BDT</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Total Contribution</p>
            <p className="text-2xl font-bold text-emerald-700">
              {amount.toLocaleString()} <span className="text-base font-normal">BDT</span>
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Personalize your gift</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Occasion</label>
                <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                <option value="none">Just because (General Donation)</option>
                <option value="birthday">Birthday Celebration</option>
                <option value="anniversary">Anniversary</option>
                <option value="memory">In Loving Memory</option>
                <option value="gift">Gift for a Friend</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Recipient Name</label>
                <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Name on certificate"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
            </div>
        </div>
        
        <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Message (Optional)</label>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal note to be included with the certificate..."
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 resize-none"
            />
        </div>
      </section>

      {/* Payment */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Select payment method</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => handleDonation("bkash")}
            className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-slate-100 p-4 hover:border-pink-500 hover:bg-pink-50 transition-all"
          >
            <Smartphone className="text-slate-400 group-hover:text-pink-600" />
            <span className="font-bold text-slate-700 group-hover:text-pink-700">bKash</span>
            {/* Mock checkmark for visual interaction */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-pink-500"><Check size={14} /></div>
          </button>

          <button
            type="button"
            onClick={() => handleDonation("nagad")}
            className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-slate-100 p-4 hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <Smartphone className="text-slate-400 group-hover:text-orange-600" />
            <span className="font-bold text-slate-700 group-hover:text-orange-700">Nagad</span>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-orange-500"><Check size={14} /></div>
          </button>

          <button
            type="button"
            onClick={() => handleDonation("card")}
            className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-slate-100 p-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
          >
            <CreditCard className="text-slate-400 group-hover:text-emerald-600" />
            <span className="font-bold text-slate-700 group-hover:text-emerald-700">Card</span>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-emerald-500"><Check size={14} /></div>
          </button>
        </div>
        
        <p className="text-center text-xs text-slate-400 pt-2">
            Secure payment processing. You will receive an email confirmation immediately.
        </p>
      </section>
    </div>
  );
};

export default DonatePage;