import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllReviews = async ({
  page = 1,
  size = 10,
  search = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;

  const response = await myAxios.get(AppApis.reviews.all, { params });
  return response.data;
};
