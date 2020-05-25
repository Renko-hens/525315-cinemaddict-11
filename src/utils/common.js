import moment from "moment";
import {WEEK} from "../const";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};


export const getRandomDate = () => {
  const startRandomDate = new Date(2020, 4, 1);
  const endRandomDate = new Date();
  return new Date(startRandomDate.getTime() + Math.random() * (endRandomDate.getTime() - startRandomDate.getTime()));
};


export const getRandomArray = (array) => array.slice(0, getRandomIntegerNumber(0, array.length) + 1);


export const formatTime = (date, typeTime) => {
  let timeFormat = ``;

  switch (typeTime) {
    case `duration`:
      if (date < 60) {
        timeFormat = moment.utc(moment.duration(date, `minutes`).asMilliseconds()).format(`m[m]`);
      } else {
        timeFormat = moment.utc(moment.duration(date, `minutes`).asMilliseconds()).format(`H[h] mm[m]`);
      }
      break;

    default:
      timeFormat = moment.utc(moment.duration(date, `minutes`).asMilliseconds()).format(`HH:mm`);
      break;
  }

  return timeFormat;
};


export const formatDate = (date, typeYear) => {
  let dateFormat = ``;

  switch (typeYear) {
    case `year`:
      dateFormat = moment(date).format(`YYYY`);
      break;
    case `divider`:
      dateFormat = moment(date).format(`YYYY/MM/DD`);
      break;
    case `normal`:
      dateFormat = moment(date).format(`DD MMMM YYYY`);
      break;
  }

  return dateFormat;
};


export const formatDateTime = (date) => {
  let fromNowDate = moment(new Date());
  let postDate = moment(date);

  if (fromNowDate.diff(postDate, `days`) > WEEK) {
    return moment(date).format(`YYYY/MM/DD h:mm`);
  } else {
    return moment(date).fromNow();
  }
};


export const getRandomBool = () => Math.random() > 0.5;
