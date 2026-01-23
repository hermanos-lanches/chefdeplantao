import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Mail, Lock, EyeOff, ArrowRight, Search, Smartphone } from 'lucide-react';
import { authService } from '../lib/authService.ts';
import { cn } from '../lib/utils.ts';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'restaurant' | 'professional'>('restaurant');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signIn(email, password);
      const user = await authService.getCurrentUser();
      if (user?.role === 'professional') {
        navigate('/freelancer/dashboard');
      } else {
        navigate('/restaurant/dashboard');
      }
    } catch (error: any) {
      alert('Erro ao entrar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#14110F] overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-12">
        {/* Logo Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#1C1917] border border-white/5 shadow-2xl">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10C3 10 3 6 12 6C21 6 21 10 21 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 18C16.4183 18 20 14.4183 20 10H4C4 14.4183 7.58172 18 12 18Z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-white text-5xl font-bold tracking-tight leading-tight">
              Chef de<br/><span className="text-orange-500">Plantão</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium opacity-80">A sua brigada, sob demanda.</p>
          </div>
        </div>

        {/* User Type Selector - Fiel ao Layout */}
        <div className="bg-[#1C1917] p-1.5 rounded-[24px] border border-white/5 flex relative">
          <div 
            className={cn(
              "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-orange-500 rounded-[20px] shadow-xl transition-all duration-500 ease-out",
              userType === 'professional' ? "left-[calc(50%+3px)]" : "left-1.5"
            )}
          ></div>
          <button 
            onClick={() => setUserType('restaurant')}
            className={cn(
              "relative z-10 flex-1 py-4 text-center text-sm font-bold transition-colors duration-300",
              userType === 'restaurant' ? "text-white" : "text-gray-400"
            )}
          >
            Sou Restaurante
          </button>
          <button 
            onClick={() => setUserType('professional')}
            className={cn(
              "relative z-10 flex-1 py-4 text-center text-sm font-bold transition-colors duration-300",
              userType === 'professional' ? "text-white" : "text-gray-400"
            )}
          >
            Sou Profissional
          </button>
        </div>

        {/* Form Section */}
        <form className="space-y-8" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-bold ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  placeholder="exemplo@restaurante.com.br"
                  className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-bold ml-1">Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={20} />
                </div>
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <EyeOff size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-gray-500 font-medium hover:text-orange-500 transition-colors">
              Esqueci minha senha
            </a>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-16 rounded-[24px] text-lg shadow-lg shadow-orange-500/20 group"
            disabled={loading}
          >
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            {!loading && <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </form>

        {/* Social Login */}
        <div className="space-y-8">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Ou continue com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-16 rounded-[24px] bg-[#1C1917] border border-white/5 hover:bg-[#262220] transition-all active:scale-95">
              <Search size={20} className="text-white" />
              <span className="text-white font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-16 rounded-[24px] bg-[#1C1917] border border-white/5 hover:bg-[#262220] transition-all active:scale-95">
              <Smartphone size={20} className="text-white" />
              <span className="text-white font-bold">Apple</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm font-medium">
            Ainda não tem conta? 
            <Link to="/register" className="text-orange-500 font-bold hover:underline underline-offset-4 ml-1">Cadastre-se agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
