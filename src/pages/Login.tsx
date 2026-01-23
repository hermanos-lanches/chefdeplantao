import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Mail, Lock, EyeOff, ArrowRight, Search } from 'lucide-react';
import { authService } from '../lib/authService.ts';

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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
      // O redirecionamento é feito pelo Supabase OAuth
    } catch (error: any) {
      alert('Erro ao entrar com Google: ' + error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-card border border-white/5 shadow-xl">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10C3 10 3 6 12 6C21 6 21 10 21 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18C16.4183 18 20 14.4183 20 10H4C4 14.4183 7.58172 18 12 18Z" fill="white"/>
              </svg>
            </div>
          </div>
          <h1 className="text-white text-4xl font-bold tracking-tight">
            Chef de<br/><span className="text-primary">Plantão</span>
          </h1>
          <p className="text-gray-400 text-base">A sua brigada, sob demanda.</p>
        </div>

        {/* User Type Selector */}
        <div className="bg-card p-1.5 rounded-3xl border border-white/5 flex relative">
          <div 
            className={cn(
              "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-2xl shadow-lg transition-all duration-300 ease-out",
              userType === 'professional' ? "left-[calc(50%+3px)]" : "left-1.5"
            )}
          ></div>
          <button 
            onClick={() => setUserType('restaurant')}
            className={cn(
              "relative z-10 flex-1 py-3.5 text-center text-sm font-bold transition-colors duration-200",
              userType === 'restaurant' ? "text-white" : "text-gray-400"
            )}
          >
            Sou Restaurante
          </button>
          <button 
            onClick={() => setUserType('professional')}
            className={cn(
              "relative z-10 flex-1 py-3.5 text-center text-sm font-bold transition-colors duration-200",
              userType === 'professional' ? "text-white" : "text-gray-400"
            )}
          >
            Sou Profissional
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input 
              label="E-mail"
              placeholder="exemplo@restaurante.com.br"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={20} />}
            />
            <Input 
              label="Senha"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={20} />}
              rightIcon={
                <button type="button" className="text-gray-500 hover:text-white transition-colors">
                  <EyeOff size={20} />
                </button>
              }
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Esqueci minha senha
            </a>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={loading || googleLoading}>
            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            {!loading && <ArrowRight size={20} className="ml-2" />}
          </Button>
        </form>

        <div className="space-y-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Ou continue com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="flex justify-center">
            <Button 
              variant="secondary" 
              fullWidth 
              className="gap-3 h-14 rounded-2xl border border-white/5 bg-card hover:bg-card-hover transition-all"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Search size={20} className="text-primary" />
              )}
              <span className="text-white font-bold">{googleLoading ? 'Conectando...' : 'Entrar com Google'}</span>
            </Button>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">
            Ainda não tem conta? 
            <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4 ml-1">Cadastre-se agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function for class merging
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
