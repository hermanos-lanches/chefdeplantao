import React from 'react';
import { cn } from '../../lib/utils.ts';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, className, icon }) => {
  const variants = {
    success: "bg-green-500/10 text-green-500 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    danger: "bg-red-500/10 text-red-500 border-red-500/20",
    neutral: "bg-white/5 text-gray-400 border-white/10",
    primary: "bg-primary/10 text-primary border-primary/20",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      {children}
    </span>
  );
};