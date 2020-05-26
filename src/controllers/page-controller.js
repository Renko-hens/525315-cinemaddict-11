import CardsContainerComponent from '../components/cards-container';
import ShowButtonComponent from '../components/show-button';
import SortsComponent, {SortType} from '../components/sorts';
import NoCardsComponent from '../components/no-card';
import CardController, {Mode as CardControllerMode} from './card-controller';
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
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._showedCardControllers = [];
    this._showingCardsCount = SHOWING_FILM_COUNT_ON_START;
    this._showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;
    this._noCardsComponent = new NoCardsComponent();
    this._cardsContainerComponent = new CardsContainerComponent();
    this._showButtonComponent = new ShowButtonComponent();
    this._sortsComponent = new SortsComponent();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._showButtonClickHandler = this._showButtonClickHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._sortsComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._cardsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  _removeCards() {
    this._showedCardControllers.forEach((cardController) => cardController.destroy());
    this._showedCardControllers = [];
  }

  _updateCards(count) {
    this._removeCards();
    this._renderMainCards(this._cardsModel.getCards().slice(0, count));
    this._renderShowMoreButton();
  }

  _renderMainCards(cards) {
    const cardsContainerElement = this._cardsContainerComponent.getElement();

    const newCards = renderCards(cardsContainerElement, cards, this._dataChangeHandler, this._viewChangeHandler);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._showingCardsCount = this._showedCardControllers.length;
  }

  _renderExtraCards(cards) {
    const extraCardListElement = this._container.getElement().querySelectorAll(`.films-list--extra`);

    extraCardListElement
      .forEach((extraList) => {
        const cardsExtraContainerComponent = new CardsContainerComponent();
        utils.render(extraList, cardsExtraContainerComponent);

        renderCards(cardsExtraContainerComponent.getElement(), cards, this._dataChangeHandler, this._viewChangeHandler);
      });
  }

  _renderShowMoreButton() {
    utils.remove(this._showButtonComponent);

    if (this._showingCardsCount >= this._cardsModel.getCards().length) {
      return;
    }

    // show more button
    const mainCardListElement = this._container.getElement().querySelector(`.films-list`);
    utils.render(mainCardListElement, this._showButtonComponent);

    this._showButtonComponent.setShowMoreButtonClickHandler(this._showButtonClickHandler);
  }

  _showButtonClickHandler() {
    const prevCardsCount = this._showingCardsCount;
    const cards = this._cardsModel.getCards();

    this._showingCardsCount += SHOWING_FILM_COUNT_BY_BUTTON;

    const sortedCards = getSortedCards(cards, this._sortsComponent.getSortType(), prevCardsCount, this._showingCardsCount);
    this._renderMainCards(sortedCards);

    if (this._showingCardsCount >= cards.length) {
      utils.remove(this._showButtonComponent);
    }
  }

  _dataChangeHandler(controller, oldData, newData) {

    if (oldData === null) {
      this._cardsModel.addComment(newData);
      controller.render(newData, CardControllerMode.DETAILTED);
    } else if (newData === null) {
      this._cardsModel.removeComment(oldData.id);
      this._updateCards(this._showingCardsCount);
    } else {
      const isSuccess = this._cardsModel.updateCard(oldData.id, newData);

      if (isSuccess) {
        controller.render(newData);
      }
    }
  }

  _viewChangeHandler() {
    this._showedCardControllers.forEach((controller) => controller.setDefaultView());
  }

  _filterChangeHandler() {
    this._updateCards(SHOWING_FILM_COUNT_ON_START);
  }

  _sortTypeChangeHandler(sortType) {
    this._showingCardsCount = SHOWING_FILM_COUNT_BY_BUTTON;

    const sortedCards = getSortedCards(this._cardsModel.getCards(), sortType, 0, this._showingCardsCount);

    this._removeCards();
    this._renderMainCards(sortedCards);
    this._renderShowMoreButton();
  }

  render() {
    const cards = this._cardsModel.getCards();
    const container = this._container;
    const mainCardListElement = container.getElement().querySelector(`.films-list`);
    const extraCardListElement = container.getElement().querySelectorAll(`.films-list--extra`);

    if (cards.length === 0) {
      utils.render(mainCardListElement, this._noCardsComponent);

      extraCardListElement
      .forEach((extraList) => extraList.remove());
      return;
    }

    utils.render(container.getElement(), this._sortsComponent, utils.RenderPosition.BEFOREBEGIN);
    utils.render(mainCardListElement, this._cardsContainerComponent);

    this._renderMainCards(cards.slice(0, this._showingCardsCount));
    this._renderShowMoreButton();
    this._renderExtraCards(cards.slice(0, this._showingExtraFilmsCount));
  }

}
