import { useEffect } from "react";
import { useDispatch } from "react-redux";
import configsApi from "../api/configs";
import { setKrakenConfig, initializeKrakenConfig } from "../store/slicers/config";

const useConfigs = (configType: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        if (configType === "kraken") {
          const _krakenConfigs = await configsApi.getKraken();
          dispatch(setKrakenConfig(_krakenConfigs));
        }
      } catch (error) {
        console.error("Error fetching configs:", error);
      }
    };
    fetchConfigs();
    return () => {
      dispatch(initializeKrakenConfig());
    };
  }, [dispatch, configType]);

  return;
};

export default useConfigs;
