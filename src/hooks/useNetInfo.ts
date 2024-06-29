import { View, Text } from "react-native";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useNetWorkConnectStore } from "../store";
import Toast from "react-native-toast-message";

const useNetInfo = () => {
  const updateNetwork = useNetWorkConnectStore((state) => state.updateNetwork);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      updateNetwork(!!state.isConnected);
      if (!state.isConnected) {
        Toast.show({
          type: "error",
          text1: "Opps!",
          text2: "You`re in offline mode ",
        });
      }
    });

    return () => unsubscribe();
  });
};

export default useNetInfo;
