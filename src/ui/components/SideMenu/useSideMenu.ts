import { useRef, useState } from "react";
import { Animated } from "react-native";

const MENU_WIDTH = 260;

export function useSideMenu() {
  const [visible, setVisible] = useState(false);

  const slideAnim = useRef(
    new Animated.Value(-MENU_WIDTH)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  function openMenu() {
    setVisible(true);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function closeMenu(callback?: () => void) {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -MENU_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      callback?.();
    });
  }

  return {
    visible,
    slideAnim,
    fadeAnim,
    openMenu,
    closeMenu,
  };
}