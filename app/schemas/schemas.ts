import * as z from "zod";


export const contactSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Debe ser un email válido"),
    subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});
  
export type ContactFormData = z.infer<typeof contactSchema>;


export const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: z.string().email("Debe ser un email válido"),
    address: z.string().min(5, "La direccion debe tener al menos 5 caracteres"),
    cuit: z.string().min(11, "El cuit debe tener al menos 11 caracteres"),
    cuit2: z.string().min(11, "El cuit debe tener al menos 11 caracteres"),
});
  
export type RegisterFormData = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


export const registerAdminSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  address: z.string().min(5, "La direccion debe tener al menos 5 caracteres"),
  cuit: z.string().min(11, "El mensaje debe tener al menos 11 caracteres"),
});

export type RegisterAdminFormData = z.infer<typeof registerAdminSchema>;


export const sendRegisterEmailSchema = z.object({
  to: z.string().email("Debe ser un email válido"),
  subject: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  body: z.string().min(10, "La contraseña debe tener al menos 10 caracteres"),
});

export type SendRegisterEmailData = z.infer<typeof sendRegisterEmailSchema>;