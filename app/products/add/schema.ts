import {z} from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(10)
    .max(50),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
});

export type ProductType = z.infer<typeof productSchema>;
