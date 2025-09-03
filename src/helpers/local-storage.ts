import secureLocalStorage from "react-secure-storage";

/**
 * AllowedTypes is a union type that defines the types of values that can be
 * stored in secure local storage. It includes string, number, boolean, and
 * object types.
 */
type AllowedTypes = string | number | boolean | object;

/**
 * Stores a value in secure local storage synchronously.
 * @param key - The key to identify the stored item.
 * @param value - The value to be stored. Must be a serializable type.
 */
export const setItemSecurely = <T extends AllowedTypes>(
  key: string,
  value: T
): void => {
  secureLocalStorage.setItem(key, value);
};

/**
 * Retrieves a value from secure local storage synchronously.
 * @param key - The key of the stored item.
 * @returns The value associated with the key or null if not found.
 */
export const getItemSecurely = <T extends AllowedTypes>(
  key: string
): T | null => {
  const item = secureLocalStorage.getItem(key);
  return item !== null ? (item as T) : null;
};

/**
 * Removes a specific item from secure local storage synchronously.
 * @param key - The key of the item to be removed.
 */
export const removeItemSecurely = (key: string): void => {
  secureLocalStorage.removeItem(key);
};

/**
 * Removes multiple items from secure local storage synchronously.
 * @param keys - An array of keys to be removed from storage.
 */
export const clearSecureItems = (keys: string[]): void => {
  keys.forEach((key) => secureLocalStorage.removeItem(key));
};

/**
 * Stores a value in secure local storage asynchronously.
 * Note: While the method signature is async, the underlying storage is synchronous.
 * @param key - The key to identify the stored item.
 * @param value - The value to be stored.
 */
export const setItemSecurelyAsync = async <T extends AllowedTypes>(
  key: string,
  value: T
): Promise<void> => {
  secureLocalStorage.setItem(key, value);
};

/**
 * Retrieves a value from secure local storage asynchronously.
 * Note: While the method signature is async, the underlying storage is synchronous.
 * @param key - The key of the stored item.
 * @returns A promise that resolves to the value or null if not found.
 */
export const getItemSecurelyAsync = async <T extends AllowedTypes>(
  key: string
): Promise<T | null> => {
  const item = secureLocalStorage.getItem(key);
  return item !== null ? (item as T) : null;
};

/**
 * Removes a specific item from secure local storage asynchronously.
 * Note: While the method signature is async, the underlying storage is synchronous.
 * @param key - The key of the item to be removed.
 */
export const removeItemSecurelyAsync = async (key: string): Promise<void> => {
  secureLocalStorage.removeItem(key);
};

/**
 * Removes multiple items from secure local storage asynchronously.
 * Note: While the method signature is async, the underlying storage is synchronous.
 * @param keys - An array of keys to be removed from storage.
 */
export const clearSecureItemsAsync = async (keys: string[]): Promise<void> => {
  keys.forEach((key) => secureLocalStorage.removeItem(key));
};
