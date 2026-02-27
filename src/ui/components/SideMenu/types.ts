import { Feather } from "@expo/vector-icons";

export type MenuItem = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  danger?: boolean;
};