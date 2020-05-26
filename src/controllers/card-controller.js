import CardComponent from '../components/card';
import DetaltedCardComponent from '../components/card-detailted';
import * as utils from "../utils/render";
import CommentsModel from "../models/comments";
import {generateComments} from '../mock/comment.js';

export const Mode = {
  DEFAULT: `default`,
  DETAILTED: `detailted`,
};

export default class CardController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.DEFAULT;

    this._cardComponent = null;
    this._cardDetailtedComponent = null;

    this._commentsModel = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._ctrlEnterKeyDownHandler = this._ctrlEnterKeyDownHandler.bind(this);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._deleteCardDetailted();
    }
  }

  _escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._deleteCardDetailted();
    }
  }

  _ctrlEnterKeyDownHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      const emojiContainer = this._cardDetailtedComponent.getEmojiContainer();
      const emojiType = emojiContainer.firstChild.src;
      const commentText = this._cardDetailtedComponent.getCommentTextInputElement().value;
      const comment = {
        emoji: emojiType,
        textComment: commentText.trim(),
      };

      this._commentsModel.addComment(comment);
    }
  }

  _deleteCardDetailted() {
    utils.remove(this._cardDetailtedComponent);
    this._mode = Mode.DEFAULT;
    this._commentsModel = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    this._deleteCardDetailted();
    utils.remove(this._cardComponent);
  }


  _changeFlag(card, isCheck) {
    const newCard = Object.assign({}, card);
    newCard[isCheck] = !newCard[isCheck];
    this._dataChangeHandler(this, card, newCard);
  }

  _setDataChangeHandlers(card, component) {
    if (component === this._cardDetailtedComponent) {
      this._cardDetailtedComponent.setCloseCardDetailtedHandler(() => {
        utils.remove(this._cardDetailtedComponent);
        document.removeEventListener(`keydown`, this._escKeyDownHandler);
      });
    }

    component.setWatchListClickHandler((evt) => {
      evt.preventDefault();
      this._changeFlag(card, `inWatchList`);
    });

    component.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._changeFlag(card, `isWatched`);
    });

    component.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._changeFlag(card, `isFavorite`);
    });
  }

  render(card) {
    const renderCardDetailted = (evt) => {
      this._viewChangeHandler();

      const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;
      const footer = document.querySelector(`.footer`);

      if (isCurrentElement) {
        this._mode = Mode.DETAILTED;

        this._setDataChangeHandlers(card, this._cardDetailtedComponent);
        utils.render(footer, this._cardDetailtedComponent, utils.RenderPosition.AFTEREND);

        document.addEventListener(`keydown`, this._escKeyDownHandler);
        document.addEventListener(`keydown`, this._ctrlEnterKeyDownHandler);
      }
    };

    const oldCardComponent = this._cardComponent;
    const oldCardDetailtedComponent = this._cardDetailtedComponent;

    if (!this._commentsModel) {
      this._commentsModel = new CommentsModel();
      this._commentsModel.setComments(generateComments());
    }
    const comments = this._commentsModel.getComments();

    this._cardComponent = new CardComponent(card, comments);
    this._cardDetailtedComponent = new DetaltedCardComponent(card, comments);

    this._setDataChangeHandlers(card, this._cardComponent);
    this._setDataChangeHandlers(card, this._cardDetailtedComponent);

    this._cardComponent.setClickCardHandler(renderCardDetailted);

    if (oldCardComponent && oldCardDetailtedComponent) {
      utils.replace(this._cardComponent, oldCardComponent);
      utils.replace(this._cardDetailtedComponent, oldCardDetailtedComponent);
    } else {
      utils.render(this._container, this._cardComponent);
    }
  }
}
