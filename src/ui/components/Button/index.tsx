import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  GestureResponderEvent,
  Pressable,
  View,
} from "react-native";

import { primaryColor } from "../../colors";
import { SubtitleText } from "../text";
import { ContainerButton, RippleEffect } from "./style";

interface ButtonProps extends PropsWithChildren {
  onPress?: () => void;
  title?: string;
  outline?: boolean;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  fill?: boolean;
  borderType?: "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge" | "inset" | "outset";
  borderColor?: string;
  borderWidth?: number;
  height?: number;
}

export default function ButtonComponent({
  onPress, title, outline, color, textColor, disabled, loading, fill, children,
  borderType, borderColor, borderWidth, height,
}: ButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rippleSize, setRippleSize] = useState(0);
  const [rippleAnim] = useState(new Animated.Value(0));
  const [rippleVisible, setRippleVisible] = useState(false);

  const buttonRef = useRef<View>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  const handlePressIn = (evt: GestureResponderEvent) => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      const locationX = evt.nativeEvent.pageX - x;
      const locationY = evt.nativeEvent.pageY - y;

      setPosition({ x: locationX, y: locationY });
      const size = Math.max(width, height) * 2;
      setRippleSize(size);

      if (animationRef.current) {
        animationRef.current.stop();
      }

      if (buttonRef.current) setRippleVisible(true);

      rippleAnim.setValue(0);
      animationRef.current = Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      });
      animationRef.current.start(() => {
        if (buttonRef.current) {
          setRippleVisible(false);
        }
      });
    });
  };

  const scaleValue = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const opacityValue = rippleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
  });

  const colorButton = color || primaryColor;
  const textColorButton = textColor || "white";

  return (
    <Pressable
      style={fill && { width: '100%', flexShrink: 1 }}
      onPress={onPress}
      onPressIn={handlePressIn}
      disabled={disabled || loading}
    >
      {({ pressed }) => (
        <ContainerButton
          color={colorButton}
          textColor={textColorButton}
          outline={outline}
          pressed={pressed}
          ref={buttonRef}
          borderType={borderType}
          borderColor={borderColor}
          borderWidth={borderWidth}
          height={height}
        >
          {loading && !rippleVisible ? (
            <ActivityIndicator color={outline ? colorButton : textColorButton} />
          ) : (
            title ? (<SubtitleText.Medium color={outline ? colorButton : textColorButton}>
              {title}
            </SubtitleText.Medium>)
              : children
          )}

          {rippleVisible && (
            <RippleEffect
              x={position.x}
              y={position.y}
              rippleSize={rippleSize}
              style={{
                transform: [{ scale: scaleValue }],
                opacity: opacityValue,
              }}
            />
          )}
        </ContainerButton>
      )}
    </Pressable>
  );
}

