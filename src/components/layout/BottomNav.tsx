import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils.ts';
import { Home, Calendar, Wallet, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#14110F]/90 backdrop-blur-3xl border-t border-white/5 pb-10 pt-4">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-4">
        <NavItem 
          to="/freelancer/dashboard" 
          icon={<Home size={26} />} 
          label="Vagas" 
          active={isActive('/freelancer/dashboard')} 
        />
        <NavItem 
          to="/freelancer/shifts" 
          icon={<Calendar size={26} />} 
          label="Meus Plantões" 
          active={isActive('/freelancer/shifts')} 
        />
        <NavItem 
          to="/freelancer/wallet" 
          icon={<Wallet size={26} />} 
          label="Carteira" 
          active={isActive('/freelancer/wallet')} 
        />
        <NavItem 
          to="/freelancer/profile" 
          icon={<User size={26} />} 
          label="Perfil" 
          active={isActive('/freelancer/profile')} 
        />
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link to={to} className="flex flex-col items-center justify-center gap-2 group transition-all active:scale-90">
    <div className={cn(
      "transition-all duration-300",
      active ? "text-orange-500 scale-110" : "text-gray-600 group-hover:text-gray-400"
    )}>
      {icon}
    </div>
    <span className={cn(
      "text-[10px] font-black uppercase tracking-widest transition-colors",
      active ? "text-orange-500" : "text-gray-600 group-hover:text-gray-400"
    )}>{label}</span>
  </Link>
);
