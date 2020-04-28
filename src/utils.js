import {MONTH_NAMES} from './const';


const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};


export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};


export const getRandomDate = () => {
  const startRandomDate = new Date(1970, 0, 1);
  const endRandomDate = new Date();
  return new Date(startRandomDate.getTime() + Math.random() * (endRandomDate.getTime() - startRandomDate.getTime()));
};


export const getRandomArray = (array) => array.slice(0, getRandomIntegerNumber(0, array.length) + 1);


export const formatTime = (date, typeTime) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return typeTime === `letters` ? `${hours}h ${minutes}m` : `${hours}:${minutes}`;
};


export const formatDate = (date, typeYear, typeMonth = `string`) => {
  const dateFormat = ``;
  const day = date.getDate();
  const month = typeMonth === `string` ? MONTH_NAMES[date.getMonth()] : date.getMonth();
  const year = date.getFullYear();

  switch (typeYear) {
    case `year`:
      dateFormat = `${year}`;
      break;
    case `divider`:
      dateFormat = `${year}/${month}/${day}`;
      break;
    case `normal`:
      dateFormat = `${day} ${month} ${year}`;
      break;
  }

  return dateFormat;
};


export const formatDateTime = (date, typeTime, typeYear, typeMonth) => {
  const time = formatTime(date, typeTime);
  const year = formatDate(date, typeYear, typeMonth);
  return `${year} ${time}`;
};


export const getRandomBool = () => Math.random() > 0.5;


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

