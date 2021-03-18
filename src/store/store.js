import { configureStore } from "@reduxjs/toolkit";
import weatherHistoryReducer from "../projects/WeatherHistory/weatherHistorySlice";

export default configureStore({
  reducer: {
    weatherHistory: weatherHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
