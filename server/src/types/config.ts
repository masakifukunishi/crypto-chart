export interface KrakenConfig {
  apiUrl: string;
  wsUrl: string;
  baseAsset: {
    symbol: string;
    altname: string;
  };
  quoteAssets: {
    symbol: string;
    altname: string;
  }[];
  initDataNum: number;
  period: {
    daily: number;
  };
}
