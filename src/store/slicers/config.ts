// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  cryptowatch: {
    apiUrl: "",
    exchange: "",
    baseAsset: "",
    quoteAssets: [],
    initialDataLimit: 0,
    period: {
      daily: 0,
    },
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setCryptowatchConfig: (state, action) => {
      state.cryptowatch = action.payload;
    },
    initializeCryptowatchConfig: (state) => {
      state.cryptowatch = initialState.cryptowatch;
    },
  },
});

export const { setCryptowatchConfig, initializeCryptowatchConfig } = configSlice.actions;

export const selecCryptowatchConfig = (state: RootState) => state.config.cryptowatch;

export default configSlice.reducer;
