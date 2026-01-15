import { z } from "zod";
import { IRole } from "../user/user.interface";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().min(6, "Must Give Phone Number"),
    address: z.string(),
    role: z.nativeEnum(IRole),
    isVerified: z.boolean().default(true),
  }),
});
