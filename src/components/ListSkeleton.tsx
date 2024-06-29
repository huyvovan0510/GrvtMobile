import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { LISTING_ITEM_HEIGHT, SPACE } from "../constants";

const ListSkeleton = () => {
  const data = Array.from(Array(15).keys());

  const renderItem = ({}) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <View style={styles.topLeft} />
          <View style={styles.bottomLeft} />
        </View>
        <View style={styles.rightBox}>
          <View style={styles.topRight} />
          <View style={styles.bottomRight} />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item: number) => `key-${item}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainerStyle}
      ItemSeparatorComponent={() => <View style={styles.space} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ListSkeleton;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: LISTING_ITEM_HEIGHT,
  },
  topLeft: {
    backgroundColor: "#b3b2b1",
    width: 110,
    height: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  topRight: {
    backgroundColor: "#b3b2b1",
    width: 70,
    height: 10,
    borderRadius: 4,

    marginBottom: 8,
  },
  bottomLeft: {
    backgroundColor: "#b3b2b1",
    width: 70,
    height: 10,
    borderRadius: 4,
  },
  bottomRight: {
    backgroundColor: "#b3b2b1",
    width: 100,
    height: 10,
    borderRadius: 4,
  },
  space: {
    height: SPACE,
  },
  listContainerStyle: {
    paddingTop: 32,
  },
  rightBox: {
    alignItems: "flex-end",
  },
});
