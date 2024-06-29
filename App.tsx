import { StyleSheet } from "react-native";
import { HomeScreen } from "./src/Screens";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import useNetInfo from "./src/hooks/useNetInfo";

export default function App() {
  useNetInfo();
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <HomeScreen />
      <StatusBar style="auto" />
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
