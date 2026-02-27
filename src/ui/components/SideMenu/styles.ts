import { StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/responsive";

export const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: scaleSize(16),
    left: scaleSize(16),
    zIndex: 999,
    elevation: 10,
  },

  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  menu: {
    width: scaleSize(260),
    backgroundColor: "#fff",
    padding: scaleSize(20),
    height: "100%",
    elevation: 20,
  },

  background: {
    flex: 1,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginBottom: scaleSize(30),
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleSize(10),
  },

  menuText: {
    fontSize: scaleSize(16),
    color: "#333",
  },
});