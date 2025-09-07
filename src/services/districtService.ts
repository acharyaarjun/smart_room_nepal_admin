import { DistrictForm } from "@/types/district";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllDistricts = async ({
  page = 1,
  size = 10,
  search = "",
}: Params) => {
  try {
    const params: Params = {
      page: page,
      size: size,
    };
    if (search) params.search = search;

    const response = await myAxios.get(AppApis.districts.all, { params });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSingleDistrict = async (slug: string) => {
  const response = await myAxios.get(AppApis.districts.getSingle(slug));
  return response.data;
};

export const addDistrict = async (data: DistrictForm) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image && data.image instanceof File)
    formData.append("image", data.image);
  const response = await myAxios.post(AppApis.districts.create, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDistrict = async (data: DistrictForm, id: number) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image && data.image instanceof File)
    formData.append("image", data.image);
  const response = await myAxios.put(AppApis.districts.update(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
