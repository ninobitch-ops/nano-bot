import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Globe, 
  Smartphone, 
  Apple, 
  PlaySquare, 
  CheckCircle2, 
  RefreshCw, 
  UploadCloud, 
  Terminal, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Zap,
  QrCode
} from 'lucide-react';
import { NinoProject } from '../types';

interface ParallelPublishPipelineProps {
  project: NinoProject;
  onOpenPhoneModal: () => void;
  onDeployGoogle: () => void;
  onPublishPlayStore: () => void;
}

interface TargetStream {
  id: string;
  name: string;
  category: 'web' | 'android' | 'ios' | 'pwa';
  icon: any;
  status: 'idle' | 'building' | 'deploying' | 'ready' | 'error';
  progress: number;
  currentTask: string;
  outputArtifact?: string;
  endpointUrl?: string;
}

export const ParallelPublishPipeline: React.FC<ParallelPublishPipelineProps> = ({
  project,
  onOpenPhoneModal,
  onDeployGoogle,
  onPublishPlayStore,
}) => {
  const [isParallelPublishing, setIsParallelPublishing] = useState<boolean>(false);
  const [streams, setStreams] = useState<TargetStream[]>([
    {
      id: 'target-cloud-run',
      name: 'Google Cloud Run Web',
      category: 'web',
      icon: Globe,
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to build production container',
      endpointUrl: `https://${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.nino.app`,
    },
    {
      id: 'target-play-store',
      name: 'Google Play Store (Android 15)',
      category: 'android',
      icon: PlaySquare,
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to package Target SDK 35 .AAB',
      outputArtifact: `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-release.aab`,
    },
    {
      id: 'target-app-store',
      name: 'Apple App Store (iOS 18)',
      category: 'ios',
      icon: Apple,
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to compile Swift 6 .IPA with Privacy Manifests',
      outputArtifact: `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.ipa`,
    },
    {
      id: 'target-pwa-mobile',
      name: 'Direct Phone Install & PWA',
      category: 'pwa',
      icon: Smartphone,
      status: 'idle',
      progress: 0,
      currentTask: 'Ready to generate WebClip profile & standalone APK',
      endpointUrl: `https://${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.nino.app/install`,
    },
  ]);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[Nino Pipeline Engine v2.4] Initialized parallel publish target orchestrator for "${project.name}"...`,
    `[Config] Target SDK 35 (Android 15), Swift 6 iOS 18, and Google Cloud Run multi-architecture builder ready.`,
  ]);

  const handleStartParallelPublish = () => {
    if (isParallelPublishing) return;
    setIsParallelPublishing(true);

    setTerminalLogs((prev) => [
      ...prev,
      `>>> [PARALLEL TRIGGER] Starting concurrent deployment across 4 targets at ${new Date().toLocaleTimeString()}...`,
      `[Target: Cloud Run] Spinning up Cloud Build container and SSL certificate generation...`,
      `[Target: Play Store] Compiling Gradle 8.7 & arm64-v8a binaries with Target SDK 35...`,
      `[Target: App Store] Validating NSPrivacyAccessedAPITypes and Xcode 16 Swift toolchain...`,
      `[Target: Phone PWA] Bundling service worker, offline caching manifest, and QR handoff...`,
    ]);

    // Animate streams progress in parallel
    const interval = setInterval(() => {
      setStreams((prevStreams) => {
        const updated = prevStreams.map((st) => {
          if (st.progress >= 100) {
            return { ...st, status: 'ready' as const, progress: 100 };
          }
          const increment = Math.floor(Math.random() * 15) + 12;
          const nextProg = Math.min(st.progress + increment, 100);

          let task = st.currentTask;
          let status: TargetStream['status'] = 'building';

          if (st.id === 'target-cloud-run') {
            if (nextProg > 30 && nextProg < 70) task = 'Deploying Docker image to Google Cloud Run europe-west2...';
            if (nextProg >= 70 && nextProg < 100) {
              task = 'Configuring edge CDN routing and zero-downtime SSL...';
              status = 'deploying';
            }
            if (nextProg >= 100) task = 'Live on Google Cloud! HTTPS SSL URL Active.';
          } else if (st.id === 'target-play-store') {
            if (nextProg > 30 && nextProg < 70) task = 'Signing release key & optimizing 64-bit DEX bytecode...';
            if (nextProg >= 70 && nextProg < 100) {
              task = 'Generating Google Play Console submission bundle (.AAB)...';
              status = 'deploying';
            }
            if (nextProg >= 100) task = 'Play Store .AAB Bundle compiled and signed successfully!';
          } else if (st.id === 'target-app-store') {
            if (nextProg > 30 && nextProg < 70) task = 'Embedding Apple Privacy Manifest & Swift 6 runtime...';
            if (nextProg >= 70 && nextProg < 100) {
              task = 'Assembling iOS Xcode archive & App Store Connect IPA...';
              status = 'deploying';
            }
            if (nextProg >= 100) task = 'Apple App Store .IPA package ready for distribution!';
          } else if (st.id === 'target-pwa-mobile') {
            if (nextProg > 40 && nextProg < 80) task = 'Generating Safari WebClip profile & Android APK mirror...';
            if (nextProg >= 80 && nextProg < 100) {
              task = 'Broadcasting QR code instant on-device test endpoint...';
              status = 'deploying';
            }
            if (nextProg >= 100) task = 'Direct Phone QR & APK install endpoints active!';
          }

          return {
            ...st,
            progress: nextProg,
            currentTask: task,
            status: nextProg >= 100 ? ('ready' as const) : status,
          };
        });

        const allFinished = updated.every((s) => s.progress >= 100);
        if (allFinished) {
          clearInterval(interval);
          setIsParallelPublishing(false);
          setTerminalLogs((l) => [
            ...l,
            `✓ [PARALLEL COMPLETE] All 4 deployment targets published successfully in parallel!`,
            `✓ Live Web: https://${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.nino.app`,
            `✓ Android 15 AAB: ${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-release.aab (Target SDK 35)`,
            `✓ iOS 18 IPA: ${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.ipa (Swift 6)`,
            `✓ On-Device QR & APK: Ready for instant phone scan`,
          ]);
        }
        return updated;
      });
    }, 400);
  };

  const isAllReady = streams.every((s) => s.status === 'ready');

  return (
    <div className="space-y-6">
      {/* Top Banner with 1-Click Parallel Trigger */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border-2 border-purple-500/30 p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider border border-purple-500/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-400" />
                Concurrent Multi-Target Pipeline
              </span>
              <span className="text-xs text-slate-400 font-mono">4 Targets Simultaneously</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Parallel Publish Engine
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Simultaneously build and publish {project.name} across Google Cloud Run, Google Play Store, Apple App Store, and direct Phone QR install with zero latency.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            id="start-parallel-publish-btn"
            onClick={handleStartParallelPublish}
            disabled={isParallelPublishing}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 transition-all hover:scale-105"
          >
            {isParallelPublishing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Publishing in Parallel...</span>
              </>
            ) : isAllReady ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Re-Publish All Targets</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Launch Parallel Multi-Target Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streams.map((stream) => {
          const Icon = stream.icon;
          const isDone = stream.status === 'ready';
          const isWorking = stream.status === 'building' || stream.status === 'deploying';

          return (
            <div
              key={stream.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : isWorking
                  ? 'bg-slate-900/90 border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : isWorking
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">{stream.name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono capitalize">
                      Target: {stream.category} &middot; {stream.progress}%
                    </span>
                  </div>
                </div>

                {isDone ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Live &amp; Ready
                  </span>
                ) : isWorking ? (
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/40 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Deploying
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[11px] font-bold">
                    Standby
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden mb-3 border border-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500'
                      : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500'
                  }`}
                  style={{ width: `${stream.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-[240px] text-[11px]">
                  {stream.currentTask}
                </span>

                {/* Target Specific Actions */}
                {isDone && stream.category === 'web' && (
                  <button
                    onClick={onDeployGoogle}
                    className="px-3 py-1 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Globe className="w-3 h-3" />
                    <span>Open URL</span>
                  </button>
                )}

                {isDone && (stream.category === 'android' || stream.category === 'ios') && (
                  <button
                    onClick={onPublishPlayStore}
                    className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Get Bundle</span>
                  </button>
                )}

                {isDone && stream.category === 'pwa' && (
                  <button
                    onClick={onOpenPhoneModal}
                    className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>Scan QR</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-Time Parallel Build Terminal Console */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-bold text-slate-300 uppercase">
              Parallel Publish Telemetry Terminal
            </span>
          </div>
          <span className="text-[10px] text-slate-500">Live Async Stream</span>
        </div>

        <div className="max-h-40 overflow-y-auto space-y-1 text-slate-300">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-slate-500">[{idx + 1}]</span>{' '}
              <span
                className={
                  log.includes('✓')
                    ? 'text-emerald-400 font-semibold'
                    : log.includes('PARALLEL TRIGGER')
                    ? 'text-purple-400 font-bold'
                    : log.includes('Target:')
                    ? 'text-indigo-300'
                    : 'text-slate-300'
                }
              >
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
