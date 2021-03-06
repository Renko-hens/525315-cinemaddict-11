import {formatTime, formatDate, createElement} from '../utils';

const createCardFilmTemplate = (card) => {
  const {title, rating, year, duration, genres, poster, description, commentsArray, isWatchlist, isWatched, isFavorite} = card;
  const watchlistButtonActiveClass = isWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButtonActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteButtonActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(year, `year`)}</span>
        <span class="film-card__duration">${formatTime(duration, `letters`)}</span>
        ${genres.length === 1 ? `<span class="film-card__genre">${genres}</span>` : `<span class="film-card__genres">${genres.join(`, `)}</span>`}
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? `${description.substring(0, 139)}...` : description}</p>
      <a class="film-card__comments">${commentsArray.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonActiveClass}">Mark as favorite</button>
      </form>
    </article>`);
};

export default class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardFilmTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
