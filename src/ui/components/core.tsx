import { PropsWithChildren } from "react";
import { ScrollViewProps, View, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { scaleSize } from "../../utils/responsive";
import styled from "../../utils/styled";
import { backgroundLightColor } from "../colors";

interface IContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
  withHorizontalPadding?: "left" | "right" | boolean;
  withVerticalPadding?: "top" | "bottom" | boolean;
  renderFooter?: () => React.ReactNode;
}

interface IScrollableContainerProps extends IContainerProps {
  scroll?: ScrollViewProps;
}

interface IMarginProps extends ViewProps {
  horizontal?: boolean;
  vertical?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  fill?: boolean;
  size?: number;
}

interface IPaddingProps extends ViewProps {
  size?: number;
  horizontal?: boolean;
  vertical?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

interface IGutterProps extends ViewProps {
  space?: number;
  horizontalSpace?: number;
  verticalSpace?: number;
  horizontal?: boolean;
}

interface IAlignmentProps extends ViewProps {
  mainAlign?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  crossAlign?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  mainGap?: number;
  crossGap?: number;
  fill?: boolean;
  wrap?: boolean;
}

interface IAlignProps extends ViewProps {
  alignment?: "bottomCenter" | "bottomLeft" | "bottomRight" | "topCenter" | "topLeft" | "topRight" | "center" | "centerLeft" | "centerRight";
  fill?: boolean;
}

interface ISpaceProps extends ViewProps {
  size?: number;
  onlyHorizontal?: boolean;
  onlyVertical?: boolean;
}

interface IOpacityProps extends ViewProps {
  opacity: number;
}

interface IFlexibleProps extends ViewProps {
  flex?: number;
  fit?: "tight" | "loose";
}

interface IAbsoluteProps extends ViewProps {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  fill?: boolean;
  zIndex?: number;
  opacity?: number;
}

const ContainerBase = styled<IContainerProps, SafeAreaViewProps>(SafeAreaView, ({
  backgroundColor,
  withVerticalPadding,
  withHorizontalPadding = true
}) => ({
  flex: 1,
  ...(withHorizontalPadding == true && { paddingHorizontal: scaleSize(24) }),
  ...(withHorizontalPadding == "left" && { paddingLeft: scaleSize(24) }),
  ...(withHorizontalPadding == "right" && { paddingRight: scaleSize(24) }),
  ...(withVerticalPadding == true && { paddingVertical: scaleSize(24) }),
  ...(withVerticalPadding == "top" && { paddingTop: scaleSize(24) }),
  ...(withVerticalPadding == "bottom" && { paddingBottom: scaleSize(24) }),
  backgroundColor: backgroundColor ?? backgroundLightColor,
}));

export const Container = ({ children, ...rest }: PropsWithChildren<IContainerProps>) => {
  const insets = useSafeAreaInsets();
  const { backgroundColor, withHorizontalPadding = true, withVerticalPadding, edges, renderFooter, ...safeAreaProps } = rest;
  return (
    <>
      <ContainerBase
        backgroundColor={backgroundColor}
        withHorizontalPadding={withHorizontalPadding}
        withVerticalPadding={withVerticalPadding}
        {...safeAreaProps as any}
        edges={edges ?? ["bottom"]}
      >
        {children}
      </ContainerBase>
      {renderFooter && <View style={{
        backgroundColor: backgroundColor,
        paddingHorizontal: withHorizontalPadding ? scaleSize(24) : 0,
        paddingBottom: insets.bottom
      }} >{renderFooter()}</View>}
    </>
  );
};

export const ContainerScrollable = ({ children, scroll, ...rest }: PropsWithChildren<IScrollableContainerProps>) => {
  const insets = useSafeAreaInsets();
  const { backgroundColor, withHorizontalPadding = true, withVerticalPadding = false, renderFooter, ...safeAreaProps } = rest;
  return (
    <Container
      withHorizontalPadding={false}
      withVerticalPadding={false}
      backgroundColor={backgroundColor}
      {...safeAreaProps as any}>
      <ScrollView
        style={{
          paddingHorizontal: withHorizontalPadding ? scaleSize(24) : 0,
          paddingTop: (withVerticalPadding == "top" || withVerticalPadding == true) ? scaleSize(24) : 0,
          paddingBottom: (withVerticalPadding == "bottom" || withVerticalPadding == true) && !renderFooter ? scaleSize(24) : 0
        }}
        showsVerticalScrollIndicator={false}
        {...scroll}
      >
        {children}
      </ScrollView>
      {renderFooter && <View style={{
        paddingHorizontal: withHorizontalPadding ? scaleSize(24) : 0,
        paddingBottom: insets.bottom
      }} >{renderFooter()}</View>}

    </Container>
  );
};

export const Section = styled<ViewProps, ViewProps>(View, {
  marginBottom: scaleSize(24),
  width: "100%",
});

export const InnerSection = styled<ViewProps, ViewProps>(View, {
  marginBottom: 16,
  width: "100%",
});

export const Margin = styled<IMarginProps, ViewProps>(View, (props) => {
  const { fill = true, ...rest } = props;
  const margin = props.size ?? 8;
  const isDefaultHorizontal = !props.top && !props.bottom && !props.left && !props.right && !props.horizontal && !props.vertical;

  return {
    flex: fill ? 1 : 0,
    marginTop: props.top || props.vertical ? margin : null,
    marginBottom: props.bottom || props.vertical ? margin : null,
    marginLeft: props.left || props.horizontal || isDefaultHorizontal ? margin : null,
    marginRight: props.right || props.horizontal || isDefaultHorizontal ? margin : null,
  };
});

export const Padding = styled<IPaddingProps, ViewProps>(View, (props) => {
  const padding = props.size ?? 8;
  const isDefaultHorizontal = !props.top && !props.bottom && !props.left && !props.right && !props.horizontal && !props.vertical;

  return {
    paddingTop: props.top || props.vertical ? padding : null,
    paddingBottom: props.bottom || props.vertical ? padding : null,
    paddingLeft: props.left || props.horizontal || isDefaultHorizontal ? padding : null,
    paddingRight: props.right || props.horizontal || isDefaultHorizontal ? padding : null,
  };
});

export const Gutter = styled<IGutterProps, ViewProps>(View, (props) => ({
  flexDirection: !props.horizontal ? "column" : "row",
  gap: props.space ?? 0,
  rowGap: props.verticalSpace ?? props.space ?? 0,
  columnGap: props.horizontalSpace ?? props.space ?? 0,
}));

export const Row = styled<IAlignmentProps, ViewProps>(View, (props) => ({
  flexDirection: "row",
  justifyContent: props.mainAlign,
  alignItems: props.crossAlign ?? "center",
  width: props.fill ? "100%" : "auto",
  flex: props.fill ? undefined : 0,
  minWidth: props.fill ? "100%" : "auto",
  columnGap: props.crossGap ?? 0,
  rowGap: props.mainGap ?? 0,
  flexWrap: props.wrap ? "wrap" : "nowrap",
}));

export const Column = styled<IAlignmentProps, ViewProps>(View, (props) => ({
  flexDirection: "column",
  justifyContent: props.mainAlign,
  alignItems: props.crossAlign,
  width: props.fill ? "100%" : "auto",
  flex: props.fill ? 1 : 0,
  columnGap: props.crossGap ?? 0,
  rowGap: props.mainGap ?? 0,
}));

export const Center = styled<ViewProps, ViewProps>(View, {
  justifyContent: "center",
  alignItems: "center",
  verticalAlign: "middle",
  flexGrow: 1,
});

export const Align = styled<IAlignProps, ViewProps>(View, (props) => {
  const alignment = props.alignment ?? "center";

  const alignItems = alignment.includes("Left")
    ? "flex-start"
    : alignment.includes("Right")
      ? "flex-end"
      : "center";

  const justifyContent = alignment.includes("top")
    ? "flex-start"
    : alignment.includes("bottom")
      ? "flex-end"
      : "center";

  return {
    flex: props.fill ? 1 : 0,
    justifyContent,
    alignItems,
  };
});

export const Space = styled<ISpaceProps, ViewProps>(View, (props) => ({
  ...(!props.onlyVertical && { width: props.size ?? 8 }),
  ...(!props.onlyHorizontal && { height: props.size ?? 8 }),
}));

export const Flexible = styled<IFlexibleProps, ViewProps>(View, (props) => ({
  flex: props.flex ?? 1,
  flexShrink: props.fit === "tight" ? 1 : 0,
  flexGrow: props.fit === "loose" ? 1 : 0,
  minWidth: 0,
  minHeight: 0,
}));

export const Expanded = styled<ViewProps, ViewProps>(View, {
  flex: 1,
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: 0,
  minWidth: 0,
  minHeight: 0,
});

export const Opacity = styled<IOpacityProps, ViewProps>(View, (props) => ({
  opacity: props.opacity,
}));

export const Absolute = styled<IAbsoluteProps, ViewProps>(View, (props) => ({
  position: "absolute",
  top: props.top ?? 0,
  left: props.left ?? 0,
  right: props.right ?? 0,
  bottom: props.bottom ?? 0,
  zIndex: props.zIndex ?? 0,
  opacity: props.opacity ?? 1,
}));

