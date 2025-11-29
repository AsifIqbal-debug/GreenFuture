import React, { FormEvent, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, MapPin, Calendar, AlertCircle, Sprout, TreeDeciduous } from 'lucide-react';

type TreeStatus = "seed" | "sapling" | "tree" | "lost";

type TreeUpdate = {
  id: string;
  photoUrl?: string;
  note?: string;
  createdAt: string;
};

type TreeData = {
  publicId: string;
  species?: string;
  status: TreeStatus;
  plantedAt?: string;
  site: {
    name: string;
    district?: string;
    latitude: number;
    longitude: number;
  };
  updates: TreeUpdate[];
};

// --- MOCK FETCH ---
async function mockFetchTree(publicId: string): Promise<TreeData | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const id = publicId.trim().toUpperCase();

  // 1. The ID from the prompt example
  if (id === "GF-2025-00123") {
    return {
      publicId: "GF-2025-00123",
      species: "Rain Tree",
      status: "sapling",
      plantedAt: "2025-02-01",
      site: {
        name: "Gazipur Community Forest",
        district: "Gazipur",
        latitude: 23.999,
        longitude: 90.412,
      },
      updates: [
        {
          id: "1",
          createdAt: "2025-02-01T10:00:00Z",
          note: "Seed planted by local volunteers.",
        },
        {
          id: "2",
          createdAt: "2025-04-15T09:00:00Z",
          note: "Healthy sapling after first rains.",
        },
        {
          id: "3",
          createdAt: "2025-08-01T09:15:00Z",
          note: "Tree has grown to ~1.5 meters.",
        },
      ],
    };
  }

  // 2. Mock IDs from the Dashboard (constants.ts)
  if (id === "TR-8821") {
    return {
      publicId: "TR-8821",
      species: "Mango (Amrapali)",
      status: "tree",
      plantedAt: "2023-08-15",
      site: {
        name: "Sylhet Tea Garden Fringe",
        district: "Sylhet",
        latitude: 23.8103,
        longitude: 90.4125,
      },
      updates: [
        { id: "u1", createdAt: "2023-08-15T09:00:00Z", note: "Planted during monsoon drive.", photoUrl: "https://picsum.photos/400/300?random=101" },
        { id: "u2", createdAt: "2023-11-20T14:30:00Z", note: "Regular maintenance check. Soil moisture is good." },
        { id: "u3", createdAt: "2024-01-10T11:00:00Z", note: "Survived winter, looking strong." }
      ]
    };
  }

  if (id === "TR-9943") {
    return {
      publicId: "TR-9943",
      species: "Neem",
      status: "sapling",
      plantedAt: "2023-09-02",
      site: {
        name: "Rajshahi Drought Res. Project",
        district: "Rajshahi",
        latitude: 24.3636,
        longitude: 88.6241,
      },
      updates: [
        { id: "u1", createdAt: "2023-09-02T08:00:00Z", note: "Planted near school boundary.", photoUrl: "https://picsum.photos/400/300?random=102" }
      ]
    };
  }

  return null;
}

// Helpers
function getStatusLabel(status: TreeStatus) {
  switch (status) {
    case "seed": return "Seed";
    case "sapling": return "Sapling";
    case "tree": return "Grown Tree";
    case "lost": return "Lost / Damaged";
    default: return status;
  }
}

function getStatusStep(status: TreeStatus): number {
  if (status === "seed") return 0;
  if (status === "sapling") return 1;
  if (status === "tree") return 2;
  if (status === "lost") return 3;
  return 0;
}

const TrackPage: React.FC = () => {
  const location = useLocation();
  const [treeIdInput, setTreeIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState<TreeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchedId, setSearchedId] = useState<string | null>(null);

  // Auto-search if ID is in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
        setTreeIdInput(id);
        performSearch(id);
    }
  }, [location]);

  const performSearch = async (id: string) => {
    setError(null);
    setLoading(true);
    setSearchedId(id);
    setTree(null);

    try {
      const data = await mockFetchTree(id);
      if (!data) {
        setError("No tree found with this ID. Please check and try again.");
      } else {
        setTree(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching your tree.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = treeIdInput.trim();
    if (!trimmed) {
      setError("Please enter a Tree ID.");
      setTree(null);
      return;
    }
    performSearch(trimmed);
  };

  const statusStep = tree ? getStatusStep(tree.status) : 0;
  const isLost = tree?.status === 'lost';
  
  // Progress bar calculation (0 to 100%)
  // Steps: 0 (seed), 1 (sapling), 2 (tree). 
  // If lost, we might just show full bar in red or similar.
  const progressPercentage = Math.min((statusStep / 2) * 100, 100);

  return (
    <main className="max-w-4xl mx-auto mt-8 mb-16 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Track your tree</h1>
        <p className="text-slate-600">
          Enter your Tree ID from the certificate or confirmation email to see its
          location, status, and growth timeline.
        </p>
      </header>

      {/* Search box */}
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:flex-row md:items-end"
        >
          <div className="flex-1 space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Tree ID
            </label>
            <div className="relative">
                <input
                type="text"
                value={treeIdInput}
                onChange={(e) => setTreeIdInput(e.target.value)}
                placeholder="e.g. GF-2025-00123"
                className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
                />
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Searching..." : "Track Tree"}
          </button>
        </form>
        {searchedId && !loading && !tree && !error && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-600">
            <AlertCircle size={18} />
            <p className="text-sm">No results found for "{searchedId}". Try another Tree ID.</p>
          </div>
        )}
        {error && (
           <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600">
             <AlertCircle size={18} />
             <p className="text-sm">{error}</p>
           </div>
        )}
      </section>

      {/* Result */}
      {tree && (
        <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Basic info + map */}
          <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tree ID</p>
                  <p className="text-xl font-bold text-slate-800 tracking-tight">
                    {tree.publicId}
                  </p>
                </div>
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                    isLost
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {getStatusLabel(tree.status)}
                </span>
              </div>
              <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Species
                  </p>
                  <p className="font-medium text-slate-800">{tree.species || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Planted on
                  </p>
                  <p className="font-medium text-slate-800">{tree.plantedAt ? new Date(tree.plantedAt).toLocaleDateString() : "Unknown"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Plantation site
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="font-medium text-slate-800">{tree.site.name}</p>
                        {tree.site.district && (
                            <p className="text-xs text-slate-500">
                            {tree.site.district}, Bangladesh
                            </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-1 shadow-sm border border-slate-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=23.8103,90.4125&zoom=10&size=400x300&sensor=false')] bg-cover bg-center opacity-50">
                 {/* Placeholder for real map */}
              </div>
              <div className="relative h-full min-h-[200px] flex flex-col items-center justify-center p-4 text-center z-10">
                 <div className="h-10 w-10 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 mb-2 animate-bounce">
                    <MapPin size={20} fill="currentColor" />
                 </div>
                 <p className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                    Lat: {tree.site.latitude.toFixed(4)}, Lng: {tree.site.longitude.toFixed(4)}
                 </p>
                 <button className="mt-3 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                    Open in Google Maps
                 </button>
              </div>
            </div>
          </div>

          {/* Growth timeline bar */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Growth Progress</h3>
                <span className="text-xs font-medium text-slate-500">{Math.round(progressPercentage)}% to Maturity</span>
            </div>
            
            <div className="relative pt-2 pb-6">
                {/* Bar Background */}
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${isLost ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-600'}`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                
                {/* Steps */}
                <div className="flex justify-between mt-2 absolute w-full top-3 px-1">
                    {[
                        { label: 'Seed', icon: Sprout }, 
                        { label: 'Sapling', icon: Sprout }, 
                        { label: 'Tree', icon: TreeDeciduous }
                    ].map((step, idx) => {
                        // 0, 1, 2
                        const isActive = statusStep >= idx;
                        const isCurrent = statusStep === idx;
                        
                        // Positioning
                        const position = idx === 0 ? '0%' : idx === 1 ? '50%' : '100%';
                        const translate = idx === 0 ? '0%' : idx === 1 ? '-50%' : '-100%';

                        return (
                            <div 
                                key={idx} 
                                className="flex flex-col items-center absolute"
                                style={{ left: position, transform: `translateX(${translate})` }}
                            >
                                <div className={`h-4 w-4 rounded-full border-2 z-10 ${isActive ? (isLost ? 'bg-red-500 border-red-500' : 'bg-emerald-600 border-emerald-600') : 'bg-white border-slate-200'} transition-colors duration-500`}></div>
                                <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {isLost && (
                 <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3 text-red-700 text-sm">
                    <AlertCircle className="shrink-0" />
                    <p>This tree was reported as lost or damaged. Our team has been notified and a replacement sapling is scheduled for the next planting season.</p>
                 </div>
            )}
          </div>

          {/* Updates timeline */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <h3 className="mb-6 text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">
              Field Updates
            </h3>
            {tree.updates.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm">No updates yet.</p>
                <p className="text-xs mt-1">Volunteers upload photos when they visit the site.</p>
              </div>
            ) : (
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
                {tree.updates.map((u, index) => (
                  <div key={u.id} className="relative pl-8">
                    {/* Timeline Dot */}
                    <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm ring-2 ring-emerald-50" />
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={12} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                            
                            {u.note && <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">{u.note}</p>}
                        </div>
                        
                        {u.photoUrl && (
                        <div className="shrink-0">
                            <img 
                                src={u.photoUrl} 
                                alt="Update" 
                                className="h-24 w-32 object-cover rounded-lg border border-slate-100 shadow-sm hover:scale-105 transition-transform cursor-pointer" 
                            />
                        </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default TrackPage;