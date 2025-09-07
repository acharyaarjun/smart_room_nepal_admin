import { AmenityForm } from "@/types/amenity";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllAmenities = async ({
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

    const response = await myAxios.get(AppApis.amenity.all, { params });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSingleAmenity = async (slug: string) => {
  const response = await myAxios.get(AppApis.amenity.getSingle(slug));
  return response.data;
};

export const addAmenity = async (data: AmenityForm) => {
  const response = await myAxios.post(AppApis.amenity.create, data);
  return response.data;
};

export const updateAmenity = async (data: AmenityForm, id: number) => {
  const response = await myAxios.put(AppApis.amenity.update(id), data);
  return response.data;
};
