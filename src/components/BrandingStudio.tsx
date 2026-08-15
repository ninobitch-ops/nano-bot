import React, { useState, useRef } from 'react';
import { 
  Palette, 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  RefreshCw, 
  Plus, 
  Check, 
  Download, 
  Wand2, 
  Layers, 
  Sliders, 
  Eye, 
  Video, 
  Link as LinkIcon, 
  Trash2,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { NinoProject } from '../types';
import { IntroVideoPlayer } from './IntroVideoPlayer';

interface BrandingStudioProps {
  currentProject: NinoProject;
  onGenerateLogo: (customRequest?: string, style?: string, colors?: { primary: string; accent: string }) => Promise<void>;
  onApplyCustomLogo: (logoDataOrSvg: string, isUploaded?: boolean) => void;
  onGenerateIntroVideo: () => Promise<void>;
  onAddLogoToProject: () => void;
  onAddIntroVideoToProject: () => void;
  isGeneratingLogo: boolean;
  isGeneratingVideo: boolean;
}

export const BrandingStudio: React.FC<BrandingStudioProps> = ({
  currentProject,
  onGenerateLogo,
  onApplyCustomLogo,
  onGenerateIntroVideo,
  onAddLogoToProject,
  onAddIntroVideoToProject,
  isGeneratingLogo,
  isGeneratingVideo,
}) => {
  const [logoMode, setLogoMode] = useState<'generate' | 'upload'>('generate');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('Modern Minimalist Vector');
  const [primaryColor, setPrimaryColor] = useState<string>(currentProject.colorPalette?.primary || '#6366f1');
  const [accentColor, setAccentColor] = useState<string>(currentProject.colorPalette?.accent || '#ec4899');
  const [bgPreviewMode, setBgPreviewMode] = useState<'dark' | 'light' | 'transparent'>('dark');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [applySuccessToast, setApplySuccessToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Suggested style archetypes
  const logoStyles = [
    { label: 'Modern Minimalist Vector', desc: 'Clean geometric lines & Apple-like shapes' },
    { label: 'Cyberpunk Neon & Glow', desc: 'Vibrant neon outlines and futuristic accents' },
    { label: '3D Glossy Crest', desc: 'Rich gradients, depth, and rounded badges' },
    { label: 'Tech Hexagon & Circuit', desc: 'Fintech and AI high-tech node geometry' },
    { label: 'Luxury Gold Monogram', desc: 'Sophisticated golden serif and crown crest' },
    { label: 'Vintage Retro Badge', desc: 'Handcrafted emblem with badge frame' },
  ];

  // Quick Inspiration Prompts
  const logoPromptInspirations = [
    { title: '⚡ Cyber Lightning Shield', prompt: 'A glowing cyan and magenta cyberpunk lightning bolt embedded in a sleek protective shield.' },
    { title: '👑 Golden Crown Crest', prompt: 'An opulent minimalist golden crown with geometric diamond accents and dark obsidian backing.' },
    { title: '🚀 Minimalist Rocket Orbit', prompt: 'A streamlined aerodynamic rocket soaring in an elliptical planetary orbit gradient.' },
    { title: '💎 Holographic Prism', prompt: 'An interlocking 3D geometric prism refracting vibrant violet and emerald neon lights.' },
    { title: '🌿 Organic Zen Leaf', prompt: 'A smooth, modern botanical leaf and droplet emblem with emerald green gradient flow.' },
  ];

  const handleGenerateClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isGeneratingLogo) return;
    onGenerateLogo(customPrompt.trim() || undefined, selectedStyle, {
      primary: primaryColor,
      accent: accentColor,
    });
  };

  // Handle Drag & Drop / File Upload for Logos
  const handleFileUpload = (file: File) => {
    setUploadError(null);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload a valid image file (SVG, PNG, JPG, or WebP).');
      return;
    }

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgText = event.target?.result as string;
        if (svgText && svgText.includes('<svg')) {
          onApplyCustomLogo(svgText, false);
          showToast('✅ SVG Logo loaded and ready to apply!');
        } else {
          setUploadError('Could not parse SVG file contents.');
        }
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          onApplyCustomLogo(dataUrl, true);
          showToast('✅ Custom Logo image uploaded and ready to apply!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    onApplyCustomLogo(imageUrlInput.trim(), true);
    setImageUrlInput('');
    showToast('✅ Logo URL applied!');
  };

  const showToast = (msg: string) => {
    setApplySuccessToast(msg);
    setTimeout(() => setApplySuccessToast(null), 4000);
  };

  const handleDownloadLogoSvg = () => {
    if (!currentProject.branding?.logoSvg) return;
    const blob = new Blob([currentProject.branding.logoSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentProject.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📦 Downloaded SVG Logo vector file!');
  };

  const hasSvgLogo = Boolean(currentProject.branding?.logoSvg && currentProject.branding.logoSvg.includes('<svg'));
  const hasImageLogo = Boolean(currentProject.branding?.logoUrl || (currentProject.branding?.logoSvg && !currentProject.branding.logoSvg.includes('<svg')));
  const currentLogoUrl = currentProject.branding?.logoUrl || (hasImageLogo ? currentProject.branding?.logoSvg : null);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {applySuccessToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{applySuccessToast}</span>
          </div>
          <button onClick={() => setApplySuccessToast(null)} className="text-emerald-400 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Main Branding Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Logo Studio Controls (Tabs: Generate by Request vs Upload) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          {/* Top Bar Switcher */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Nino Logo &amp; Brand Studio</h3>
                <p className="text-[11px] text-slate-400">Generate by natural language request or upload custom assets</p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                id="logo-mode-generate-btn"
                onClick={() => setLogoMode('generate')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  logoMode === 'generate'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Ask AI Request</span>
              </button>

              <button
                id="logo-mode-upload-btn"
                onClick={() => setLogoMode('upload')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  logoMode === 'upload'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File/URL</span>
              </button>
            </div>
          </div>

          {/* TAB 1: GENERATE LOGO BY REQUEST */}
          {logoMode === 'generate' && (
            <form onSubmit={handleGenerateClick} className="space-y-4">
              {/* Custom Prompt Request Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  Your Custom Logo Request / Concept:
                </label>
                <textarea
                  id="custom-logo-prompt-input"
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={`e.g. Design a neon blue cyber shield with a golden lightning bolt for ${currentProject.name}, with clean glowing gradients...`}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 text-xs text-white placeholder-slate-500 focus:outline-none leading-relaxed transition-all resize-none shadow-inner"
                />
              </div>

              {/* Inspiration Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-semibold block">Quick Request Inspirations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {logoPromptInspirations.map((insp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCustomPrompt(insp.prompt)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800/90 text-slate-300 hover:text-white text-[11px] transition-colors"
                    >
                      {insp.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Aesthetic Style Selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Aesthetic Style:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {logoStyles.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedStyle(s.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedStyle === s.label
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <div className="text-xs font-bold text-white truncate">{s.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Controls */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Primary:</span>
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400">Accent:</span>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-7 h-7 rounded-lg bg-transparent cursor-pointer border border-slate-700"
                    />
                  </div>
                </div>

                <button
                  id="generate-logo-submit-btn"
                  type="submit"
                  disabled={isGeneratingLogo}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingLogo ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingLogo ? 'Synthesizing Logo...' : 'Generate by Request'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: UPLOAD LOGO FILE OR URL */}
          {logoMode === 'upload' && (
            <div className="space-y-4">
              {uploadError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-300">
                  {uploadError}
                </div>
              )}

              {/* Drag and Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950 hover:bg-slate-900/60 p-8 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-white">
                  Drag &amp; drop your logo here, or <span className="text-indigo-400 underline">Browse Files</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Supports SVG, PNG, JPG, or WebP up to 10MB (Transparent PNG or SVG recommended)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/svg+xml,image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {/* Paste Image URL Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  Or Paste Logo Image URL:
                </label>
                <form onSubmit={handleApplyUrl} className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="https://example.com/brand-logo.png"
                    className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!imageUrlInput.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-colors shrink-0"
                  >
                    Apply URL
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Logo Preview & Integration Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Live Brand Preview
                </h4>
              </div>

              {/* Canvas Background Color Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setBgPreviewMode('dark')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    bgPreviewMode === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setBgPreviewMode('light')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    bgPreviewMode === 'light' ? 'bg-white text-slate-950' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setBgPreviewMode('transparent')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    bgPreviewMode === 'transparent' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>

            {/* Display Canvas Box */}
            <div
              className={`p-8 rounded-2xl border flex flex-col items-center justify-center min-h-[220px] transition-all relative overflow-hidden ${
                bgPreviewMode === 'dark'
                  ? 'bg-slate-950 border-slate-800 text-white'
                  : bgPreviewMode === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] bg-slate-950 border-slate-800 text-white'
              }`}
            >
              {hasSvgLogo ? (
                <div
                  className="w-32 h-32 drop-shadow-2xl hover:scale-105 transition-transform flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: currentProject.branding!.logoSvg! }}
                />
              ) : currentLogoUrl ? (
                <img
                  src={currentLogoUrl}
                  alt={`${currentProject.name} Logo`}
                  className="w-32 h-32 object-contain rounded-2xl drop-shadow-2xl hover:scale-105 transition-transform"
                />
              ) : (
                <div className="text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span>No logo created yet. Generate one by prompt or upload a file.</span>
                </div>
              )}

              <div className="mt-4 text-center">
                <span className="text-xs font-extrabold block">{currentProject.name} Brand Icon</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {hasSvgLogo ? 'Scalable SVG Vector' : currentLogoUrl ? 'Custom Image Asset' : 'Ready to customize'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: 1-Click Apply to Project & Download */}
          <div className="space-y-2 pt-2">
            <button
              id="apply-logo-to-app-btn"
              onClick={onAddLogoToProject}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
            >
              <Plus className="w-4 h-4" />
              <span>Apply Logo to App Header, Favicon &amp; Splash</span>
            </button>

            {hasSvgLogo && (
              <button
                id="download-logo-svg-btn"
                onClick={handleDownloadLogoSvg}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG Vector Logo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Intro Video Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Project Intro Commercial Video</h3>
              <p className="text-[11px] text-slate-400">Animated multi-scene launch trailer with synthesized soundtrack</p>
            </div>
          </div>

          <button
            id="regenerate-intro-video-btn"
            onClick={() => onGenerateIntroVideo()}
            disabled={isGeneratingVideo}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-pink-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingVideo ? 'animate-spin' : ''}`} />
            <span>{isGeneratingVideo ? 'Synthesizing Trailer...' : 'Generate Commercial Video'}</span>
          </button>
        </div>

        {currentProject.branding?.introVideo ? (
          <IntroVideoPlayer
            introVideo={currentProject.branding.introVideo}
            projectName={currentProject.name}
            onAddToProject={onAddIntroVideoToProject}
            isEmbeddedInProject={true}
          />
        ) : (
          <div className="p-12 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            No commercial launch video generated yet. Click generate above.
          </div>
        )}
      </div>
    </div>
  );
};
