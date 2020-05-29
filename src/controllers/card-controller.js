import CardComponent from '../components/card';
import DetaltedCardComponent from '../components/card-detailted';
import * as utils from "../utils/render";
import CommentsModel from "../models/comments";
import {generateComments} from '../mock/comment.js';
import {encode} from "he";

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

  _deleteCardDetailted() {
    utils.remove(this._cardDetailtedComponent);
    this._mode = Mode.DEFAULT;
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

  _changeComment(card, newComments) {
    const newCard = Object.assign({}, card);
    newCard.comments = newComments;
    this._dataChangeHandler(this, card, newCard);
  }

  _setDataChangeHandlers(card, component) {

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

    if (component === this._cardDetailtedComponent) {
      component.setCloseCardDetailtedHandler(() => {
        this._deleteCardDetailted();
        document.removeEventListener(`keydown`, this._escKeyDownHandler);
      });

      component.setCtrlEnterKeyDownHandler((evt) => {
        if (evt.ctrlKey && evt.key === `Enter`) {
          const emojiContainer = component.getEmojiContainer();
          const commentContainer = component.getCommentTextInputElement();

          if (emojiContainer.querySelector(`img`) && commentContainer.value !== ``) {
            const newEmojiElement = emojiContainer.querySelector(`img`).src;

            const commentText = component.getCommentTextInputElement().value;
            const comment = {
              emoji: newEmojiElement,
              textComment: encode(commentText.trim()),
            };

            this._commentsModel.addComment(comment);
            this._changeComment(card, this._commentsModel.getComments());
          }
        }
      });

      component.setDeleteCommentClickHandler((evt) => {
        evt.preventDefault();

        if (evt.target.classList.contains(`film-details__comment-delete`)) {
          const commentItem = evt.target.closest(`.film-details__comment`);
          this._commentsModel.deleteComment(commentItem.dataset.id);
          this._changeComment(card, this._commentsModel.getComments());
        }
      });
    }
  }

  render(card) {
    const renderCardDetailted = (evt) => {
      this._viewChangeHandler();
      const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;
      const footer = document.querySelector(`.footer`);

      if (isCurrentElement) {
        this._mode = Mode.DETAILTED;

        this._cardDetailtedComponent.recoveryListeners();
        this._setDataChangeHandlers(card, this._cardDetailtedComponent);
        utils.render(footer, this._cardDetailtedComponent, utils.RenderPosition.AFTEREND);

        document.addEventListener(`keydown`, this._escKeyDownHandler);
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
    this._setDataChangeHandlers(card, this._cardComponent);

    this._cardDetailtedComponent = new DetaltedCardComponent(card, comments);
    this._setDataChangeHandlers(card, this._cardDetailtedComponent);

    this._commentsModel.setDataChangeHandler(() => {
      this._cardDetailtedComponent.setComments(this._commentsModel.getComments());
      this._cardDetailtedComponent.rerender();
    });

    this._cardComponent.setClickCardHandler(renderCardDetailted);

    if (oldCardComponent && oldCardDetailtedComponent) {
      utils.replace(this._cardComponent, oldCardComponent);
      utils.replace(this._cardDetailtedComponent, oldCardDetailtedComponent);
    } else {
      utils.render(this._container, this._cardComponent);
    }
  }
}
