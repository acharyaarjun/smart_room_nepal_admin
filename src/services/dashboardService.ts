import AppApis from "@/constants/appApis";
import { myAxios } from "./apiService";

export const getDashbaord = async () => {
  const response = await myAxios.get(AppApis.dashboard);
  return response.data;
};
