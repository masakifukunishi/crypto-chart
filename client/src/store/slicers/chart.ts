// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  period: "",
  currencyPair: "",
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

export const selectChartPeriod = (state: RootState) => state.chart.period;
export const selectCurrencyPair = (state: RootState) => state.chart.currencyPair;

export default chartSlice.reducer;
