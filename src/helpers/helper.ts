import { FileItem } from "@/types/media";

const chunkArray = (array: any, size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

async function fetchImage(fileItem: FileItem): Promise<string | null> {
  try {
    const response = await fetch(fileItem.url);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

const objectToFormData = (obj: any): FormData => {
  const formData = new FormData();

  const appendFormData = (data: any, keyPrefix?: string) => {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const prefixedKey = keyPrefix ? `${keyPrefix}[${index}]` : `${index}`;
        appendFormData(item, prefixedKey);
      });
    } else if (data instanceof File || data instanceof Blob) {
      formData.append(keyPrefix || "", data);
    } else if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const prefixedKey = keyPrefix ? `${keyPrefix}[${key}]` : key;
        appendFormData(value, prefixedKey);
      });
    } else {
      formData.append(keyPrefix || "", data);
    }
  };

  appendFormData(obj);

  return formData;
};

async function fetchOriginalFile(fileItem: FileItem): Promise<File> {
  const response = await fetch(fileItem.url);
  const data = await response.blob();
  return new File([data], fileItem.name, { type: fileItem.mimeType });
}

const cleanRequestBody = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const cleanedObject: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    if (Array.isArray(value)) {
      const cleanedArray = value
        .map((item) => {
          if (item instanceof File || item instanceof Blob) {
            return item;
          }
          return cleanRequestBody(item);
        })
        .filter((item) => item !== undefined && item !== null);
      if (cleanedArray.length > 0) {
        cleanedObject[key] = cleanedArray;
      }
    } else if (typeof value === "object" && value !== null) {
      // Skip cleaning File or Blob objects
      if (value instanceof File || value instanceof Blob) {
        cleanedObject[key] = value;
      } else {
        const cleanedValue = cleanRequestBody(value);
        if (Object.keys(cleanedValue).length > 0) {
          cleanedObject[key] = cleanedValue;
        }
      }
    } else if (value !== "" && value !== undefined && value !== null) {
      cleanedObject[key] = value;
    }
  }

  // Remove undefined and null properties
  Object.keys(cleanedObject).forEach((key) => {
    if (cleanedObject[key] === undefined || cleanedObject[key] === null) {
      delete cleanedObject[key];
    }
  });

  return cleanedObject;
};

const getPlainText = (html: string, lengthOfWords: number) => {
  if (!html) {
    return "";
  }

  if (lengthOfWords) {
    // slice to only get the first lengthOfWords words
    html = html.split(" ").slice(0, lengthOfWords).join(" ");
  }
  // remove all html tags
  html = html.replace(/<[^>]*>?/gm, "");
  html = html.replace(/\\r\\n/g, "") + "...";

  //replace all line breaks
  html = html.replace(/\n/g, "");

  //replace extra spaces
  html = html.replace(/\s+/g, " ");

  return html;
};

// Utility function to format date or datetime
const formatDate = (
  dateString: string,
  format: "date" | "datetime" = "datetime"
): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (format === "date") {
    return `${year}-${month}-${day}`;
  }

  // Default to datetime
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getInitial = (name: string | undefined): string => {
  if (!name) return "U";
  return name.charAt(0).toUpperCase();
};

function getRelativeTime(date: string): string {
  const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: "year", ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: "week", ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: "day", ms: 1000 * 60 * 60 * 24 },
    { unit: "hour", ms: 1000 * 60 * 60 },
    { unit: "minute", ms: 1000 * 60 },
    { unit: "second", ms: 1000 },
  ];

  const now = Date.now();
  const diff = now - new Date(date).getTime();

  for (const { unit, ms } of units) {
    const value = Math.floor(diff / ms);
    if (value >= 1) {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -value,
        unit
      );
    }
  }
  return "just now";
}

export {
  chunkArray,
  fetchImage,
  objectToFormData,
  fetchOriginalFile,
  cleanRequestBody,
  getPlainText,
  formatDate,
  getInitial,
  getRelativeTime,
};
