import {getRandomIntegerNumber, getRandomArray, getRandomArrayItem, getRandomDate, getRandomBool} from '../utils/common';
import {generateComments} from './comment';

const DEFAULT_COUNT = 2;
const images = [`./images/posters/popeye-meets-sinbad.png`, `./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`];
const titleFilms = [`Friends`, `Gentelmens`, `Viiny Pooh`, `Lefaifan`, `Cat and Dother`];
const directors = [`Kristofer Nolan`, `John Nolan`, `Jackie Chan`, `Guy Richy`];
const writers = [`sas`, `kek`, `cheburek`];
const actors = [`Matthew Perry`, ` Cortny Cox`, `Jennifer Anyston`, `Matthew Bland`, `David Shicwimmer`];
const countries = [`England`, `Holandia`, `Swezarland`, `Portugal`, `Korea`, `Italy`, ` Spain`, `Brazil`, `Russia`];
const genres = [`Western`, `Detectiv`, `Drama`, `Comedy`, `Nuar`, `Fairytail`, `Tragedy`];
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`];

const generateCardFilm = () => {
  return {
    age: getRandomIntegerNumber(3, 21),
    poster: getRandomArrayItem(images),
    title: getRandomArrayItem(titleFilms),
    originalTitle: `Original ${getRandomArrayItem(titleFilms)}`,
    rating: getRandomIntegerNumber(1, 100) / 10,
    director: getRandomArrayItem(directors),
    writers: getRandomArray(writers).join(`, `),
    actors: getRandomArray(actors).join(`, `),
    country: getRandomArrayItem(countries),
    year: getRandomDate(),
    duration: getRandomDate(),
    genres: getRandomArray(genres),
    description: getRandomArray(descriptions).join(` `),
    commentsArray: generateComments(),
    isWatchlist: getRandomBool(),
    isWatched: getRandomBool(),
    isFavorite: getRandomBool(),
  };
};

const generateCardsFilm = (count = DEFAULT_COUNT) => {
  return new Array(count)
    .fill(``)
    .map(generateCardFilm);
};

export {generateCardFilm, generateCardsFilm};
