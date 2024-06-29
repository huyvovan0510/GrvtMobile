import { View, StyleSheet, RefreshControl, Image, Text } from "react-native";
import React, { useRef } from "react";

import { FlashList } from "@shopify/flash-list";
import { Coin } from "../../interface";

import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import ListSkeleton from "../../components/ListSkeleton";
import ListingItem from "../../components/ListingItem";
import useHandleListing from "../../hooks/useHandleListing";
import useHandleRealTimePrice from "../../hooks/useHanleRealTimePrice";
import { LISTING_ITEM_SIZE, SPACE } from "../../constants";
import Wallet from "../../../assets/wallet.png";

const keyExtractor = (item: Coin, index: number) => `${item?.id}-${index}`;

const HomeScreen = () => {
  const listRef = useRef<FlashList<Coin> | null>(null);
  const { listCoinsData, onSearch, isLoading, onRefresh, onLoadMore } =
    useHandleListing();

  const queryIds = listCoinsData?.map((item: Coin) => item.id).join(",");
  useHandleRealTimePrice(queryIds);
  const onInputFocus = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const renderItems = ({ item, index }: { item: Coin; index: number }) => (
    <ListingItem item={item} />
  );

  const renderEmpty = () => {
    return (
      <View style={styles.emptyView}>
        <Image
          source={Wallet}
          tintColor={"#eee8f4"}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>
          {"No cryptocurrencies found. Please check back later!"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <SearchBar onSearch={onSearch} onInputFocus={onInputFocus} />

        {isLoading ? (
          <ListSkeleton />
        ) : (
          <FlashList
            ref={listRef}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContainerStyle}
            keyExtractor={keyExtractor}
            data={listCoinsData}
            renderItem={renderItems}
            estimatedItemSize={LISTING_ITEM_SIZE}
            ItemSeparatorComponent={() => <View style={styles.space} />}
            onEndReached={onLoadMore}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"handled"}
            keyboardDismissMode={"on-drag"}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#242937" },
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 0,
  },
  space: {
    height: SPACE,
  },
  listContainerStyle: {
    paddingVertical: 32,
  },
  emptyView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 120,
    height: 120,
  },
  emptyText: {
    marginTop: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
});
