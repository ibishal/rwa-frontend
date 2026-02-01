import React from 'react';
import { ShieldCheck, Lock, Cpu } from 'lucide-react';

interface ZKStatusProps {
  status: 'idle' | 'proving' | 'verified';
  progress: number;
  message: string;
}

export const ZKStatus: React.FC<ZKStatusProps> = ({ status, progress, message }) => {
  if (status === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0F0F12] border border-crypto-primary/30 p-8 shadow-[0_0_50px_rgba(0,255,148,0.1)] relative overflow-hidden">
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-1 bg-crypto-primary/50 animate-pulse-fast"></div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
             {/* Spinning Rings */}
            <div className="w-24 h-24 rounded-full border border-crypto-border animate-spin-slow"></div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-t border-crypto-primary animate-spin"></div>
            <div className="absolute inset-2 w-20 h-20 rounded-full border-b border-crypto-secondary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              {status === 'verified' ? (
                <ShieldCheck className="w-10 h-10 text-crypto-primary animate-bounce" />
              ) : (
                <Cpu className="w-10 h-10 text-crypto-secondary animate-pulse" />
              )}
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h3 className="text-2xl font-mono text-white tracking-widest uppercase">
              {status === 'verified' ? 'ZK Proof Valid' : 'Generating Proof'}
            </h3>
            <p className="text-crypto-primary font-mono text-sm h-6">{message}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-800 relative overflow-hidden">
            <div 
              className="h-full bg-crypto-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full text-xs font-mono text-crypto-muted">
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3" />
              <span>Inputs Shielded</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-crypto-secondary">Groth16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};