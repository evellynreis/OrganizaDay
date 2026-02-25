import { TextInput, TextInputProps, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { scaleSize } from "../../../utils/responsive";
import styled from "../../../utils/styled";
import { alternativeColor, neutralColor, withOpacity } from "../../colors";

export const ContainerInput = styled(View, {
  width: "100%",
  position: "relative",
  justifyContent: "center",
});

export const StyledTextInput = styled<{ leftIconSize: number, borderType: "none" | "outlined", backgroundColor?: string, borderColor?: string, textColor?: string }, TextInputProps>(
  TextInput,
  ({ leftIconSize, borderType, editable, backgroundColor, borderColor, textColor }) => ({
    height: scaleSize(48),
    borderColor: editable === false ? neutralColor : borderColor ?? "black",
    borderWidth: borderType === "outlined" ? scaleSize(1) : 0,
    borderRadius: scaleSize(30),
    paddingLeft: scaleSize(22 + leftIconSize),
    paddingRight: scaleSize(40),
    fontFamily: "Poppins_400Regular",
    fontSize: scaleSize(14),
    width: "100%",
    backgroundColor: backgroundColor ?? alternativeColor,
    color: textColor ?? alternativeColor,
    ...(editable === false && !backgroundColor && { backgroundColor: withOpacity(neutralColor, 0.2)}),
  })
);

export const IconContainer = styled<{ position: "left" | "right", }, TouchableOpacityProps>(
  TouchableOpacity,
  ({ position, }) => ({
    zIndex: 1,
    position: "absolute",
    ...(position === "left" && { left: scaleSize(8) }),
    ...(position === "right" && { right: scaleSize(8) }),
  })
);



