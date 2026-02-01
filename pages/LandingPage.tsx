import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Radio, ArrowRight, ShieldCheck, Zap, Lock, Database, Hexagon, Layers, Box, Cpu } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // The reference design uses a symmetric V-shape (valley) configuration.
  // The bars frame the central text.
  // Gradients simulate the "glitch/RGB split" look on the top edge.
  const bars = [
    { height: '100%', gradient: 'from-blue-500 via-white to-red-500', icon: Database, delay: '0.6s' },
    { height: '75%', gradient: 'from-red-500 via-yellow-400 to-white', icon: Hexagon, delay: '0.5s' },
    { height: '55%', gradient: 'from-white via-cyan-400 to-purple-500', icon: ShieldCheck, delay: '0.4s' },
    { height: '40%', gradient: 'from-purple-500 via-pink-500 to-white', icon: Lock, delay: '0.3s' },
    // Center Valley - Shortest Bar
    { height: '25%', gradient: 'from-white via-blue-400 to-green-400', icon: Radio, delay: '0.2s' },
    { height: '40%', gradient: 'from-green-400 via-yellow-300 to-white', icon: Cpu, delay: '0.3s' },
    { height: '55%', gradient: 'from-white via-red-500 to-orange-500', icon: Layers, delay: '0.4s' },
    { height: '75%', gradient: 'from-orange-500 via-pink-500 to-purple-500', icon: Zap, delay: '0.5s' },
    { height: '100%', gradient: 'from-purple-500 via-cyan-500 to-white', icon: Box, delay: '0.6s' },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden flex flex-col font-sans relative selection:bg-white/20">
      
      {/* Subtle Noise Texture Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <Radio className="w-5 h-5 text-white" />
          {/* Using strictly white text for branding to match reference monochromatic style */}
          <span className="text-xl font-bold tracking-tight text-white">ZeroTrade</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors duration-300">Product</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Pricing</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Doc</a>
          <a href="#" className="hover:text-white transition-colors duration-300">FAQ</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Forum</a>
        </div>

        <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/market')}
            className="rounded-full border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 px-6"
        >
          Get Started
        </Button>
      </nav>

      {/* Main Content Area - Centered in the upper half */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start pt-24 md:pt-32 px-6 text-center">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          Built for privacy,<br />
          not exposure.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
          Track, optimize, and grow — with clarity and control.<br/>
          The first institutional-grade dark pool for real-world assets.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
          <Button variant="white" size="lg" onClick={() => navigate('/market')} className="rounded-full px-8 h-14 text-base shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Explore the platform
          </Button>
          <button className="text-gray-400 hover:text-white transition-colors font-medium text-sm px-6 py-4">
            View demo
          </button>
        </div>

      </div>

      {/* The "Equalizer" Bars - Fixed to Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh] flex items-end justify-center gap-1 md:gap-4 px-4 z-10 pointer-events-none">
        {bars.map((bar, i) => (
          <div 
            key={i}
            className="flex-1 min-w-[20px] max-w-[140px] relative group"
            style={{ 
              height: bar.height, 
              animation: 'rise 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: bar.delay,
              transform: 'translateY(100%)' // Start state for animation
            }}
          >
            {/* The Glitch/Spectrum Top Border */}
            <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${bar.gradient} shadow-[0_0_15px_rgba(255,255,255,0.3)] z-20`} />
            
            {/* The Bar Body */}
            <div className="w-full h-full bg-[#080808] border-x border-white/[0.03] flex flex-col justify-end items-center pb-8 relative overflow-hidden">
                {/* Subtle sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon at bottom (Replacing logos from reference) */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-300">
                    <bar.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom fade to ensure solid ground */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

    </div>
  );
};

export default LandingPage;