import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  alternativeColor,
  errorColor,
  neutralColor,
  neutralLightColor,
  primaryLightColor,
} from "../../../../colors";

import { Column, Gutter, Input, RegularText } from "../../../../components";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormFieldsProps {
  values: LoginFormValues;
  onChange: (field: keyof LoginFormValues, value: string) => void;
  errors?: Partial<Record<keyof LoginFormValues, string>>;
}

export default function LoginFormFields({
  values,
  onChange,
  errors,
}: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Column mainGap={16}>
      <Gutter verticalSpace={8}>
        <RegularText color={neutralColor}>E-mail</RegularText>

        <Input
          value={values.email}
          onChangeText={(value) => onChange("email", value)}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          backgroundColor={primaryLightColor}
          borderColor={neutralLightColor}
          placeholderTextColor={neutralColor}
          textColor={alternativeColor}
        />

        {errors?.email && (
          <RegularText color={errorColor}>
            {errors.email}
          </RegularText>
        )}
      </Gutter>

      <Gutter verticalSpace={8}>
        <RegularText color={neutralColor}>Senha</RegularText>

        <Input
          value={values.password}
          onChangeText={(value) => onChange("password", value)}
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          backgroundColor={primaryLightColor}
          borderColor={neutralLightColor}
          placeholderTextColor={neutralColor}
          textColor={alternativeColor}
          rightIcon={{
            icon: () => (
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={neutralColor}
              />
            ),
            onPress: togglePasswordVisibility,
          }}
        />

        {errors?.password && (
          <RegularText color={errorColor}>
            {errors.password}
          </RegularText>
        )}
      </Gutter>
    </Column>
  );
}