import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  lastname: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres' }),
  phoneNumber: z.string().regex(/^\d{9}$/, { message: 'El número de teléfono debe tener 9 dígitos' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido' }),
  description: z.string().min(6, { message: 'El tratamiento debe tener al menos 6 caracteres' }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});
