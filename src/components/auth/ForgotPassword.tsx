"use client";
import {
  ButtonLoader,
  FormInputElement,
  PopupMessage,
  SingleLineLoading,
} from "@/components/common";
import { useEffect, useState } from "react";
import { useForgotPassword } from "@/hooks";
import { getItemSecurely } from "@/helpers/local-storage";

const ForgotPassword = () => {
  const {
    email,
    isLoading,
    handleChange,
    emailError,
    validateEmail,
    onSubmitSendOTP,
    router,
  } = useForgotPassword();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const token = getItemSecurely("accessToken");
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen pt-10">
      {loading ? (
        <SingleLineLoading />
      ) : (
        <div className="w-full sm:w-fit sm:min-w-[500px] max-w-3xl px-5 bg-white dark:bg-dark dark:border-gray-700 dark:border shadow-card rounded-lg">
          <div className="my-7 text-center">
            <h3 className="text-[24px] font-semibold text-gray-800 dark:text-gray-200">
              Forgot Password
            </h3>
            <span className="text-[14px] text-gray-500 dark:text-gray-400">
              Enter your email address to send a verification code
            </span>
          </div>
          <div className="">
            <form method="POST" onSubmit={onSubmitSendOTP}>
              <div className="items-center mb-6 w-full">
                <span className="w-[100%] italic">
                  <PopupMessage messageShowOn={"forgot-password"} />
                </span>
              </div>

              <FormInputElement
                name="email"
                title="Email"
                value={email ?? ""}
                error={emailError}
                placeholder="Email"
                type="email"
                onChange={handleChange}
                onBlur={validateEmail}
                isRequired={true}
              />

              <div className="mb-6 w-full text-center">
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <button className="bg-primary w-full py-2.5 rounded-lg text-white font-normal">
                    Send OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
