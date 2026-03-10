import { apiFetch } from "./apiClient";

export async function register(nome: string, dateBirthday: string, email: string, password: string) {
  return apiFetch("/register/user", {
    method: "POST",
    body: JSON.stringify({
      nome,
      dateBirthday,
      email,
      password
    }),
  });
}