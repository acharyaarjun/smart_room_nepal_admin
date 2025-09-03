"use client";
import {
  ButtonLoader,
  FormPasswordElement,
  PopupMessage,
  SingleLineLoading,
} from "@/components/common";
import { useEffect, useState } from "react";
import { getItemSecurely } from "@/helpers/local-storage";
import { useForgotPassword } from "@/hooks";

const ResetPassword = () => {
  const {
    isLoading,
    handleChange,
    showPassword,
    togglePasswordVisibility,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    validatePassword,
    validateConfirmPassword,
    onSubmitResetPassword,
    otp,
    resetToken,
    router,
  } = useForgotPassword();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthAndToken = () => {
      if (!otp || !resetToken) {
        router.push("/forgot-password");
        return;
      }
      const token = getItemSecurely("accessToken");
      if (token) {
        router.push("/dashboard");
        return;
      }
      setLoading(false);
    };
    checkAuthAndToken();
  }, [otp, resetToken, router]);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen pt-10">
      {loading ? (
        <SingleLineLoading />
      ) : (
        <div className="w-full sm:w-fit sm:min-w-[500px] max-w-3xl px-5 bg-white dark:bg-darkbg dark:border-gray-700 dark:border shadow-card rounded-lg">
          <div className="my-7 text-center">
            <h3 className="text-[24px] font-semibold text-gray-800 dark:text-gray-200">
              Reset Password
            </h3>
            <span className="text-[14px] text-gray-500 dark:text-gray-400"></span>
          </div>
          <form
            method="POST"
            onSubmit={onSubmitResetPassword}
            className="space-y-6"
          >
            <div className="w-full italic">
              <PopupMessage messageShowOn="reset-password" />
            </div>

            <FormPasswordElement
              name="password"
              title="Password"
              value={password ?? ""}
              error={passwordError}
              onBlur={validatePassword}
              onChange={handleChange}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              isRequired={true}
            />

            <FormPasswordElement
              name="confirmPassword"
              title="Confirm Password"
              value={confirmPassword ?? ""}
              error={confirmPasswordError}
              onBlur={validateConfirmPassword}
              onChange={handleChange}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
              showPassword={showConfirmPassword}
              isRequired={true}
            />

            <div className="w-full text-center">
              {isLoading ? (
                <ButtonLoader />
              ) : (
                <button
                  type="submit"
                  className="bg-primary w-full py-2.5 rounded-lg text-white font-normal"
                >
                  Reset Password
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
