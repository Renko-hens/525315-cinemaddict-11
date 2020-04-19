import {MONTH_NAMES} from './const';


const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};


const getRandomDate = () => {
  const startRandomDate = new Date(1970, 0, 1);
  const endRandomDate = new Date();
  return new Date(startRandomDate.getTime() + Math.random() * (endRandomDate.getTime() - startRandomDate.getTime()));
};


const getRandomArray = (array) => array.slice(0, getRandomIntegerNumber(0, array.length) + 1);


const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


const formatTime = (date, type) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return type === `full` ? `${hours}:${minutes}` : `${hours}h ${minutes}m`;
};


const formatYear = (date, type) => {
  const day = date.getDate();
  const month = type === `full` ? date.getMonth() : MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return type === `full` ? `${year}/${month}/${day}` : `${day} ${month} ${year}`;
};


const fullDate = (date) => {
  const time = formatTime(date, `full`);
  const year = formatYear(date, `full`);
  return `${year} ${time}`;
};

export {getRandomIntegerNumber, getRandomArray, getRandomArrayItem, getRandomDate, formatTime, formatYear, fullDate};
