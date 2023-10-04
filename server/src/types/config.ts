export interface CryptowatchConfig {
  apiUrl: string;
  baseAsset: {
    symbol: string;
    altname: string;
  };
  quoteAssets: {
    symbol: string;
    altname: string;
  }[];
  initDataNum: number;
  dailyDataNum: number;
  period: {
    daily: number;
  };
}
