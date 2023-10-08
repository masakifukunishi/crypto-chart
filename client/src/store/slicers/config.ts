// src/store/chartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  kraken: {
    apiUrl: "",
    wsUrl: "",
    baseAsset: {
      symbol: "",
      altname: "",
    },
    quoteAssets: [
      {
        symbol: "",
        altname: "",
      },
    ],
    dataNum: 0,
    period: {
      daily: 0,
    },
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setKrakenConfig: (state, action) => {
      state.kraken = action.payload;
    },
    initializeKrakenConfig: (state) => {
      state.kraken = initialState.kraken;
    },
  },
});

export const { setKrakenConfig, initializeKrakenConfig } = configSlice.actions;

export const selecKrakenConfig = (state: RootState) => state.config.kraken;

export default configSlice.reducer;
