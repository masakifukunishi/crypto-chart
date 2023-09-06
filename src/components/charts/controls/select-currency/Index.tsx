import { useSelector, useDispatch } from "react-redux";

import { selecCryptowatchConfig } from "../../../../store/slicers/config";
import { setCurrencyPair } from "../../../../store/slicers/chart";

interface CurrencyPair {
  displayName: string;
  value: string;
}

const Index = () => {
  const cryptowatchConfig = useSelector(selecCryptowatchConfig);
  const baseAsset = cryptowatchConfig.baseAsset;
  const quoteAssets = cryptowatchConfig.quoteAssets;
  const currencyOptions = quoteAssets.map((quoteAsset: string) => ({
    displayName: `${quoteAsset.toUpperCase()} / ${baseAsset.toUpperCase()}`,
    value: `${quoteAsset}_${baseAsset}`,
  }));

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setCurrencyPair(value));
  };

  return (
    <>
      <select
        onChange={handleChange}
        className="border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 hover:border-red-500 focus:border-red-500 cursor-pointer"
      >
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
