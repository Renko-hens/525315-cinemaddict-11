const DEFAULT_COUNT = 2;

const generateCardFilm = () => {
  return {
    title: `The Dance of Life`,
    rating: `8.3`,
    year: `1929`,
    duration: `1h 55m`,
    genre: `Musical`,
    poster: `./images/posters/the-dance-of-life.jpg`,
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
