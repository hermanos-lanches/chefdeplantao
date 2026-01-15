import React from 'react';
import { BottomNav } from '../../components/layout/BottomNav.tsx';
import { transactions, currentUser } from '../../lib/mockData.ts';
import { formatCurrency, formatDate } from '../../lib/utils.ts';

export const Wallet: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen pb-24">
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-6 pt-12 pb-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-surface-highlight shadow-sm" style={{ backgroundImage: `url(${currentUser.photoUrl})` }}></div>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Bem-vindo,</p>
            <h3 className="text-sm font-bold leading-tight text-white">{currentUser.name}</h3>
          </div>
        </div>
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-dark border border-white/5 text-white active:scale-95 transition-transform relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></span>
        </button>
      </header>

      <main className="px-4 py-6 flex flex-col gap-6">
        <section className="relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 shadow-lg p-6">
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span className="text-sm font-medium">Saldo Total</span>
              </div>
              <h1 className="text-4xl font-display font-bold tracking-tight text-white mt-1">
                {formatCurrency(1250)}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">payments</span>
                Solicitar Saque
              </button>
              <button className="h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-xl flex items-center justify-center transition-colors border border-white/5">
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold px-1 text-white">Histórico Financeiro</h2>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
            <button className="shrink-0 h-9 px-5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95">
              Todos
            </button>
            <button className="shrink-0 h-9 px-5 bg-surface-dark border border-white/5 text-gray-400 text-sm font-medium rounded-full hover:bg-white/5 hover:text-white transition-colors">
              Entradas
            </button>
            <button className="shrink-0 h-9 px-5 bg-surface-dark border border-white/5 text-gray-400 text-sm font-medium rounded-full hover:bg-white/5 hover:text-white transition-colors">
              Saídas
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          {transactions.map(transaction => (
            <div key={transaction.id} className="group flex items-center justify-between p-4 bg-surface-dark rounded-xl border border-transparent hover:border-white/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                  {transaction.type === 'credit' ? (
                    <span className="material-symbols-outlined">restaurant</span>
                  ) : (
                    <span className="material-symbols-outlined text-gray-400">arrow_outward</span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-white font-bold text-base">{transaction.description}</h4>
                  <p className="text-gray-500 text-xs font-medium">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right flex flex-col gap-0.5 items-end">
                <p className={`font-bold text-base ${transaction.type === 'credit' ? 'text-white' : 'text-white'}`}>
                  {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  transaction.status === 'completed' ? 'text-green-500 bg-green-500/10' : 'text-primary bg-primary/10'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-500' : 'bg-primary animate-pulse'
                  }`}></span> 
                  {transaction.status === 'completed' ? 'Pago' : 'Processando'}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      <BottomNav />
    </div>
  );
};