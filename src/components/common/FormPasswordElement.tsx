import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props {
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  value: string | number;
  name: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export default function FormPasswordElement({
  title,
  isRequired = true,
  disabled = false,
  placeholder = "P@ssword@123",
  value,
  name,
  error,
  inputMode,
  onChange,
  onBlur,
  min,
  max,
  minLength,
  maxLength,
  showPassword,
  togglePasswordVisibility,
}: Props) {
  return (
    <div className="mb-[20px] w-full">
      {title !== "" && (
        <label
          htmlFor={name}
          className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
        >
          {title}
          {isRequired && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="relative flex">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          className={`h-[46px] w-full bg-transparent rounded-[5px] border-[1px] border-solid  px-[15px] text-[14px] dark:text-gray-400 text-gray-600 outline-none shadow-sm ${
            error ? "border-danger" : "border-gray-300 dark:border-gray-600"
          } `}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          required={isRequired}
          inputMode={inputMode}
          disabled={disabled ?? false}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
        />
        <div className="absolute inset-y-0 right-0 top-0 flex h-full items-center justify-center pr-3 text-sm">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={togglePasswordVisibility}
          >
            <span className="sr-only">Show password</span>
            {showPassword ? (
              <BsEye className={`${error ? "text-danger" : ""}`} />
            ) : (
              <BsEyeSlash className={`${error ? "text-danger" : ""}`} />
            )}
          </button>
        </div>
      </div>
      {error && (
        <span className="mt-1 w-full text-[12px] font-normal italic text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
