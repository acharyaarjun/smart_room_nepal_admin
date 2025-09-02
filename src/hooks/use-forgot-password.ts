"use client";
import { setEmail, setOtp, setResetToken } from "@/redux/features/guestSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";

import {
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
} from "@/services/guestService";
import { ForgotPassword } from "@/types/guest";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/types/user";
import { RootState } from "@/redux/store";

export default function useForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<ForgotPassword>({
    password: null,
    confirmPassword: null,
    email: useSelector((state: any) => state.guest.email),
    otp: useSelector((state: any) => state.guest.otp),
    resetToken: useSelector((state: any) => state.guest.resetToken),
  });

  const { email, password, otp, resetToken, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resetTokenError, setResetTokenError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateOtp = () => {
    if (otpInputs.join("")) {
      if (!(otpInputs.length === 6)) {
        setOtpError("Otp invalid!");
      } else {
        setOtpError("");
      }
    } else {
      setOtpError("Otp Required!");
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      setEmailError("");
    }
  };

  const validateResetToken = () => {
    if (!resetToken) {
      setResetTokenError("Phone Number is required!");
    } else {
      setResetTokenError(null);
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required!");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters!");
    } else {
      setPasswordError(null);
    }
  };

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      setConfirmPasswordError("Confirm Password is required!");
    } else if (formData.confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const onSubmitSendOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmail();

    setIsLoading(true);
    if (email && !emailError) {
      try {
        const response: any = await forgotPassword(email);
        dispatch(
          setMessage({
            message: "Otp sent successfully! Please check your email",
            type: "success",
            showOn: "verify-otp",
          })
        );
        dispatch(setEmail(email));
        dispatch(setResetToken(response.data.resetToken));
        router.push("/verify-otp");
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];
              if (key === "email") {
                setEmailError(value);
              }
            });
          }
          dispatch(
            setMessage({
              message: error.response.data.message,
              type: "error",
              showOn: "forgot-password",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: "Something went wrong",
            type: "error",
            showOn: "forgot-password",
          })
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(
        setMessage({
          message: "Please enter a valid email",
          type: "error",
          showOn: "forgot-password",
        })
      );
    }
  };

  const resendOTP = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      try {
        setIsLoading(true);
        const response: any = await forgotPassword(email);
        dispatch(setResetToken(response.data.resetToken));
        dispatch(
          setMessage({
            message: "Otp sent successfully! Please check your email",
            type: "success",
            showOn: "verify-otp",
          })
        );
        setCountdown(60);
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          dispatch(
            setMessage({
              message: error.response.data.message,
              type: "error",
              showOn: "verify-otp",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: "Something went wrong",
            type: "error",
            showOn: "verify-otp",
          })
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(
        setMessage({
          message: "Please enter a valid email",
          type: "error",
          showOn: "verify-otp",
        })
      );
    }
  };

  const [otpInputs, setOtpInputs] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target.value;
    if (/^\d$/.test(input)) {
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = input;
      setOtpInputs(newOtpInputs);

      if (index < 5 && input !== "") {
        const nextInputRef = inputRefs[index + 1];
        if (nextInputRef.current) {
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otpInputs[index] === "" && index > 0) {
        const prevInputRef = inputRefs[index - 1];
        if (prevInputRef.current) {
          prevInputRef.current.focus();
        }
      }
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = "";
      setOtpInputs(newOtpInputs);
    }
  };

  const isVerifyButtonEnabled = otpInputs.every((input) => input !== "");

  // Function to reset OTP input and error message
  const resetOtpInput = () => {
    setOtpInputs(["", "", "", "", "", ""]);
    if (otpError) {
      setOtpError("");
    }
  };

  const newResetToken = useSelector((state: any) => state.guest.resetToken);

  const onSubmitOTPVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateOtp();
    const otp = otpInputs.join("");
    const stringOTP = otp.toString();
    if (!otpError && newResetToken) {
      setIsLoading(true);
      try {
        await validateResetPasswordOtp(stringOTP, newResetToken);
        dispatch(
          setMessage({
            message: "OTP verified successfully!",
            type: "success",
            showOn: "reset-password",
          })
        );
        dispatch(setOtp(stringOTP));
        router.push("/reset-password");
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];
              if (key === "otp") {
                setOtpError(value);
              }
            });
          }
          dispatch(
            setMessage({
              message: error.response.data.message,
              type: "error",
              showOn: "verify-otp",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: "Something went wrong",
            type: "error",
            showOn: "verify-otp",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onSubmitResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePassword();
    validateConfirmPassword();

    if (
      !passwordError &&
      !confirmPasswordError &&
      resetToken &&
      otp &&
      password &&
      confirmPassword
    ) {
      try {
        setIsLoading(true);
        await resetPassword(otp, resetToken, password, confirmPassword);
        dispatch(
          setMessage({
            message: "Password reset successfully!",
            type: "success",
            showOn: "login",
          })
        );
        router.push("/login");
      } catch (error: any) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            errors.map((error: any) => {
              const key = Object.keys(error)[0];
              const value = error[key];
              if (key === "password") {
                setPasswordError(value);
              } else if (key === "confirmPassword") {
                setConfirmPasswordError(value);
              }
            });
          }
          dispatch(
            setMessage({
              message: error.response.data.message,
              type: "error",
              showOn: "reset-password",
            })
          );
          return;
        }
        dispatch(
          setMessage({
            message: "Something went wrong",
            type: "error",
            showOn: "reset-password",
          })
        );
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const pathname = usePathname();

  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const redirectIfAuthenticate = () => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        if (pathname === "/verify-email") {
          if (user && user.isEmailVerified) {
            router.push("/");
          }
        } else {
          router.push("/");
        }
      }
    }
  };

  useEffect(() => {
    redirectIfAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname, user]);

  return {
    email,
    password,
    otp,
    resetToken,
    confirmPassword,
    formData,
    showPassword,
    showConfirmPassword,
    emailError,
    otpError,
    resetTokenError,
    passwordError,
    confirmPasswordError,
    isLoading,
    otpInputs,
    inputRefs,
    isVerifyButtonEnabled,
    router,
    redirectIfAuthenticate,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateEmail,
    validatePassword,
    validateOtp,
    validateResetToken,
    validateConfirmPassword,
    onSubmitSendOTP,
    onSubmitOTPVerify,
    handleOtpInputChange,
    resetOtpInput,
    handleKeyDown,
    resendOTP,
    useEffect,
    onSubmitResetPassword,
    dispatch,
    countdown,
    setCountdown,
  };
}
