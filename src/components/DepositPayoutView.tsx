import React, { useState } from 'react';
import { 
  Wallet, 
  DollarSign, 
  ArrowUpRight, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle 
} from 'lucide-react';
import { NinoProject, PayoutTransaction } from '../types';

interface DepositPayoutViewProps {
  projects: NinoProject[];
  totalBalance: number;
  onExecuteDepositPayout: (
    projectId: string,
    amount: number,
    method: 'paypal' | 'bank_transfer',
    accountDetails: string
  ) => Promise<PayoutTransaction>;
}

export const DepositPayoutView: React.FC<DepositPayoutViewProps> = ({
  projects,
  totalBalance,
  onExecuteDepositPayout,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'all');
  const [payoutMethod, setPayoutMethod] = useState<'paypal' | 'bank_transfer'>('paypal');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('250');
  const [paypalEmail, setPaypalEmail] = useState<string>('ninobitch@gmail.com');
  const [bankIban, setBankIban] = useState<string>('US89 3704 0044 0532 0130 00');
  const [bankRouting, setBankRouting] = useState<string>('021000021');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [history, setHistory] = useState<PayoutTransaction[]>([
    {
      id: 'tx-1',
      projectId: 'proj-pulse-ai',
      projectName: 'PulseFlow AI',
      amount: 500.00,
      feeAmount: 2.50,
      netPayout: 497.50,
      method: 'bank_transfer',
      accountDetails: 'Chase Bank (***0130)',
      status: 'completed',
      timestamp: Date.now() - 3600000 * 72,
    },
    {
      id: 'tx-2',
      projectId: 'proj-urban-mart',
      projectName: 'SwiftGrocer',
      amount: 300.00,
      feeAmount: 6.00,
      netPayout: 294.00,
      method: 'paypal',
      accountDetails: 'ninobitch@gmail.com',
      status: 'completed',
      timestamp: Date.now() - 3600000 * 140,
    }
  ]);

  const totalEarnedAll = projects.reduce((acc, p) => acc + p.totalRevenueEarned, 0);
  const totalCreatorShare = projects.reduce((acc, p) => acc + p.creatorEarnings, 0);
  const totalPlatformCut = projects.reduce((acc, p) => acc + p.ninoPlatformCut, 0);

  const handleDepositPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (!amountNum || amountNum <= 0 || isProcessing) return;

    setIsProcessing(true);
    try {
      const accountInfo = payoutMethod === 'paypal' ? paypalEmail : `${bankIban} (Routing: ${bankRouting})`;
      const tx = await onExecuteDepositPayout(
        selectedProjectId,
        amountNum,
        payoutMethod,
        accountInfo
      );

      setHistory([tx, ...history]);
      setSuccessBanner(
        `✓ Payout request of $${tx.netPayout.toFixed(2)} sent via ${tx.method === 'paypal' ? 'PayPal' : 'Bank Wire'} to ${tx.accountDetails}!`
      );
      setTimeout(() => setSuccessBanner(null), 6000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" />
              Creator Revenue &amp; Escrow Hub
            </span>
            <span className="text-xs text-slate-400">
              Direct PayPal &amp; Bank Deposits
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Deposit &amp; Revenue Manager
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Deposit and withdraw your project earnings (after 30% revenue share or 100% if Set Free). You can also hold and deposit income inside Nino for unreleased projects.
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

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Available Payout Balance</span>
          <div className="text-3xl font-black text-white mt-1">${totalBalance.toFixed(2)}</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">Ready for immediate deposit</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Lifetime Creator Share</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">${totalCreatorShare.toFixed(2)}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Out of ${totalEarnedAll.toFixed(2)} gross sales</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Platform Cut (30% or $0 if Free)</span>
          <div className="text-3xl font-black text-slate-400 mt-1">${totalPlatformCut.toFixed(2)}</div>
          <div className="text-[11px] text-indigo-400 font-medium mt-1">Waive permanently with Set Free</div>
        </div>
      </div>

      {/* Payout / Deposit Execution Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Deposit Funds to External Account
          </h3>

          <form onSubmit={handleDepositPayout} className="space-y-4">
            {/* Project Account Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                From Project Revenue Account
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Consolidated Nino Wallet Balance (${totalBalance.toFixed(2)})</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.walletBalance.toFixed(2)} balance &middot; {p.isFreeOfRevenueShare ? '100% Free' : '70% Split'})
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Payout Channel
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayoutMethod('paypal')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    payoutMethod === 'paypal'
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>PayPal (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutMethod('bank_transfer')}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    payoutMethod === 'bank_transfer'
                      ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Direct Bank Wire (IBAN)</span>
                </button>
              </div>
            </div>

            {/* Method Inputs */}
            {payoutMethod === 'paypal' ? (
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                  PayPal Email Address
                </label>
                <input
                  type="email"
                  required
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Bank IBAN / Account Number
                  </label>
                  <input
                    type="text"
                    required
                    value={bankIban}
                    onChange={(e) => setBankIban(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Routing / SWIFT Code
                  </label>
                  <input
                    type="text"
                    required
                    value={bankRouting}
                    onChange={(e) => setBankRouting(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Withdraw Amount */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                Deposit Amount ($USD)
              </label>
              <input
                type="number"
                min="10"
                step="10"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <button
              id="execute-payout-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>{isProcessing ? 'Transmitting Payout...' : 'Confirm Deposit to Account'}</span>
            </button>
          </form>
        </div>

        {/* Unreleased Projects Notice & Rules */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-2">
              Unreleased Project Escrow
            </span>
            <h4 className="font-extrabold text-white text-base mb-1">Deposit Inside Nino</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You can safely hold and accumulate income directly inside your Nino wallet before officially releasing your project to public app stores.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Holding Fees</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Automated 70/30 Split Auditing</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instant Payout Trigger</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          Recent Deposit &amp; Payout Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] font-mono uppercase text-slate-500 border-b border-slate-800">
              <tr>
                <th className="pb-2">Transaction ID</th>
                <th className="pb-2">Project</th>
                <th className="pb-2">Method / Destination</th>
                <th className="pb-2">Gross Amount</th>
                <th className="pb-2">Net Payout</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {history.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-3 font-mono text-[11px] text-slate-400">{tx.id}</td>
                  <td className="py-3 font-bold text-white">{tx.projectName}</td>
                  <td className="py-3 text-slate-300">{tx.accountDetails}</td>
                  <td className="py-3">${tx.amount.toFixed(2)}</td>
                  <td className="py-3 font-bold text-emerald-400">${tx.netPayout.toFixed(2)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
