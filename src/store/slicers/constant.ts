// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  CHART_CONSTANT: {
    CHART_PERIOD: {
      ONE_YEAR: {
        value: "",
        displayName: "",
      },
      YEAR_TO_DATE: {
        value: "",
        displayName: "",
      },
      SIX_MONTHS: {
        value: "",
        displayName: "",
      },
      ONE_MONTH: {
        value: "",
        displayName: "",
      },
    },
  },
};

const constantSlice = createSlice({
  name: "constant",
  initialState,
  reducers: {
    setChartConstant: (state, action) => {
      state.CHART_CONSTANT = action.payload;
    },
    initializeChartConstant: (state) => {
      state.CHART_CONSTANT = initialState.CHART_CONSTANT;
    },
  },
});

export const { setChartConstant, initializeChartConstant } = constantSlice.actions;

export const selectChartConstant = (state: RootState) => state.constant.CHART_CONSTANT;

export default constantSlice.reducer;
