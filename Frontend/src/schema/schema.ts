import { z } from "zod";

export const FormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Required atleast 2 chracters." })
      .max(50, { message: "Name is not more that 50 charters." })
      .regex(/^[a-zA-Z\s]+$/, { message: "Name only have letters & spaces." })
      .nonempty({ message: "Name is required." }),

    email: z
      .string()
      .trim()
      .min(2)
      .max(50)
      .email({ message: "Please enter a valid email address." })
      .nonempty({ message: "Email is required." }),

    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be 6 charcters long." })
      .max(12, { message: "Password is not more than 12 chracters." })
      .regex(/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message: "Password must include upper,lower,capital,special characters.",
      })
      .nonempty({ message: "Password is required." }),

    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be 6 charcters long." })
      .max(12, { message: "Password is not more than 12 chracters." })
      .nonempty({ message: "Password is required." }),
  })
  .refine((pass) => pass.password === pass.confirmPassword);

//login schema
export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),

  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be 6 charcters long." })
    .max(12, { message: "Password is not more than 12 chracters." })
    .regex(/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must include upper,lower,capital,special characters.",
    })
    .nonempty({ message: "Password is required." }),
});


//forgot-password
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .email({ message: "Please enter a valid email address." })
    .nonempty({ message: "Email is required." }),
})

//reset-password
export const ResetPasswordSchema = z.object({
  password: z
  .string()
  .trim()
  .min(6, { message: "Password must be 6 charcters long." })
  .max(12, { message: "Password is not more than 12 chracters." })
  .regex(/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: "Password must include upper,lower,capital,special characters.",
  })
  .nonempty({ message: "Password is required." }),

confirmPassword: z
  .string()
  .trim()
  .min(6, { message: "Password must be 6 charcters long." })
  .max(12, { message: "Password is not more than 12 chracters." })
  .nonempty({ message: "Password is required." }),
}).refine((pass) => pass.password === pass.confirmPassword);

export type FormSchemaType = z.infer<typeof FormSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
