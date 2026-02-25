export const withOpacity = (hex: string, opacity: number) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const blackColor = "#000000";

export const mutedAccentColor = "#6E6E6E";
export const mutedColor = withOpacity(blackColor, 0.5);
export const mutedLightColor = withOpacity(blackColor, 0.2);

export const primaryColor = "#2B43A0";
export const primaryLightColor = "#1B221F";
export const primaryMediumColor = "#7C92C9";
export const primaryDarkColor = "#0F1613";

export const secondaryColor = "#436573";
export const secondaryLightColor = withOpacity(secondaryColor, 0.2);

export const neutralColor = "#949494";
export const neutralMediumColor = withOpacity(neutralColor, 0.7);
export const neutralLightColor = "#2C322F"

export const backgroundLightColor = "#F2F8F5";
export const alternativeColor = "#FFFFFF";

export const errorColor = "#DA1414";
export const errorLightColor = withOpacity(errorColor, 0.2);
export const errorMiddleColor = withOpacity(errorColor, 0.5);

export const warningColor = "#E5A40C";
export const warningLightColor = withOpacity(warningColor, 0.3);