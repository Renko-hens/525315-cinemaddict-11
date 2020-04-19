const DEFAULT_COUNT = 2;
const directors =  [`Kristofer Nolan`, `John Nolan`, `Jackie Chan`, `Guy Richy`];
const writers = [`sas`, `kek`, `cheburek`];
const actors = [`Matthew Perry`, ` Cortny Cox`, `Jennifer Anyston`, `Matthew Bland`, `David Shicwimmer`];
const countries = [`England`, `Holandia`, `Swezarland`, `Portugal`, `Korea`, `Italy`, ` Spain`, `Brazil`, `Russia`];
const genres = [`Western`, `Detectiv`, `Drama`, `Comedy`, `Nuar`, `Fairytail`, `Tragedy`];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomArray = (array) => array.slice(0, getRandomIntegerNumber(0, array.length) + 1);

const generateCardFilm = () => {
  return {
    age: getRandomIntegerNumber(3, 21),
    poster: `./images/posters/the-dance-of-life.jpg`,
    title: `The Dance of Life`,
    originalTitle: `Original Dance of Life`,
    rating: `8.3`,
    director: getRandomArrayItem(directors),
    writers: getRandomArray(writers).join(`, `),
    actors: getRandomArray(actors).join(`, `),
    country: getRandomArrayItem(countries),
    year: getRandomDate(),
    duration: getRandomDate(),
    genres: getRandomArray(genres),
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    comments: `${Math.floor(Math.random() * 10)} comments`,
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateCardsFilm = (count = DEFAULT_COUNT) => {
  return new Array(count)
    .fill(``)
    .map(generateCardFilm);
};

export {generateCardFilm, generateCardsFilm};
