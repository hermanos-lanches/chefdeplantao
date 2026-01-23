import React from 'react';
import { cn } from '../../lib/utils.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-3xl font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-card text-white hover:bg-card-hover border border-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20"
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-14 px-8 text-sm",
    lg: "h-16 px-10 text-base",
    icon: "h-12 w-12 p-0"
  };

  return (
    <button 
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
