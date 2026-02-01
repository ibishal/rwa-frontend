import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BarChart2, Radio, User, Activity } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navItems = [
    { name: 'Market', path: '/market', icon: BarChart2 },
    { name: 'Trade', path: '/trade', icon: Activity },
    { name: 'Settlement', path: '/settlement', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-crypto-dark text-crypto-text flex flex-col md:flex-row font-sans selection:bg-crypto-primary/30">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-crypto-border/50 bg-crypto-panel/30 flex flex-col backdrop-blur-sm sticky top-0 md:h-screen z-40">
        <div className="p-6 border-b border-crypto-border/30">
          <div className="flex items-center gap-2 text-crypto-primary mb-1">
            <Radio className="w-6 h-6 animate-pulse-fast" />
            <span className="text-xl font-bold tracking-tight">ZeroTrade</span>
          </div>
          <p className="text-xs text-crypto-muted uppercase tracking-widest ml-8">Institutional</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-none border-l-2 transition-all duration-300
                ${isActive 
                  ? 'border-crypto-primary bg-crypto-primary/5 text-white' 
                  : 'border-transparent text-crypto-muted hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-crypto-border/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-crypto-primary to-blue-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Trident Fund</p>
              <p className="text-xs text-crypto-success flex items-center gap-1">
                <Shield className="w-3 h-3" />
                KYC Level 3
              </p>
            </div>
          </div>
          <div className="text-xs text-crypto-muted font-mono">
            ZK-ID: 0x7f...3a9
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};