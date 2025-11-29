import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOCK_USER_TREES } from '../constants';
import { MapPin, Calendar, Sprout, Download, Share2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showSuccess = searchParams.get('new_donation') === 'true';

  return (
    <div className="space-y-8 py-8 animate-in fade-in duration-500">
      
      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-300"></div>
          <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-2">
            <Sprout size={32} />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800">Thank you for planting hope!</h2>
          <p className="text-emerald-700 max-w-lg mx-auto">
            Your trees have been successfully funded. We have assigned a local planting team. 
            You will see your new trees appear here within 48 hours once they are tagged.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700">
                <Download size={16} /> Download Certificate
            </button>
            <button className="flex items-center gap-2 bg-white text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-50">
                <Share2 size={16} /> Share Impact
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar / Stats */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Your Impact</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">12</p>
                        <p className="text-sm text-slate-600">Trees Planted</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-slate-900">0.3t</p>
                        <p className="text-sm text-slate-600">CO₂ Offset (Proj.)</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Badges</h3>
                <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">Early Adopter</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">Green Hero</span>
                </div>
            </div>
        </div>

        {/* Main Content / List */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">My Forest</h2>
                <div className="flex gap-2">
                    <button className="text-sm font-medium text-slate-500 hover:text-emerald-600">List View</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-sm font-medium text-emerald-600">Map View</button>
                </div>
            </div>

            {/* Tree Cards */}
            <div className="space-y-4">
                {MOCK_USER_TREES.map((tree) => (
                    <div key={tree.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors flex flex-col md:flex-row gap-5">
                        <div className="h-48 md:h-32 md:w-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <img src={tree.imageUrl} alt={tree.species} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{tree.species}</h3>
                                        <p className="text-xs text-slate-500 font-mono">ID: {tree.id}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${tree.status === 'Growing' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                                        {tree.status}
                                    </span>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>Planted: {tree.plantedAt}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span>{tree.lat}, {tree.lng}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                                <Link to={`/track?id=${tree.id}`} className="text-sm font-bold text-emerald-600 hover:underline">
                                    View Timeline →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-slate-50 rounded-xl p-8 text-center border border-dashed border-slate-300">
                <p className="text-slate-500 mb-4">Want to grow your impact?</p>
                <Link to="/donate" className="inline-block bg-white border border-slate-300 text-slate-700 font-bold py-2 px-6 rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-colors">
                    Plant More Trees
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;