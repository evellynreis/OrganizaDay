import { View } from "react-native";
import { RegularText } from "../../components/text";
import { ContainerScrollable } from "../../components";

export default function HomeContainer() {
  return (
    <ContainerScrollable>
      <RegularText>Hello Word</RegularText>
    </ContainerScrollable>
  );
}
