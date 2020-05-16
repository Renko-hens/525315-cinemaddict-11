import {formatTime, formatDate, formatDateTime} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

const EMOJI_SIZE = `55px`;

const createCommentTemplate = (comment) => {
  const {textComment, emoji, author, data} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" alt="emoji-smile" width="55" height="55">
      </span>
      <div>
        <p class="film-details__comment-text">${textComment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDateTime(data, `number`, `divider`, `number`)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
};

const createCommentsTemplate = (commentsArray) => {
  const commentMarkup = commentsArray.map((it) => createCommentTemplate(it)).join(`\n`);

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsArray.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentMarkup}
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
          </label>
        </div>
      </div>
    </section>`);
};

const createCheckMarkup = (name, textContent, isChecked = false) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
     <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${textContent}</label>`);
};

const createDetailedFilmTemplate = (card) => {
  const {age, title, originalTitle, rating, director, writers, actors, year, duration, country, genres, poster, description, commentsArray} = card;

  const watchListMarkup = createCheckMarkup(`watchlist`, `Add to watchlist`, !card.inWatchList);
  const watchedMarkup = createCheckMarkup(`watched`, `Already watched`, !card.isWatched);
  const favoriteMarkup = createCheckMarkup(`favorite`, `Add to favorites`, !card.isFavorite);

  const commentMarkup = createCommentsTemplate(commentsArray);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDate(year, `normal`, `string`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatTime(duration, `letters`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre</td>
                  <td class="film-details__cell">
                    ${genres.length === 1 ? `<span class="film-details__genre">${genres}</span>` : `<span class="film-details__genres">${genres.join(` `)}</span>`}
                  </td>
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${watchListMarkup}
            ${watchedMarkup}
            ${favoriteMarkup}
          </section>
        </div>

        <div class="form-details__bottom-container">
          ${commentMarkup}
        </div>
      </form>
    </section>`);
};

export default class DetaltedCard extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._emoji = null;

    this._rerenderChangeEmoji();
  }

  getTemplate() {
    return createDetailedFilmTemplate(this._card);
  }

  setCloseCardDetailtedHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeButtonHandler = handler;
  }

  setWatchListClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
    this._watchListHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
    this._watchedHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
    this._favoriteHandler = handler;
  }

  recoveryListeners() {
    this.setCloseCardDetailtedHandler(this._closeButtonHandler);
    this.setWatchListClickHandler(this._watchListHandler);
    this.setWatchedClickHandler(this._watchedHandler);
    this.setFavoriteClickHandler(this._favoriteHandler);
    this._rerenderChangeEmoji();
  }

  _rerenderChangeEmoji() {
    const element = this.getElement();
    const addEmojiElement = element.querySelector(`.film-details__add-emoji-label`);
    const emojiInputs = element.querySelectorAll(`.film-details__emoji-item`);

    emojiInputs.forEach((emoji) => {
      emoji.addEventListener(`change`, (evt) => {
        const emojiLabels = element.querySelectorAll(`.film-details__emoji-label`);
        const input = evt.target;

        emojiLabels.forEach((label) => {
          if (label.htmlFor === input.id) {
            const newEmojiElement = label.querySelector(`img`).cloneNode();

            addEmojiElement.innerHTML = ``;
            addEmojiElement.appendChild(newEmojiElement);

            newEmojiElement.style.width = EMOJI_SIZE;
            newEmojiElement.style.height = EMOJI_SIZE;
          }
        });
      });
    });
  }
}
