import React, { useState } from 'react';
import { 
  Unlock, 
  DollarSign, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  Layers, 
  Globe, 
  Smartphone,
  Download
} from 'lucide-react';
import { NinoProject } from '../types';

interface SetFreeViewProps {
  projects: NinoProject[];
  onSetProjectFree: (projectId: string) => Promise<void>;
}

export const SetFreeView: React.FC<SetFreeViewProps> = ({
  projects,
  onSetProjectFree,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleExecuteSetFree = async () => {
    if (!selectedProject || isProcessing) return;
    setIsProcessing(true);

    try {
      await onSetProjectFree(selectedProject.id);
      setSuccessBanner(
        `🎉 ${selectedProject.name} is officially SET FREE! The 30% platform cut is waived permanently. You now keep 100% of all earnings and hold full standalone ownership.`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Unlock className="w-3.5 h-3.5" />
              100% Creator Ownership License
            </span>
            <span className="text-xs text-slate-400">
              One-Time $30 Buyout
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Set Free &mdash; 0% Revenue Share
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Free any single project from Nino's 30% platform revenue share for a flat $30 fee. Keep 100% of all lifetime profits and export for independent hosting.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Explanations & Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Standard Mode */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <span className="text-[10px] font-mono uppercase bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                Standard Managed Mode
              </span>
              <h4 className="text-lg font-bold text-white">70% Creator / 30% Nino</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free builder access, automated container hosting, and store updates with 30% platform revenue sharing on monetization.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-1.5">✓ No upfront setup cost</li>
                <li className="flex items-center gap-1.5">✓ Integrated Nino Cloud hosting</li>
                <li className="flex items-center gap-1.5 text-amber-400">● 30% revenue share deducted</li>
              </ul>
            </div>

            {/* Set Free Mode */}
            <div className="bg-gradient-to-b from-amber-950/30 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                BEST VALUE
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Set Free Buyout ($30)
              </span>
              <h4 className="text-lg font-bold text-white">100% Creator Earnings</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Permanent buyout. 0% Nino platform fee forever. Full independent source release, unrestricted self-hosting, and autonomous billing.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-200 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-1.5 text-emerald-400 font-bold">✓ 100% of all future revenue is yours</li>
                <li className="flex items-center gap-1.5 text-emerald-400 font-bold">✓ Permanent zero commission status</li>
                <li className="flex items-center gap-1.5">✓ Full source code export &amp; ownership</li>
              </ul>
            </div>
          </div>

          {/* Important Rules Notice */}
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Platform Notice on Set Free: </strong>
              Once a project is Set Free, it is permanently released from Nino revenue sharing. You receive standalone source code for independent self-hosting and app store submission.
            </div>
          </div>
        </div>

        {/* Right Col: Action & Project Selector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-2">Select Project to Set Free</h4>

            <select
              id="set-free-project-select"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs text-white font-semibold focus:outline-none mb-4"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.isFreeOfRevenueShare ? '(Already Set Free)' : ''}
                </option>
              ))}
            </select>

            {selectedProject && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Status:</span>
                  <span className={`font-bold ${selectedProject.isFreeOfRevenueShare ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {selectedProject.isFreeOfRevenueShare ? '100% Free (0% Cut)' : 'Standard (30% Cut)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Earned:</span>
                  <span className="font-bold text-white">${selectedProject.totalRevenueEarned.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform Cut Paid:</span>
                  <span className="font-bold text-rose-400">${selectedProject.ninoPlatformCut.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div>
            {selectedProject?.isFreeOfRevenueShare ? (
              <div className="w-full py-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>This Project is Already Set Free!</span>
              </div>
            ) : (
              <button
                id="execute-set-free-btn"
                onClick={handleExecuteSetFree}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01]"
              >
                {isProcessing ? (
                  <span>Unlocking Permanent License...</span>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Pay $30 &amp; Set Project Free Forever</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
