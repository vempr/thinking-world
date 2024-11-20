import { z } from "zod";

const emailRegex =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginArgs = z.infer<typeof loginSchema>;
