import React from "react";

interface Props {
  isRequired?: boolean;
  placeholder?: string;
  value: string;
  name: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  title?: string;
  disabled?: boolean;
}

export default function FormDefaultTextareaElement({
  title,
  isRequired = false,
  placeholder = "",
  value,
  name,
  error,
  onChange,
  onBlur,
  disabled = false,
}: Props) {
  return (
    <div className="mb-[10px] w-full">
      {title && (
        <label
          htmlFor={name}
          className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
        >
          {title}
          {isRequired && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="flex">
        <textarea
          name={name}
          id={name}
          className={`h-[100px] w-full bg-transparent rounded-[5px] border-[1px] border-solid  px-[15px] py-2 text-[14px] dark:text-gray-400 text-gray-600 outline-none shadow-sm ${
            error ? "border-danger" : "dark:border-gray-600"
          } `}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          required={isRequired}
          disabled={disabled}
        />
      </div>
      {error && (
        <span className="mt-1 w-full text-[12px]  italic text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
