import { neutralColor, primaryColor } from "../../colors";
import {
  Button,
  Column,
  ContainerScrollable,
  RegularText,
  Row,
} from "../../components";
import Card from "../../components/Card";
import ScheduleItem from "../../components/ScheduleItem";

export default function HomeContainer() {
  return (
    <ContainerScrollable
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
      }}
      renderFooter={() => (
        <Column mainGap={12} style={{ marginTop: 16 }}>
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
            <RegularText color={primaryColor}>R$ 1950,00</RegularText>
          </Column>
        </Card>

        <Card padding={16}>
          <Column mainGap={6}>
            <RegularText>Previstos</RegularText>
            <RegularText color={primaryColor}>R$ 950,00</RegularText>
          </Column>
        </Card>
      </Column>

      <Column mainGap={12}>
        <Card padding={16}>
          <Column mainGap={6}>
            <RegularText>Total Gasto</RegularText>
            <RegularText color={primaryColor}>R$ 950,00</RegularText>
          </Column>
        </Card>

        <Card padding={16}>
          <Column mainGap={16}>
            <Row>
              <Column>
                <RegularText>Próximos</RegularText>
                <RegularText>compromissos</RegularText>
                <RegularText color={neutralColor}>12 Out</RegularText>
              </Column>
            </Row>

            <Column mainGap={14}>
              <ScheduleItem title="Psicólogo" time="14:30" status="success" />
              <ScheduleItem title="Dentista" time="08:43" status="default" />
              <ScheduleItem title="Assinatura de contrato" time="08:02" status="default" />
            </Column>
          </Column>
        </Card>
      </Column>
    </ContainerScrollable>
  );
}
