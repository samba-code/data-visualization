import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import { makeDataURL } from "./constants";
import { DAY_VALUES } from "./constants";

export const cryptoTrackerSlice = createSlice({
  name: "cryptoTracker",
  initialState: {
    data: {
      [DAY_VALUES.DAY.id]: [],
      [DAY_VALUES.WEEK.id]: [],
      [DAY_VALUES.MONTH.id]: [],
      [DAY_VALUES.YEAR.id]: [],
    },
    loading: false,
    error: null,
    timeRange: DAY_VALUES.YEAR.id,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
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
  },
});

export const selectLoading = (state) => state.cryptoTracker.loading;
export const selectData = (state) => state.cryptoTracker.data;
export const selectError = (state) => state.cryptoTracker.error;
export const selectTimeRange = (state) => state.cryptoTracker.timeRange;

export const {
  setLoading,
  setData,
  setError,
  setTimeRange,
} = cryptoTrackerSlice.actions;

export const getCryptoData = (timeRange) => async (dispatch) => {
  dispatch(setLoading(true));
  const CRYPTO_DATA_URL = makeDataURL(timeRange);
  try {
    const cryptoData = await d3.json(CRYPTO_DATA_URL);
    const { prices } = cryptoData;
    dispatch(setData({ prices, timeRange }));
    dispatch(setLoading(false));
    dispatch(setError(null));
    // TODO - Add error reporting
  } catch (error) {
    dispatch(setError("Error Loading data."));
    dispatch(setLoading(false));
  }
};

export default cryptoTrackerSlice.reducer;
