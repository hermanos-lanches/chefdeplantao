-- Habilitar extensão PostGIS para geolocalização escalável
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabela de Perfis (Extensão do Auth.Users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('restaurant', 'professional')),
  photo_url TEXT,
  phone TEXT,
  document_id TEXT, -- CPF ou CNPJ
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'in_review', 'verified', 'rejected')),
  
  -- Campos para Restaurantes
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'past_due', 'canceled')),
  stripe_customer_id TEXT,
  
  -- Localização (PostGIS point)
  location GEOGRAPHY(POINT, 4326),
  address_text TEXT,
  
  rating DECIMAL(3,2) DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Vagas (Jobs)
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID REFERENCES profiles(id) NOT NULL,
  role TEXT NOT NULL, -- 'cozinha', 'salao', 'caixa', 'manutencao'
  price_cents INTEGER NOT NULL, -- Armazenar em centavos para evitar erros de precisão
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_hours DECIMAL(4,2) NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  address_text TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'completed', 'cancelled')),
  freelancer_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Políticas de Segurança (RLS)
-- 1. Perfis: Usuários podem ver perfis públicos, mas só editar o seu próprio
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Vagas: Apenas restaurantes com assinatura ATIVA podem criar vagas
CREATE POLICY "Jobs viewable by verified professionals" ON jobs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND (role = 'professional' OR id = jobs.restaurant_id)
  )
);

CREATE POLICY "Active restaurants can create jobs" ON jobs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'restaurant' AND subscription_status = 'active'
  )
);

-- Função para busca por proximidade (Estilo Uber)
CREATE OR REPLACE FUNCTION get_nearby_jobs(lat FLOAT, lng FLOAT, radius_meters FLOAT)
RETURNS SETOF jobs AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM jobs
  WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography, radius_meters)
  AND status = 'available'
  ORDER BY ST_Distance(location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
