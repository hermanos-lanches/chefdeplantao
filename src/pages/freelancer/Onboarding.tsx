import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { ChevronRight, Camera, FileText, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    specialty: '',
    bio: '',
    phone: '',
    address: ''
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await updateProfile.mutateAsync({
          ...formData,
          verification_status: 'in_review'
        });
        navigate('/freelancer/dashboard');
      } catch (error) {
        alert('Erro ao salvar informações.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#14110F] text-white p-6 flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="pt-10 pb-12 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              step >= i ? "bg-orange-500" : "bg-white/10"
            )}
          />
        ))}
      </div>

      <div className="flex-1 space-y-8">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Vamos começar seu <span className="text-orange-500">perfil</span></h1>
              <p className="text-gray-400 text-lg">Conte-nos um pouco sobre sua experiência na cozinha.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Sua Especialidade</label>
                <input 
                  className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-5 px-6 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="Ex: Chef de Cozinha, Auxiliar, Garçom..."
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Sua Bio</label>
                <textarea 
                  className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-5 px-6 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all min-h-[120px] resize-none"
                  placeholder="Fale brevemente sobre sua trajetória..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Onde você <span className="text-orange-500">atua?</span></h1>
              <p className="text-gray-400 text-lg">Precisamos saber sua localização para encontrar as melhores vagas.</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Telefone / WhatsApp</label>
                <input 
                  className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-5 px-6 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Cidade / Bairro</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                  <input 
                    className="w-full bg-[#1C1917] border border-white/5 rounded-[20px] py-5 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                    placeholder="Ex: São Paulo, SP"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Segurança e <span className="text-orange-500">Confiança</span></h1>
              <p className="text-gray-400 text-lg">Para aceitar vagas, precisamos verificar sua identidade.</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[#1C1917] p-6 rounded-[32px] border border-white/5 flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <FileText size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Documento (RG/CNH)</h3>
                  <p className="text-sm text-gray-500">Frente e verso legíveis</p>
                </div>
                <button className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-orange-500">
                  <Camera size={20} />
                </button>
              </div>

              <div className="bg-[#1C1917] p-6 rounded-[32px] border border-white/5 flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <CheckCircle2 size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Selfie de Segurança</h3>
                  <p className="text-sm text-gray-500">Para validar sua identidade</p>
                </div>
                <button className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-green-500">
                  <Camera size={20} />
                </button>
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/10 p-6 rounded-[32px]">
              <p className="text-xs text-gray-400 leading-relaxed">
                Ao clicar em finalizar, você concorda com nossos Termos de Uso e Política de Privacidade. Seus dados são protegidos por criptografia de ponta a ponta.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="pb-10">
        <Button 
          fullWidth 
          className="h-20 rounded-[28px] text-xl font-black bg-orange-500 hover:bg-orange-600 shadow-2xl shadow-orange-500/20 group"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={28} />
          ) : (
            <>
              <span>{step === 3 ? 'Finalizar Cadastro' : 'Continuar'}</span>
              <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
