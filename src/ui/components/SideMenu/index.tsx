import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Animated, Modal, Pressable, Text, View } from "react-native";
import { errorColor, neutralColor, primaryColor } from "../../colors";
import { Space } from "../core";
import { styles } from "./styles";
import { MenuItem } from "./types";
import { useSideMenu } from "./useSideMenu";

export default function SideMenu() {
  const router = useRouter();
  const { visible, slideAnim, fadeAnim, openMenu, closeMenu } = useSideMenu();

  function handleOutlay() {
    closeMenu(() => console.log("Navegar para gastos"));
  }

  function handleSchedule() {
    closeMenu(() => console.log("Navegar para compromissos"));
  }

  function handleLogout() {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => 
          closeMenu(() => router.replace("/welcome"))
        ,
      },
    ]);
  }

  function MenuOption({ label, icon, onPress, danger }: MenuItem) {
    return (
      <Pressable style={styles.menuItem} onPress={onPress}>
        <Feather name={icon} size={20} color={danger ? errorColor : neutralColor} />
        <Text style={[styles.menuText, danger && { color: errorColor }]}>
          {label}
        </Text>
      </Pressable>
    );
  }

  const MENU_ITEMS: MenuItem[] = [
    {
      label: "Compromissos",
      icon: "calendar",
      onPress: handleSchedule,
    },
    {
      label: "Gastos",
      icon: "credit-card",
      onPress: handleOutlay,
    },
    {
      label: "Logout",
      icon: "log-out",
      onPress: handleLogout,
      danger: true,
    },
  ];

  return (
    <>
      <Pressable onPress={openMenu} style={styles.menuButton}>
        <Feather name="menu" size={28} color={primaryColor} />
      </Pressable>

      <Modal visible={visible} transparent animationType="none">
        <View style={styles.overlay}>
          <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
            <Pressable style={{ flex: 1 }} onPress={() => closeMenu()} />
          </Animated.View>

          <Animated.View
            style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
          >
            <Pressable style={styles.closeButton} onPress={() => closeMenu()}>
              <Feather name="x" size={24} color={neutralColor} />
            </Pressable>

            <Space size={24} />

            {MENU_ITEMS.map((item, index) => (
              <View key={item.label}>
                <MenuOption {...item} />
                {index < MENU_ITEMS.length - 1 && <Space size={16} />}
              </View>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
