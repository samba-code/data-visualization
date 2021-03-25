import { createSlice } from "@reduxjs/toolkit";
import * as d3 from "d3";
import { WEATHER_DATA_URL } from "./constants";

export const weatherHistorySlice = createSlice({
  name: "weatherHistory",
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

export const selectLoading = (state) => state.weatherHistory.loading;
export const selectData = (state) => state.weatherHistory.data;
export const selectError = (state) => state.weatherHistory.error;

export const { setLoading, setData, setError } = weatherHistorySlice.actions;

export const getWeatherHistory = () => async (dispatch) => {
  dispatch(setLoading(true));
  const dataURL = WEATHER_DATA_URL;
  try {
    const weatherHistory = await d3.json(dataURL);
    dispatch(setData(weatherHistory));
    dispatch(setLoading(false));
    dispatch(setError(null));
    // TODO - Add error reporting
  } catch (error) {
    dispatch(setError("Error Loading data."));
    dispatch(setLoading(false));
  }
};

export default weatherHistorySlice.reducer;
