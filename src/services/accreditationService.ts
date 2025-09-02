import { AccreditationForm } from "@/types/accreditation";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  page?: number;
  size?: number;
  search?: string;
}

export const getAllAccreditations = async ({
  page = 1,
  size = 10,
  search = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  const response = await myAxios.get(AppApis.accreditations.get, { params });
  return response.data;
};

export const addAccreditation = async (data: AccreditationForm) => {
  const response = await myAxios.post(AppApis.accreditations.add, data);
  return response.data;
};

export const updateAccreditation = async (
  data: AccreditationForm,
  id: number
) => {
  const response = await myAxios.put(AppApis.accreditations.update(id), data);
  return response.data;
};

export const changeAccreditationStatus = async (
  isActive: boolean,
  id: number
) => {
  const response = await myAxios.put(AppApis.accreditations.update(id), {
    isActive,
  });
  return response.data;
};
