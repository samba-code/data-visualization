import { configureStore } from "@reduxjs/toolkit";
import weatherHistoryReducer from "../projects/WeatherHistory/weatherHistorySlice";
import cryptoTrackerReducer from "../projects/CryptoTracker/cryptoTrackerSlice";

export default configureStore({
  reducer: {
    weatherHistory: weatherHistoryReducer,
    cryptoTracker: cryptoTrackerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
