import { useEffect, useMemo, useRef, useState } from "react";
import { getListing } from "../services";
import { useListingCoinStore, useNetWorkConnectStore } from "../store";
import { LIMIT_ITEM } from "../constants";

const useHandleListing = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isOnline = useNetWorkConnectStore((state) => state.isOnline);
  const updateListCoins = useListingCoinStore((state) => state.updateListCoins);
  const listCoins = useListingCoinStore((state) => state.listCoins);
  const currentCursor = useRef(1);

  const listFilter = useMemo(() => {
    if (!query) return listCoins;
    return listCoins?.filter((item) =>
      item?.symbol.toLowerCase().includes(query.toLowerCase())
    );
  }, [listCoins, query]);

  const onSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const onRefresh = async () => {
    if (!isLoading) return;
    try {
      currentCursor.current = 1;
      const response = await getListing({ cursor: 1 });
      const { data } = response;
      if (!!data || data?.length > 0) {
        updateListCoins(data);
      }
    } catch (error) {
    } finally {
    }
  };

  const fetchListing = async ({
    cursor = 1,
    isFirstLoad = false,
  }: {
    cursor?: number;
    isFirstLoad?: boolean;
  }) => {
    try {
      if (isFirstLoad) {
        setIsLoading(true);
      }
      const response = await getListing({ cursor });
      const { data } = response;

      if (!data || data?.length < 0) return;

      if (cursor === 1) {
        updateListCoins(data);
      } else {
        updateListCoins([...listCoins, ...data]);
      }
    } catch (error) {
    } finally {
      if (isFirstLoad) {
        setIsLoading(false);
      }
    }
  };

  const onLoadMore = () => {
    //No load more when searching and loading
    if (!isLoading && !query) {
      currentCursor.current = currentCursor.current + LIMIT_ITEM;
      fetchListing({ cursor: currentCursor.current });
    }
  };

  useEffect(() => {
    fetchListing({ cursor: currentCursor?.current, isFirstLoad: true });
  }, []);

  return {
    listCoinsData: listFilter,
    onSearch,
    isLoading,
    onRefresh,
    onLoadMore,
  };
};

export default useHandleListing;
