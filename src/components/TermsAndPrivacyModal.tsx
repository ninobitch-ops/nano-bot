import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  X, 
  Scale, 
  Sparkles, 
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface TermsAndPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAndPrivacyModal: React.FC<TermsAndPrivacyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeLegalTab, setActiveLegalTab] = useState<'terms' | 'privacy' | 'financial'>('terms');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Terms of Use &amp; Privacy Policy</h3>
              <p className="text-xs text-slate-400">Legal Agreement &amp; Financial Settlement Disclosures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveLegalTab('terms')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLegalTab === 'terms'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Use</span>
          </button>

          <button
            onClick={() => setActiveLegalTab('privacy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLegalTab === 'privacy'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveLegalTab('financial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeLegalTab === 'financial'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Financial Settlement &amp; Banking</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* Section 1: Financial Settlement & Depository Terms */}
          {activeLegalTab === 'financial' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>Designated Financial Settlement Depository</span>
                </div>
                <p className="text-xs text-slate-300">
                  In accordance with platform fiscal governance and monetary processing regulations, all platform revenue collections, Set-Free ($30) buyout fees, marketplace application transactions, escrow holdings, and creator royalty settlements are processed through our primary commercial clearing account:
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-mono">Bank Name:</span>
                    <strong className="text-white font-bold">Commercial Bank of Ethiopia (CBE)</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 font-mono">Settlement Account Number:</span>
                    <strong className="text-emerald-400 font-mono text-sm tracking-wider font-bold">1000602281187</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-mono">Authorized Purpose:</span>
                    <span className="text-slate-200">Platform Revenue Settlement &amp; Buyout Clearance</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">1. Revenue Sharing &amp; Clearing Mechanism</h4>
                <p>
                  In Standard Managed Mode, the platform operates on a 70% Creator / 30% Platform distribution model. Gross payments collected across web endpoints and app store integrations are cleared into the primary platform settlement account (Commercial Bank of Ethiopia &ndash; Account: 1000602281187) where automated split calculations are performed before creator balance allocations.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">2. Set Free ($30) Buyout Settlement</h4>
                <p>
                  Execution of the Set Free license releases the designated project from the 30% revenue sharing obligation in perpetuity. The one-time $30 buyout consideration is settled directly into the designated Commercial Bank of Ethiopia depository account (1000602281187). Upon ledger verification, the project is marked as 0% revenue share with full copyright transfer.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">3. Payout Disbursements &amp; Reconciliation</h4>
                <p>
                  Creator withdrawable balances can be remitted via automated PayPal transfers or international bank wire transfers. All accounting records, transactional ledgers, and tax compliance summaries are maintained with double-entry cryptographic reconciliation.
                </p>
              </div>
            </div>
          )}

          {/* Section 2: Terms of Use */}
          {activeLegalTab === 'terms' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">1. Acceptance of Terms</h4>
                <p>
                  By utilizing the Nino Autonomous Web &amp; App Studio, you agree to be bound by these Terms of Use. Nino enables developers, creators, and businesses to synthesize, iterate, simulate, brand, package, and deploy software applications across Web, Android, and iOS target platforms.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">2. Software Synthesis &amp; Ownership</h4>
                <p>
                  All source code, UI designs, SVG logos, and introductory commercial assets synthesized via user prompts belong to the creating account. In Standard Managed Mode, hosting and store compliance are managed with a standard 30% revenue share. Developers may choose to exercise the Set Free option ($30 flat buyout settled to Commercial Bank of Ethiopia Account 1000602281187) to claim 100% unrestricted intellectual property ownership with zero platform cut.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">3. Store Compliance &amp; Multi-Platform Publishing</h4>
                <p>
                  Nino provides built-in Target SDK 35 (Android 15), Swift 6 iOS 18 compliance, and Apple Privacy Manifests (NSPrivacyAccessedAPITypes). Users are responsible for ensuring their custom prompt contents adhere to Google Play Developer Policies and Apple App Store Review Guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">4. Financial Clearance</h4>
                <p>
                  Financial flows, licensing transactions, marketplace purchases, and Set-Free releases are governed under the official platform treasury account held at Commercial Bank of Ethiopia (Account: 1000602281187) as set forth in the Financial Settlement section.
                </p>
              </div>
            </div>
          )}

          {/* Section 3: Privacy Policy */}
          {activeLegalTab === 'privacy' && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">1. Data Minimization &amp; Privacy First</h4>
                <p>
                  We respect the privacy and confidentiality of your application logic, proprietary prompts, database schemas, and branding assets. We do not sell, rent, or lease your project source code or user data to third-party advertisers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">2. Store Safety &amp; Privacy Manifests</h4>
                <p>
                  All mobile application bundles (.AAB and .IPA) generated by Nino automatically declare transparent Data Safety labels and Apple Privacy Manifests to comply with regulatory standards and App Store inspection guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-white text-sm">3. Financial Record Privacy</h4>
                <p>
                  All monetary transactions and banking settlement details (handled through Commercial Bank of Ethiopia, Account 1000602281187) are safeguarded with TLS 1.3 encryption, role-based access control, and strict financial confidentiality laws.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Nino Platform Legal &amp; Settlement Document</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
};
