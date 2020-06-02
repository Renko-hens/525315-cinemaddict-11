const COMMENTS_NAMES = [
  `Jong Doew`, `Ray Haisenberg`, `Nix Tony`, `Akimbo Gunner`, `Matt Dainmond`, `Miner 2001`
];
const EMOJIES = [
  `./images/emoji/smile.png`, `./images/emoji/sleeping.png`, `./images/emoji/puke.png`, `./images/emoji/angry.png`,
];
const TEXT_COMMENT = [
  `Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `Note Mate`, `it coolsa`
];

export const FilterType = {
  ALL_MOVIES: {
    name: `All movies`,
    id: `all`,
  },
  WATCHLIST: {
    name: `Watchlist`,
    id: `watchlist`,
  },
  HISTORY: {
    name: `History`,
    id: `history`,
  },
  FAVORITES: {
    name: `Favorites`,
    id: `favorites`,
  },
};

export const StatMenuTypes = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const WEEK = 6;

export {COMMENTS_NAMES, EMOJIES, TEXT_COMMENT, WEEK};
