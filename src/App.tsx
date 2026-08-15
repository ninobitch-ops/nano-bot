import React, { useState, useEffect } from 'react';
import { 
  Sidebar, 
  NavTab 
} from './components/Sidebar';
import { BuildingSection } from './components/BuildingSection';
import { ProjectsView } from './components/ProjectsView';
import { RecentChatsView } from './components/RecentChatsView';
import { UpdateComplianceView } from './components/UpdateComplianceView';
import { SellTransferView } from './components/SellTransferView';
import { BuyMarketplaceView } from './components/BuyMarketplaceView';
import { SetFreeView } from './components/SetFreeView';
import { DepositPayoutView } from './components/DepositPayoutView';
import { TermsAndPrivacyModal } from './components/TermsAndPrivacyModal';
import { 
  NinoProject, 
  MarketplaceListing, 
  RecentChatSession, 
  BuildTarget, 
  AppCategory, 
  PayoutTransaction 
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_MARKETPLACE, 
  INITIAL_RECENT_CHATS 
} from './data/mockData';
import { Menu, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('build');
  const [projects, setProjects] = useState<NinoProject[]>(() => {
    try {
      const saved = localStorage.getItem('nino_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>(() => {
    try {
      const saved = localStorage.getItem('nino_marketplace');
      return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE;
    } catch {
      return INITIAL_MARKETPLACE;
    }
  });
  const [recentChats, setRecentChats] = useState<RecentChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('nino_recent_chats');
      return saved ? JSON.parse(saved) : INITIAL_RECENT_CHATS;
    } catch {
      return INITIAL_RECENT_CHATS;
    }
  });

  const [currentProject, setCurrentProject] = useState<NinoProject | null>(() => {
    return projects[0] || null;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isGlobalTermsModalOpen, setIsGlobalTermsModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState<boolean>(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('nino_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to persist projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('nino_recent_chats', JSON.stringify(recentChats));
    } catch (e) {
      console.warn('Failed to persist chats:', e);
    }
  }, [recentChats]);

  // Total Wallet Balance across all projects
  const totalWalletBalance = projects.reduce((acc, p) => acc + p.walletBalance, 0);
  const unfinishedProjectsCount = projects.filter((p) => p.status !== 'ready').length;
  const urgentUpdatesCount = projects.filter((p) => p.storeCompliance?.status === 'action_required').length;

  // Handle generating a new project via Nino AI Server
  const handleGenerateProject = async (
    prompt: string,
    target: BuildTarget,
    category: AppCategory
  ) => {
    setIsGenerating(true);
    setGlobalError(null);
    setGenerationStep('Synthesizing application layout, reactive models, and UI components...');

    try {
      const res = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          target,
          category,
          projectName: prompt.slice(0, 30),
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Project synthesis failed');
      }

      const resData = await res.json();
      const newProj: NinoProject = resData.data;

      // Update state
      setProjects((prev) => [newProj, ...prev]);
      setCurrentProject(newProj);
      setActiveTab('build');

      // Record in 24-hour recent chat cache
      const newChat: RecentChatSession = {
        id: `chat-${Date.now()}`,
        projectId: newProj.id,
        title: newProj.name,
        target: newProj.target,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        messages: [
          {
            id: `msg-1-${Date.now()}`,
            sender: 'user',
            text: prompt,
            timestamp: Date.now() - 1000,
          },
          {
            id: `msg-2-${Date.now()}`,
            sender: 'nino',
            text: `Generated full-functioning ${newProj.target} project "${newProj.name}" with ${newProj.features.length} features, custom branding, and live interactive preview!`,
            timestamp: Date.now(),
          },
        ],
      };
      setRecentChats((prev) => [newChat, ...prev]);
    } catch (err: any) {
      console.error('Project generation error:', err);
      setGlobalError(err.message || 'Failed to generate project. Please retry with a refined prompt.');
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  // Handle refining active project
  const handleRefineProject = async (instruction: string) => {
    if (!currentProject) return;
    setIsRefining(true);
    setGlobalError(null);

    try {
      const res = await fetch('/api/refine-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: currentProject,
          instruction,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Refinement failed');
      }

      const resData = await res.json();
      const updatedProj: NinoProject = resData.data;

      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProj.id ? updatedProj : p))
      );
      setCurrentProject(updatedProj);
    } catch (err: any) {
      console.error('Refinement error:', err);
      setGlobalError(err.message || 'Failed to refine project code.');
    } finally {
      setIsRefining(false);
    }
  };

  // Generate Brand Logo SVG with custom prompt request & styles
  const handleGenerateLogo = async (
    customRequest?: string,
    style?: string,
    colors?: { primary: string; accent: string }
  ) => {
    if (!currentProject) return;
    setIsGeneratingLogo(true);
    try {
      const res = await fetch('/api/generate-brand-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: currentProject.name,
          category: currentProject.category,
          customRequest: customRequest || '',
          style: style || 'modern geometric',
          colors: colors || {
            primary: currentProject.colorPalette?.primary || '#6366f1',
            accent: currentProject.colorPalette?.accent || '#ec4899',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedBranding = {
          ...(currentProject.branding || {}),
          logoSvg: data.logoSvg,
          logoUrl: undefined,
        };
        const updatedProj = { ...currentProject, branding: updatedBranding };
        setCurrentProject(updatedProj);
        setProjects((prev) =>
          prev.map((p) => (p.id === updatedProj.id ? updatedProj : p))
        );
      }
    } catch (e) {
      console.warn('Logo generation error:', e);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  // Directly apply an uploaded Logo file (DataURL or SVG string) or Image URL
  const handleApplyCustomLogo = (logoDataOrSvg: string, isUploaded: boolean = true) => {
    if (!currentProject) return;
    const isSvgString = logoDataOrSvg.includes('<svg');
    const updatedBranding = {
      ...(currentProject.branding || {}),
      logoSvg: isSvgString ? logoDataOrSvg : undefined,
      logoUrl: !isSvgString ? logoDataOrSvg : undefined,
    };
    const updatedProj = { ...currentProject, branding: updatedBranding };
    setCurrentProject(updatedProj);
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProj.id ? updatedProj : p))
    );
  };

  // Generate Brand Intro Video Storyboard
  const handleGenerateIntroVideo = async () => {
    if (!currentProject) return;
    setIsGeneratingVideo(true);
    try {
      const res = await fetch('/api/generate-intro-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: currentProject.name,
          category: currentProject.category,
          target: currentProject.target,
          features: currentProject.features,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedBranding = {
          ...(currentProject.branding || {}),
          introVideo: data.introVideo,
        };
        const updatedProj = { ...currentProject, branding: updatedBranding };
        setCurrentProject(updatedProj);
        setProjects((prev) =>
          prev.map((p) => (p.id === updatedProj.id ? updatedProj : p))
        );
      }
    } catch (e) {
      console.warn('Video generation error:', e);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleAddLogoToProject = () => {
    if (!currentProject?.branding?.logoSvg && !currentProject?.branding?.logoUrl) return;
    handleRefineProject('Integrate the generated custom logo directly into the navigation header and favicon.');
  };

  const handleAddIntroVideoToProject = () => {
    if (!currentProject?.branding?.introVideo) return;
    handleRefineProject('Add animated commercial intro video splash modal when the application loads.');
  };

  // Auto Patch Project
  const handleApplyAutoPatch = async (projectId: string, patchNotes: string) => {
    const res = await fetch('/api/store-compliance-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        targetSdk: 35,
        appliedPatchNotes: patchNotes,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === projectId) {
            const vParts = p.version.split('.');
            const newV = vParts.length === 3 ? `${vParts[0]}.${vParts[1]}.${parseInt(vParts[2], 10) + 1}` : `${p.version}.1`;
            return {
              ...p,
              version: newV,
              storeCompliance: data.compliance,
              updateHistory: [
                {
                  version: newV,
                  notes: patchNotes,
                  appliedAt: Date.now(),
                },
                ...(p.updateHistory || []),
              ],
            };
          }
          return p;
        })
      );
    }
  };

  // Seal / Transfer project to other client email
  const handleTransferProject = async (
    projectId: string,
    buyerEmail: string,
    salePrice?: number
  ) => {
    const res = await fetch('/api/transfer-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        buyerEmail,
        salePrice,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Transfer failed');
    }

    const data = await res.json();
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(projects.find((p) => p.id !== projectId) || null);
    }
  };

  // Set Free ($30 Buyout)
  const handleSetProjectFree = async (projectId: string) => {
    const res = await fetch('/api/set-free-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to Set Free');
    }

    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, isFreeOfRevenueShare: true } : p
      )
    );
    if (currentProject?.id === projectId) {
      setCurrentProject({ ...currentProject, isFreeOfRevenueShare: true });
    }
  };

  // Payout / Deposit Execution
  const handleExecuteDepositPayout = async (
    projectId: string,
    amount: number,
    method: 'paypal' | 'bank_transfer',
    accountDetails: string
  ): Promise<PayoutTransaction> => {
    const res = await fetch('/api/deposit-payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        amount,
        method,
        accountDetails,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Payout request failed');
    }

    const data = await res.json();
    const tx: PayoutTransaction = data.transaction;

    // Deduct from local wallet
    setProjects((prev) =>
      prev.map((p) => {
        if (projectId === 'all' || p.id === projectId) {
          return {
            ...p,
            walletBalance: Math.max(0, p.walletBalance - amount),
          };
        }
        return p;
      })
    );

    return tx;
  };

  // Buy Marketplace Listing
  const handleBuyListing = (listing: MarketplaceListing) => {
    const convertedProj: NinoProject = {
      id: `proj-bought-${Date.now()}`,
      name: listing.title,
      tagline: 'Purchased verified Nino codebase',
      description: listing.description,
      target: listing.target,
      category: listing.category as AppCategory,
      prompt: `Purchased template from marketplace: ${listing.title}`,
      version: '1.0.0',
      createdAt: Date.now(),
      lastEditedAt: Date.now(),
      status: 'ready',
      features: listing.features,
      techStack: listing.techStack,
      colorPalette: {
        primary: '#6366f1',
        secondary: '#a855f7',
        background: '#020617',
        accent: '#10b981',
      },
      isFreeOfRevenueShare: false,
      totalRevenueEarned: 0,
      creatorEarnings: 0,
      ninoPlatformCut: 0,
      walletBalance: 0,
      storeCompliance: {
        overallScore: 98,
        status: 'compliant',
        targetSdk: 'Android 15 (API 35)',
        playStoreDeadline: '2026-11-01',
        appStoreDeadline: '2026-12-01',
        warnings: [],
        lastUpdated: new Date().toISOString(),
      },
      updateHistory: [],
      isListedForSale: false,
      ownerEmail: 'ninobitch@gmail.com',
      originalCreatorEmail: listing.sellerEmail,
      transferHistory: [
        {
          fromEmail: listing.sellerEmail,
          toEmail: 'ninobitch@gmail.com',
          date: Date.now(),
          price: listing.priceUsd,
        }
      ],
      previewHtml: `
        <div class="p-8 text-center bg-slate-950 text-white min-h-[360px] flex flex-col items-center justify-center">
          <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
            <span class="font-extrabold text-2xl">✓</span>
          </div>
          <h2 class="text-2xl font-black text-white">${listing.title}</h2>
          <p class="text-xs text-slate-400 mt-2 max-w-md">${listing.description}</p>
          <div class="mt-6 flex flex-wrap gap-2 justify-center">
            ${listing.features.map(f => `<span class="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">${f}</span>`).join('')}
          </div>
        </div>
      `,
      files: [
        {
          path: 'src/App.tsx',
          description: 'Primary UI View and Controller',
          language: 'typescript',
          code: `// ${listing.title} Purchased Codebase\nimport React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-slate-950 text-white p-8">\n      <h1 className="text-3xl font-bold">${listing.title}</h1>\n      <p className="text-slate-400 mt-2">${listing.description}</p>\n    </div>\n  );\n}`,
        }
      ],
      branding: {
        logoSvg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#10b981"/><circle cx="50" cy="50" r="30" fill="#0f172a"/><path d="M40 50 L48 58 L62 42" stroke="#10b981" stroke-width="6" fill="none" stroke-linecap="round"/></svg>`,
      },
    };

    setProjects([convertedProj, ...projects]);
    setCurrentProject(convertedProj);
    setActiveTab('build');
  };

  const handleSelectProjectFromList = (proj: NinoProject) => {
    setCurrentProject(proj);
    setActiveTab('build');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (currentProject?.id === id) {
      setCurrentProject(projects.find((p) => p.id !== id) || null);
    }
  };

  const handleOpenRecentChat = (session: RecentChatSession) => {
    const proj = projects.find((p) => p.id === session.projectId);
    if (proj) {
      setCurrentProject(proj);
    }
    setActiveTab('build');
  };

  const handleDeleteRecentChat = (id: string) => {
    setRecentChats(recentChats.filter((c) => c.id !== id));
  };

  const handleNewChat = () => {
    setActiveTab('build');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Left Vertical Sidebar Menu */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewChat={handleNewChat}
        unfinishedCount={unfinishedProjectsCount}
        recentChatCount={recentChats.length}
        urgentUpdateCount={urgentUpdatesCount}
        walletBalance={totalWalletBalance}
        currentProject={currentProject}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        onOpenTermsModal={() => setIsGlobalTermsModalOpen(true)}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Mobile Header Bar */}
        <header className="lg:hidden p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              id="mobile-sidebar-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg text-white tracking-tight">NINO</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                BUILDER
              </span>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-emerald-400">
            ${totalWalletBalance.toFixed(0)}
          </div>
        </header>

        {/* Global Alert / Error Toast */}
        {globalError && (
          <div className="max-w-4xl mx-auto mt-4 px-4 w-full">
            <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl text-xs flex items-center justify-between">
              <span>{globalError}</span>
              <button
                onClick={() => setGlobalError(null)}
                className="text-rose-400 hover:text-white ml-3 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* View Routing */}
        <main className="flex-1 overflow-y-auto pb-12">
          {/* 1. Prompt Builder Studio */}
          {activeTab === 'build' && (
            <BuildingSection
              currentProject={currentProject}
              onGenerateProject={handleGenerateProject}
              onRefineProject={handleRefineProject}
              onGenerateLogo={handleGenerateLogo}
              onApplyCustomLogo={handleApplyCustomLogo}
              onGenerateIntroVideo={handleGenerateIntroVideo}
              onAddLogoToProject={handleAddLogoToProject}
              onAddIntroVideoToProject={handleAddIntroVideoToProject}
              isGenerating={isGenerating}
              isRefining={isRefining}
              isGeneratingLogo={isGeneratingLogo}
              isGeneratingVideo={isGeneratingVideo}
              generationStep={generationStep}
            />
          )}

          {/* 2. Projects & Unfinished View */}
          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onSelectProject={handleSelectProjectFromList}
              onDeleteProject={handleDeleteProject}
              onNewProject={handleNewChat}
            />
          )}

          {/* 3. Recent 24-Hour Chats */}
          {activeTab === 'recent-chats' && (
            <RecentChatsView
              sessions={recentChats}
              onOpenChat={handleOpenRecentChat}
              onDeleteChat={handleDeleteRecentChat}
              onNewChat={handleNewChat}
            />
          )}

          {/* 4. Updates & Store Policy Pre-Ban Guard */}
          {activeTab === 'updates' && (
            <UpdateComplianceView
              projects={projects}
              onApplyAutoPatch={handleApplyAutoPatch}
            />
          )}

          {/* 5. Sell / Seal Transfer to Email */}
          {activeTab === 'sell-transfer' && (
            <SellTransferView
              projects={projects}
              onTransferProject={handleTransferProject}
            />
          )}

          {/* 6. Buy Web & Apps Marketplace */}
          {activeTab === 'buy' && (
            <BuyMarketplaceView
              listings={marketplaceListings}
              onBuyListing={handleBuyListing}
            />
          )}

          {/* 7. Set Free ($30 Buyout) */}
          {activeTab === 'set-free' && (
            <SetFreeView
              projects={projects}
              onSetProjectFree={handleSetProjectFree}
            />
          )}

          {/* 8. Deposit & Earnings Manager */}
          {activeTab === 'deposit' && (
            <DepositPayoutView
              projects={projects}
              totalBalance={totalWalletBalance}
              onExecuteDepositPayout={handleExecuteDepositPayout}
            />
          )}
        </main>
      </div>

      {/* Global Terms of Use & Privacy Policy Modal */}
      <TermsAndPrivacyModal
        isOpen={isGlobalTermsModalOpen}
        onClose={() => setIsGlobalTermsModalOpen(false)}
      />
    </div>
  );
}
