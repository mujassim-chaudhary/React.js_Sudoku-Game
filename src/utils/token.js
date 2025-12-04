import constants from "../config/constants";

export const getToken = () => {
  return localStorage.getItem(constants.TOKEN_KEY);
};

export const setToken = (token) => {
  localStorage.setItem(constants.TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(constants.TOKEN_KEY);
};
