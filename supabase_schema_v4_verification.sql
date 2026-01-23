-- Tabela de Documentos (Armazenamento de referências para o Storage)
CREATE TABLE IF NOT EXISTS profile_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('identity_front', 'identity_back', 'selfie')),
  file_path TEXT NOT NULL, -- Caminho no Supabase Storage
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de Logs de Verificação (Auditoria)
CREATE TABLE IF NOT EXISTS verification_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  service_provider TEXT NOT NULL, -- 'idwall', 'serasa', 'manual'
  external_id TEXT, -- ID da transação no provedor
  result_status TEXT NOT NULL, -- 'approved', 'rejected', 'manual_review'
  raw_response JSONB, -- Resposta completa da API para auditoria
  admin_notes TEXT, -- Notas caso seja revisão manual
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE profile_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Apenas o dono e admins podem ver documentos
CREATE POLICY "Users can manage their own documents" ON profile_documents
  FOR ALL USING (auth.uid() = profile_id);

-- Configuração do Storage (Bucket Seguro)
-- Nota: O bucket 'documents' deve ser configurado como PRIVADO no console do Supabase
-- Apenas Edge Functions ou Admins devem ter acesso de leitura global
