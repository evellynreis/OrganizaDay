import { Animated, DimensionValue, View, ViewProps } from "react-native";
import { scaleSize } from "../../../utils/responsive";
import styled from "../../../utils/styled";

interface ContainerButtonProps {
  pressed: boolean;
  outline?: boolean;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  height?: DimensionValue;
  borderType?: "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset";
  borderColor?: string;
  borderWidth?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
}

interface RippleEffectProps {
  x: number;
  y: number;
  rippleSize: number;
}

export const ContainerButton = styled<ContainerButtonProps, ViewProps>(
  View,
  (props) => ({
    ...(!props.outline && { backgroundColor: props.color }),
    ...(props.outline && { borderColor: props.color }),
    ...(props.outline && { borderWidth: scaleSize(2) }),
    ...(props.borderType && { borderStyle: props.borderType }),
    ...(props.borderColor && { borderColor: props.borderColor }),
    ...(props.borderWidth && { borderWidth: props.borderWidth }),
    ...(props.horizontalPadding && { paddingHorizontal: props.horizontalPadding }),
    ...(props.verticalPadding && { paddingVertical: props.verticalPadding }),
    width: "auto",
    borderRadius: scaleSize(30),
    height: props.height ? props.height : scaleSize(49),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  })
);

export const RippleEffect = styled<
  RippleEffectProps,
  Animated.AnimatedProps<ViewProps>
>(Animated.View, (props) => ({
  position: "absolute",
  top: props.y - props.rippleSize / 2,
  left: props.x - props.rippleSize / 2,
  width: props.rippleSize,
  height: props.rippleSize,
  borderRadius: props.rippleSize / 2,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
}));

