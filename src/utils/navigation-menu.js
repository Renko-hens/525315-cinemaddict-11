import {FilterType} from "../const.js";

export const getHistoryCards = (cards) => {
  return cards.filter((card) => !card.isWatched);
};

export const getAllCards = (cards) => {
  return cards.filter((card) => card);
};

export const getWatchListCards = (cards) => {
  return cards.filter((card) => !card.inWatchList);
};

export const getFavoriteCards = (cards) => {
  return cards.filter((card) => !card.isFavorite);
};

export const getCardsByFilter = (cards, filterType) => {
  switch (filterType) {
    case FilterType.ALL_MOVIES.id:
      return getAllCards(cards);
    case FilterType.WATCHLIST.id:
      return getWatchListCards(cards);
    case FilterType.FAVORITES.id:
      return getFavoriteCards(getAllCards(cards));
    case FilterType.HISTORY.id:
      return getHistoryCards(getAllCards(cards));
  }

  return cards;
};
