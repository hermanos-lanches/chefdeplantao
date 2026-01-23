import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils.ts';
import { Home, Calendar, Wallet, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-white/5 pb-8 pt-3">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-4">
        <NavItem 
          to="/freelancer/dashboard" 
          icon={<Home size={24} />} 
          label="Vagas" 
          active={isActive('/freelancer/dashboard')} 
        />
        <NavItem 
          to="/freelancer/shifts" 
          icon={<Calendar size={24} />} 
          label="Meus Plantões" 
          active={isActive('/freelancer/shifts')} 
        />
        <NavItem 
          to="/freelancer/wallet" 
          icon={<Wallet size={24} />} 
          label="Carteira" 
          active={isActive('/freelancer/wallet')} 
        />
        <NavItem 
          to="/freelancer/profile" 
          icon={<User size={24} />} 
          label="Perfil" 
          active={isActive('/freelancer/profile')} 
        />
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-1.5 group">
    <div className={cn(
      "transition-all duration-300",
      active ? "text-primary scale-110" : "text-gray-500 group-hover:text-gray-300"
    )}>
      {icon}
    </div>
    <span className={cn(
      "text-[10px] font-bold transition-colors",
      active ? "text-primary" : "text-gray-500 group-hover:text-gray-300"
    )}>{label}</span>
  </Link>
);
