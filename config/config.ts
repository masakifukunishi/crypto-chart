export interface CryptowatchConfig {
  apiUrl: string;
  exchange: string;
  baseAsset: string;
  quoteAssets: string[];
  initialDataLimit: number;
  period: {
    daily: number;
  };
}
