import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MOCK_ASSETS } from '../constants';
import { Asset } from '../types';
import { TrendingUp, Activity, FileText, BrainCircuit } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { analyzeAsset, MarketAnalysis } from '../services/geminiService';

const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  day: i,
  value: 95 + Math.random() * 5
}));

const MarketPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async (asset: Asset) => {
    setAnalyzing(true);
    setAnalysis(null);
    const result = await analyzeAsset(asset);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Market Overview</h1>
          <p className="text-crypto-muted text-lg">Real-World Assets (RWA) Tokenized Treasury</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-2xl font-mono text-crypto-primary">$4.2B</div>
          <div className="text-xs text-crypto-muted uppercase">Total Value Locked</div>
        </div>
      </header>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_ASSETS.map((asset) => (
          <Card 
            key={asset.id} 
            className={`cursor-pointer group relative overflow-hidden ${selectedAsset?.id === asset.id ? 'border-crypto-primary bg-crypto-primary/5' : ''}`}
          >
            <div onClick={() => { setSelectedAsset(asset); setAnalysis(null); }} className="h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-crypto-secondary border border-white/10">{asset.type}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${asset.riskScore.startsWith('A') ? 'bg-crypto-success/20 text-crypto-success' : 'bg-yellow-500/20 text-yellow-500'}`}>
                  {asset.riskScore}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-crypto-primary transition-colors">{asset.symbol}</h3>
              <p className="text-sm text-crypto-muted line-clamp-2 h-10 mb-4">{asset.name}</p>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-crypto-muted uppercase">Yield</div>
                  <div className="text-lg font-mono text-crypto-success">{asset.yield}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-crypto-muted uppercase">Price</div>
                  <div className="text-lg font-mono text-white">${asset.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-crypto-primary to-blue-600 opacity-0 group-hover:opacity-10 blur transition-opacity duration-500 -z-10"></div>
          </Card>
        ))}
      </div>

      {/* Detail View */}
      {selectedAsset && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          <div className="lg:col-span-2 space-y-6">
            <Card className="h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      {selectedAsset.name} <span className="text-crypto-muted text-sm font-normal">({selectedAsset.symbol})</span>
                    </h2>
                 </div>
                 <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleAnalyze(selectedAsset)} disabled={analyzing}>
                      <BrainCircuit className="w-4 h-4 mr-2" />
                      {analyzing ? 'Analyzing...' : 'AI Risk Memo'}
                    </Button>
                    <Button size="sm" onClick={() => window.location.hash = '#/trade'}>
                       Trade Asset
                    </Button>
                 </div>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF94" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#333" />
                    <YAxis domain={['auto', 'auto']} stroke="#333" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333' }}
                      itemStyle={{ color: '#00FF94' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#00FF94" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* AI Analysis Result */}
            {analysis && (
               <Card className="bg-gradient-to-br from-crypto-panel to-crypto-primary/5 border-l-4 border-l-crypto-secondary">
                  <div className="flex items-center gap-3 mb-4">
                     <BrainCircuit className="w-6 h-6 text-crypto-secondary" />
                     <h3 className="text-xl font-bold text-white">AI Investment Memo</h3>
                     <span className={`ml-auto px-3 py-1 rounded text-xs font-bold ${
                        analysis.sentiment === 'BULLISH' ? 'bg-green-500/20 text-green-500' :
                        analysis.sentiment === 'BEARISH' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-400'
                     }`}>
                        {analysis.sentiment}
                     </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">{analysis.riskAnalysis}</p>
                  <div>
                    <h4 className="text-sm font-bold text-crypto-muted uppercase mb-2">Key Factors</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                       {analysis.keyFactors.map((factor, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-crypto-secondary">
                             <div className="w-1 h-1 bg-current rounded-full" />
                             {factor}
                          </li>
                       ))}
                    </ul>
                  </div>
               </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-crypto-primary" />
                Prospectus Data
              </h3>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <dt className="text-crypto-muted">Maturity Date</dt>
                  <dd className="font-mono text-white">{selectedAsset.maturity}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <dt className="text-crypto-muted">Coupon Frequency</dt>
                  <dd className="font-mono text-white">Semi-Annual</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <dt className="text-crypto-muted">Settlement</dt>
                  <dd className="font-mono text-white">T+0 (Atomic)</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <dt className="text-crypto-muted">ISIN</dt>
                  <dd className="font-mono text-white">US9128283...</dd>
                </div>
              </dl>
            </Card>

            <div className="bg-gradient-to-r from-crypto-secondary/20 to-crypto-primary/20 p-[1px] rounded-xl">
               <div className="bg-black/90 rounded-xl p-6">
                  <h4 className="text-crypto-secondary font-bold mb-2">Institutional Access</h4>
                  <p className="text-sm text-crypto-muted mb-4">You are trading against a KYC-gated permissioned pool using ZK-proofs for privacy.</p>
                  <div className="flex items-center gap-2 text-xs text-crypto-success">
                     <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                     Liquidity Bridge Active
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPage;