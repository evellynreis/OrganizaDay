import { ImageContentFit, ImageContentPosition, ImageSource } from "expo-image";
import { DimensionValue, ImageStyle, StyleProp } from "react-native";

export interface ImageProps {
  width?: DimensionValue;
  height?: DimensionValue;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
  source: ImageSource | string;
  style?: StyleProp<ImageStyle>;
}

