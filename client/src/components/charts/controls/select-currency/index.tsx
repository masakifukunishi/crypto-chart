import { useSelector, useDispatch } from "react-redux";

import { selecKrakenConfig } from "../../../../store/slicers/config";
import { setCurrencyPair } from "../../../../store/slicers/chart";

interface CurrencyPair {
  displayName: string;
  value: string;
}

const Index = () => {
  const krakenConfig = useSelector(selecKrakenConfig);
  const baseAsset = krakenConfig.baseAsset;
  const quoteAssets = krakenConfig.quoteAssets;
  const currencyOptions = quoteAssets.map((quoteAsset: { symbol: string; altname: string }) => ({
    displayName: `${quoteAsset.altname} / ${baseAsset.altname}`,
    value: `${quoteAsset.symbol}_${baseAsset.symbol}`,
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
        className="border font-semibold rounded-lg block w-full px-2 py-1.5 bg-gray-700 border-gray-600 hover:border-blue-500 focus:border-blue-500 cursor-pointer"
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
