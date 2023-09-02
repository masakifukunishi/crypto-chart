import config from "config";

interface CurrencyPair {
  displayName: string;
  value: string;
}

const Index = () => {
  const baseAsset = config.cryptowatch.baseAsset.toUpperCase();
  const quoteAssets = config.cryptowatch.quoteAssets;
  const currencyOptions = quoteAssets.map((quoteAsset: string) => ({
    displayName: `${quoteAsset.toUpperCase()} / ${baseAsset}`,
    value: `${quoteAsset}_${baseAsset}`,
  }));

  return (
    <>
      <select className="border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 hover:border-red-500 focus:border-red-500 cursor-pointer">
        {currencyOptions.map((pair: CurrencyPair) => (
          <option key={pair.value} value={pair.value}>
            {pair.displayName}
          </option>
        ))}
      </select>
    </>
  );
};

export default Index;
