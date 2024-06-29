import { Text, StyleSheet } from "react-native";
import React, { memo } from "react";
import { usePriceRealTimeStore } from "../store";

interface PercentPriceProps {
  defaultPriceChange: number;
  id: number;
}

const PercentPrice = ({ defaultPriceChange = 0, id }: PercentPriceProps) => {
  const priceRealTime = usePriceRealTimeStore((state) => state.priceRealTime);

  const priceChange =
    priceRealTime?.[id]?.quote?.USD?.percent_change_1h || defaultPriceChange;

  const isPositivePercent = priceChange > 0;

  const priceChangeStyle = isPositivePercent
    ? styles.percentPositive
    : styles.percentNegative;

  const percentValue = isPositivePercent
    ? `+${priceChange?.toFixed(2) || "--"}`
    : priceChange?.toFixed(2);

  return <Text style={priceChangeStyle}>{`${percentValue}%`}</Text>;
};

export default memo(PercentPrice);

const styles = StyleSheet.create({
  percentPositive: {
    color: "#aacc6f",
    fontSize: 14,
    marginBottom: 8,
  },
  percentNegative: {
    color: "#dc5d5f",
    fontSize: 14,
    marginBottom: 8,
  },
});
