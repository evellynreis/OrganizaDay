import React from "react";
import { TouchableOpacity } from "react-native";
import { alternativeColor, blackColor, neutralColor } from "../../colors";
import ShapeRoundedBackground from "../ShapeRoundedBackground";
import { ContainerInput, IconContainer, StyledTextInput } from "./styles";
import { InputIconProps, InputProps } from "./types";


function InputComponent({ leftIcon, rightIcon, ref, borderType, editable, backgroundColor, placeholderTextColor, textColor, ...rest }: InputProps) {
  return (
    <ContainerInput>
      {leftIcon && renderIcon(leftIcon, "left", backgroundColor)}
      <StyledTextInput
        {...rest as any}
        ref={ref}
        leftIconSize={leftIcon ? 36 : 0}
        borderType={borderType ?? "outlined"}
        placeholderTextColor={placeholderTextColor ?? neutralColor}
        editable={editable}
        backgroundColor={backgroundColor}
        textColor={textColor ?? blackColor}
      />
      {rightIcon && renderIcon(rightIcon, "right", backgroundColor)}
    </ContainerInput>
  );
}


function renderIcon(
  iconProps: InputIconProps,
  position: "left" | "right" = "right",
  backgroundColor?: string
) {
  const content = (
    <ShapeRoundedBackground size={36} backgroundColor={backgroundColor ?? alternativeColor}>
      {iconProps.icon()}
    </ShapeRoundedBackground>
  );

  return (
    <IconContainer position={position}>
      {iconProps.onPress ? (
        <TouchableOpacity onPress={iconProps.onPress}>
          {content}
        </TouchableOpacity>
      ) : content}
    </IconContainer>
  );
}

export default InputComponent;
