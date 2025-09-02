"use client";
import { encryptAccessToken } from "@/helpers/crypto";
import { useState, ChangeEvent, FormEvent } from "react";
import { logout as signout } from "@/services/authService";
import { login } from "@/services/guestService";
import { setToLocalStorage } from "@/helpers/local-storage";
import { useDispatch } from "react-redux";
import { removeAuth, setAuth } from "@/redux/features/authSlice";
import { setMessage } from "@/redux/features/popupMessageSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Login } from "@/types/guest";
import { User } from "@/types/user";

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      setEmailError(null);
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateEmail();
    validatePassword();

    if (email && password && !emailError && !passwordError) {
      setIsLoading(true);
      try {
        const response = await login(formData);

        const accessToken: string = response.data.accessToken;
        const encryptedAccessToken = encryptAccessToken(accessToken);
        setToLocalStorage("accessToken", encryptedAccessToken);

        const user: User = response.data.user;
        dispatch(setAuth(user));
        const userData = JSON.stringify(user);
        setToLocalStorage("user", userData);

        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          if (
            user.role.title === "super-admin" ||
            user.role.title === "admin"
          ) {
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        dispatch(
          setMessage({
            message: error.response.data?.message || "Something went wrong",
            type: "error",
            showOn: "login",
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await signout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(removeAuth());
    router.push("/");
    setIsLoading(false);
  };

  return {
    router,
    email,
    password,
    isLoading,
    handleChange,
    formData,
    togglePasswordVisibility,
    emailError,
    passwordError,
    showPassword,
    validateEmail,
    validatePassword,
    handleLogout,
    onSubmit,
  };
};

export default useLogin;
