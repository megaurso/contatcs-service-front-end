import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório!"),
  email: z.string().email("Email não é valido").nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
  telephone: z.string().nonempty("Por favor insira um numero de telefone"),
});

export const loginSchema = userSchema.omit({
  name: true,
  telephone: true,
});

export type UserData = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
