import { useEffect } from "react";
import { useDispatch } from "react-redux";
import configsApi from "../api/configs";
import { setCryptowatchConfig, initializeCryptowatchConfig } from "../store/slicers/config";

const useConfigs = (configType: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        if (configType === "cryptowatch") {
          const _cryptowatchConfigs = await configsApi.getCryptowatch();
          dispatch(setCryptowatchConfig(_cryptowatchConfigs));
        }
      } catch (error) {
        console.error("Error fetching configs:", error);
      }
    };
    fetchConfigs();
    return () => {
      dispatch(initializeCryptowatchConfig());
    };
  }, [dispatch]);

  return;
};

export default useConfigs;
