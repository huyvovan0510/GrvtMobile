type ApiMethods = "GET" | "POST";
const API_KEY = ""; // api key not at client

const BASE_URL = "https://pro-api.coinmarketcap.com"; // will set up env file and put base url to env config

const createRequest = async (
  endpoint: string,
  method: ApiMethods,
  data?: any
) => {
  const baseUrl = BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  const headers = {
    "X-CMC_PRO_API_KEY": API_KEY,
  };

  const config = {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

const Get = (endpoint: string, params?: any) => {
  const queryString = params ? `?${buildQueryString(params)}` : "";
  return createRequest(`${endpoint}${queryString}`, "GET");
};

const GrvtNework = { Get };

export { GrvtNework };
