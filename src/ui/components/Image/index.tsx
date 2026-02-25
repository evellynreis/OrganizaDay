import { Image } from "expo-image";
import { ImageProps } from "./types";

export default function ImageComponent({
  height,
  width,
  contentFit,
  contentPosition,
  source,
  style = {},
}: ImageProps) {
  return (
    <Image
      style={[{
        width: "100%",
        ...(height && { height }),
        ...(width && { width }),
      }, style]}
      contentFit={contentFit}
      contentPosition={contentPosition}
      source={source}
    />
  );
}

