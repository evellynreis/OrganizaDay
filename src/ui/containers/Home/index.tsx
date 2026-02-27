import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  alternativeColor,
  neutralColor,
  primaryColor,
  primaryDarkColor,
  secundaryDarkColor,
} from "../../colors";
import {
  Button,
  Column,
  ContainerScrollable,
  RegularText,
  SubtitleText,
  TitleText,
} from "../../components";

import Card from "../../components/Card";
import ScheduleItem from "../../components/ScheduleItem";
import SideMenu from "../../components/SideMenu";

import { scaleSize } from "../../../utils/responsive";

export default function HomeContainer() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryDarkColor }}>
      <View style={{ flex: 1 }}>
        <SideMenu />

        <ContainerScrollable
          backgroundColor={primaryDarkColor}
          style={{
            paddingHorizontal: scaleSize(20),
            paddingTop: scaleSize(70),
            paddingBottom: scaleSize(32),
          }}
          renderFooter={() => (
            <Column mainGap={14} style={{ marginTop: scaleSize(24) }}>
              <Button
                title="Adicionar Gastos"
                onPress={() => console.log("Adicionar gastos")}
                fill
              />
              <Button
                title="Adicionar Compromissos"
                onPress={() => console.log("Adicionar compromissos")}
                fill
              />
            </Column>
          )}
        >
          <Column mainGap={14}>
            <Card padding={18} backgroundColor={secundaryDarkColor}>
              <Column mainGap={6}>
                <SubtitleText color={alternativeColor}>
                  Saldo do Mês
                </SubtitleText>
                <TitleText color={primaryColor}>R$ 1950,00</TitleText>
              </Column>
            </Card>
          </Column>

          <Column mainGap={14} style={{ marginTop: scaleSize(18) }}>
            <Card padding={18} backgroundColor={secundaryDarkColor}>
              <Column mainGap={6}>
                <SubtitleText color={alternativeColor}>Previstos</SubtitleText>
                <TitleText color={primaryColor}>R$ 950,00</TitleText>
              </Column>
            </Card>
          </Column>

          <Column mainGap={14} style={{ marginTop: scaleSize(18) }}>
            <Card padding={18} backgroundColor={secundaryDarkColor}>
              <Column mainGap={6}>
                <SubtitleText color={alternativeColor}>
                  Total Gasto
                </SubtitleText>
                <TitleText color={primaryColor}>R$ 950,00</TitleText>
              </Column>
            </Card>

            <Card padding={18} backgroundColor={secundaryDarkColor}>
              <Column mainGap={18}>
                <Column>
                  <SubtitleText color={alternativeColor}>
                    Próximos compromissos
                  </SubtitleText>
                  <RegularText color={neutralColor}>12 Out</RegularText>
                </Column>

                <Column mainGap={14}>
                  <ScheduleItem
                    title="Psicólogo"
                    time="14:30"
                    status="success"
                  />
                  <ScheduleItem
                    title="Dentista"
                    time="08:43"
                    status="default"
                  />
                  <ScheduleItem
                    title="Assinatura de contrato"
                    time="08:02"
                    status="default"
                  />
                </Column>
              </Column>
            </Card>
          </Column>
        </ContainerScrollable>
      </View>
    </SafeAreaView>
  );
}
