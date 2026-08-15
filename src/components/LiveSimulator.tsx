import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Code2, 
  Eye, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  FileCode,
  Zap,
  Globe,
  QrCode,
  Video,
  Play
} from 'lucide-react';
import { NinoProject } from '../types';
import { IntroVideoPlayer } from './IntroVideoPlayer';

interface LiveSimulatorProps {
  project: NinoProject;
  onRefinePrompt?: (prompt: string) => void;
  onOpenPhoneModal?: () => void;
}

export const LiveSimulator: React.FC<LiveSimulatorProps> = ({
  project,
  onRefinePrompt,
  onOpenPhoneModal,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [viewTab, setViewTab] = useState<'preview' | 'code' | 'features'>('preview');
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const selectedFile = project.files?.[selectedFileIdx] || {
    path: 'src/App.tsx',
    code: '// No source code available',
    language: 'typescript',
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const hasLogo = Boolean(project.branding?.logoSvg || project.branding?.logoUrl);
  const hasIntroVideo = Boolean(project.branding?.introVideo);

  return (
    <div className="flex flex-col h-full bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Simulator Control Bar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            id="sim-mode-desktop"
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop Web</span>
          </button>

          <button
            id="sim-mode-mobile"
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Phone</span>
          </button>

          <button
            id="sim-mode-tablet"
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceMode === 'tablet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
        </div>

        {/* View Mode Tabs (Preview / Code / Architecture) & Direct Phone Download trigger */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            id="sim-view-preview"
            onClick={() => setViewTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewTab === 'preview'
                ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive App Preview</span>
          </button>

          <button
            id="sim-view-code"
            onClick={() => setViewTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewTab === 'code'
                ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Source Code ({project.files?.length || 1})</span>
          </button>

          <button
            id="sim-view-features"
            onClick={() => setViewTab('features')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewTab === 'features'
                ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Features ({project.features?.length || 0})</span>
          </button>

          {hasIntroVideo && (
            <button
              id="sim-watch-intro-video-btn"
              onClick={() => setIsVideoModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-pink-400" />
              <span>Watch Commercial</span>
            </button>
          )}

          {onOpenPhoneModal && (
            <button
              id="sim-open-phone-modal-btn"
              onClick={onOpenPhoneModal}
              className="ml-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Install to Phone</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulator Body */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/80 min-h-[440px]">
        {/* 1. Live Interactive App Preview */}
        {viewTab === 'preview' && (
          <div className="w-full flex justify-center items-center">
            {deviceMode === 'desktop' && (
              <div className="w-full max-w-4xl bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
                {/* Browser Mock Chrome Bar */}
                <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 mx-4 px-3 py-1 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-400 text-center truncate border border-slate-800/80 flex items-center justify-center gap-2">
                    <Globe className="w-3 h-3 text-indigo-400" />
                    <span>https://{project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.nino.app</span>
                  </div>
                </div>

                {/* Render Embedded App Preview HTML */}
                <div
                  className="w-full overflow-auto max-h-[600px]"
                  dangerouslySetInnerHTML={{ __html: project.previewHtml }}
                />
              </div>
            )}

            {deviceMode === 'mobile' && (
              <div className="relative w-[340px] sm:w-[370px] bg-slate-900 rounded-[40px] border-4 border-slate-800 shadow-2xl overflow-hidden p-2.5">
                {/* iPhone Notch & Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-3 border border-slate-800" />
                </div>

                {/* Mobile Viewport Screen */}
                <div className="w-full rounded-[30px] overflow-auto max-h-[620px] bg-slate-950 pt-5">
                  <div dangerouslySetInnerHTML={{ __html: project.previewHtml }} />
                </div>

                {/* Home Indicator Bar */}
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto my-1.5" />
              </div>
            )}

            {deviceMode === 'tablet' && (
              <div className="w-[560px] bg-slate-900 rounded-[28px] border-4 border-slate-800 shadow-2xl overflow-hidden p-3">
                <div className="w-full rounded-2xl overflow-auto max-h-[580px] bg-slate-950">
                  <div dangerouslySetInnerHTML={{ __html: project.previewHtml }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Source Code Inspector View */}
        {viewTab === 'code' && (
          <div className="w-full h-full flex flex-col md:flex-row gap-3">
            {/* File Tree List */}
            <div className="w-full md:w-56 bg-slate-950 rounded-xl border border-slate-800 p-2 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1">
                Project Files
              </div>
              {project.files?.map((file, fIdx) => (
                <button
                  key={fIdx}
                  onClick={() => setSelectedFileIdx(fIdx)}
                  className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-mono flex items-center gap-2 truncate transition-colors ${
                    selectedFileIdx === fIdx
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>

            {/* Code Viewer Panel */}
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 font-bold">
                  {selectedFile.path}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="flex-1 p-4 text-xs font-mono text-slate-300 overflow-auto whitespace-pre-wrap leading-relaxed">
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* 3. Features & Architecture List */}
        {viewTab === 'features' && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                Synthesized Application Capabilities
              </h4>
              <div className="space-y-2">
                {project.features?.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Full-Stack Architecture &amp; Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Intro Commercial Video Modal */}
      {isVideoModalOpen && project.branding?.introVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-sm text-white">{project.name} &mdash; Launch Commercial Video</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-4">
              <IntroVideoPlayer
                introVideo={project.branding.introVideo}
                projectName={project.name}
                isEmbeddedInProject={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
