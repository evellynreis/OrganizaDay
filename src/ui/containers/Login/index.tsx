import { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

import { scaleSize } from "@/src/utils/responsive";
import styled from "@/src/utils/styled";

import {
  alternativeColor,
  neutralColor,
  primaryDarkColor,
  primaryColor,
  errorColor,
} from "../../colors";

import {
  Button,
  Column,
  ContainerScrollable,
  DisplayText,
  Gutter,
  Image,
  RegularText,
  Space,
} from "../../components";

import LoginFormFields from "./content/FormFields";
import { login } from "@/src/infrastructure/api/auth.api";

export const HeaderBackground = styled(View, {
  marginHorizontal: scaleSize(-24),
});

interface Login {
  email: string;
  password: string;
}

export function LoginContainer() {
  const router = useRouter();

  const [values, setValues] = useState<Login>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Login>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function handleChange(field: keyof Login, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const newErrors: Partial<Login> = {};

    if (!values.email) newErrors.email = "E-mail é obrigatório";
    if (!values.password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    setGeneralError(null);

    if (!validate()) return;

    try {
      setIsPending(true);

      await login(values.email, values.password);

      router.replace("/home");

    } catch (error: any) {
      setGeneralError(error.message || "Erro ao realizar login.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <ContainerScrollable backgroundColor={primaryDarkColor}>
      <HeaderBackground>
        <Image
          source={require("../../../../assets/images/header.jpg")}
          height={scaleSize(280)}
          contentFit="cover"
        />
      </HeaderBackground>

      <Space size={8} />

      <Column fill mainGap={32}>
        <Column mainGap={12}>
          <DisplayText color={alternativeColor}>Seja bem-vindo(a)
            <DisplayText color={primaryColor}> de volta! </DisplayText>
          </DisplayText>
          <RegularText color={neutralColor}>
            Insira suas credenciais para gerenciar suas solicitações
          </RegularText>
        </Column>
      </Column>
      <Space size={8} />

      <Column fill mainGap={24}>
        <LoginFormFields
          values={values}
          onChange={handleChange}
          errors={errors}
        />

        {generalError && (
          <Gutter>
            <RegularText color={errorColor} textAlign="center">
              {generalError}
            </RegularText>
          </Gutter>
        )}

        <RegularText textAlign="right" color={primaryColor}>
          Esqueceu sua senha?
        </RegularText>

        <Button
          title="Entrar"
          onPress={handleSubmit}
          loading={isPending}
          fill
        />
        <RegularText.SemiBold textAlign="center" color={neutralColor}>
          Novo por aqui?{" "}
          <RegularText color={alternativeColor}>
            Cadastre-se agora!
          </RegularText>
        </RegularText.SemiBold>
      </Column>
    </ContainerScrollable>
  );
}