import { scaleSize } from "@/src/utils/responsive";
import styled from "@/src/utils/styled";
import { useRouter } from "expo-router";
import { StatusBar, View } from "react-native";
import { alternativeColor, neutralColor, primaryDarkColor, primaryMediumColor } from "../../colors";
import {
  Button,
  Column,
  Container,
  DisplayText,
  Image,
  RegularText,
  Space,
} from "../../components";

export const HeaderBackground = styled(View, {
  marginHorizontal: scaleSize(-24),
});

export function WelcomeContainer() {
  const router = useRouter();

  return (
    <Container backgroundColor={primaryDarkColor}>
      <HeaderBackground>
        <Image
          source={require("../../../../assets/images/header.jpg")}
          height={scaleSize(370)}
          contentFit="cover"
        />
      </HeaderBackground>
      <Space size={8} />
      <Column fill mainGap={32}>
        <Column mainGap={12}>
          <DisplayText textAlign="center" color={alternativeColor}>Seja bem-vindo(a)</DisplayText>
          <RegularText textAlign="center" color={neutralColor}>Gerencie seus gastos e compromissos de forma simples, segura e eficiente.</RegularText>
        </Column>
      </Column>
      <Column fill mainGap={32}>
        <Column mainGap={12}>
          <Button title="Criar conta" onPress={() => console.log("Criar conta")} fill />
          <Button title="Já tenho conta" onPress={() => router.push("/no-auth/login")} fill />
        </Column>
      </Column>

      <RegularText textAlign="center" color={neutralColor}>Versão 1.0.0</RegularText>
    </Container>
  );
}
