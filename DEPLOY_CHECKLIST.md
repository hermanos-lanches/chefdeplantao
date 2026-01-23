# Checklist de Lançamento Nacional - Chef de Plantão

Este documento lista as etapas críticas para garantir que o app suporte o tráfego e as exigências legais do mercado brasileiro.

## 1. Infraestrutura e Performance
- [ ] **Supabase Connection Pooling:** Ativar o Supavisor no console do Supabase para suportar picos de conexões.
- [ ] **PostGIS Indexing:** Verificar se os índices GIST estão criados nas colunas de `location` para buscas rápidas.
- [ ] **Vercel Edge Config:** Garantir que as variáveis de ambiente estão configuradas para as regiões `sao1` (São Paulo) para menor latência no Brasil.
- [ ] **Image Optimization:** Validar se o Supabase Storage está servindo imagens via CDN.

## 2. Segurança e Conformidade
- [ ] **Stripe Webhook Secret:** Configurar a chave de assinatura do webhook no ambiente de produção.
- [ ] **LGPD Consent:** Validar se o checkbox de Termos de Uso e Política de Privacidade está bloqueando o cadastro de novos usuários.
- [ ] **SSL/TLS:** Garantir que o domínio oficial possui certificado SSL ativo (HSTS habilitado no `vercel.json`).

## 3. Monitoramento e Suporte
- [ ] **Sentry Integration:** Configurar DSN do Sentry para captura de erros no frontend e backend.
- [ ] **Logflare/Supabase Logs:** Configurar alertas para erros 500 ou latência de banco de dados acima de 500ms.
- [ ] **Customer Support:** Integrar chat de suporte (ex: Crisp ou Intercom) para auxílio no onboarding.

## 4. Testes Finais (QA)
- [ ] **Fluxo de Pagamento:** Realizar uma assinatura real em modo `live` (e estornar) para validar a integração.
- [ ] **Geolocalização:** Testar a busca de vagas simulando diferentes cidades do Brasil via DevTools.
- [ ] **Mobile Responsiveness:** Validar a experiência em dispositivos iOS e Android (foco em telas pequenas).
