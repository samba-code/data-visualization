import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import { makeDataURL, DAY_VALUES, DEFAULT_CURRENCY } from "./constants";
import { CURRENCIES } from "./constants";

export const cryptoTrackerSlice = createSlice({
  name: "cryptoTracker",
  initialState: {
    data: {
      [DAY_VALUES.DAY.id]: [],
      [DAY_VALUES.WEEK.id]: [],
      [DAY_VALUES.MONTH.id]: [],
      [DAY_VALUES.YEAR.id]: [],
    },
    dataLoading: false,
    currencyLoading: false,
    error: null,
    timeRange: DAY_VALUES.YEAR.id,
    currency: DEFAULT_CURRENCY.name,
  },
  reducers: {
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload;
    },
    setCurrencyLoading: (state, action) => {
      state.currencyLoading = action.payload;
    },
    setData: (state, action) => {
      const { timeRange, prices } = action.payload;
      state.data[timeRange] = prices;
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
  },
});

export const selectDataLoading = (state) => state.cryptoTracker.dataLoading;
export const selectCurrencyLoading = (state) =>
  state.cryptoTracker.currencyLoading;
export const selectData = (state) => state.cryptoTracker.data;
export const selectError = (state) => state.cryptoTracker.error;
export const selectTimeRange = (state) => state.cryptoTracker.timeRange;
export const selectCurrency = (state) => state.cryptoTracker.currency;

export const {
  setDataLoading,
  setCurrencyLoading,
  setData,
  setError,
  setTimeRange,
  setCurrency,
} = cryptoTrackerSlice.actions;

export const getCryptoData = (timeRange, currency) => async (dispatch) => {
  dispatch(setDataLoading(true));
  console.log("currency: ", currency);
  const currencyCode = CURRENCIES[currency].code;
  const CRYPTO_DATA_URL = makeDataURL(timeRange, currencyCode);
  try {
    const cryptoData = await d3.json(CRYPTO_DATA_URL);
    const { prices } = cryptoData;
    dispatch(setData({ prices, timeRange }));
    dispatch(setDataLoading(false));
    dispatch(setError(null));
    // TODO - Add error reporting
  } catch (error) {
    dispatch(setError("Error Loading data."));
    dispatch(setDataLoading(false));
  }
};

export const getCurrencyList = () => async (dispatch) => {
  dispatch(setCurrencyLoading(true));
  try {
    // const currencyList = await d3.json(CURRENCY_URL);
    // const { prices } = cryptoData;
    // dispatch(setData({ prices, timeRange }));
    dispatch(setCurrencyLoading(false));
    // dispatch(setError(null));
  } catch (error) {
    // dispatch(setError("Error Loading data."));
    dispatch(setDataLoading(false));
  }
};

export default cryptoTrackerSlice.reducer;
