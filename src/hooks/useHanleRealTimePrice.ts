import React, { useEffect, useRef } from "react";
import { getRealTimeData } from "../services";
import { PriceDataStore, usePriceRealTimeStore } from "../store";
import { REFETCH_INTERVAL } from "../constants";

const useHandleRealTimePrice = (queryIds: string) => {
  const interval = useRef<ReturnType<typeof setInterval>>();

  const updatePriceRealTime = usePriceRealTimeStore(
    (state: PriceDataStore) => state.updatePriceRealTime
  );
  const getPriceRealTime = async () => {
    try {
      const response = await getRealTimeData({ id: queryIds });
      const { data } = response || {};
      if (!!data) {
        updatePriceRealTime(data);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (queryIds) {
      interval.current = setInterval(() => {
        getPriceRealTime();
      }, REFETCH_INTERVAL);
    }

    return () => {
      interval.current && clearInterval(interval.current);
    };
  }, [queryIds]);
  return {};
};

export default useHandleRealTimePrice;
