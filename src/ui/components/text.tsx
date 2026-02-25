import { PropsWithChildren } from "react";
import { Text, TextProps, TouchableOpacity } from "react-native";
import { scaleSize } from "../../utils/responsive";
import styled from "../../utils/styled";
import {
  blackColor,
  mutedColor,
  primaryColor,
  secondaryColor,
} from "../colors";

type FontWeight = 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface BaseTextProps {
  color?: string;
  size?: number;
  weight?: FontWeight;
  textAlign?: "left" | "right" | "center";
  shrink?: boolean;
}

const fontFamilyMap: { [x: string]: string } = {
  light: "Poppins_300Light",
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
  extraBold: "Poppins_800ExtraBold",
  heavy: "Poppins_900Black",
};

const hintTextStyled = ({ color, size, weight, textAlign = "left", shrink = false }: BaseTextProps) => ({
  color: color ?? blackColor,
  fontSize: size,
  textAlign: textAlign,
  fontFamily: fontFamilyMap[weight ?? "regular"],
  flexShrink: shrink ? 1 : 0,
});

const hintTextColor = (color: string) =>
  styled<BaseTextProps, TextProps>(Text, ({ size, weight, textAlign }) =>
    hintTextStyled({ color, size, weight, textAlign })
  );

/**
 * Componente de texto base com cor, tamanho, peso e alinhamento personalizáveis.
 * @param color - Cor do texto (padrão: preto)
 * @param size - Tamanho da fonte em pixels
 * @param weight - Peso da fonte (300-900)
 * @param textAlign - Alinhamento do texto (left, right, center)
 * 
 * Subcomponentes:
 * - HintText.Primary - Variante com cor primária
 * - HintText.Secondary - Variante com cor secundária
 * - HintText.Muted - Variante com cor esmaecida
 */
export const HintText = styled<BaseTextProps, TextProps>(
  Text,
  hintTextStyled
).withSubComponents({
  Primary: hintTextColor(primaryColor),
  Secondary: hintTextColor(secondaryColor),
  Muted: hintTextColor(mutedColor),
});

/**
 * Componente de texto extra pequeno para legendas e rótulos.
 * Tamanho: 8px (escalado)
 * Peso: SemiBold (600)
 */
export const SmallCaptionText = styled(HintText, {
  fontSize: scaleSize(8),
  fontFamily: fontFamilyMap.semiBold,
});

/**
 * Componente de texto pequeno para legendas e rótulos.
 * Tamanho: 10px (escalado)
 * Peso: SemiBold (600)
 */
export const CaptionText = styled(HintText, {
  fontSize: scaleSize(10),
  fontFamily: fontFamilyMap.semiBold,
});

const SmallLightText = styled(HintText, {
  fontSize: scaleSize(12),
  fontFamily: fontFamilyMap.light,
});

const SmallMediumText = styled(HintText, {
  fontSize: scaleSize(12),
  fontFamily: fontFamilyMap.medium,
});

const SmallSemiBoldText = styled(HintText, {
  fontSize: scaleSize(12),
  fontFamily: fontFamilyMap.semiBold,
});

const SmallBoldText = styled(HintText, {
  fontSize: scaleSize(12),
  fontFamily: fontFamilyMap.bold,
});

/**
 * Componente de texto pequeno para conteúdo compacto.
 * Tamanho: 12px (escalado)
 * Peso: Regular (400)
 * 
 * Subcomponentes:
 * - SmallText.Light - Peso Light (300)
 * - SmallText.Medium - Peso Medium (500)
 * - SmallText.SemiBold - Peso SemiBold (600)
 * - SmallText.Bold - Peso Bold (700)
 */
export const SmallText = styled(HintText, {
  fontSize: scaleSize(12),
}).withSubComponents({
  Light: SmallLightText,
  Medium: SmallMediumText,
  SemiBold: SmallSemiBoldText,
  Bold: SmallBoldText,
});

const RegularSemiBoldText = styled(HintText, {
  fontSize: scaleSize(14),
  fontFamily: fontFamilyMap.semiBold,
});

const RegularMediumText = styled(HintText, {
  fontSize: scaleSize(14),
  fontFamily: fontFamilyMap.medium,
});

const RegularBoldText = styled(HintText, {
  fontSize: scaleSize(14),
  fontFamily: fontFamilyMap.bold,
});

/**
 * Componente de texto regular para conteúdo do corpo.
 * Tamanho: 14px (escalado)
 * Peso: Regular (400)
 * 
 * Subcomponentes:
 * - RegularText.Medium - Peso Medium (500)
 * - RegularText.SemiBold - Peso SemiBold (600)
 * - RegularText.Bold - Peso Bold (700)
 */
export const RegularText = styled(HintText, {
  fontSize: scaleSize(14),
}).withSubComponents({
  SemiBold: RegularSemiBoldText,
  Medium: RegularMediumText,
  Bold: RegularBoldText,
});

const SubtitleLightText = styled(HintText, {
  fontSize: scaleSize(16),
  fontFamily: fontFamilyMap.light,
});

const SubtitleMediumText = styled(HintText, {
  fontSize: scaleSize(16),
  fontFamily: fontFamilyMap.medium,
});

const SubtitleBoldText = styled(HintText, {
  fontSize: scaleSize(16),
  fontFamily: fontFamilyMap.bold,
});

const SubtitleHeavyText = styled(HintText, {
  fontSize: scaleSize(16),
  fontFamily: fontFamilyMap.heavy,
});

/**
 * Componente de texto de subtítulo para cabeçalhos de seção e conteúdo enfatizado.
 * Tamanho: 16px (escalado)
 * Peso: Regular (400)
 * 
 * Subcomponentes:
 * - SubtitleText.Light - Peso Light (300)
 * - SubtitleText.Medium - Peso Medium (500)
 * - SubtitleText.Bold - Peso Bold (700)
 * - SubtitleText.Heavy - Peso Heavy (900)
 */
export const SubtitleText = styled(HintText, {
  fontSize: scaleSize(16),
}).withSubComponents({
  Light: SubtitleLightText,
  Medium: SubtitleMediumText,
  Bold: SubtitleBoldText,
  Heavy: SubtitleHeavyText,
});

/**
 * Componente de título pequeno para cabeçalhos menores.
 * Tamanho: 18px (escalado)
 * Peso: SemiBold (600)
 */
export const TitleSmallText = styled(HintText, {
  fontSize: scaleSize(18),
  fontFamily: fontFamilyMap.semiBold,
});

/**
 * Componente de título para cabeçalhos principais.
 * Tamanho: 20px (escalado)
 * Peso: SemiBold (600)
 */
export const TitleText = styled(HintText, {
  fontSize: scaleSize(20),
  fontFamily: fontFamilyMap.semiBold,
});

const TitleLargeBoldText = styled(HintText, {
  fontSize: scaleSize(24),
  fontFamily: fontFamilyMap.bold,
});

const TitleLargeSemiBoldText = styled(HintText, {
  fontSize: scaleSize(24),
  fontFamily: fontFamilyMap.semiBold,
})

/**
 * Componente de título grande para cabeçalhos proeminentes.
 * Tamanho: 24px (escalado)
 * Peso: Regular (400)
 * 
 * Subcomponentes:
 * - TitleLargeText.SemiBold - Peso SemiBold (600)
 * - TitleLargeText.Bold - Peso Bold (700)
 */
export const TitleLargeText = styled(HintText, {
  fontSize: scaleSize(24),
}).withSubComponents({
  Bold: TitleLargeBoldText,
  SemiBold: TitleLargeSemiBoldText,
});

/**
 * Componente de texto de exibição para textos grandes e chamativos.
 * Tamanho: 32px (escalado)
 * Peso: Bold (700)
 */
export const DisplayText = styled(HintText, {
  fontSize: scaleSize(32),
  fontFamily: fontFamilyMap.bold,
});

/**
 * Componente de texto de exibição grande para seções hero e telas de abertura.
 * Tamanho: 42px (escalado)
 * Peso: Bold (700)
 */
export const DisplayLargeText = styled(HintText, {
  fontSize: scaleSize(42),
  fontFamily: fontFamilyMap.bold,
});

/**
 * Componente de texto clicável envolvido em um TouchableOpacity.
 * Tamanho: 14px (escalado)
 * Peso: Medium (500)
 * 
 * @param onPress - Função de callback acionada quando o link é pressionado
 * @param children - Conteúdo de texto a ser exibido
 */
export function LinkText({
  children,
  ...props
}: PropsWithChildren<BaseTextProps & TextProps>) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <RegularText.Medium {...(props as any)}>{children}</RegularText.Medium>
    </TouchableOpacity>
  );
}

