"use client";
import {
  ButtonLoader,
  PopupMessage,
  SingleLineLoading,
} from "@/components/common";
import { useEffect, useState } from "react";
import { useForgotPassword } from "@/hooks";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { getItemSecurely } from "@/helpers/local-storage";

const VerifyOtp = () => {
  const {
    email,
    resetToken,
    isLoading,
    otpError,
    otpInputs,
    inputRefs,
    router,
    onSubmitOTPVerify,
    validateOtp,
    handleOtpInputChange,
    handleKeyDown,
    resendOTP,
    dispatch,
    countdown,
    setCountdown,
  } = useForgotPassword();

  useEffect(() => {
    if (
      email === "" ||
      email === null ||
      resetToken === null ||
      resetToken === ""
    ) {
      dispatch(
        setMessage({
          message: "Invalid reset link",
          type: "error",
          showOn: "forgot-password",
        })
      );
      router.push("/forgot-password");
    } else {
      // Start the countdown when the page loads if not already set
      if (countdown === null) {
        setCountdown(60);
      }
    }
  }, [email, resetToken, router, countdown, setCountdown, dispatch]);

  const handleResendOtp = (event: any) => {
    event.preventDefault();
    if (countdown === null || countdown === 0) {
      resendOTP(event);
      setCountdown(60);
    }
  };

  useEffect(() => {
    const token = getItemSecurely("accessToken");
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen pt-10">
      {loading ? (
        <SingleLineLoading />
      ) : (
        <div className="w-full sm:w-fit sm:min-w-[500px] max-w-3xl px-5 bg-white dark:bg-dark dark:border-gray-700 dark:border shadow-card rounded-lg">
          <div className="my-7 text-center">
            <h3 className="text-[24px] font-semibold text-gray-800 dark:text-gray-200">
              Verify OTP
            </h3>
            <span className="text-[14px] text-gray-500 dark:text-gray-400">
              Enter the OTP sent to your email
            </span>
          </div>
          <div className="">
            <form method="POST" onSubmit={onSubmitOTPVerify}>
              <div className="items-center mb-6 w-full">
                <span className="w-[100%] italic">
                  <PopupMessage messageShowOn={"verify-otp"} />
                </span>
              </div>

              <div className="flex flex-col gap-2 items-start mb-4">
                <label htmlFor="email">OTP</label>
                <div className="flex w-full justify-between">
                  {otpInputs.map((otpInput, index) => (
                    <input
                      title="otp"
                      key={index}
                      type="text"
                      name="otp"
                      id={`otp-${index}`}
                      className={`border-[1px] border-solid bg-transparent px-[15px]
                    h-[30px] w-[30px] rounded-[5px] border-gray-200 dark:border-gray-700 focus:border-primary text-center text-[14px] text-gray-500 outline-[0] ${
                      otpError && "border-danger"
                    } sm:h-[50px] sm:w-[50px] md:h-[50px] md:w-[50px]`}
                      onChange={(e) => handleOtpInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onBlur={validateOtp}
                      value={otpInput}
                      ref={inputRefs[index]}
                      maxLength={1}
                      inputMode="numeric"
                      required
                    />
                  ))}
                </div>
                {otpError && (
                  <span className="mt-1 w-full text-[12px]  italic leading-[1] tracking-[0] text-danger">
                    {otpError}
                  </span>
                )}
              </div>

              <div className="w-full text-center">
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <button className="bg-primary w-full py-2.5 rounded-lg text-white ">
                    Send OTP
                  </button>
                )}
              </div>

              <div
                className={`flex gap-2 justify-center opacity-70 text-[15px] py-8 ${
                  countdown !== null && countdown > 0
                    ? "pointer-events-none opacity-50"
                    : ""
                } cursor-pointer"`}
                onClick={handleResendOtp}
              >
                {countdown !== null && countdown > 0 ? (
                  <div>
                    <p>{`Resend OTP in ${countdown}s`}</p>
                  </div>
                ) : (
                  <>
                    <p>Didn&apos;t recieve OTP?</p>
                    <button type="button" className="text-primary ">
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;
