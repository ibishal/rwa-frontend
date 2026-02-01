import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { OrderBook } from '../components/OrderBook';
import { ZKStatus } from '../components/ZKStatus';
import { MOCK_ASSETS } from '../constants';
import { Asset, OrderSide } from '../types';
import { poseidonHash, generateProof } from '../services/zkService';
import { ArrowRight, Lock, EyeOff, CheckCircle2, RefreshCw } from 'lucide-react';

const TradePage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(MOCK_ASSETS[0]);
  const [side, setSide] = useState<OrderSide>(OrderSide.BUY);
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  
  // ZK State
  const [zkState, setZkState] = useState<{
    status: 'idle' | 'proving' | 'verified';
    progress: number;
    message: string;
    proof?: any;
    hash?: string;
  }>({ status: 'idle', progress: 0, message: '' });

  const estimatedTotal = (parseFloat(price || '0') * parseFloat(amount || '0')).toFixed(2);

  const handleOrder = async () => {
    if (!price || !amount) return;

    // 1. Start Proof Generation
    setZkState({ status: 'proving', progress: 0, message: 'Initializing Circuits...' });

    try {
      // 2. Simulate Proof
      const proof = await generateProof(
        { price, amount, nonce: Math.random() }, 
        (msg, prog) => setZkState(prev => ({ ...prev, message: msg, progress: prog }))
      );

      // 3. Proof Complete
      const commitment = poseidonHash([price, amount, 'nonce']);
      setZkState({ 
        status: 'verified', 
        progress: 100, 
        message: 'Proof Valid. Submitting...',
        proof,
        hash: commitment
      });

      // 4. Reset after delay
      setTimeout(() => {
        setZkState({ status: 'idle', progress: 0, message: '' });
        setPrice('');
        setAmount('');
        // In a real app, we would add the order to a list here
      }, 2000);

    } catch (e) {
      console.error(e);
      setZkState({ status: 'idle', progress: 0, message: 'Error' });
    }
  };

  return (
    <div className="h-[calc(100vh-theme(spacing.16))] p-6 flex flex-col md:flex-row gap-6 animate-fade-in">
      <ZKStatus status={zkState.status} progress={zkState.progress} message={zkState.message} />

      {/* Left Column: Order Entry */}
      <div className="w-full md:w-96 flex flex-col gap-6">
        <Card className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background Design Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-crypto-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-crypto-primary" />
            Shielded Order
          </h2>

          {/* Asset Selector */}
          <div className="mb-6">
            <label className="text-xs text-crypto-muted uppercase mb-2 block">Select Asset</label>
            <select 
              className="w-full bg-black/50 border border-crypto-border rounded-lg p-3 text-white focus:border-crypto-primary focus:outline-none appearance-none cursor-pointer hover:bg-white/5 transition-colors"
              value={selectedAsset.id}
              onChange={(e) => setSelectedAsset(MOCK_ASSETS.find(a => a.id === e.target.value) || MOCK_ASSETS[0])}
            >
              {MOCK_ASSETS.map(a => (
                <option key={a.id} value={a.id}>{a.symbol} - {a.name}</option>
              ))}
            </select>
          </div>

          {/* Buy/Sell Toggle */}
          <div className="flex bg-black/30 rounded-lg p-1 mb-6 border border-crypto-border">
            <button 
              onClick={() => setSide(OrderSide.BUY)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${side === OrderSide.BUY ? 'bg-crypto-success text-black shadow-lg shadow-green-900/50' : 'text-crypto-muted hover:text-white'}`}
            >
              BUY
            </button>
            <button 
              onClick={() => setSide(OrderSide.SELL)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${side === OrderSide.SELL ? 'bg-crypto-error text-black shadow-lg shadow-red-900/50' : 'text-crypto-muted hover:text-white'}`}
            >
              SELL
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-4 flex-1">
            <div>
              <label className="flex justify-between text-xs text-crypto-muted uppercase mb-2">
                <span>Price (USDC)</span>
                <span>Market: ${selectedAsset.price}</span>
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-transparent border-b border-crypto-border focus:border-crypto-primary py-2 text-2xl font-mono text-white placeholder-gray-800 outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-crypto-muted uppercase mb-2 block">Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent border-b border-crypto-border focus:border-crypto-primary py-2 text-2xl font-mono text-white placeholder-gray-800 outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

             {/* Calculation Preview */}
            <div className="py-4 border-t border-white/5 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-crypto-muted">Estimated Total</span>
                <span className="text-xl font-mono text-white">${estimatedTotal}</span>
              </div>
               <div className="flex justify-between items-center text-xs">
                <span className="text-crypto-muted flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> Privacy Preserved
                </span>
                <span className="text-crypto-primary">
                  Fees: $0.00
                </span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full mt-6" 
            variant={side === OrderSide.BUY ? 'primary' : 'danger'}
            onClick={handleOrder}
            disabled={!price || !amount}
          >
            {side} {selectedAsset.symbol}
          </Button>
        </Card>
      </div>

      {/* Right Column: Order Book & Market Status */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex-1 min-h-[400px]">
          <OrderBook />
        </div>
        
        {/* Settlement Status Teaser */}
        <div className="h-48 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="flex flex-col justify-center items-center text-center space-y-2 border-crypto-success/30 bg-crypto-success/5">
              <CheckCircle2 className="w-8 h-8 text-crypto-success" />
              <h4 className="text-white font-bold">Atomic Settlement</h4>
              <p className="text-xs text-crypto-muted px-4">Trades settle instantly on-chain once ZK proofs are verified.</p>
           </Card>
           <Card className="flex flex-col justify-center items-center text-center space-y-2 border-crypto-secondary/30 bg-crypto-secondary/5">
              <RefreshCw className="w-8 h-8 text-crypto-secondary animate-spin-slow" />
              <h4 className="text-white font-bold">Merkle Sync</h4>
              <p className="text-xs text-crypto-muted px-4">Order book is synced with the latest ZK-Rollup state root.</p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default TradePage;