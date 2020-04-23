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


const formatTime = (date, typeTime) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return typeTime === `letters` ? `${hours}h ${minutes}m` : `${hours}:${minutes}`;
};

const formatDate = (date, typeYear, typeMonth = `string`) => {
  const day = date.getDate();
  const month = typeMonth === `string` ? MONTH_NAMES[date.getMonth()] : date.getMonth();
  const year = date.getFullYear();

  if (typeYear === `year`) {
    return `${year}`;
  } else if (typeYear === `divider`) {
    return `${year}/${month}/${day}`;
  } else if (typeYear === `normal`) {
    return `${day} ${month} ${year}`;
  }
};


const formatDateTime = (date, typeTime, typeYear, typeMonth) => {
  const time = formatTime(date, typeTime);
  const year = formatDate(date, typeYear, typeMonth);
  return `${year} ${time}`;
};

const getRandomBool = () => Math.random() > 0.5;

export {getRandomIntegerNumber, getRandomArray, getRandomArrayItem, getRandomDate, formatTime, formatDate, formatDateTime, getRandomBool};
