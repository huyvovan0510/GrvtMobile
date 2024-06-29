import { Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { formatCurrency } from "../utils";
import { usePriceRealTimeStore } from "../store";

interface PriceProps {
  id: number;
  defaultPrice: number;
}
const Price = ({ id, defaultPrice }: PriceProps) => {
  const priceRealTime = usePriceRealTimeStore((state) => state.priceRealTime);
  const price = priceRealTime[id]?.quote?.USD?.price || defaultPrice;

  return <Text style={styles.txtPrice}>{formatCurrency(price)}</Text>;
};

export default memo(Price);

const styles = StyleSheet.create({
  txtPrice: {
    color: "#fff",
    fontSize: 14,
  },
});
