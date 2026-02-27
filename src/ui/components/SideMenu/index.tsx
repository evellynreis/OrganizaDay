import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { primaryColor } from "../../colors";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = 260;

export default function SideMenu() {
  const [visible, setVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  function closeMenu() {
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
    });
  }

  function handleLogout() {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          closeMenu();
          console.log("Logout realizado");
        },
      },
    ]);
  }

  return (
    <>
      <Pressable onPress={openMenu} style={styles.menuButton}>
        <Feather name="menu" size={28} color={primaryColor} />
      </Pressable>

      <Modal visible={visible} transparent animationType="none">
        <View style={styles.overlay}>
          <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
            <Pressable style={{ flex: 1 }} onPress={closeMenu} />
          </Animated.View>

          <Animated.View
            style={[
              styles.menu,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Pressable style={styles.closeButton} onPress={closeMenu}>
              <Feather name="x" size={24} color="#333" />
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <Feather name="log-out" size={20} color="#333" />
              <Text style={styles.menuText}>Logout</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
