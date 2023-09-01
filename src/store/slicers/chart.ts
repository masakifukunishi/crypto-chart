// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: "1YEAR",
  currencyPair: "BTC-USD",
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartPeriod: (state, action) => {
      state.period = action.payload;
    },
    setCurrencyPair: (state, action) => {
      state.currencyPair = action.payload;
    },
  },
});

export const { setChartPeriod, setCurrencyPair } = chartSlice.actions;

export default chartSlice.reducer;
