import React, { useState } from 'react';
import { 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  PlaySquare, 
  Apple, 
  Globe, 
  Zap, 
  Clock, 
  Smartphone, 
  Layers 
} from 'lucide-react';
import { NinoProject } from '../types';

interface UpdateComplianceViewProps {
  projects: NinoProject[];
  onApplyAutoPatch: (projectId: string, patchNotes: string) => Promise<void>;
}

export const UpdateComplianceView: React.FC<UpdateComplianceViewProps> = ({
  projects,
  onApplyAutoPatch,
}) => {
  const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const handleApplyPatch = async (project: NinoProject) => {
    setUpdatingProjectId(project.id);
    try {
      await onApplyAutoPatch(
        project.id,
        'Applied Nino Auto-Patch: Target SDK 35 (Android 15), Swift 6 Privacy Manifest, and ServiceWorker Web cache update.'
      );
      setSuccessBanner(`✓ Successfully updated ${project.name} to v${incrementVersion(project.version)}. Store cancellation risk mitigated.`);
      setTimeout(() => setSuccessBanner(null), 6000);
    } finally {
      setUpdatingProjectId(null);
    }
  };

  const incrementVersion = (v: string) => {
    const parts = v.split('.');
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1]}.${parseInt(parts[2], 10) + 1}`;
    }
    return `${v}.1`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Store Ban &amp; Cancellation Radar
            </span>
            <span className="text-xs text-slate-400">
              Live Policy Compliance Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            App Store Updates &amp; Ban Protection
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Nino continuously scans Google Play, Apple App Store, and Web standards. Update your app in 1-click before deadlines or policy cancellations take effect.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-xl">
          <span>{successBanner}</span>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-400 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Global Regulatory Deadlines Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <PlaySquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Google Play Target SDK 35</div>
            <div className="text-[11px] text-slate-400">Mandatory by Nov 1, 2026</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Apple className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Apple Privacy Manifest</div>
            <div className="text-[11px] text-slate-400">Mandatory NSPrivacyAPI audit</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Web &amp; PWA Hot-Sync</div>
            <div className="text-[11px] text-slate-400">Instant Over-The-Air web deploy</div>
          </div>
        </div>
      </div>

      {/* Projects Compliance List */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-white">
          Active Projects Policy Status
        </h3>

        {projects.map((proj) => {
          const isCompliant = proj.storeCompliance?.status === 'compliant';
          const isUpdating = updatingProjectId === proj.id;

          return (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                    {proj.target === 'web' ? <Globe className="w-5 h-5" /> : proj.target === 'mobile' ? <Smartphone className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">{proj.name}</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Current Version: <strong className="text-indigo-300">v{proj.version}</strong> &middot; Target: {proj.target.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${
                    isCompliant
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  }`}>
                    {isCompliant ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    <span>{isCompliant ? 'Compliant & Protected' : 'Action Required'}</span>
                  </span>

                  <button
                    onClick={() => handleApplyPatch(proj)}
                    disabled={isUpdating}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                    <span>{isUpdating ? 'Applying Patch...' : '1-Click Update App'}</span>
                  </button>
                </div>
              </div>

              {/* Warnings / Policy Details */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Store Compliance Summary
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Target SDK &amp; Architecture</span>
                    <span className="font-bold text-slate-200">{proj.storeCompliance?.targetSdk || 'Android 15 (API 35)'}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Web / PWA Over-The-Air Update</span>
                    <span className="font-bold text-emerald-400">Automatic (No Store Re-Review Needed)</span>
                  </div>
                </div>

                {proj.updateHistory && proj.updateHistory.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-300">Last Applied Update: </span>
                    {proj.updateHistory[0].notes} ({new Date(proj.updateHistory[0].appliedAt).toLocaleDateString()})
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
