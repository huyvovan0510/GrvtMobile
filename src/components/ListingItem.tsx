import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { memo } from "react";
import { Coin } from "../interface";
import { LISTING_ITEM_HEIGHT } from "../constants";
import Price from "./Price";
import PercentPrice from "./PercentPrice";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
interface ListingItemProps {
  item: Coin;
}

const ListingItem = ({ item }: ListingItemProps) => {
  return (
    <Animated.View style={[styles.itemContainer]}>
      <View style={styles.infoBox}>
        <Text style={styles.txtSymbol}>{item?.symbol || "--"}</Text>
        <Text style={styles.coinName}>{item?.name || "--"}</Text>
      </View>
      <View style={styles.piceBox}>
        <PercentPrice
          defaultPriceChange={item?.quote.USD.percent_change_1h}
          id={item?.id}
        />
        <Price defaultPrice={item?.quote?.USD?.price} id={item?.id} />
      </View>
    </Animated.View>
  );
};

export default memo(ListingItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#242937",
  },
  itemContainer: {
    height: LISTING_ITEM_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtSymbol: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  coinName: {
    color: "#868786",
    fontSize: 14,
  },

  txtPriceChange: {
    fontSize: 14,
  },
  txtPrice: {
    color: "#fff",
    fontSize: 14,
  },
  infoBox: {
    alignItems: "flex-start",
  },
  piceBox: {
    alignItems: "flex-end",
  },
});
