import { Login } from "@/types/guest";
import { myAxios } from "./apiService";
import AppApis from "@/constants/appApis";

export const login = async (formData: Login) => {
  const response = await myAxios.post(
    AppApis.auth.login,
    {
      email: formData.email,
      password: formData.password,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await myAxios.post(
    AppApis.resetPassword.forgotPassword,
    {
      email,
    },
    {
      isAuthRoute: false,
    }
  );
  return response.data;
};

export const validateResetPasswordOtp = async (
  otp: string,
  resetToken: string
) => {
  try {
    const response = await myAxios.post(
      AppApis.resetPassword.validateResetPasswordOtp,
      {
        otp: otp,
        resetToken: resetToken,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (
  otp: string,
  resetToken: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await myAxios.post(AppApis.resetPassword.resetPassword, {
      otp: otp,
      resetToken: resetToken,
      password: password,
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
