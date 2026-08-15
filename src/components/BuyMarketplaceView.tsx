import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Globe, 
  Smartphone, 
  Layers, 
  Star, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  DollarSign 
} from 'lucide-react';
import { MarketplaceListing, BuildTarget } from '../types';

interface BuyMarketplaceViewProps {
  listings: MarketplaceListing[];
  onBuyListing: (listing: MarketplaceListing) => void;
}

export const BuyMarketplaceView: React.FC<BuyMarketplaceViewProps> = ({
  listings,
  onBuyListing,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [targetFilter, setTargetFilter] = useState<string>('all');
  const [contactModalListing, setContactModalListing] = useState<MarketplaceListing | null>(null);
  const [contactEmailMsg, setContactEmailMsg] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);

  const filteredListings = listings.filter((l) => {
    const matchesTarget = targetFilter === 'all' || l.target === targetFilter;
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTarget && matchesSearch;
  });

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmailMsg.trim() || !contactModalListing) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactModalListing(null);
      setContactEmailMsg('');
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              Nino Global Marketplace
            </span>
            <span className="text-xs text-slate-400">
              Verified Web &amp; App Codebases
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Explore &amp; Buy Verified Apps
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Search ready-to-launch websites and mobile apps crafted with Nino. Buy directly or contact creators by email for custom enhancements.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['all', 'web', 'mobile', 'both'].map((t) => (
            <button
              key={t}
              onClick={() => setTargetFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                targetFilter === t
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t === 'all' ? 'All Web & Apps' : t === 'both' ? 'Hybrid (Web+App)' : t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps, SaaS, stores, crypto..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            id={`marketplace-item-${listing.id}`}
            className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01]"
          >
            {/* Header Visual Banner */}
            <div className={`p-4 bg-gradient-to-r ${listing.bannerGradient} relative flex items-center justify-between text-white select-none`}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm">
                  {listing.target === 'web' ? <Globe className="w-4 h-4" /> : listing.target === 'mobile' ? <Smartphone className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">{listing.category}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold">
                <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>{listing.rating}</span>
              </div>
            </div>

            {/* Listing Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-white text-lg mb-1">{listing.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {listing.description}
                </p>

                {/* Features & Monthly Revenue Metrics */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-3 space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Target Platform:</span>
                    <span className="font-bold text-slate-200 uppercase">{listing.target}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Est. Monthly Revenue:</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      ${listing.monthlyRevenueEst}/mo
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {listing.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Contact Seller Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Price</span>
                  <span className="text-lg font-black text-white">${listing.priceUsd}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setContactModalListing(listing)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Contact Creator via Email"
                  >
                    <Mail className="w-4 h-4" />
                  </button>

                  <button
                    id={`buy-btn-${listing.id}`}
                    onClick={() => onBuyListing(listing)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy App</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Seller Email Modal */}
      {contactModalListing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Contact Seller via Email</h3>
              </div>
              <button onClick={() => setContactModalListing(null)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-500 block">Project:</span>
              <strong className="text-white">{contactModalListing.title}</strong>
              <div className="text-emerald-400 font-mono mt-1">Seller Email: {contactModalListing.sellerEmail}</div>
            </div>

            {contactSent ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs text-center font-bold">
                ✓ Message sent directly to {contactModalListing.sellerEmail}! They will reply to your account email shortly.
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={contactEmailMsg}
                  onChange={(e) => setContactEmailMsg(e.target.value)}
                  placeholder="Hi! I am interested in buying or customizing this app. Can you provide more details regarding..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setContactModalListing(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Send Email Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
