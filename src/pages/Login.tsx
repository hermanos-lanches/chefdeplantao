import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/freelancer/dashboard');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark to-background-dark"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 mb-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-3xl">skillet</span>
          </div>
          <h1 className="text-white text-4xl font-display font-bold tracking-tight leading-none">
            Chef de<br/><span className="text-primary">Plantão</span>
          </h1>
          <p className="text-gray-400 text-lg font-light font-sans">A sua brigada, sob demanda.</p>
        </div>

        <div className="bg-surface-dark p-1.5 rounded-xl border border-white/10 flex relative shadow-lg">
          <div className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-lg shadow-md transition-all"></div>
          <button className="relative z-10 flex-1 py-2.5 text-center text-sm font-bold text-white transition-colors duration-200">
            Sou Restaurante
          </button>
          <button className="relative z-10 flex-1 py-2.5 text-center text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">
            Sou Profissional
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <Input 
              label="E-mail"
              placeholder="exemplo@restaurante.com.br"
              type="email"
              leftIcon={<span className="material-symbols-outlined text-xl">mail</span>}
            />
            <Input 
              label="Senha"
              placeholder="••••••••"
              type="password"
              leftIcon={<span className="material-symbols-outlined text-xl">lock</span>}
              rightIcon={
                <button type="button" className="text-gray-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </button>
              }
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">
              Esqueci minha senha
            </a>
          </div>

          <Button type="submit" fullWidth size="lg">
            <span>Entrar</span>
            <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Button>
        </form>

        <div className="space-y-6">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Ou continue com</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-dark border border-white/10 rounded-xl hover:bg-[#333] transition-all group">
              <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">search</span>
              <span className="text-sm font-medium text-white">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-dark border border-white/10 rounded-xl hover:bg-[#333] transition-all group">
              <span className="material-symbols-outlined text-white group-hover:scale-110 transition-transform">phone_iphone</span>
              <span className="text-sm font-medium text-white">Apple</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">
            Ainda não tem conta? 
            <Link to="/register" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1">Cadastre-se agora</Link>
          </p>
        </div>
      </div>
    </div>
  );
};