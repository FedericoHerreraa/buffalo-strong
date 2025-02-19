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
    cuit: z.string().min(11, "El mensaje debe tener al menos 11 caracteres"),
  });
  
export type RegisterFormData = z.infer<typeof registerSchema>;