const generateUniqueId = require("generate-unique-id");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { default: mongoose } = require("mongoose");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

const formatDate = (date, format) => {
  return moment(date).format(format);
};

const stripTime = (date) => {
  date = moment(date);
  date.hours(0);
  date.minutes(0);
  date.seconds(0);
  date.milliseconds(0);
  return date;
};

const generateUniqueNumber = (length, isLetters) => {
  const id = generateUniqueId({
    length: length,
    useLetters: isLetters,
    useNumbers: true,
    excludeSymbols: ["0"],
  });
  return id;
};

const getQueryParameters = (url) => {
  const queryParams = {};

  const queryString = url.split("?")[1];

  if (queryString) {
    const paramPairs = queryString.split("&");

    paramPairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      queryParams[key] = decodeURIComponent(value);
    });
  }

  return queryParams;
};

module.exports = {
  encryptPassword,
  comparePassword,
  formatDate,
  generateUniqueNumber,
  getQueryParameters,
};
