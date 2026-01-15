import { z } from "zod";
export const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Product Name is required"),
    price: z.number(),
    description: z.string(),
    stock: z.number(),
  }),
});
