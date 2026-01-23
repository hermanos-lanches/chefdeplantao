-- 1. Criar a função que será executada pelo Trigger
CREATE OR REPLACE FUNCTION handle_profile_verification_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o status mudou para 'verified', define is_verified como TRUE
  IF NEW.verification_status = 'verified' THEN
    NEW.is_verified := TRUE;
  
  -- Se o status mudou para qualquer outro (rejected, pending), define is_verified como FALSE
  -- Isso garante que se um admin desmarcar um usuário, ele perca o acesso imediatamente
  ELSE
    NEW.is_verified := FALSE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Criar o Trigger na tabela profiles
-- Ele será executado ANTES do update (BEFORE UPDATE), o que é mais eficiente
-- pois permite alterar o valor do campo NEW antes dele ser gravado no disco.
DROP TRIGGER IF EXISTS on_verification_status_change ON profiles;

CREATE TRIGGER on_verification_status_change
  BEFORE UPDATE OF verification_status ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_verification_change();

-- 3. Comentário de Auditoria
COMMENT ON FUNCTION handle_profile_verification_change() IS 'Automatiza a flag is_verified com base no status de verificação do perfil.';

-- 4. Instrução para configurar o Webhook no Painel do Supabase:
-- Vá em Database > Webhooks > Create a new webhook
-- Name: send_welcome_email
-- Table: profiles
-- Events: UPDATE
-- Filter: is_verified IS TRUE
-- Type: HTTP Request (POST)
-- URL: https://[SEU-PROJETO].functions.supabase.co/welcome-email
-- Headers: Authorization: Bearer [SUA-ANON-KEY]
