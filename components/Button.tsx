import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative font-mono font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider overflow-hidden group";
  
  const variants = {
    primary: "bg-crypto-primary text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(0,255,148,0.4)] hover:shadow-[0_0_25px_rgba(0,255,148,0.6)]",
    secondary: "bg-crypto-secondary text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,209,255,0.4)]",
    outline: "border border-crypto-primary text-crypto-primary hover:bg-crypto-primary/10",
    ghost: "text-crypto-muted hover:text-white hover:bg-white/5",
    danger: "bg-crypto-error/10 text-crypto-error border border-crypto-error hover:bg-crypto-error/20",
    white: "bg-white text-black hover:bg-gray-200 border-none shadow-[0_0_20px_rgba(255,255,255,0.2)]"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESSING
        </span>
      ) : (
        <>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
          {/* Subtle sheen effect */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
        </>
      )}
    </button>
  );
};