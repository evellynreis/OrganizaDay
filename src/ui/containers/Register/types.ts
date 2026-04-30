import { KeyboardTypeOptions } from "react-native";

export type RegisterFormData = {
  cpf: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ValidationRule = {
  check: (value: string) => boolean;
  message: string;
};

export type FieldDefinition<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  maxLength?: number;
  required?: boolean;
  format?: (value: string) => string;
  validate?: (value: string, allValues?: Partial<T>) => string | null;
  customValidations?: ValidationRule[];
};

export type FormStep<T> = {
  id: string;
  title: string;
  subtitle: string;
  fields: FieldDefinition<T>[];
  validate?: (values: Partial<T>) => Partial<Record<keyof T, string>> | null;
  onSubmit?: (values: Partial<T>) => void | Promise<void>;
  contentRender?: (values: Partial<T>) => React.ReactNode;
};
