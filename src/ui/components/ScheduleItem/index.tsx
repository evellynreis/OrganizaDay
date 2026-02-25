import React from "react";
import { View } from "react-native";
import { Row, RegularText } from "../../components";

import { styles } from "./styles";
import { ScheduleItemProps } from "./types";
import { mutedAccentColor, blackColor, successColor } from "../../colors";

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
        return blackColor;
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
        <RegularText>{title}</RegularText>
      </Row>

      <RegularText>{time}</RegularText>
    </Row>
  );
}