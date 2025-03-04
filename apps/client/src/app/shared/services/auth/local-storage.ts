/**
 * @author Abhijit Baldawa
 */

type AuthLocalStorage = {
  "auth:token": string;
  "auth:user": string;
};

const setItem = (keyName: keyof AuthLocalStorage, value: string) =>
  localStorage.setItem(keyName, value);

const getItem = (keyName: keyof AuthLocalStorage) =>
  localStorage.getItem(keyName);

const removeItem = (keyName: keyof AuthLocalStorage) =>
  localStorage.removeItem(keyName);

export { setItem, getItem, removeItem };
