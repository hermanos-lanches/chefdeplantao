-- Tabela de Transações (Livro Razão)
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  job_id UUID REFERENCES jobs(id), -- Opcional, para transações vinculadas a jobs
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  category TEXT NOT NULL CHECK (category IN ('job_payment', 'payout', 'referral', 'adjustment')),
  amount_cents INTEGER NOT NULL, -- Sempre em centavos
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Saldos (Cache para performance, atualizada via triggers)
CREATE TABLE IF NOT EXISTS wallet_balances (
  profile_id UUID REFERENCES profiles(id) PRIMARY KEY,
  balance_cents INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_balances ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view their own transactions" ON wallet_transactions
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can view their own balance" ON wallet_balances
  FOR SELECT USING (auth.uid() = profile_id);

-- Função para atualizar o saldo automaticamente após uma transação completada
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.status = 'completed') THEN
    INSERT INTO wallet_balances (profile_id, balance_cents, updated_at)
    VALUES (
      NEW.profile_id, 
      CASE WHEN NEW.type = 'credit' THEN NEW.amount_cents ELSE -NEW.amount_cents END,
      NOW()
    )
    ON CONFLICT (profile_id) DO UPDATE SET
      balance_cents = wallet_balances.balance_cents + 
        (CASE WHEN NEW.type = 'credit' THEN NEW.amount_cents ELSE -NEW.amount_cents END),
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_balance
AFTER INSERT OR UPDATE OF status ON wallet_transactions
FOR EACH ROW EXECUTE FUNCTION update_wallet_balance();
