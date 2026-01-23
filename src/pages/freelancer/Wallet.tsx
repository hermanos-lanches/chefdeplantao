import React, { useState, useEffect } from 'react';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { authService } from '../../lib/authService.ts';
import { transactionsService } from '../../lib/transactionsService.ts';
import { formatCurrency, formatDate, cn } from '../../lib/utils.ts';
import { Bell, Wallet as WalletIcon, QrCode, ArrowUpRight, Utensils, ChevronRight, Loader2 } from 'lucide-react';
import { User, Transaction } from '../../types';

export const Wallet: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const data = await transactionsService.getMyTransactions(currentUser.id);
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error loading wallet data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalBalance = transactions.reduce((acc, t) => 
    t.type === 'credit' ? acc + t.amount : acc - t.amount, 0
  );

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-32 relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl px-6 pt-14 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-3xl overflow-hidden border border-white/10">
            <img 
              src={user?.photoUrl || 'https://i.pravatar.cc/150?u=thiago'} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-400">Bem-vindo,</span>
            <h1 className="text-xl font-bold text-white">Chef {user?.name.split(' ')[0] || 'Thiago'}</h1>
          </div>
        </div>
        <button className="relative h-12 w-12 flex items-center justify-center rounded-3xl bg-card border border-white/5">
          <Bell size={22} className="text-gray-300" />
          <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card"></span>
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Balance Card */}
        <section className="relative overflow-hidden rounded-[32px] bg-card border border-white/5 shadow-2xl p-8">
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-gray-400">
                <WalletIcon size={18} />
                <span className="text-sm font-bold">Saldo Total</span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-white">
                {formatCurrency(totalBalance || 1250)}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button fullWidth variant="primary" size="lg" className="rounded-2xl h-16 text-lg">
                Solicitar Saque
              </Button>
              <Button variant="secondary" size="icon" className="rounded-2xl h-16 w-16 shrink-0">
                <QrCode size={24} />
              </Button>
            </div>
          </div>
        </section>

        {/* Weekly Chart Placeholder */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Ganhos Semanais</h2>
            <button className="text-sm font-bold text-primary flex items-center gap-1">
              Ver detalhes <ChevronRight size={16} />
            </button>
          </div>
          <div className="bg-card/50 rounded-3xl border border-white/5 p-6 h-40 flex items-end justify-between gap-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-3 flex-1">
                <div 
                  className={cn(
                    "w-full rounded-t-lg transition-all duration-500",
                    day === 'Sex' ? "bg-primary" : "bg-white/10",
                    i === 0 && "h-12",
                    i === 1 && "h-8",
                    i === 2 && "h-16",
                    i === 3 && "h-10",
                    i === 4 && "h-24",
                    i === 5 && "h-14",
                    i === 6 && "h-6",
                  )}
                ></div>
                <span className={cn("text-[10px] font-bold", day === 'Sex' ? "text-primary" : "text-gray-500")}>{day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white">Histórico Financeiro</h2>
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            {['Todos', 'Entradas', 'Saídas', 'Pendentes'].map((filter, i) => (
              <button 
                key={filter}
                className={cn(
                  "shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  i === 0 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-card border border-white/5 text-gray-400 hover:text-white"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {transactions.length > 0 ? transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-5 bg-card rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5 group-hover:bg-white/10 transition-colors">
                    {transaction.type === 'credit' ? (
                      <Utensils size={24} className="text-gray-300" />
                    ) : (
                      <ArrowUpRight size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-base">{transaction.description}</h4>
                    <p className="text-gray-500 text-xs font-bold">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-bold text-lg text-white">
                    {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'success' : 'primary'}
                    className="rounded-lg px-2 py-0.5"
                  >
                    {transaction.status === 'completed' ? 'Pago' : 'Em Processamento'}
                  </Badge>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <p className="text-gray-500 font-bold">Nenhuma transação encontrada.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};
