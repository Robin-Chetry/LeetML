import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters"),

    emailId: z
    .string()
    .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );


export const loginSchema = z.object({
  emailId: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});