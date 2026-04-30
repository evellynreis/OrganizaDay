import { z } from "zod";
import { RegisterFormData } from "./types";

export const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  if (numericValue.length <= 3) {
    return numericValue;
  } else if (numericValue.length <= 6) {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  } else if (numericValue.length <= 9) {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
  } else {
    return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
  }
};

const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
};

const cpfSchema = z.object({
  cpf: z
    .string({
      required_error: "CPF é obrigatório",
    })
    .refine(
      (val) => {
        const clean = val.replace(/\D/g, "");
        return clean.length === 11;
      },
      {
        message: "CPF deve ter 11 dígitos",
      }
    )
    .refine(validateCPF, {
      message: "CPF inválido",
    }),
});

const nameSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .trim()
    .min(3, "Informe seu nome completo"),
});

const emailSchema = z.object({
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email("E-mail inválido"),
});

const passwordSchema = z
  .object({
    password: z
      .string({
        required_error: "Senha é obrigatória",
      })
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Pelo menos uma letra maiúscula",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Pelo menos uma letra minúscula",
      })
      .refine((val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), {
        message: "Pelo menos um símbolo",
      }),
    confirmPassword: z.string({
      required_error: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const getStepSchema = (stepId: string) => {
  switch (stepId) {
    case "cpf":
      return cpfSchema;

    case "name":
      return nameSchema;

    case "email":
      return emailSchema;

    case "password":
      return passwordSchema;

    default:
      return z.object({});
  }
};

export const validateStep = (
  stepId: string,
  values: Partial<RegisterFormData>
): Partial<Record<keyof RegisterFormData, string>> => {
  const schema = getStepSchema(stepId);

  const result = schema.safeParse(values);

  if (result.success) {
    return {};
  }

  const errors: Partial<Record<keyof RegisterFormData, string>> = {};

  result.error.issues.forEach((error) => {
    const field = error.path[0] as keyof RegisterFormData;

    if (!field) return;

    if (stepId === "password" && field === "password") return;

    errors[field] = error.message;
  });

  return errors;
};