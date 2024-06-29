import { View, Text } from "react-native";
import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetInfo = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });

    return () => unsubscribe();
  });
};

export default useNetInfo;
