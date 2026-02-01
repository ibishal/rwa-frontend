import React from 'react';
import { Card } from '../components/Card';
import { ShieldCheck, ExternalLink, Clock } from 'lucide-react';

const SETTLEMENTS = [
  { id: '0x3a...21f', time: '2 mins ago', asset: 'UST-10Y', amount: '50,000', status: 'SETTLED', proof: 'Verified' },
  { id: '0x8b...99c', time: '15 mins ago', asset: 'CORP-AAPL', amount: '12,500', status: 'SETTLED', proof: 'Verified' },
  { id: '0x1c...d4e', time: '1 hour ago', asset: 'GB-GILTS', amount: '100,000', status: 'SETTLED', proof: 'Verified' },
];

const SettlementPage: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
       <header>
          <h1 className="text-4xl font-bold text-white mb-2">Settlement Layer</h1>
          <p className="text-crypto-muted">On-chain verification and asset transfer history.</p>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-crypto-panel to-crypto-primary/10 border-crypto-primary/30">
             <div className="text-crypto-primary mb-2"><ShieldCheck className="w-8 h-8" /></div>
             <div className="text-3xl font-mono font-bold text-white">100%</div>
             <div className="text-sm text-crypto-muted">Proof Validity Rate</div>
          </Card>
          <Card className="bg-gradient-to-br from-crypto-panel to-crypto-secondary/10 border-crypto-secondary/30">
             <div className="text-crypto-secondary mb-2"><Clock className="w-8 h-8" /></div>
             <div className="text-3xl font-mono font-bold text-white">~12s</div>
             <div className="text-sm text-crypto-muted">Avg. Settlement Time</div>
          </Card>
           <Card className="bg-gradient-to-br from-crypto-panel to-purple-500/10 border-purple-500/30">
             <div className="text-purple-500 mb-2"><ExternalLink className="w-8 h-8" /></div>
             <div className="text-3xl font-mono font-bold text-white">$14.2M</div>
             <div className="text-sm text-crypto-muted">24h Settled Volume</div>
          </Card>
       </div>

       <Card>
          <h3 className="text-xl font-bold text-white mb-6">Recent Settlements</h3>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="border-b border-white/10 text-xs text-crypto-muted uppercase">
                   <tr>
                      <th className="p-4">Tx Hash</th>
                      <th className="p-4">Asset</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Proof Status</th>
                      <th className="p-4 text-right">Time</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {SETTLEMENTS.map((tx, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                         <td className="p-4 font-mono text-crypto-secondary">{tx.id}</td>
                         <td className="p-4 font-bold text-white">{tx.asset}</td>
                         <td className="p-4 font-mono">{tx.amount}</td>
                         <td className="p-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-crypto-success/10 text-crypto-success text-xs font-bold border border-crypto-success/20">
                               <ShieldCheck className="w-3 h-3" /> {tx.proof}
                            </span>
                         </td>
                         <td className="p-4 text-right text-crypto-muted">{tx.time}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </Card>
    </div>
  );
};

export default SettlementPage;