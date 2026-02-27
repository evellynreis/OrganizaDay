import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { neutralColor, primaryColor, primaryDarkColor } from "../../colors";
import {
  Button,
  Column,
  ContainerScrollable,
  RegularText,
  Row,
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
            paddingHorizontal: scaleSize(16),
            paddingTop: scaleSize(60),
            paddingBottom: scaleSize(24),
          }}
          renderFooter={() => (
            <Column mainGap={12} style={{ marginTop: scaleSize(16) }}>
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
          <Column mainGap={12}>
            <Card padding={16}>
              <Column mainGap={6}>
                <RegularText>Saldo do Mês</RegularText>
                <RegularText color={primaryColor}>
                  R$ 1950,00
                </RegularText>
              </Column>
            </Card>

            <Card padding={16}>
              <Column mainGap={6}>
                <RegularText>Previstos</RegularText>
                <RegularText color={primaryColor}>
                  R$ 950,00
                </RegularText>
              </Column>
            </Card>
          </Column>

          <Column mainGap={12} style={{ marginTop: scaleSize(12) }}>
            <Card padding={16}>
              <Column mainGap={6}>
                <RegularText>Total Gasto</RegularText>
                <RegularText color={primaryColor}>
                  R$ 950,00
                </RegularText>
              </Column>
            </Card>

            <Card padding={16}>
              <Column mainGap={16}>
                <Row>
                  <Column>
                    <RegularText>Próximos</RegularText>
                    <RegularText>compromissos</RegularText>
                    <RegularText color={neutralColor}>
                      12 Out
                    </RegularText>
                  </Column>
                </Row>

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