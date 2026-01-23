import React from 'react';
import { cn } from '../../lib/utils.ts';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-bold text-white mb-2 ml-1">{label}</label>}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "block w-full bg-card border border-white/5 rounded-3xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-base py-4",
              leftIcon ? "pl-14" : "pl-6",
              rightIcon ? "pr-14" : "pr-6",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
