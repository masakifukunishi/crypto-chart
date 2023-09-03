import { useEffect } from "react";
import { useDispatch } from "react-redux";
import constantsApi from "../api/constants";
import { setChartConstant, initializeChartConstant } from "../store/slicers/constant";

const useConstants = (constantType: string): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        if (constantType === "chart") {
          const _chartConstants = await constantsApi.getChart();
          dispatch(setChartConstant(_chartConstants));
        }
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
    };
    fetchConstants();
    return () => {
      dispatch(initializeChartConstant());
    };
  }, [dispatch]);

  return;
};

export default useConstants;
