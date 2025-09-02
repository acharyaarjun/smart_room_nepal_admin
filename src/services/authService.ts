import AppApis from "@/constants/appApis";
import { myAxios } from "./apiService";

export const logout = async () => {
  const response = await myAxios.post(AppApis.auth.logout);
  return response.data;
};
