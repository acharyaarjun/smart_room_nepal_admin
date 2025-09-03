import AppApis from "@/constants/appApis";
import {
  clearSecureItems,
  getItemSecurely,
  setItemSecurely,
} from "@/helpers/local-storage";
import axios, { AxiosError, AxiosInstance } from "axios";

export const baseUrl = `${
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
}`;

declare module "axios" {
  interface AxiosRequestConfig {
    isAuthRoute?: boolean;
  }
}

const getAccessToken = () => {
  return getItemSecurely("accessToken") || null;
};

const saveAccessToken = (accessToken: string) => {
  setItemSecurely("accessToken", accessToken);
};

export const logout = async (): Promise<void> => {
  clearSecureItems(["accessToken", "user"]);
};

const myAxios: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  isAuthRoute: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.post(
      "http://localhost:8080" + AppApis.auth.refreshToken,
      {
        isAuthRoute: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const token: string = response.data.data.accessToken;
    saveAccessToken(token);
    return token;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 401
    ) {
      await logout();
      localStorage.setItem("redirectUrl", window.location.pathname);
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
};

myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    try {
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry === true &&
        originalRequest.isAuthRoute
      ) {
        originalRequest._retry = true;

        const token = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return myAxios(originalRequest);
      }

      throw error;
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401 &&
        originalRequest.isAuthRoute
      ) {
        await logout();
        localStorage.setItem("redirectUrl", window.location.pathname);
        window.location.href = "/";
      }

      return Promise.reject(error);
    }
  }
);

myAxios.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (config.isAuthRoute && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { myAxios };
