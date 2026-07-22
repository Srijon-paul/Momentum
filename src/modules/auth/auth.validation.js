import { z } from "zod";

const registerSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(/[!@#$%^&*]/, "must include atleast one of these special characters (!@#$%^&*)")
    })
    .strict();

export { registerSchema };
