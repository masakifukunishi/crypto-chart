import config from "config";

// interface CurrencyPair {
//   displayName: string;
//   value: string;
// }

const Index = () => {
  // const cryptoWatchConfig: any = config.get("cryptowatch");
  // console.log(cryptoWatchConfig);
  // const baseAsset = cryptoWatchConfig.baseAsset.toUpperCase();
  // const quoteAssets = cryptoWatchConfig.quoteAssets;
  // const currencyOptions = quoteAssets.map((quoteAsset: string) => ({
  //   displayName: `${quoteAsset.toUpperCase()} / ${baseAsset}`,
  //   value: `${quoteAsset}_${baseAsset}`,
  // }));

  return (
    <>
      {/* <select className="border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 hover:border-red-500 focus:border-red-500 cursor-pointer">
        {currencyOptions.map((pair: CurrencyPair) => (
          <option key={pair.value} value={pair.value}>
            {pair.displayName}
          </option>
        ))}
      </select> */}
    </>
  );
};

export default Index;
