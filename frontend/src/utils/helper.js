import moment from "moment";
import { toastError } from "./toast";

export const setCookie = (key, data, isSessional = false) => {
  if (!isSessional) {
    sessionStorage.setItem(key, JSON.stringify(data));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getCookie = (key) => {
  let sessionalDataFounded = sessionStorage.getItem(key)
    ? JSON.parse(sessionStorage.getItem(key))
    : "";
  if (sessionalDataFounded) {
    return sessionalDataFounded;
  }
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : "";
};

export const removeCookie = (key) => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};

export const formatDate = (date, format) => {
  return moment(date).format(format);
};

export const formatDateToStandard = (date) => {
  const momentInstance = moment(date, false);
  return momentInstance.isValid() ? momentInstance.format("DD-MM-YYYY") : "N/A";
};

export const formatTimestamp = (date) => {
  const newDate = moment.unix(date / 1000);
  return newDate.format("DD-MM-YYYY");
};

export const textFormator = (originalString) => {
  if (!originalString) {
    return "";
  }
  const stringWithSpaces = originalString?.replace(/([a-z])([A-Z])/g, "$1 $2");
  const formattedString =
    stringWithSpaces?.charAt(0)?.toUpperCase() +
    stringWithSpaces?.slice(1)?.toLowerCase();
  return formattedString;
};

export function extractValues(timeString) {
  const match = /^(\d*)([a-zA-Z]*)$/.exec(timeString);
  if (match) {
    const number = match[1] === "" ? null : parseInt(match[1], 10);
    const letter = match[2] === "" ? null : match[2];
    return { number, letter };
  } else {
    return { number: "", letter: "" };
  }
}

export const axiosErrorHandler = (error) => {
  if (error?.response?.status == 500) {
    toastError(error?.response?.data);
  }
  if (error?.response?.status == 401) {
    removeCookie("token");
    window.location.pathname = "/";
  }
  if (error?.response?.status == 400) {
    for (let errorData of error?.response?.data?.errors) {
      toastError(errorData?.message);
    }
  }
};
