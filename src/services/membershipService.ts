import { MembershipForm } from "./../types/membership";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  status?: string;
}

export const getAllMemberships = async ({
  page = 1,
  size = 10,
  search = "",
  status = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (status) params.status = status;

  const response = await myAxios.get(AppApis.membership.all, { params });
  return response.data;
};

export const updateMembership = async (data: MembershipForm, id: number) => {
  const response = await myAxios.put(AppApis.membership.update(id), data);
  return response.data;
};
