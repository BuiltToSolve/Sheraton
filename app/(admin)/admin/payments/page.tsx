import { CreditCard, Banknote, Smartphone } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments & Billing</h1>
          <p className="text-zinc-400 mt-1">Accept Card, UPI, and Cash transactions seamlessly.</p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg transition-colors font-medium">
          Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <CreditCard className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">Card Payment</h3>
          <p className="text-sm text-zinc-400 mt-2">Visa, Mastercard, Amex, and international credit/debit cards supported.</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <Smartphone className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">UPI & Digital Wallets</h3>
          <p className="text-sm text-zinc-400 mt-2">Instant QR scanning for GPay, PhonePe, Paytm, and other UPI apps.</p>
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-card-border)] flex flex-col items-center text-center hover:border-[var(--color-primary)]/50 transition-colors">
          <Banknote className="w-12 h-12 text-[var(--color-primary)] mb-4" />
          <h3 className="text-lg font-bold text-white">Cash Transaction</h3>
          <p className="text-sm text-zinc-400 mt-2">Physical currency in major denominations. Includes cash drawer tracking.</p>
        </div>
      </div>

      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-card-border)] overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1f1f22]">
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Txn ID</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Guest</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Amount</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Method</th>
                <th className="px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-card-border)]">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-zinc-300">TX-90231</td>
                <td className="px-6 py-4 text-sm text-white">Sarah Jenkins</td>
                <td className="px-6 py-4 text-sm text-white font-medium">$850.00</td>
                <td className="px-6 py-4 text-sm text-zinc-300 flex items-center gap-2"><CreditCard className="w-4 h-4 text-zinc-400"/> Card</td>
                <td className="px-6 py-4 text-sm"><span className="text-emerald-400">Successful</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-zinc-300">TX-90232</td>
                <td className="px-6 py-4 text-sm text-white">Rahul Sharma</td>
                <td className="px-6 py-4 text-sm text-white font-medium">$120.00</td>
                <td className="px-6 py-4 text-sm text-zinc-300 flex items-center gap-2"><Smartphone className="w-4 h-4 text-zinc-400"/> UPI</td>
                <td className="px-6 py-4 text-sm"><span className="text-emerald-400">Successful</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
