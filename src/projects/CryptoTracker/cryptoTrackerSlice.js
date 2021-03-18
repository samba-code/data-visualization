import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import { CRYPTO_DATA_URL } from "./cryptoTrackerConstants";

export const cryptoTrackerSlice = createSlice({
  name: "cryptoTracker",
  initialState: {
    data: [],
    loading: false,
    error: null,
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
  },
});

export const selectLoading = (state) => state.cryptoTracker.loading;
export const selectData = (state) => state.cryptoTracker.data;
export const selectError = (state) => state.cryptoTracker.error;

export const { setLoading, setData, setError } = cryptoTrackerSlice.actions;

export const getCryptoData = () => async (dispatch) => {
  dispatch(setLoading(true));
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
