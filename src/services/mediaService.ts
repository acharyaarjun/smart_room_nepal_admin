import AppApis from "@/constants/appApis";
import { myAxios } from "./apiService";
import { AxiosProgressEvent } from "axios";

interface Params {
  page?: number;
  size?: number;
  search?: string;
  mediaId?: number;
  mimeType?: string;
}

export const getMedias = async ({
  page = 1,
  size = 10,
  search = "",
  mimeType,
}: Params) => {
  const params: Params = {
    page: page,
    size: size,
  };
  if (search) params.search = search;
  if (mimeType) params.mimeType = mimeType;
  const response = await myAxios.get(AppApis.medias.get, { params });
  return response.data;
};

export interface UploadMediaParams {
  file: File;
  onProgress?: (progress: number) => void;
}

export interface UploadMediaResponse {
  message: string;
  status: number;
  data: {
    id: number;
    url: string;
    fileName: string;
    mimeType: string;
    path: string;
  };
}

export const uploadMedia = async ({
  file,
  onProgress,
}: UploadMediaParams): Promise<UploadMediaResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await myAxios.post<UploadMediaResponse>(
      AppApis.medias.upload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (onProgress) onProgress(progress);
          }
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("File upload failed", error);
    throw {
      message: error.response?.data?.message || "An unknown error occurred.",
      details: error.response?.data || {},
    };
  }
};

export const deleteMedia = async (id: number) => {
  const response = await myAxios.delete(AppApis.medias.delete(id));
  return response.data;
};
