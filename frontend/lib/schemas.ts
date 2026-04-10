import { z } from 'zod';

// ── Step 1: Personal Info ──
export const personalInfoSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string().min(14, 'CPF inválido').max(14, 'CPF inválido'),
  email: z.string().email('E-mail inválido'),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;

// ── Step 2: Address ──
export const addressSchema = z.object({
  zipCode: z.string().min(9, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
});

export type AddressData = z.infer<typeof addressSchema>;

// ── Step 3: Phone ──
export const phoneSchema = z.object({
  ddi: z.string().min(1, 'DDI é obrigatório'),
  ddd: z.string().min(2, 'DDD é obrigatório'),
  number: z.string().min(8, 'Número inválido'),
});

export type PhoneData = z.infer<typeof phoneSchema>;

// ── Step 4: Access ──
export const accessSchema = z.object({
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type AccessData = z.infer<typeof accessSchema>;

// ── Full registration schema ──
export const fullRegisterSchema = z.object({
  name: z.string().min(3),
  cpf: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  phones: z.array(phoneSchema).optional(),
  addresses: z.array(addressSchema).optional(),
});

export type FullRegisterData = z.infer<typeof fullRegisterSchema>;

// ── Login ──
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ── Reset Password ──
export const resetPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
