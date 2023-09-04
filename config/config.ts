export interface CryptowatchConfig {
  apiUrl: string;
  exchange: string;
  baseAsset: string;
  quoteAssets: string[];
  initDataNum: number;
  dailyDataNum: number;
  period: {
    daily: number;
  };
}
