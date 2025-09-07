import { MembershipTypeForm } from "@/types/membership-type";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllMembershipTypes = async ({
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

    const response = await myAxios.get(AppApis.membershipType.all, { params });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSingleMembershipType = async (slug: string) => {
  const response = await myAxios.get(AppApis.membershipType.getSingle(slug));
  return response.data;
};

export const addMembershipType = async (data: MembershipTypeForm) => {
  const response = await myAxios.post(AppApis.membershipType.create, data);
  return response.data;
};

export const updateMembershipType = async (
  data: MembershipTypeForm,
  id: number
) => {
  const response = await myAxios.put(AppApis.membershipType.update(id), data);
  return response.data;
};

export const deleteMembershipType = async (id: number) => {
  const response = await myAxios.delete(AppApis.membershipType.delete(id));
  return response.data;
};

// Default export as object
const membershipTypeService = {
  getAllMembershipTypes,
  getSingleMembershipType,
  addMembershipType,
  updateMembershipType,
  deleteMembershipType,
};

export default membershipTypeService;
