import React, { useState } from 'react';
import { 
  SendHorizontal, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  Layers, 
  Globe, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { NinoProject } from '../types';

interface SellTransferViewProps {
  projects: NinoProject[];
  onTransferProject: (projectId: string, buyerEmail: string, salePrice?: number) => Promise<void>;
}

export const SellTransferView: React.FC<SellTransferViewProps> = ({
  projects,
  onTransferProject,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [salePrice, setSalePrice] = useState<string>('');
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleExecuteTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !buyerEmail.trim() || isTransferring) return;

    setErrorMsg(null);
    setIsTransferring(true);

    try {
      await onTransferProject(
        selectedProjectId,
        buyerEmail.trim(),
        salePrice ? parseFloat(salePrice) : undefined
      );

      setTransferSuccessMsg(
        `✓ Full functioning ${selectedProject?.target.toUpperCase()} project "${selectedProject?.name}" was successfully transferred to ${buyerEmail.trim()}! Ownership and source code have been sealed and routed to their Nino account.`
      );
      setBuyerEmail('');
      setSalePrice('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Transfer failed. Ensure buyer has a valid Nino email.');
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <SendHorizontal className="w-3.5 h-3.5" />
              Nino Account-to-Account Seal
            </span>
            <span className="text-xs text-slate-400">
              Instant Ownership Transfer
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sell &amp; Seal Transfer to Clients
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Seamlessly transfer any fully functioning Web, Mobile App, or Both to client/buyer accounts inside Nino by simply entering their email address.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {transferSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-xl">
          <span>{transferSuccessMsg}</span>
          <button onClick={() => setTransferSuccessMsg(null)} className="text-emerald-400 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between shadow-xl">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Main Transfer Form Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleExecuteTransfer} className="space-y-4">
            {/* Step 1: Select Project */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Web or App to Seal &amp; Transfer
              </label>
              <select
                id="transfer-project-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white font-semibold focus:outline-none"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name} ({proj.target.toUpperCase()} &middot; {proj.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Buyer Email Input */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                2. Recipient / Client Nino Account Email
              </label>
              <input
                id="transfer-buyer-email"
                type="email"
                required
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="client.buyer@company.com"
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                The recipient will immediately receive full source code, live deployment controls, and project editing rights inside their Nino account.
              </p>
            </div>

            {/* Step 3: Optional Price / Invoice */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                3. Sale Price (USD) &mdash; Optional
              </label>
              <input
                id="transfer-sale-price"
                type="number"
                min="0"
                step="10"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="e.g. 500 (Leave blank for free handover)"
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Submit Transfer Button */}
            <div className="pt-2">
              <button
                id="execute-transfer-btn"
                type="submit"
                disabled={!buyerEmail.trim() || isTransferring}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01]"
              >
                {isTransferring ? (
                  <span>Sealing and Transferring Ownership...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Seal &amp; Transfer Full Project Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Project Summary Preview Card */}
        {selectedProject && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block mb-2">
                Transfer Asset Summary
              </span>

              <h4 className="font-extrabold text-white text-lg mb-1">{selectedProject.name}</h4>
              <p className="text-xs text-slate-400 mb-4">{selectedProject.description}</p>

              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Type:</span>
                  <span className="font-bold text-white uppercase">{selectedProject.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Components:</span>
                  <span className="font-bold text-white">{selectedProject.files?.length || 3} files</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Revenue Cut:</span>
                  <span className="font-bold text-amber-400">
                    {selectedProject.isFreeOfRevenueShare ? '0% (Set Free)' : '30% Platform Cut'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300">
              🔒 <strong>Nino Seal Guarantee:</strong> All database models, custom logos, intro animations, and deployment scripts are securely bundled upon transfer.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
