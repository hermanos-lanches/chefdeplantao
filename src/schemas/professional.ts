import { z } from 'zod';

export const professionalOnboardingSchema = z.object({
  name: z.string().min(3, 'Nome completo é obrigatório'),
  phone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido (DDD + número)'),
  document_id: z.string().min(11, 'CPF inválido').max(14, 'Documento inválido'),
  specialties: z.array(z.enum(['cozinha', 'salao', 'caixa', 'manutencao'])).min(1, 'Selecione pelo menos uma especialidade'),
  bio: z.string().max(500, 'A bio deve ter no máximo 500 caracteres'),
  address: z.object({
    text: z.string().min(5, 'Endereço completo é obrigatório'),
    lat: z.number(),
    lng: z.number(),
  }),
});

export type ProfessionalOnboardingInput = z.infer<typeof professionalOnboardingSchema>;
