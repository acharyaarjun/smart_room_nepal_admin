"use client";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type Params = {
  setError?: (error: string) => void;
  error?: string;
  value: string;
  handleChange: (value: string) => void;
  name: string;
  update: boolean;
  title?: string;
  isRequired?: boolean;
  height?: number;
};

const RichText = ({
  setError,
  error,
  value,
  handleChange,
  name,
  update,
  isRequired,
  height = 500,
}: Params) => {
  const [content, setContent] = useState<string>(value || "");
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "",
      enableDragAndDropFileToEditor: true,
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      height: height,
      toolbarSticky: false,
      toolbarDisableStickyForMobile: false,
      controls: {
        font: {
          list: {
            "arial, helvetica, sans-serif": "Arial",
          },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (update === true) {
      setContent(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const isContentEmpty = (content: string) => {
    // Create a temporary element to parse HTML and check if it has text content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content.trim();
    return !tempElement.textContent?.trim(); // true if only tags are present
  };

  const handleChangeContent = (newContent: string) => {
    if (isContentEmpty(newContent)) {
      if (isRequired && isRequired === true) {
        if (setError) setError(`${name} is required`);
      }
      handleChange("");
      setContent("");
    } else {
      if (setError) setError("");
      handleChange(newContent);
    }
  };

  return (
    <>
      <div className="py-2 ">
        <p className="pb-3 font-medium capitalize">{name}</p>
        <JoditEditor
          value={content}
          config={config}
          onBlur={handleChangeContent} // preferred to use only this option to update the content for performance reasons
          onChange={handleChangeContent}
        />
        {error && (
          <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default RichText;
