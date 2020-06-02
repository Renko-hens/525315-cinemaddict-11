import moment from "moment";
import {WEEK} from "../const";

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const checkRating = (ratingValue) => {
  let ratingType = ``;

  if (ratingValue > 0 && ratingValue < 11) {
    ratingType = `Novice`;
  } else if (ratingValue < 21) {
    ratingType = `Fan`;
  } else if (ratingValue >= 21) {
    ratingType = `Movie buff`;
  }

  return ratingType;
};

export const getRandomDate = () => {
  const startRandomDate = new Date(2020, 2, 1);
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

    case `hours`:
      timeFormat = moment.utc(moment.duration(date, `minutes`).asMilliseconds()).format(`HH`);
      break;

    case `minutes`:
      timeFormat = moment.utc(moment.duration(date, `minutes`).asMilliseconds()).format(`mm`);
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

// export const isOneDay = (dateA, dateB) => {
//   const a = moment(dateA);
//   const b = moment(dateB);
//   return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
// };

export const getRandomBool = () => Math.random() > 0.5;
