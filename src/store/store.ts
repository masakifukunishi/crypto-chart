import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./slicers/chart";
import constantReducer from "./slicers/constant";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    constant: constantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
