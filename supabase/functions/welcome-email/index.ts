import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // O Supabase Webhook envia um payload contendo 'record' (novo dado) e 'old_record'
    const { record, old_record } = await req.json()

    // Lógica: Só envia se is_verified mudou de FALSE para TRUE
    if (record.is_verified === true && old_record.is_verified === false) {
      
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Chef de Plantão <boasvindas@chefdeplantao.com.br>',
          to: [record.email],
          subject: '🎉 Parabéns! Seu perfil foi verificado no Chef de Plantão',
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h1>Olá, ${record.name}!</h1>
              <p>Temos ótimas notícias: <strong>seu perfil foi verificado com sucesso!</strong></p>
              <p>Agora você já pode visualizar todos os detalhes das vagas e começar a aceitar plantões na nossa plataforma.</p>
              <br />
              <a href="https://chefdeplantao.com.br/freelancer/dashboard" 
                 style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Ver Vagas Disponíveis
              </a>
              <br /><br />
              <p>Seja bem-vindo à elite da gastronomia sob demanda!</p>
              <p>Equipe Chef de Plantão</p>
            </div>
          `,
        }),
      })

      const data = await res.json()
      return new Response(JSON.stringify(data), { status: 200 })
    }

    return new Response(JSON.stringify({ message: 'No action needed' }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
