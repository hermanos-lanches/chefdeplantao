import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const jobSchema = z.object({
  role: z.string().min(2, 'Cargo é obrigatório'),
  price: z.number().positive('O preço deve ser maior que zero'),
  date_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data e hora inválidas",
  }),
  duration: z.string().min(1, 'Duração é obrigatória'),
  location: z.string().min(5, 'Localização detalhada é obrigatória'),
  specialty: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type JobInput = z.infer<typeof jobSchema>;
