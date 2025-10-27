import { RoomForm } from "@/types/room";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  roomStatus?: string;
  isFeatured?: boolean;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  district?: string; // district slug
  maxCapacity?: string;
  userId?: number;
}

export const getAllRooms = async ({
  page = 1,
  size = 10,
  search = "",
  roomStatus = "",
  isFeatured = false,
  roomType = "",
  minPrice = 0,
  maxPrice = 0,
  district = "",
  maxCapacity = "",
  userId = 0,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (roomStatus) params.roomStatus = roomStatus;
  if (isFeatured) params.isFeatured = isFeatured;
  if (roomType) params.roomType = roomType;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  if (district) params.district = district;
  if (maxCapacity) params.maxCapacity = maxCapacity;
  if (userId) params.userId = userId;

  const response = await myAxios.get(AppApis.rooms.all, { params });
  return response.data;
};

export const updateRoom = async (data: RoomForm, slug: string) => {
  const response = await myAxios.put(AppApis.rooms.update(slug), data);
  return response.data;
};

export const getAllAmenitiesForRoom = async (slug: string) => {
  const response = await myAxios.get(AppApis.rooms.amenities(slug), {
    params: {
      size: 1000,
    },
  });
  return response.data;
};

export const getAllMediasForRoom = async (slug: string) => {
  const response = await myAxios.get(AppApis.rooms.medias(slug), {
    params: {
      size: 1000,
    },
  });
  return response.data;
};
