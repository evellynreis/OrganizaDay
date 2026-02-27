import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { primaryColor } from "../../colors";
import { styles } from "./styles";

export default function SideMenu() {
  const [visible, setVisible] = useState(false);

  function handleLogout() {
    Alert.alert("Logout", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          setVisible(false);
          console.log("Logout realizado");
        },
      },
    ]);
  }

  return (
    <>
      {/* Botão do menu */}
      <Pressable
        onPress={() => setVisible(true)}
        style={styles.menuButton}
      >
        <Feather name="menu" size={28} color={primaryColor} />
      </Pressable>

      {/* Modal do menu lateral */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          
          {/* MENU (lado esquerdo) */}
          <View style={styles.menu}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Feather name="x" size={24} color="#333" />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={20} color="#333" />
              <Text style={styles.menuText}>Logout</Text>
            </Pressable>
          </View>

          {/* Área escura clicável */}
          <Pressable
            style={styles.background}
            onPress={() => setVisible(false)}
          />
        </View>
      </Modal>
    </>
  );
}