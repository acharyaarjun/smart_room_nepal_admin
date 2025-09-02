export const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
};

export const setToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
