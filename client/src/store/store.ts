import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./slicers/chart";
import constantReducer from "./slicers/constant";
import configReducer from "./slicers/config";

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    constant: constantReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
