import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./slicers/chart";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
