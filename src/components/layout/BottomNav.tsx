import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils.ts';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 pb-safe pt-2">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        <NavItem 
          to="/freelancer/dashboard" 
          icon="home" 
          label="Início" 
          active={isActive('/freelancer/dashboard')} 
        />
        <NavItem 
          to="/freelancer/shifts" 
          icon="calendar_month" 
          label="Plantões" 
          active={isActive('/freelancer/shifts')} 
        />
        <NavItem 
          to="/freelancer/wallet" 
          icon="account_balance_wallet" 
          label="Ganhos" 
          active={isActive('/freelancer/wallet')} 
        />
        <NavItem 
          to="/freelancer/profile" 
          icon="person" 
          label="Perfil" 
          active={isActive('/freelancer/profile')} 
        />
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label, active }: { to: string; icon: string; label: string; active: boolean }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-1 group">
    <div className={cn(
      "p-1.5 rounded-xl transition-colors",
      active ? "bg-primary/10 text-primary" : "text-gray-500 group-hover:text-gray-300"
    )}>
      <span className={cn("material-symbols-outlined text-2xl", active && "filled")}>{icon}</span>
    </div>
    <span className={cn(
      "text-[10px] font-medium transition-colors",
      active ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
    )}>{label}</span>
  </Link>
);