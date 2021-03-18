import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import { makeDataURL } from "./constants";
import { DAY_VALUES } from "./constants";

export const cryptoTrackerSlice = createSlice({
  name: "cryptoTracker",
  initialState: {
    data: [],
    loading: false,
    error: null,
    days: DAY_VALUES.YEAR.id,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
  },
});

export const selectLoading = (state) => state.cryptoTracker.loading;
export const selectData = (state) => state.cryptoTracker.data;
export const selectError = (state) => state.cryptoTracker.error;
export const selectDays = (state) => state.cryptoTracker.days;

export const {
  setLoading,
  setData,
  setError,
  setDays,
} = cryptoTrackerSlice.actions;

export const getCryptoData = (days) => async (dispatch) => {
  dispatch(setLoading(true));
  const CRYPTO_DATA_URL = makeDataURL(days);
  try {
    const cryptoData = await d3.json(CRYPTO_DATA_URL);
    const { prices } = cryptoData;
    dispatch(setData(prices));
    dispatch(setLoading(false));
    dispatch(setError(null));
    // TODO - Add error reporting
  } catch (error) {
    dispatch(setError("Error Loading data."));
    dispatch(setLoading(false));
  }
};

export default cryptoTrackerSlice.reducer;
