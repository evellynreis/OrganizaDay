import {
  alternativeColor,
  neutralColor,
  primaryDarkColor,
} from "@/src/ui/colors";

import {
  Button,
  Column,
  ContainerScrollable,
  DisplayText,
  Gutter,
  Input,
  RegularText,
} from "@/src/ui/components";

import { useRouter } from "expo-router";
import { Alert, View } from "react-native";

import { useRegister } from "../../hooks/useRegister";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import { FormStep, RegisterFormData } from "../../types";

const registerSteps: FormStep<RegisterFormData>[] = [
  {
    id: "cpf",
    title: "Por favor, nos informe seu CPF",
    subtitle:
      "Para começarmos o seu cadastro precisamos de algumas informações a seu respeito.",
    fields: [
      {
        name: "cpf",
        label: "CPF",
        placeholder: "Digite aqui...",
        keyboardType: "numeric",
        maxLength: 14,
      },
    ],
  },
  {
    id: "name",
    title: "Por favor, nos informe seu nome completo",
    subtitle:
      "Para uma melhor gestão de nossos usuários precisamos saber como te identificar.",
    fields: [
      {
        name: "name",
        label: "Nome",
        placeholder: "Digite aqui...",
      },
    ],
  },
  {
    id: "email",
    title: "Por favor, nos informe seu melhor E-mail",
    subtitle:
      "Estamos quase lá. Agora precisamos saber como entrar em contato em nossos procedimentos.",
    fields: [
      {
        name: "email",
        label: "E-mail",
        placeholder: "Digite aqui...",
        keyboardType: "email-address",
      },
    ],
  },
  {
    id: "password",
    title: "Por favor, crie uma senha",
    subtitle:
      "Sua senha deve ser forte e diferenciada. Evite utilizar seu nome, sobrenome ou dados pessoais.",
    fields: [
      {
        name: "password",
        label: "Senha",
        placeholder: "Digite aqui...",
        secureTextEntry: true,
      },
      {
        name: "confirmPassword",
        label: "Confirmar Senha",
        placeholder: "Confirme sua senha...",
        secureTextEntry: true,
      },
    ],
  },
];

export default function RegisterFormFields() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const {
    currentStepIndex,
    values,
    errors,
    handleChange,
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep,
    prepareRegisterPayload,
  } = useRegisterForm(registerSteps.length);

  const currentStep = registerSteps[currentStepIndex];

  const handleSubmit = () => {
    if (!validateCurrentStep(currentStep.id)) return;

    if (currentStepIndex < registerSteps.length - 1) {
      goToNextStep();
    } else {
      const payload = prepareRegisterPayload();

      register(payload, {
        onSuccess: () => {
          router.replace("/(tabs)/home");
        },
        onError: (error: any) => {
          console.error("Erro ao fazer cadastro:", error);

          if (
            error?.response?.status === 400 ||
            error?.response?.status === 409
          ) {
            Alert.alert("Erro", "E-mail ou CPF já cadastrado.");
          } else {
            Alert.alert(
              "Erro",
              "Estamos com problemas. Tente novamente mais tarde."
            );
          }
        },
      });
    }
  };

  return (
    <ContainerScrollable
      backgroundColor={primaryDarkColor}
      withVerticalPadding="bottom"
      renderFooter={() => (
        <Button
          title={
            currentStepIndex === registerSteps.length - 1
              ? "Finalizar"
              : "Continuar"
          }
          onPress={handleSubmit}
          loading={isPending}
          fill
        />
      )}
    >
      {/* HEADER */}
      <Column mainGap={12}>
        <DisplayText color={alternativeColor}>
          {currentStep.title}
        </DisplayText>

        <RegularText color={neutralColor}>
          {currentStep.subtitle}
        </RegularText>
      </Column>

      {/* CAMPOS */}
      <Column fill mainGap={24}>
        {currentStep.fields.map((field) => (
          <Gutter key={field.name} verticalSpace={8}>
            <RegularText color={neutralColor}>
              {field.label}
            </RegularText>

            <Input
              value={values[field.name] || ""}
              onChangeText={(text) => handleChange(field.name, text)}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              maxLength={field.maxLength}
            />

            {errors[field.name] && (
              <RegularText color={"red"}>
                {errors[field.name]}
              </RegularText>
            )}
          </Gutter>
        ))}
      </Column>
    </ContainerScrollable>
  );
}