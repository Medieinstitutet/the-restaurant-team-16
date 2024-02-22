import axios from "axios";

export const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const post = async <T>(url: string, data: T, config: object={}) => {
  return await axios.post(url, data, config);
};

export const put = async <T>(url: string, data: T) => {
  return await axios.put(url, data);
};

export const remove = async (url: string) => {
  return await axios.delete(url);
};