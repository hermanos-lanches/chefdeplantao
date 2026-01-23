# Arquitetura de Segurança e Conformidade (Fase 3)

Para garantir que o **Chef de Plantão** seja uma plataforma de "missão crítica" escalável a nível Brasil, implementamos uma arquitetura de segurança em camadas, focada na proteção de segredos (Stripe), integridade financeira e conformidade com a **LGPD**.

## 1. Proteção de Segredos com Supabase Edge Functions

Diferente de uma aplicação frontend tradicional onde chaves de API poderiam ser expostas, utilizamos **Edge Functions** (Deno runtime) como um middleware seguro:

*   **Isolamento de Chaves:** A `STRIPE_SECRET_KEY` nunca sai do servidor. Ela é armazenada no **Supabase Vault** (criptografado) e injetada apenas no ambiente de execução da Edge Function.
*   **Comunicação Server-to-Server:** O frontend solicita uma ação (ex: `create-checkout`), e a Edge Function valida a sessão do usuário via JWT antes de se comunicar com a API do Stripe.
*   **Webhooks Assinados:** Para atualizar o status de pagamento, o Stripe envia webhooks. Nossa Edge Function valida a **assinatura do webhook** (`Stripe-Signature`) para garantir que a requisição veio realmente do Stripe e não de um atacante tentando forjar um pagamento.

## 2. Integridade Financeira via RLS e Triggers

O banco de dados não é apenas um depósito de dados, mas o guardião da lógica financeira:

*   **Row Level Security (RLS):** 
    *   Nenhum usuário (mesmo autenticado) tem permissão de `INSERT` ou `UPDATE` direto na tabela `wallet_balances`. 
    *   O acesso é restrito a `SELECT` apenas para o próprio dono do perfil (`auth.uid() = profile_id`).
*   **Imutabilidade de Transações:** A tabela `wallet_transactions` é configurada para ser "append-only" para usuários comuns. Eles podem visualizar, mas nunca deletar ou alterar um registro financeiro.
*   **Triggers de Banco de Dados:** O cálculo do saldo é feito via **Database Trigger** no lado do servidor (PostgreSQL). Isso elimina a possibilidade de "Race Conditions" ou manipulação via console do navegador.

## 3. Conformidade com a LGPD (Privacidade por Design)

Para operar legalmente no Brasil, a arquitetura segue os princípios da LGPD:

| Requisito LGPD | Implementação Técnica no Chef de Plantão |
| :--- | :--- |
| **Minimização de Dados** | Coletamos apenas o necessário para a operação (CPF/CNPJ para notas e pagamentos). |
| **Criptografia em Repouso** | Todos os dados no Supabase (PostgreSQL) são criptografados usando AES-256. |
| **Direito ao Acesso/Exclusão** | Implementamos o `ON DELETE CASCADE` entre `auth.users` e `profiles`. Se um usuário deletar sua conta, todos os seus dados pessoais são removidos automaticamente (anonimização técnica). |
| **Segregação de Dados Sensíveis** | Dados de pagamento (cartão de crédito) **nunca** tocam nossos servidores; eles são processados inteiramente dentro da infraestrutura certificada PCI-DSS do Stripe. |
| **Logs de Auditoria** | Cada transação financeira possui um rastro de auditoria vinculado ao `auth.uid()`, permitindo rastrear qualquer anomalia. |

## 4. Fluxo de Dados Seguro (Exemplo: Assinatura)

1.  **Frontend:** Chama `supabase.functions.invoke('create-checkout')`.
2.  **Edge Function:** 
    *   Verifica o JWT do usuário.
    *   Busca o `stripe_customer_id` no banco.
    *   Cria uma `Checkout Session` no Stripe usando a Secret Key protegida.
    *   Retorna apenas a URL segura para o frontend.
3.  **Stripe:** Processa o pagamento em ambiente isolado.
4.  **Webhook:** Stripe avisa nossa Edge Function que o pagamento foi aprovado.
5.  **Edge Function:** Atualiza o `subscription_status` para `active` no banco de dados, liberando o acesso do restaurante.

---
*Este documento serve como base para a certificação de segurança da plataforma e transparência com os usuários.*
