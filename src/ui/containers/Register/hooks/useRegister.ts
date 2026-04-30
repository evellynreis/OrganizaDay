import { useMutation } from "@tanstack/react-query";
import { register } from "../../../../infrastructure/api/register.api";

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}