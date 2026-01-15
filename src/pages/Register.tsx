import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Store, ChefHat } from 'lucide-react';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'restaurant' | 'freelancer'>('freelancer');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Mock login logic
    console.log("Criando conta como:", userType);

    if (userType === 'restaurant') {
      navigate('/restaurant/dashboard');
    } else {
      navigate('/freelancer/dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background-dark overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark to-background-dark"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-sm space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 mb-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
             <span className="material-symbols-outlined text-primary text-3xl">skillet</span>
          </div>
          <h1 className="text-white text-3xl font-display font-bold tracking-tight">Crie sua conta</h1>
          <p className="text-gray-400 text-sm font-sans">Escolha como você quer atuar</p>
        </div>

        {/* User Type Selector */}
        <div className="bg-surface-dark p-1.5 rounded-xl border border-white/10 flex relative shadow-lg">
          <button 
            type="button"
            onClick={() => setUserType('restaurant')}
            className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              userType === 'restaurant' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Store size={16} />
            Restaurante
          </button>
          <button 
            type="button"
            onClick={() => setUserType('freelancer')}
            className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              userType === 'freelancer' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ChefHat size={16} />
            Profissional
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-4">
            <Input
              label={userType === 'restaurant' ? 'Nome do Restaurante' : 'Nome Completo'}
              placeholder={userType === 'restaurant' ? 'Bistrô do Chef' : 'Carlos Silva'}
              type="text"
              required
              leftIcon={<User size={20} />}
            />

            <Input
              label="E-mail"
              placeholder="exemplo@email.com"
              type="email"
              required
              leftIcon={<Mail size={20} />}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              required
              leftIcon={<Lock size={20} />}
              rightIcon={
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-white transition-colors focus:outline-none flex items-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </div>

          <Button type="submit" fullWidth size="lg" className="mt-6 h-14 text-base">
            <span>Criar Conta Grátis</span>
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-gray-400 text-sm">
            Já tem conta?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
              Faça Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};