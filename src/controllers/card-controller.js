import CardComponent from '../components/card';
import DetaltedCardComponent from '../components/card-detailted';
import * as utils from "../utils/render";

const Mode = {
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

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  render(card) {
    const renderCardDetailted = (evt) => {
      const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;
      const footer = document.querySelector(`.footer`);

      this._viewChangeHandler();

      if (isCurrentElement) {
        this._mode = Mode.DETAILTED;

        this._setDataChangeHandlers(card, this._cardDetailtedComponent);
        utils.render(footer, this._cardDetailtedComponent, utils.RenderPosition.AFTEREND);

        document.addEventListener(`keydown`, this._escKeyDownHandler);
      }
    };

    const oldCardComponent = this._cardComponent;
    const oldCardDetailtedComponent = this._cardDetailtedComponent;

    this._cardComponent = new CardComponent(card);
    this._cardDetailtedComponent = new DetaltedCardComponent(card);

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

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._deleteCardDetailted();
    }
  }

  _deleteCardDetailted() {
    utils.remove(this._cardDetailtedComponent);
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._deleteCardDetailted();
    }
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
}
