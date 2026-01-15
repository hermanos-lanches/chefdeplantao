import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Phone, Plus, Send, Smile } from 'lucide-react';

export const Chat: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col">
      {/* App Bar */}
      <header className="bg-surface-dark border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="relative">
             <img src="https://i.pravatar.cc/150?u=ricardo" className="h-10 w-10 rounded-full border border-white/10" alt="Ricardo" />
             <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-surface-dark"></div>
          </div>
          <div>
            <h2 className="font-bold text-sm">Ricardo Santos</h2>
            <p className="text-xs text-primary">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Phone size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 p-4 space-y-6 overflow-y-auto bg-[#131315]">
        
        <div className="flex justify-center">
          <span className="bg-surface-highlight text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Hoje, 10:45
          </span>
        </div>

        {/* Incoming Message */}
        <div className="flex flex-col items-start max-w-[80%]">
          <div className="bg-surface-highlight text-gray-200 p-4 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
            <p className="text-sm leading-relaxed">Oi Ricardo, aguardando seu plantão hoje à noite.</p>
          </div>
          <span className="text-[10px] text-gray-500 mt-1 ml-1">10:45</span>
        </div>

        {/* Self Message */}
        <div className="flex flex-col items-end max-w-[80%] ml-auto">
          <div className="bg-surface-highlight text-gray-200 p-4 rounded-2xl rounded-tr-none border border-white/5 shadow-sm">
            <p className="text-sm leading-relaxed">Por favor, traga seu uniforme.</p>
          </div>
          <div className="flex items-center gap-1 mt-1 mr-1">
             <span className="text-[10px] text-gray-500">10:46</span>
             <span className="material-symbols-outlined text-[12px] text-primary">done_all</span>
          </div>
        </div>

        {/* Incoming Message (Long) */}
        <div className="flex flex-col items-start max-w-[85%]">
          <div className="bg-primary text-white p-4 rounded-2xl rounded-tl-none shadow-lg shadow-primary/10">
            <p className="text-sm leading-relaxed">Olá! Sim, está tudo pronto. Chego aí às 18h.</p>
          </div>
          <span className="text-[10px] text-gray-500 mt-1 ml-1">10:48</span>
        </div>

         {/* Incoming Message */}
         <div className="flex flex-col items-start max-w-[85%]">
          <div className="bg-primary text-white p-4 rounded-2xl rounded-tl-none shadow-lg shadow-primary/10">
            <p className="text-sm leading-relaxed">Devo me apresentar ao Chef de Cozinha primeiro?</p>
          </div>
          <span className="text-[10px] text-gray-500 mt-1 ml-1">10:48</span>
        </div>

        {/* Self Message */}
        <div className="flex flex-col items-end max-w-[80%] ml-auto">
          <div className="bg-surface-highlight text-gray-200 p-4 rounded-2xl rounded-tr-none border border-white/5 shadow-sm">
            <p className="text-sm leading-relaxed">Sim, procure o Chef Marco na entrada de serviço.</p>
          </div>
          <div className="flex items-center gap-1 mt-1 mr-1">
             <span className="text-[10px] text-gray-500">10:52</span>
             <span className="material-symbols-outlined text-[12px] text-gray-500">done</span>
          </div>
        </div>

      </main>

      {/* Input Area */}
      <div className="p-4 bg-background-dark border-t border-white/5">
        <div className="flex items-center gap-3">
          <button className="h-12 w-12 rounded-full bg-surface-highlight flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors">
            <Plus size={24} />
          </button>
          
          <div className="flex-1 bg-surface-highlight rounded-full h-12 flex items-center px-4 border border-white/5 focus-within:border-primary/50 transition-colors">
            <input 
              type="text" 
              placeholder="Digite sua mensagem..." 
              className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm w-full"
            />
            <button className="text-gray-500 hover:text-white">
              <Smile size={20} />
            </button>
          </div>

          <button className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors active:scale-95">
            <Send size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};