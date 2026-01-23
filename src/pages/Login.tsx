import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Mail, Lock, EyeOff, Eye, ArrowRight, Loader2, UtensilsCrossed } from 'lucide-react';
import { authService } from '../lib/authService.ts';
import { cn } from '../lib/utils.ts';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'restaurant' | 'professional'>('professional');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await authService.signIn(email, password);
      const user = await authService.getCurrentUser();
      
      if (user?.role === 'professional') {
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      console.error('Google Login error:', error);
      alert('Erro ao entrar com Google.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#14110F] overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Logo Section - Refined */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#1C1917] border border-white/5 shadow-2xl">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
               <UtensilsCrossed size={28} className="text-white" strokeWidth={2.5} />
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
            disabled={loading || googleLoading}
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

        {/* Social Login - Corrected Google Button */}
        <div className="space-y-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Ou continue com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 h-16 rounded-[24px] bg-[#1C1917] border border-white/5 hover:bg-[#262220] transition-all active:scale-95 disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin text-orange-500" size={24} />
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-white font-bold">Entrar com Google</span>
              </>
            )}
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
