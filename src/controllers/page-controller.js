import CardsContainerComponent from '../components/cards-container';
import ShowButtonComponent from '../components/show-button';
import SortsComponent, {SortType} from '../components/sorts';
import NoCardsComponent from '../components/no-card';
import CardController from './card-controller';
import * as utils from "../utils/render";

const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_FOR_EXTRA = 2;

const renderCards = (cardContainer, cards, dataChangeHandler, viewChangeHandler) => {
  return cards.map((card) => {
    const cardController = new CardController(cardContainer, dataChangeHandler, viewChangeHandler);

    cardController.render(card);

    return cardController;
  });
};

const getSortedCards = (cards, sortType, from, to) => {
  let sortedCards = [];
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.RATING:
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

    this._cards = [];
    this._showedCardControllers = [];
    this._showingCardsCount = SHOWING_FILM_COUNT_ON_START;
    this._noCardsComponent = new NoCardsComponent();
    this._cardsContainerComponent = new CardsContainerComponent();
    this._showButtonComponent = new ShowButtonComponent();
    this._sortsComponent = new SortsComponent();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortsComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(cards) {
    this._cards = cards;
    const container = this._container;
    const mainCardListElement = container.getElement().querySelector(`.films-list`);
    const extraCardListElement = container.getElement().querySelectorAll(`.films-list--extra`);

    if (this._cards.length === 0) {
      utils.render(mainCardListElement, this._noCardsComponent);

      extraCardListElement
      .forEach((extraList) => extraList.remove());
      return;
    }

    utils.render(container.getElement(), this._sortsComponent, utils.RenderPosition.BEFOREBEGIN);
    utils.render(mainCardListElement, this._cardsContainerComponent);

    const cardsContainerElement = this._cardsContainerComponent.getElement();
    const newCards = renderCards(cardsContainerElement, this._cards.slice(0, this._showingCardsCount), this._dataChangeHandler, this._viewChangeHandler);

    this._showedCardControllers = this._showedCardControllers.concat(newCards);

    this._renderShowMoreButton();
    this._renderExtraCardList();
  }

  _renderExtraCardList() {
    const extraCardListElement = this._container.getElement().querySelectorAll(`.films-list--extra `);

    extraCardListElement
      .forEach((extraList) => {
        let showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;
        const cardsExtraContainerComponent = new CardsContainerComponent();
        utils.render(extraList, cardsExtraContainerComponent);

        renderCards(cardsExtraContainerComponent.getElement(), this._cards.slice(0, showingExtraFilmsCount), this._dataChangeHandler, this._viewChangeHandler);
      });
  }

  _renderShowMoreButton() {
    const checkForHiddenCards = () => {
      if (this._showingCardsCount >= this._cards.length) {
        utils.remove(this._showButtonComponent);
      }
    };

    checkForHiddenCards();

    // show more button
    const mainCardListElement = this._container.getElement().querySelector(`.films-list`);
    utils.render(mainCardListElement, this._showButtonComponent);

    this._showButtonComponent.setShowMoreButtonClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      const cardsContainerElement = this._cardsContainerComponent.getElement();
      this._showingCardsCount += SHOWING_FILM_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(this._cards, this._sortsComponent.getSortType(), prevCardsCount, this._showingCardsCount);
      const newCards = renderCards(cardsContainerElement, sortedCards.slice(0, this._showingCardsCount), this._dataChangeHandler, this._viewChangeHandler);

      this._showedCardControllers = this._showedCardControllers.concat(newCards);

      checkForHiddenCards();
    });
  }

  _viewChangeHandler() {
    this._showedCardControllers.forEach((controller) => controller.setDefaultView());
  }

  // SORTHANDLER
  _sortTypeChangeHandler(sortType) {
    this._showingCardsCount = SHOWING_FILM_COUNT_BY_BUTTON;

    const sortedCards = getSortedCards(this._cards, sortType, 0, this._showingCardsCount);
    const cardsContainerElement = this._cardsContainerComponent.getElement();

    cardsContainerElement.innerHTML = ``;

    const newCards = renderCards(cardsContainerElement, sortedCards, this._dataChangeHandler, this._viewChangeHandler);
    this._showedCardControllers = newCards;

    utils.remove(this._showButtonComponent);
    this._renderShowMoreButton();
  }

  _dataChangeHandler(controller, oldData, newData) {
    const index = this._cards.findIndex((cardData) => cardData === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    controller.render(this._cards[index]);
  }

}
