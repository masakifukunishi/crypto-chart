import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./slicers/chart";

const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export default store;
