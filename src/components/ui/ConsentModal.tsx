import React from 'react';
import { Shield, MapPin, X } from 'lucide-react';
import { Button } from './Button';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  type: 'location' | 'identity';
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose, onAccept, type }) => {
  if (!isOpen) return null;

  const content = {
    location: {
      icon: <MapPin className="text-orange-500" size={32} />,
      title: 'Permitir acesso à sua localização?',
      body: (
        <div className="space-y-3 text-sm text-gray-400">
          <p>Para conectar você aos melhores restaurantes e garantir sua segurança, o Chef de Plantão precisa acessar sua localização em tempo real.</p>
          <div className="space-y-2">
            <p className="font-bold text-gray-200">Por que isso é necessário?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><span className="text-gray-200">Para Profissionais:</span> Encontrar vagas próximas e calcular o tempo de deslocamento.</li>
              <li><span className="text-gray-200">Para Restaurantes:</span> Acompanhar sua chegada ao local (estilo Uber).</li>
              <li><span className="text-gray-200">Segurança:</span> Monitorar o trajeto durante o período de trabalho.</li>
            </ul>
          </div>
          <p className="text-[10px] italic">Seus dados são criptografados e usados apenas durante buscas ou plantões ativos.</p>
        </div>
      ),
      actionLabel: 'Permitir durante o uso do App'
    },
    identity: {
      icon: <Shield className="text-blue-500" size={32} />,
      title: 'Verificação de Identidade e Segurança',
      body: (
        <div className="space-y-3 text-sm text-gray-400">
          <p>Para garantir uma comunidade confiável, precisamos validar sua identidade antes de liberar o acesso às vagas.</p>
          <div className="space-y-2">
            <p className="font-bold text-gray-200">Como seus dados serão utilizados?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><span className="text-gray-200">CPF e Documentos:</span> Exclusivamente para confirmar sua identidade e realizar verificação de antecedentes.</li>
              <li><span className="text-gray-200">Selfie de Validação:</span> Comparada com seu documento para evitar fraudes.</li>
              <li><span className="text-gray-200">Privacidade:</span> Armazenados em cofre digital criptografado e nunca compartilhados com terceiros.</li>
            </ul>
          </div>
          <p className="text-[10px] italic">Em conformidade com a LGPD, você tem total controle sobre seus dados.</p>
        </div>
      ),
      actionLabel: 'Entendi e quero verificar meu perfil'
    }
  };

  const current = content[type];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1c1c1e] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-2xl">
              {current.icon}
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">{current.title}</h3>
          {current.body}
          
          <div className="mt-8 space-y-3">
            <Button fullWidth size="lg" onClick={onAccept} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
              {current.actionLabel}
            </Button>
            <button onClick={onClose} className="w-full py-3 text-sm text-gray-500 font-medium hover:text-gray-300">
              Agora não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
