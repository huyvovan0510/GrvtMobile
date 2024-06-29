import { LIMIT_ITEM } from "../constants";
import { GrvtNework } from "./GrvtNework";

const API_END_POINT = {
  LISTING: `/v1/cryptocurrency/listings/latest`,
  REAL_TIME_PRICE: "/v2/cryptocurrency/quotes/latest",
};

const getListing = async ({
  cursor,
  limit = LIMIT_ITEM,
}: {
  cursor: number;
  limit?: number;
}) => {
  const response = await GrvtNework.Get(API_END_POINT.LISTING, {
    start: cursor,
    limit,
  });
  return response;
};

const getRealTimeData = async (params: { id: string }) => {
  const response = await GrvtNework.Get(API_END_POINT.REAL_TIME_PRICE, params);
  return response;
};

export { getListing, getRealTimeData };
