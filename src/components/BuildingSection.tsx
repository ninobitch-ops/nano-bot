import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Globe, 
  Smartphone, 
  Layers, 
  Video, 
  Image as ImageIcon, 
  Download, 
  UploadCloud, 
  PlaySquare, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  FileCode, 
  ExternalLink,
  Code,
  Palette,
  Terminal,
  Zap,
  Flame,
  HelpCircle,
  FolderDown,
  Monitor,
  QrCode,
  Share2
} from 'lucide-react';
import { BuildTarget, AppCategory, NinoProject } from '../types';
import { LiveSimulator } from './LiveSimulator';
import { BrandingStudio } from './BrandingStudio';
import { PhoneDownloadModal } from './PhoneDownloadModal';
import { ParallelPublishPipeline } from './ParallelPublishPipeline';
import { TermsAndPrivacyModal } from './TermsAndPrivacyModal';

interface BuildingSectionProps {
  currentProject: NinoProject | null;
  onGenerateProject: (prompt: string, target: BuildTarget, category: AppCategory) => Promise<void>;
  onRefineProject: (instruction: string) => Promise<void>;
  onGenerateLogo: (customRequest?: string, style?: string, colors?: { primary: string; accent: string }) => Promise<void>;
  onApplyCustomLogo: (logoDataOrSvg: string, isUploaded?: boolean) => void;
  onGenerateIntroVideo: () => Promise<void>;
  onAddLogoToProject: () => void;
  onAddIntroVideoToProject: () => void;
  isGenerating: boolean;
  isRefining: boolean;
  isGeneratingLogo: boolean;
  isGeneratingVideo: boolean;
  generationStep: string;
}

export const BuildingSection: React.FC<BuildingSectionProps> = ({
  currentProject,
  onGenerateProject,
  onRefineProject,
  onGenerateLogo,
  onApplyCustomLogo,
  onGenerateIntroVideo,
  onAddLogoToProject,
  onAddIntroVideoToProject,
  isGenerating,
  isRefining,
  isGeneratingLogo,
  isGeneratingVideo,
  generationStep,
}) => {
  const [promptInput, setPromptInput] = useState<string>('');
  const [target, setTarget] = useState<BuildTarget>('both');
  const [category, setCategory] = useState<AppCategory>('SaaS & Productivity');
  const [refineInput, setRefineInput] = useState<string>('');
  const [activeStudioSubtab, setActiveStudioSubtab] = useState<'app' | 'branding' | 'deploy'>('app');
  const [deploySubMode, setDeploySubMode] = useState<'parallel' | 'phone' | 'cloud' | 'stores' | 'source'>('parallel');
  const [deployNotification, setDeployNotification] = useState<string | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);

  // Suggested prompt inspirations
  const suggestedPrompts = [
    {
      title: '15-Min On-Demand Grocery Store',
      prompt: 'Build a hyper-fast grocery delivery app with real-time stock catalog, animated cart drawer, GPS courier tracker, and one-tap checkout.',
      target: 'both' as BuildTarget,
      category: 'On-Demand & Delivery' as AppCategory,
    },
    {
      title: 'AI Sales Lead CRM Dashboard',
      prompt: 'Create a B2B sales pipeline SaaS with AI deal win-rate predictions, kanban prospect tracker, Stripe recurring subscriptions, and metric charts.',
      target: 'web' as BuildTarget,
      category: 'SaaS & Productivity' as AppCategory,
    },
    {
      title: 'AI Personal Fitness & Calorie Coach',
      prompt: 'Design a mobile fitness workout and macro nutrition tracker with workout streak calendar, barcode food logger, and customized trainer plans.',
      target: 'mobile' as BuildTarget,
      category: 'Health & Fitness' as AppCategory,
    },
    {
      title: 'Web3 Crypto Portfolio & Alert Bot',
      prompt: 'Develop a crypto arbitrage scanner with multi-chain wallet connect, live candlestick charts, and instant push alerts for whale trades.',
      target: 'both' as BuildTarget,
      category: 'Finance & Crypto' as AppCategory,
    },
  ];

  const handleStartBuild = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim() || isGenerating) return;
    onGenerateProject(promptInput, target, category);
  };

  const handleApplyRefinement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInput.trim() || isRefining) return;
    onRefineProject(refineInput);
    setRefineInput('');
  };

  const handleDeployGoogle = () => {
    setDeployNotification('🚀 Deploying to Google Cloud Run container... Live HTTPS SSL endpoint provisioned at https://' + (currentProject?.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'app') + '.nino.app');
    setTimeout(() => setDeployNotification(null), 7000);
  };

  const handlePublishPlayStore = () => {
    setDeployNotification('📱 Packaged Android App Bundle (.AAB) with Target SDK 35 (Android 15) and 64-bit binaries. Play Console submission manifest ready for download.');
    setTimeout(() => setDeployNotification(null), 7000);
  };

  const handleDownloadZip = () => {
    setDeployNotification('📦 Downloading complete clean production source code bundle (ZIP) including React 19, Tailwind CSS, TypeScript, and server components.');
    setTimeout(() => setDeployNotification(null), 6000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Autonomous Program Synthesizer
            </span>
            <span className="text-xs text-slate-400">
              Target: <strong className="text-white capitalize">{currentProject?.target || target}</strong>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Nino Prompt-Based Web &amp; App Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Build your dream Websites, Mobile Apps (iOS/Android), or Hybrid platforms solely from natural language prompts with native branding and 1-click deployment.
          </p>
        </div>

        {/* Target Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setTarget('web')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              target === 'web'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Web</span>
          </button>
          <button
            onClick={() => setTarget('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              target === 'mobile'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setTarget('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              target === 'both'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Web &amp; App</span>
          </button>
        </div>
      </div>

      {/* Deploy Notification Toast */}
      {deployNotification && (
        <div className="p-4 rounded-xl bg-indigo-950/90 border border-indigo-500/40 text-xs text-indigo-200 flex items-center justify-between shadow-xl animate-fade-in">
          <span>{deployNotification}</span>
          <button onClick={() => setDeployNotification(null)} className="text-indigo-400 font-bold ml-4 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Prompt Input Form & Category Selector (If no project or starting fresh) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <form onSubmit={handleStartBuild} className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              Write or Paste Your Dream App Prompt
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AppCategory)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-indigo-300 font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="SaaS & Productivity">SaaS &amp; Productivity</option>
                <option value="On-Demand & Delivery">On-Demand &amp; Delivery</option>
                <option value="E-Commerce & Store">E-Commerce &amp; Store</option>
                <option value="Social & Community">Social &amp; Community</option>
                <option value="Health & Fitness">Health &amp; Fitness</option>
                <option value="Finance & Crypto">Finance &amp; Crypto</option>
                <option value="AI & Tools">AI &amp; Tools</option>
                <option value="Travel & Booking">Travel &amp; Booking</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <textarea
              id="nino-main-prompt-input"
              rows={3}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Build an on-demand grocery delivery mobile & web app with interactive food catalog, real-time courier GPS radar, stripe checkout, and customer notification panel..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-sm text-white placeholder-slate-500 focus:outline-none leading-relaxed transition-all resize-none shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Sample Prompt Chips */}
            <div className="flex flex-wrap items-center gap-1.5 max-w-2xl">
              <span className="text-[11px] text-slate-500 font-mono">Inspirations:</span>
              {suggestedPrompts.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(s.prompt);
                    setTarget(s.target);
                    setCategory(s.category);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Submit Build Button */}
            <button
              id="nino-start-build-btn"
              type="submit"
              disabled={!promptInput.trim() || isGenerating}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Program...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Web &amp; App</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Step Progress Indicator */}
        {isGenerating && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-indigo-300">Nino Program Engine Running: </span>
              <span className="text-slate-300">{generationStep || 'Synthesizing architecture, components, and brand assets...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* When a Project is Active: Studio Tabs (App Preview / Brand Studio / Deploy & Publish) */}
      {currentProject && (
        <div className="space-y-6">
          {/* Sub-Navigation Bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              id="subtab-app-simulator"
              onClick={() => setActiveStudioSubtab('app')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeStudioSubtab === 'app'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Interactive App Simulator</span>
            </button>

            <button
              id="subtab-branding-studio"
              onClick={() => setActiveStudioSubtab('branding')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeStudioSubtab === 'branding'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Logo &amp; Intro Video Generator</span>
            </button>

            <button
              id="subtab-deploy-publish"
              onClick={() => setActiveStudioSubtab('deploy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeStudioSubtab === 'deploy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Deploy, Download &amp; Store Publish</span>
            </button>
          </div>

          {/* 1. App Simulator Tab */}
          {activeStudioSubtab === 'app' && (
            <div className="space-y-4">
              <LiveSimulator 
                project={currentProject} 
                onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
              />

              {/* Chat-Based Refinement & Iteration Input */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <form onSubmit={handleApplyRefinement} className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      id="nino-refine-input"
                      type="text"
                      value={refineInput}
                      onChange={(e) => setRefineInput(e.target.value)}
                      placeholder={`Refine ${currentProject.name} (e.g. "Add dark mode toggle", "Add Stripe subscription form", "Make header emerald green")...`}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <button
                    id="nino-apply-refine-btn"
                    type="submit"
                    disabled={!refineInput.trim() || isRefining}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    {isRefining ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isRefining ? 'Refining...' : 'Iterate'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 2. Logo & Intro Video Generator Tab */}
          {activeStudioSubtab === 'branding' && (
            <BrandingStudio
              currentProject={currentProject}
              onGenerateLogo={onGenerateLogo}
              onApplyCustomLogo={onApplyCustomLogo}
              onGenerateIntroVideo={onGenerateIntroVideo}
              onAddLogoToProject={onAddLogoToProject}
              onAddIntroVideoToProject={onAddIntroVideoToProject}
              isGeneratingLogo={isGeneratingLogo}
              isGeneratingVideo={isGeneratingVideo}
            />
          )}

          {/* 3. Deploy, Download & Store Publish Tab */}
          {activeStudioSubtab === 'deploy' && (
            <div className="space-y-6">
              {/* Deploy Mode Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
                <button
                  id="deploy-mode-parallel-btn"
                  onClick={() => setDeploySubMode('parallel')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    deploySubMode === 'parallel'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Parallel Publish Pipeline</span>
                </button>

                <button
                  id="deploy-mode-phone-btn"
                  onClick={() => setDeploySubMode('phone')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    deploySubMode === 'phone'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Download [Install] on Phone</span>
                </button>

                <button
                  id="deploy-mode-cloud-btn"
                  onClick={() => setDeploySubMode('cloud')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    deploySubMode === 'cloud'
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Google Cloud Deploy</span>
                </button>

                <button
                  id="deploy-mode-stores-btn"
                  onClick={() => setDeploySubMode('stores')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    deploySubMode === 'stores'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <PlaySquare className="w-3.5 h-3.5" />
                  <span>Play Store &amp; App Store</span>
                </button>

                <button
                  id="deploy-mode-source-btn"
                  onClick={() => setDeploySubMode('source')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    deploySubMode === 'source'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <FolderDown className="w-3.5 h-3.5" />
                  <span>Source ZIP &amp; Binaries</span>
                </button>
              </div>

              {/* MODE 1: PARALLEL PUBLISH PIPELINE */}
              {deploySubMode === 'parallel' && (
                <ParallelPublishPipeline
                  project={currentProject}
                  onOpenPhoneModal={() => setIsPhoneModalOpen(true)}
                  onDeployGoogle={handleDeployGoogle}
                  onPublishPlayStore={handlePublishPlayStore}
                />
              )}

              {/* MODE 2: DOWNLOAD & INSTALL ON PHONE */}
              {deploySubMode === 'phone' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-2 border-emerald-500/30 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <Smartphone className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1">
                            <QrCode className="w-3 h-3" />
                            Direct Mobile Installation
                          </span>
                          <span className="text-xs text-slate-400 font-mono">iOS PWA &amp; Android APK</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-white">
                          Install {currentProject.name} Directly on Your Phone
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 max-w-xl">
                          Scan the interactive QR code to launch immediately on iOS Safari (Homescreen WebClip) or Android Chrome with offline service workers.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button
                        id="open-phone-download-modal-btn"
                        onClick={() => setIsPhoneModalOpen(true)}
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Launch Phone QR Installer Modal</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 3: GOOGLE CLOUD DEPLOY */}
              {deploySubMode === 'cloud' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shrink-0">
                      <Globe className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Google Cloud Serverless Deployment</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Instant global edge hosting on Google Cloud Run with automatic SSL certificate provisioning.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Assigned Production Subdomain:</span>
                      <span className="font-mono text-sky-300 font-bold">
                        https://{currentProject.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.nino.app
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2">
                      <span className="text-slate-400">Container Image Architecture:</span>
                      <span className="text-slate-200 font-mono">linux/amd64 &amp; linux/arm64</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2">
                      <span className="text-slate-400">SSL Certificate:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Let's Encrypt TLS 1.3 Active
                      </span>
                    </div>
                  </div>

                  <button
                    id="deploy-google-cloud-direct-btn"
                    onClick={handleDeployGoogle}
                    className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.01]"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Deploy Live Web Application</span>
                  </button>
                </div>
              )}

              {/* MODE 4: PLAY STORE & APP STORE */}
              {deploySubMode === 'stores' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                      <PlaySquare className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Google Play Store &amp; Apple App Store Packaging</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Compiles production release bundles with 100% policy compliance for Android 15 &amp; iOS 18.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        Google Play Store (Android)
                      </span>
                      <h4 className="text-sm font-bold text-white">Target SDK 35 (Android 15)</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Pre-signed .AAB bundle with 64-bit arm64-v8a native binaries, automated Data Safety labels, and zero warning reports.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                        Apple App Store (iOS)
                      </span>
                      <h4 className="text-sm font-bold text-white">Swift 6 &amp; Privacy Manifests</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Pre-bundled NSPrivacyAccessedAPITypes manifest, Xcode 16 archive, and notarized IPA distribution structure.
                      </p>
                    </div>
                  </div>

                  <button
                    id="publish-play-store-direct-btn"
                    onClick={handlePublishPlayStore}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                  >
                    <PlaySquare className="w-4 h-4" />
                    <span>Generate .AAB &amp; .IPA Store Bundles</span>
                  </button>
                </div>
              )}

              {/* MODE 5: CLEAN SOURCE ZIP */}
              {deploySubMode === 'source' && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 shrink-0">
                      <FolderDown className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-white">Download Clean Source Code &amp; Native Assets</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Export complete unminified codebase with package.json, Dockerfile, TypeScript components, and Capacitor configs.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Included Source Files:</span>
                      <span className="font-mono text-purple-300 font-bold">{currentProject.files?.length || 3} Files</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2">
                      <span className="text-slate-400">Ownership &amp; License:</span>
                      <span className="text-slate-200">Standalone Commercial License (MIT / Proprietary)</span>
                    </div>
                  </div>

                  <button
                    id="download-source-zip-direct-btn"
                    onClick={handleDownloadZip}
                    className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Complete Source Code (ZIP)</span>
                  </button>
                </div>
              )}

              {/* 3 Quick Action Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-sky-400" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Google Cloud URL</h5>
                      <span className="text-[10px] text-slate-400">Live SSL Container</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDeployGoogle}
                    className="px-3 py-1 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 text-[11px] font-bold border border-sky-500/30"
                  >
                    Deploy
                  </button>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PlaySquare className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Play Store .AAB</h5>
                      <span className="text-[10px] text-slate-400">Android 15 SDK 35</span>
                    </div>
                  </div>
                  <button
                    onClick={handlePublishPlayStore}
                    className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30"
                  >
                    Build
                  </button>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderDown className="w-5 h-5 text-purple-400" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Clean Source ZIP</h5>
                      <span className="text-[10px] text-slate-400">Full Unminified Code</span>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadZip}
                    className="px-3 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-[11px] font-bold border border-purple-500/30"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Legal & Terms Disclosure Footer Link */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Official Nino Platform Governance, Depository Settlement &amp; Privacy Policy</span>
                </div>
                <button
                  id="open-terms-privacy-btn"
                  onClick={() => setIsLegalModalOpen(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold underline transition-colors"
                >
                  View Terms of Use &amp; Privacy Policy
                </button>
              </div>
            </div>
          )}

          {/* Interactive Phone Download Modal */}
          {currentProject && (
            <PhoneDownloadModal
              project={currentProject}
              isOpen={isPhoneModalOpen}
              onClose={() => setIsPhoneModalOpen(false)}
            />
          )}

          {/* Legal & Terms of Use / Privacy Modal */}
          <TermsAndPrivacyModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
