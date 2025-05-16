import { z } from "zod";

const specialChars = /[!@#$%^&*()\-=+[\]{}|;:,.<>?/]/;

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(
      specialChars,
      "Password must contain at least one special character"
    ),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(
      specialChars,
      "Password must contain at least one special character"
    ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(
        specialChars,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(
        specialChars,
        "Password must contain at least one special character"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
