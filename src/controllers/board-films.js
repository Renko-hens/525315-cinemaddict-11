import CardsContainerComponent from '../components/cards-container';
import CardComponent from '../components/card-film';
import ShowButtonComponent from '../components/show-button';
import SortsComponent, {SortType} from '../components/sorts';
import NoCardsComponent from '../components/no-card';
import DetaltedCardComponent from '../components/detailted-film';
import * as utils from "../utils/render";

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_FOR_EXTRA = 2;
const footer = document.querySelector(`.footer`);

const renderCard = (cardsListContainer, card) => {
  const cardComponent = new CardComponent(card);
  utils.render(cardsListContainer, cardComponent);

  const cardDetailtedComponent = new DetaltedCardComponent(card);

  const escKeyDownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      utils.remove(cardDetailtedComponent);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const clickCardHandler = (evt) => {
    const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;

    if (isCurrentElement) {
      utils.render(footer, cardDetailtedComponent, utils.RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const buttonCloseDetailtedCardHandler = () => {
    utils.remove(cardDetailtedComponent);
  };

  cardComponent.setClickCardHandler(clickCardHandler);
  cardDetailtedComponent.setClickCloseButtonHandler(buttonCloseDetailtedCardHandler);
};


const renderCards = (cardContainer, cards) => {
  cards.forEach((card) => {
    renderCard(cardContainer, card);
  });
};

const getSortedCards = (cards, sortType, from, to) => {
  let sortedCards = [];
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.RATING:
      // Нужно сортировка по рейтингу
      sortedCards = showingCards.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DATE:
      sortedCards = showingCards.sort((a, b) => b.year - a.year);
      break;
    case SortType.DEFAULT:
      sortedCards = showingCards;
      break;
  }

  return sortedCards.slice(from, to);
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._noCardsComponent = new NoCardsComponent();
    this._cardsContainerComponent = new CardsContainerComponent();
    this._showButtonComponent = new ShowButtonComponent();
    this._sortsComponent = new SortsComponent();
  }

  render(cards) {
    const boardFilmsComponent = this._container;
    const filmListElement = boardFilmsComponent.getElement().querySelector(`.films-list`);
    const filmListExtrasList = boardFilmsComponent.getElement().querySelectorAll(`.films-list--extra `);

    const renderShowMoreButton = () => {
      // show more button
      utils.render(filmListElement, this._showButtonComponent);

      const checkForHiddenCards = () => {
        if (showingFilmsCount >= cards.length) {
          utils.remove(this._showButtonComponent);
        }
      };

      checkForHiddenCards();

      this._showButtonComponent.setShowMoreButtonClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILM_COUNT_BY_BUTTON;

        const sortedCards = getSortedCards(cards, this._sortsComponent.getSortType(), prevFilmsCount, showingFilmsCount);
        renderCards(this._cardsContainerComponent.getElement(), sortedCards);

        checkForHiddenCards();
      });
    };


    if (cards.length === 0) {
      utils.render(filmListElement, this._noCardsComponent);

      filmListExtrasList
      .forEach((extraList) => extraList.remove());
      return;
    }

    // Cards container
    let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;

    utils.render(filmListElement, this._cardsContainerComponent);
    renderCards(this._cardsContainerComponent.getElement(), cards.slice(0, showingFilmsCount));

    // show more button
    renderShowMoreButton();

    // Cards Extra container
    filmListExtrasList
      .forEach((extraList) => {
        let showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;
        const cardsExtraContainerComponent = new CardsContainerComponent();
        utils.render(extraList, cardsExtraContainerComponent);

        renderCards(cardsExtraContainerComponent.getElement(), cards.slice(0, showingExtraFilmsCount));
      });

    utils.render(boardFilmsComponent.getElement(), this._sortsComponent, utils.RenderPosition.BEFOREBEGIN);

    // SORTHANDLER
    this._sortsComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(cards, sortType, 0, showingFilmsCount);

      this._cardsContainerComponent.getElement().innerHTML = ``;
      renderCards(this._cardsContainerComponent.getElement(), sortedCards);

      utils.remove(this._showButtonComponent);
      renderShowMoreButton();
    });
  }
}
