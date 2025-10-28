import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

interface Params {
  search?: string;
  page?: number;
  size?: number;
  roomRequestStatus?: string; // @/enums/roomRequestStatus.ts
  room?: string; // room slug
}

export const getAllRoomRequests = async ({
  page = 1,
  size = 10,
  search = "",
  roomRequestStatus,
  room,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (roomRequestStatus) params.roomRequestStatus = roomRequestStatus;
  if (room) params.room = room;

  const response = await myAxios.get(AppApis.roomRequests.all, { params });
  return response.data;
};
