import React from "react";
import { View } from "react-native";
import { Row, RegularText } from "../../components";

import { styles } from "./styles";
import { ScheduleItemProps } from "./types";
import { mutedAccentColor, blackColor, successColor, alternativeColor, neutralColor } from "../../colors";

export default function ScheduleItem({
  title,
  time,
  status = "default",
}: ScheduleItemProps) {
  const getDotColor = () => {
    switch (status) {
      case "success":
        return successColor;
      default:
        return alternativeColor;
    }
  };

  return (
    <Row
      style={[
        styles.container
      ]}
    >
      <Row style={styles.leftContent} mainGap={10}>
        <View
          style={[
            styles.dot,
            { backgroundColor: getDotColor() },
          ]}
        />
        <RegularText color={alternativeColor}>{title}</RegularText>
      </Row>

      <RegularText color={neutralColor}>{time}</RegularText>
    </Row>
  );
}