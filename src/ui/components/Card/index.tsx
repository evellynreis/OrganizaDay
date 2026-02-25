import { PropsWithChildren } from "react";
import { DimensionValue, View, ViewProps } from "react-native";
import { scaleSize } from "../../../utils/responsive";
import styled from "../../../utils/styled";
import { alternativeColor, neutralColor, withOpacity } from "../../colors";

interface ICardProps {
    backgroundColor?: string;
    borderRadius?: number;
    padding?: DimensionValue
    paddingHorizontal?: DimensionValue;
    paddingVertical?: DimensionValue;
    paddingTop?: DimensionValue;
    paddingBottom?: DimensionValue;
    paddingLeft?: DimensionValue;
    paddingRight?: DimensionValue;
    height?: DimensionValue;
    borderType?: "none" | "outlined";
    borderColor?: string;
    width?: DimensionValue;
}

export default function Card({ children, ...rest }: PropsWithChildren<ICardProps>) {
    return (
        <Containered {...rest}>
            {children}
        </Containered>
    );
}

const Containered = styled<ICardProps, ViewProps>(View, (props) => ({
    backgroundColor: props.backgroundColor ?? alternativeColor,
    borderRadius: props.borderRadius ?? scaleSize(10),
    padding: props.padding,
    paddingHorizontal: props.paddingHorizontal,
    paddingVertical: props.paddingVertical,
    height: props.height,
    borderWidth: props.borderType === "outlined" ? scaleSize(1) : 0,
    borderColor: props.borderColor ?? withOpacity(neutralColor, 0.5),
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    width: props.width,
}))

