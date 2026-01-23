import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ShieldAlert } from 'lucide-react';

type Status = 'pending' | 'in_review' | 'verified' | 'rejected';

interface VerificationStatusProps {
  status: Status;
  message?: string;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({ status, message }) => {
  const config = {
    pending: {
      icon: <AlertCircle className="text-orange-500" />,
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      title: 'Cadastro Incompleto',
      desc: 'Envie seus documentos para começar a aceitar vagas.'
    },
    in_review: {
      icon: <Clock className="text-blue-500" />,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      title: 'Em Análise',
      desc: 'Estamos verificando seus dados. Isso leva cerca de 2h.'
    },
    verified: {
      icon: <CheckCircle2 className="text-green-500" />,
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      title: 'Perfil Verificado',
      desc: 'Você está pronto para trabalhar!'
    },
    rejected: {
      icon: <ShieldAlert className="text-red-500" />,
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      title: 'Verificação Recusada',
      desc: message || 'Houve um problema com seus documentos. Tente novamente.'
    }
  };

  const current = config[status];

  return (
    <div className={`flex items-start space-x-4 p-4 rounded-2xl border ${current.bg} ${current.border}`}>
      <div className="mt-1">{current.icon}</div>
      <div>
        <h4 className="font-bold text-white">{current.title}</h4>
        <p className="text-sm text-gray-400">{current.desc}</p>
      </div>
    </div>
  );
};
