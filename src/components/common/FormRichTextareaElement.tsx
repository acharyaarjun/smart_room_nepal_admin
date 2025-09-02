"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import { JoditEditorWrapper } from "@/components/common";
import { ImageSelectionModal } from "@/components/modal";

interface Props {
  error?: string | null;
  value: string;
  handleChange: (value: string) => void;
  name: string;
  title?: string;
  isRequired?: boolean;
  onBlur: () => void;
  height?: number;
}

export default function RichText({
  error,
  value,
  handleChange,
  name,
  title,
  isRequired,
  onBlur,
  height = 500,
}: Props) {
  const { theme } = useTheme();
  const [content, setContent] = useState<string>(value);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sync the error state
  useEffect(() => {
    if (error) {
      setEditorError(error);
    }
  }, [error]);

  // Sync value from props
  useEffect(() => {
    setContent(value);
  }, [value]);

  // Editor configuration with proper heading support
  const config = useMemo(() => {
    const isDarkTheme = theme === "dark";
    return {
      readonly: false,
      cachesave: false,
      theme: isDarkTheme ? "dark" : "default",
      placeholder: "Start typing here...",
      height,
      width: "100%",
      toolbarSticky: false,
      toolbarDisableStickyForMobile: false,

      // Explicitly define buttons including headings
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "link",
        "table",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "source",
      ],

      // Button configurations for different screen sizes
      buttonsMD: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "|",
        "image",
        "link",
        "|",
        "align",
        "undo",
        "redo",
      ],

      buttonsSM: [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "fontsize",
        "paragraph",
        "|",
        "image",
        "link",
      ],

      buttonsXS: ["bold", "italic", "|", "ul", "ol", "|", "paragraph"],

      // Configure the paragraph/heading dropdown
      controls: {
        paragraph: {
          command: "formatBlock",
          list: {
            p: "Normal",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            h5: "Heading 5",
            h6: "Heading 6",
            pre: "Preformatted",
            blockquote: "Quote",
          },
          tooltip: "Format",
        },
        font: {
          command: "fontName",
          list: {
            "Arial,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,sans-serif": "Impact",
            "Tahoma,sans-serif": "Tahoma",
            "Times New Roman,serif": "Times New Roman",
            "Verdana,sans-serif": "Verdana",
          },
          tooltip: "Font",
        },
        fontsize: {
          command: "fontSize",
          list: {
            "8": "8",
            "9": "9",
            "10": "10",
            "11": "11",
            "12": "12",
            "14": "14",
            "16": "16",
            "18": "18",
            "24": "24",
            "30": "30",
            "36": "36",
            "48": "48",
            "60": "60",
            "72": "72",
          },
          tooltip: "Font size",
        },
      },

      // Allow HTML tags including headings
      allowHTML: true,
      processPasteHTML: true,
      processPasteFromWord: true,

      // Sanitizer rules to allow headings
      sanitizerRules: {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        p: true,
        div: true,
        span: true,
        strong: true,
        b: true,
        em: true,
        i: true,
        u: true,
        s: true,
        sup: true,
        sub: true,
        ul: true,
        ol: true,
        li: true,
        a: {
          href: true,
          target: true,
          title: true,
        },
        img: {
          src: true,
          alt: true,
          width: true,
          height: true,
          style: true,
          crossorigin: true,
        },
        table: true,
        thead: true,
        tbody: true,
        tr: true,
        td: true,
        th: true,
        blockquote: true,
        pre: true,
        code: true,
        br: true,
        hr: true,
      },

      // Uploader configuration
      uploader: {
        insertImageAsBase64URI: true,
      },

      // Custom image button
      extraButtons: [
        {
          name: "customImage",
          iconURL: "https://cdn-icons-png.flaticon.com/24/1375/1375106.png",
          tooltip: "Insert Image from Gallery",
          exec: (editor: any) => {
            setEditorRef(editor);
            setShowModal(true);
          },
        },
      ],

      // Editor styling
      style: {
        borderRadius: "0px",
        padding: "15px",
        color: isDarkTheme ? "#e0e0e0" : "#6b7280",
        fontSize: "14px",
        outline: "none",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      },

      // Additional configuration
      defaultMode: 1, // WYSIWYG mode
      enter: "P", // Use <p> tags for new lines
      useSplitMode: false,
      toolbarAdaptive: true,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,

      // Paste configuration
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html",
    };
  }, [theme, height]);

  // Store editor reference
  const [editorRef, setEditorRef] = useState<any>(null);

  // Handle image insertion - Alternative approach
  const handleImageInsert = (imageURL: string) => {
    // Get current cursor position and insert image
    const imageHtml = `<img 
    src="${imageURL}" 
    alt="Image" 
    style="max-width: 100%; height: auto; margin: 10px 0; display: block;" 
    />`;

    // If we have editor reference, use it
    if (editorRef && editorRef.selection) {
      editorRef.selection.insertHTML(imageHtml);
      // Trigger change event
      const newContent = editorRef.value;
      setContent(newContent);
      handleChange(newContent);
    } else {
      // Fallback: append to content
      const newContent = content ? `${content}<br/>${imageHtml}` : imageHtml;
      setContent(newContent);
      handleChange(newContent);
    }

    setShowModal(false);
  };

  // Check if content is empty - improved version
  const isContentEmpty = (content: string) => {
    if (!content || content.trim() === "") return true;

    const tempElement = document.createElement("div");
    tempElement.innerHTML = content.trim();

    // Check for text content
    const textContent = tempElement.textContent?.trim() || "";

    // Check for images
    const images = tempElement.querySelectorAll("img");

    // Check for other media elements
    const media = tempElement.querySelectorAll("video, audio, iframe");

    return textContent === "" && images.length === 0 && media.length === 0;
  };

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent);

    if (isRequired && isContentEmpty(newContent)) {
      setEditorError(`${title} is required`);
      handleChange(""); // Pass empty value for validation
    } else {
      setEditorError(null);
      handleChange(newContent);
    }

    // Call onBlur to trigger any parent validation
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <>
      <div className="rich-text mb-[10px] w-full">
        {title && (
          <label
            htmlFor={name}
            className="mb-[9px] inline-block text-[15px] font-medium leading-[1] tracking-[0] text-gray-600 dark:text-gray-400"
          >
            {title}
            {isRequired && <span className="text-danger">*</span>}
          </label>
        )}
        <div
          className={`w-full rounded-[5px] border-[1px] border-solid ${
            editorError
              ? "border-danger"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          <JoditEditorWrapper
            value={content}
            config={config}
            onChange={handleContentChange}
            onBlur={() => {
              // Optional: Handle blur event if needed
            }}
            ref={(editor) => {
              if (editor) {
                setEditorRef(editor);
              }
            }}
          />
        </div>
        {editorError && (
          <span className="mt-1 w-full text-[12px] font-normal italic text-danger">
            {editorError}
          </span>
        )}

        {/* Custom Image Modal */}
        {showModal && (
          <ImageSelectionModal
            onClose={() => setShowModal(false)}
            onSelect={handleImageInsert}
          />
        )}
      </div>

      {/* Global styles for proper heading display */}
      <style jsx global>{`
        /* Jodit Editor Heading Styles */
        .jodit-wysiwyg h1,
        .jodit-container .jodit-wysiwyg h1 {
          font-size: 2em !important;
          font-weight: bold !important;
          margin: 0.67em 0 !important;
          line-height: 1.2 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg h2,
        .jodit-container .jodit-wysiwyg h2 {
          font-size: 1.5em !important;
          font-weight: bold !important;
          margin: 0.75em 0 !important;
          line-height: 1.3 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg h3,
        .jodit-container .jodit-wysiwyg h3 {
          font-size: 1.17em !important;
          font-weight: bold !important;
          margin: 0.83em 0 !important;
          line-height: 1.4 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg h4,
        .jodit-container .jodit-wysiwyg h4 {
          font-size: 1em !important;
          font-weight: bold !important;
          margin: 1em 0 !important;
          line-height: 1.4 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg h5,
        .jodit-container .jodit-wysiwyg h5 {
          font-size: 0.83em !important;
          font-weight: bold !important;
          margin: 1.5em 0 !important;
          line-height: 1.5 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg h6,
        .jodit-container .jodit-wysiwyg h6 {
          font-size: 0.75em !important;
          font-weight: bold !important;
          margin: 1.67em 0 !important;
          line-height: 1.5 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#1f2937"} !important;
        }

        .jodit-wysiwyg p,
        .jodit-container .jodit-wysiwyg p {
          margin: 1em 0 !important;
          line-height: 1.6 !important;
          color: ${theme === "dark" ? "#e0e0e0" : "#6b7280"} !important;
        }

        /* Ensure dropdown shows headings properly */
        .jodit-toolbar-button__paragraph .jodit-toolbar-list {
          min-width: 150px !important;
        }

        .jodit-toolbar-list li {
          padding: 5px 10px !important;
        }

        .jodit-toolbar-list li[data-value="h1"] {
          font-size: 1.5em !important;
          font-weight: bold !important;
        }

        .jodit-toolbar-list li[data-value="h2"] {
          font-size: 1.3em !important;
          font-weight: bold !important;
        }

        .jodit-toolbar-list li[data-value="h3"] {
          font-size: 1.1em !important;
          font-weight: bold !important;
        }
      `}</style>
    </>
  );
}
