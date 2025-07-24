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
  role: z.string().min(4, "El rol debe tener al menos 4 caracteres"),
});

export type RegisterAdminFormData = z.infer<typeof registerAdminSchema>;


export const sendRegisterEmailSchema = z.object({
  to: z.string().email("Debe ser un email válido"),
  subject: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  body: z.string().min(10, "La contraseña debe tener al menos 10 caracteres"),
});

export type SendRegisterEmailData = z.infer<typeof sendRegisterEmailSchema>;

export const createProductFormSchema = z.object({
  title: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  sugestedPrice: z.string()
    .min(1, "El precio sugerido es requerido")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Debe ser un número mayor a 0"),
  listPrice: z.string()
    .min(1, "El precio de lista es requerido")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Debe ser un número mayor a 0"),
  brand: z.string().min(3, "La marca debe tener al menos 3 caracteres"),
  img: z.any().optional(), 
  listCode: z.string()
    .min(1, "El código de lista es requerido")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Debe ser un número mayor a 0"),
  category: z.string().min(3, "La categoría debe tener al menos 3 caracteres"),
  color: z.string().min(3, "El color debe tener al menos 3 caracteres"),
  stock: z.string()
    .min(1, "El stock es requerido")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, "Debe ser un número mayor o igual a 0"),
  subcategory: z.string().optional(), 
});

export type CreateProductFormData = z.infer<typeof createProductFormSchema>;

export const createProductDBSchema = z.object({
  title: z.string(),
  description: z.string(),
  sugestedPrice: z.number(),
  listPrice: z.number(),
  brand: z.string(),
  img: z.array(z.string()), 
  listCode: z.number(),
  category: z.string(),
  color: z.string(),
  stock: z.number(),
  group: z.string(),
  subcategory: z.string().optional(),
});

export type CreateProductDBData = z.infer<typeof createProductDBSchema>;