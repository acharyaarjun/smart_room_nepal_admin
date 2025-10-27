import { UserForm } from "@/types/user";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  role?: string; // either admin, user or host
}

export const getAllUsers = async ({
  page = 1,
  size = 10,
  search = "",
  role = "",
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (role) params.role = role;

  const response = await myAxios.get(AppApis.users.all, { params });
  return response.data;
};

export const updateUser = async (data: UserForm, id: number) => {
  const response = await myAxios.put(AppApis.users.update(id), data);
  return response.data;
};
