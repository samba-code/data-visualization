import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import {
  DAY_VALUES,
  DEFAULT_ASSET,
  DEFAULT_CURRENCY,
  DEFAULT_DATA_TYPE,
} from "./constants";
import { CURRENCIES, COINS_LIST_URL } from "./constants";
import { makeDataURL } from "./utils";

export const cryptoTrackerSlice = createSlice({
  name: "cryptoTracker",
  initialState: {
    data: {
      [DAY_VALUES.DAY.id]: {
        prices: [],
        market_caps: [],
        volumes: [],
      },
      [DAY_VALUES.WEEK.id]: {
        prices: [],
        marketCaps: [],
        volumes: [],
      },
      [DAY_VALUES.MONTH.id]: {
        prices: [],
        marketCaps: [],
        volumes: [],
      },
      [DAY_VALUES.YEAR.id]: {
        prices: [],
        marketCaps: [],
        volumes: [],
      },
    },
    dataLoading: false,
    currencyLoading: false,
    coinsListLoading: false,
    error: null,
    timeRange: DAY_VALUES.YEAR.id,
    currency: DEFAULT_CURRENCY.name,
    coinsList: [],
    asset: DEFAULT_ASSET,
    dataType: DEFAULT_DATA_TYPE,
  },
  reducers: {
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload;
    },
    setCurrencyLoading: (state, action) => {
      state.currencyLoading = action.payload;
    },
    setCoinsListLoading: (state, action) => {
      state.coinsListLoading = action.payload;
    },
    setCoinsList: (state, action) => {
      state.coinsList = action.payload;
    },
    setAsset: (state, action) => {
      state.asset = action.payload;
    },
    setData: (state, action) => {
      const { timeRange, data } = action.payload;
      state.data[timeRange] = data;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setDataType: (state, action) => {
      state.dataType = action.payload;
    },
  },
});

export const selectDataLoading = (state) => state.cryptoTracker.dataLoading;
export const selectCoinsListLoading = (state) =>
  state.cryptoTracker.coinsListLoading;
export const selectCurrencyLoading = (state) =>
  state.cryptoTracker.currencyLoading;
export const selectData = (state) => state.cryptoTracker.data;
export const selectError = (state) => state.cryptoTracker.error;
export const selectTimeRange = (state) => state.cryptoTracker.timeRange;
export const selectCurrency = (state) => state.cryptoTracker.currency;
export const selectAsset = (state) => state.cryptoTracker.asset;
export const selectCoinsList = (state) => state.cryptoTracker.coinsList;
export const selectDataType = (state) => state.cryptoTracker.dataType;

export const {
  setDataLoading,
  setCurrencyLoading,
  setCoinsListLoading,
  setData,
  setError,
  setTimeRange,
  setCurrency,
  setCoinsList,
  setAsset,
  setDataType,
} = cryptoTrackerSlice.actions;

export const getCoinsList = () => async (dispatch) => {
  dispatch(setCoinsListLoading(true));
  try {
    const coinsList = await d3.json(COINS_LIST_URL);
    dispatch(setCoinsListLoading(false));
    dispatch(setCoinsList(coinsList));
    // TODO don't clear all errors - update error handling
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError("Error coins list data."));
  }
};

export const getCryptoData = (timeRange, currency, asset) => async (
  dispatch
) => {
  dispatch(setDataLoading(true));
  console.log("currency: ", currency);
  const currencyCode = CURRENCIES[currency].code;
  const CRYPTO_DATA_URL = makeDataURL(timeRange, currencyCode, asset);
  try {
    const cryptoData = await d3.json(CRYPTO_DATA_URL);
    dispatch(setData({ data: cryptoData, timeRange }));
    dispatch(setDataLoading(false));
    dispatch(setError(null));
    // TODO - Add error reporting
  } catch (error) {
    dispatch(setError("Error loading asset data."));
    dispatch(setDataLoading(false));
  }
};

export default cryptoTrackerSlice.reducer;
