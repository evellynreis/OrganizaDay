import { Dimensions, PixelRatio, ScaledSize } from "react-native";

type ScaleMetrics = {
  width: number;
  height: number;
};

const REFERENCE_WIDTH = 375;
let currentMetrics: ScaleMetrics = Dimensions.get("window");

const scaleCache = new Map<string, number>();

const updateMetrics = ({ window }: { window: ScaledSize }) => {
  currentMetrics = window;
  scaleCache.clear();
};

Dimensions.addEventListener("change", updateMetrics);

const scaleSize = (size: number): number => {
  const cacheKey = `${size}_${currentMetrics.width}`;

  if (scaleCache.has(cacheKey)) {
    return scaleCache.get(cacheKey)!;
  }

  const scaledSize = PixelRatio.roundToNearestPixel(
    (size * currentMetrics.width) / REFERENCE_WIDTH
  );

  scaleCache.set(cacheKey, scaledSize);
  return scaledSize;
};

const moderateScale = (size: number, factor = 0.5): number => {
  const cacheKey = `${size}_${factor}_${currentMetrics.width}`;
  
  if (scaleCache.has(cacheKey)) {
    return scaleCache.get(cacheKey)!;
  }

  const newSize = size + (scaleSize(size) - size) * factor;
  scaleCache.set(cacheKey, PixelRatio.roundToNearestPixel(newSize));
  return newSize;
};

export { scaleSize, moderateScale };

