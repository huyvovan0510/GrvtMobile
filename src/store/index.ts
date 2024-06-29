import { create } from "zustand";
import { Coin, CoinPrice } from "../interface";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ListingCoinStore = {
  listCoins: Coin[];
  updateListCoins: (data: Coin[]) => void;
};

export type PriceDataStore = {
  priceRealTime: CoinPrice;
  updatePriceRealTime: (data: CoinPrice) => void;
};

export type NetWorkStore = {
  isOnline: boolean;
  updateNetwork: (isOnline: boolean) => void;
};

export const useListingCoinStore = create<ListingCoinStore>()(
  persist(
    (set) => ({
      listCoins: [],
      updateListCoins: (data: Coin[]) => {
        set(() => ({
          listCoins: data,
        }));
      },
    }),
    {
      name: "listing-data",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const usePriceRealTimeStore = create<PriceDataStore>()(
  persist(
    (set) => ({
      priceRealTime: {},
      updatePriceRealTime: (data: CoinPrice) => {
        set((state: PriceDataStore) => ({
          priceRealTime: { ...state.priceRealTime, ...data },
        }));
      },
    }),
    {
      name: "price-realtime-data",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useNetWorkConnectStore = create<NetWorkStore>((set) => ({
  isOnline: true,
  updateNetwork: (value: boolean) => {
    set(() => ({
      isOnline: value,
    }));
  },
}));
