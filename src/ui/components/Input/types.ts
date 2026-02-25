import React from "react";
import { TextInput, TextInputProps } from "react-native";

export interface InputIconProps {
  icon: () => React.ReactNode;
  onPress?: () => void;
}

export type InputType = "text" | "date";

export interface InputProps extends TextInputProps {
  leftIcon?: InputIconProps;
  rightIcon?: InputIconProps;
  borderType?: "none" | "outlined";
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  ref?: React.Ref<TextInput>;

  type?: InputType;

  onDateChange?: (date: Date) => void;
}
