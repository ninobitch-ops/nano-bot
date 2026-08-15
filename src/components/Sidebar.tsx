import React from 'react';
import { 
  PlusCircle, 
  FolderKanban, 
  Clock, 
  RefreshCw, 
  SendHorizontal, 
  ShoppingBag, 
  Sparkles, 
  Unlock, 
  Wallet, 
  Layers, 
  Globe, 
  Smartphone, 
  Zap, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { NinoProject } from '../types';

export type NavTab = 
  | 'build' 
  | 'projects' 
  | 'recent-chats' 
  | 'updates' 
  | 'sell-transfer' 
  | 'buy' 
  | 'set-free' 
  | 'deposit';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onNewChat: () => void;
  unfinishedCount: number;
  recentChatCount: number;
  urgentUpdateCount: number;
  walletBalance: number;
  currentProject: NinoProject | null;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  onOpenTermsModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onNewChat,
  unfinishedCount,
  recentChatCount,
  urgentUpdateCount,
  walletBalance,
  currentProject,
  isMobileOpen,
  setIsMobileOpen,
  onOpenTermsModal,
}) => {
  const navItems = [
    {
      id: 'build' as NavTab,
      label: 'Builder Studio',
      sublabel: 'Prompt & AI Program',
      icon: Sparkles,
      action: () => setActiveTab('build'),
    },
    {
      id: 'projects' as NavTab,
      label: 'Projects',
      sublabel: `${unfinishedCount} in workspace`,
      icon: FolderKanban,
      badge: unfinishedCount > 0 ? `${unfinishedCount}` : undefined,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      action: () => setActiveTab('projects'),
    },
    {
      id: 'recent-chats' as NavTab,
      label: 'Recent Chats',
      sublabel: 'Lasts 24 hours',
      icon: Clock,
      badge: recentChatCount > 0 ? `${recentChatCount}` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      action: () => setActiveTab('recent-chats'),
    },
    {
      id: 'updates' as NavTab,
      label: 'Updates & Store Guard',
      sublabel: 'Pre-ban & cancel notice',
      icon: RefreshCw,
      badge: urgentUpdateCount > 0 ? 'ALERT' : 'OK',
      badgeColor: urgentUpdateCount > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      action: () => setActiveTab('updates'),
    },
    {
      id: 'sell-transfer' as NavTab,
      label: 'Sell / Seal Transfer',
      sublabel: 'Transfer to client email',
      icon: SendHorizontal,
      action: () => setActiveTab('sell-transfer'),
    },
    {
      id: 'buy' as NavTab,
      label: 'Buy Web & Apps',
      sublabel: 'Marketplace showcase',
      icon: ShoppingBag,
      action: () => setActiveTab('buy'),
    },
    {
      id: 'set-free' as NavTab,
      label: 'Set Free ($30)',
      sublabel: '0% revenue share buyout',
      icon: Unlock,
      badge: '30%',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      action: () => setActiveTab('set-free'),
    },
    {
      id: 'deposit' as NavTab,
      label: 'Deposit & Earnings',
      sublabel: 'PayPal / Bank payout',
      icon: Wallet,
      badge: `$${walletBalance.toFixed(0)}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      action: () => setActiveTab('deposit'),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 w-72 bg-slate-950/95 border-r border-slate-800/80 flex flex-col z-50 transition-transform duration-300 ease-in-out backdrop-blur-xl ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                  N
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-base text-white tracking-tight">NINO</h1>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  BUILDER
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Web &amp; Mobile App Synthesizer</p>
            </div>
          </div>
        </div>

        {/* Action: New Chat Button */}
        <div className="p-3">
          <button
            id="new-chat-btn"
            onClick={() => {
              onNewChat();
              setIsMobileOpen(false);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 border border-indigo-400/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Chat &amp; Project</span>
          </button>
        </div>

        {/* Current Active Project Quick Chip */}
        {currentProject && (
          <div className="mx-3 mb-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                {currentProject.target === 'web' ? <Globe className="w-3.5 h-3.5" /> : currentProject.target === 'mobile' ? <Smartphone className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{currentProject.name}</div>
                <div className="text-[10px] text-slate-400 capitalize">{currentProject.target} &middot; v{currentProject.version}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('build');
                setIsMobileOpen(false);
              }}
              title="Focus in Builder"
              className="text-indigo-400 hover:text-white p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Menu Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Menu Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  item.action();
                  setIsMobileOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold leading-snug">{item.label}</div>
                    <div className="text-[10px] text-slate-500 leading-none mt-0.5">{item.sublabel}</div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Revenue Cut Status & User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/50">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-2">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-400">Platform Revenue Rule</span>
              <span className="font-bold text-amber-400">30% Nino / 70% You</span>
            </div>
            <div className="text-[10px] text-slate-500 leading-tight">
              Unlock 100% earnings anytime with <strong className="text-indigo-400">Set Free ($30)</strong>.
            </div>
          </div>

          {onOpenTermsModal && (
            <div className="mb-2 text-center">
              <button
                id="sidebar-terms-privacy-btn"
                onClick={() => {
                  onOpenTermsModal();
                  setIsMobileOpen(false);
                }}
                className="text-[10px] text-slate-500 hover:text-indigo-400 underline transition-colors"
              >
                Terms of Use &amp; Privacy Policy
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white">
                N
              </div>
              <div className="text-[11px] text-slate-300 truncate max-w-[120px]">
                ninobitch@gmail.com
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold">● ONLINE</span>
          </div>
        </div>
      </aside>
    </>
  );
};
