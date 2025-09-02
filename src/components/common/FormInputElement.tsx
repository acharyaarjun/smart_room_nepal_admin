import React from "react";

interface Props {
  title: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
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
}

export default function FormInputElement({
  title,
  isRequired = false,
  disabled = false,
  placeholder = "",
  type = "text",
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
}: Props) {
  return (
    <div className="mb-[10px] w-full">
      {title !== "" && (
        <label
          htmlFor={name}
          className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
        >
          {title}
          {isRequired && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="flex items-center justify-between">
        <input
          type={type}
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
      </div>
      {error && (
        <span className="mt-1 w-full text-[12px] font-normal italic text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
