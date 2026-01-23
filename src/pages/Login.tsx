import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Mail, Lock, EyeOff, Eye, ArrowRight, Search, Loader2 } from 'lucide-react';
import { authService } from '../lib/authService.ts';
import { cn } from '../lib/utils.ts';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'restaurant' | 'professional'>('professional');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await authService.signIn(email, password);
      const user = await authService.getCurrentUser();
      
      // Lógica de Redirecionamento Inteligente
      if (user?.role === 'professional') {
        // Se não tiver completado o perfil, vai para onboarding
        if (!user.is_verified && (user as any).verification_status === 'pending') {
          navigate('/freelancer/onboarding');
        } else {
          navigate('/freelancer/dashboard');
        }
      } else {
        navigate('/restaurant/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert('Erro ao entrar: Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#14110F] overflow-hidden font-sans">
      {/* Background Glows - Suaves e Profissionais */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-10">
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
            <h1 className="text-white text-4xl font-bold tracking-tight leading-tight">
              Chef de<br/><span className="text-orange-500">Plantão</span>
            </h1>
            <p className="text-gray-400 text-base font-medium opacity-70">A sua brigada, sob demanda.</p>
          </div>
        </div>

        {/* User Type Selector */}
        <div className="bg-[#1C1917] p-1.5 rounded-[24px] border border-white/5 flex relative">
          <div 
            className={cn(
              "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-orange-500 rounded-[20px] shadow-xl transition-all duration-500 ease-out",
              userType === 'professional' ? "left-[calc(50%+3px)]" : "left-1.5"
            )}
          ></div>
          <button 
            type="button"
            onClick={() => setUserType('restaurant')}
            className={cn(
              "relative z-10 flex-1 py-4 text-center text-sm font-bold transition-colors duration-300",
              userType === 'restaurant' ? "text-white" : "text-gray-400"
            )}
          >
            Sou Restaurante
          </button>
          <button 
            type="button"
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
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email"
                required
                placeholder="E-mail"
                className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="Senha"
                className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm text-gray-500 font-medium hover:text-orange-500 transition-colors">
              Esqueci minha senha
            </button>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-16 rounded-[24px] text-lg shadow-lg shadow-orange-500/20 group disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        {/* Social Login - Apenas Google como opção secundária real */}
        <div className="space-y-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Ou continue com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 h-16 rounded-[24px] bg-[#1C1917] border border-white/5 hover:bg-[#262220] transition-all active:scale-95"
          >
            <Search size={20} className="text-white" />
            <span className="text-white font-bold">Entrar com Google</span>
          </button>
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
