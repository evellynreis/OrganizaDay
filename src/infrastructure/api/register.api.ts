import { apiFetch } from "./apiClient";

type RegisterPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export async function register(data: RegisterPayload) {
  return apiFetch("/register/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
}