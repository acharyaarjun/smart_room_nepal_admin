"use client";
import Link from "next/link";
import {
  ButtonLoader,
  FormInputElement,
  FormPasswordElement,
  PopupMessage,
  SingleLineLoading,
} from "@/components/common";
import { useLogin } from "@/hooks";
import { useEffect, useState } from "react";
import { getItemSecurely } from "@/helpers/local-storage";

const SignIn = () => {
  const {
    email,
    password,
    isLoading,
    handleChange,
    togglePasswordVisibility,
    emailError,
    passwordError,
    showPassword,
    validateEmail,
    validatePassword,
    onSubmit,
    router,
  } = useLogin();

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
              Sign In
            </h3>
            <span className="text-[14px] text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in.
            </span>
          </div>
          <div className="">
            <form method="POST" onSubmit={onSubmit}>
              <div className="items-center mb-6 w-full">
                <span className="w-[100%] italic">
                  <PopupMessage messageShowOn={"login"} />
                </span>
              </div>

              <FormInputElement
                name="email"
                title="Email"
                value={email}
                error={emailError}
                placeholder="test@email.com"
                type="email"
                onChange={handleChange}
                onBlur={validateEmail}
                isRequired={true}
              />
              <FormPasswordElement
                name="password"
                title="Password"
                value={password}
                error={passwordError}
                onBlur={validatePassword}
                onChange={handleChange}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
                isRequired={true}
              />

              <div className="justify-end mb-6 w-full flex gap-3">
                <Link
                  href={"/forgot-password"}
                  className="text-[14px] capitalize cursor-pointer hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mb-6 w-full text-center">
                {isLoading ? (
                  <ButtonLoader />
                ) : (
                  <button className="bg-primary w-full py-2.5 rounded-lg text-white ">
                    Sign In
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

export default SignIn;
