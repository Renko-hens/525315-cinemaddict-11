import {formatTime, formatDate} from '../utils/common';
import AbstractComponent from './abstract-component';

const createButtonMarkup = (name, classButton, isActive = false) => {
  return (`<button class="film-card__controls-item button film-card__controls-item--${classButton} ${isActive ? `film-card__controls-item--active` : ``}">${name}</button>`);
};

const createCardFilmTemplate = (card, commentsArray) => {
  const {title, rating, year, duration, genres, poster, description} = card;

  const watchListButton = createButtonMarkup(`watchlist`, `add-to-watchlist`, !card.inWatchList);
  const watchedButton = createButtonMarkup(`watched`, `mark-as-watched`, !card.isWatched);
  const favoriteButton = createButtonMarkup(`favorite`, `favorite`, !card.isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(year, `year`)}</span>
        <span class="film-card__duration">${formatTime(duration, `duration`)}</span>
        ${genres.length === 1 ? `<span class="film-card__genre">${genres}</span>` : `<span class="film-card__genres">${genres.join(`, `)}</span>`}
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? `${description.substring(0, 139)}...` : description}</p>
      <a class="film-card__comments">${commentsArray.length} comments</a>
      <form class="film-card__controls">
        ${watchListButton}
        ${watchedButton}
        ${favoriteButton}
      </form>
    </article>`);
};

export default class Card extends AbstractComponent {
  constructor(card, comments) {
    super();
    this._card = card;
    this._comments = comments;
  }

  getTemplate() {
    return createCardFilmTemplate(this._card, this._comments);
  }

  setClickCardHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchListClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
