import RatingComponent from './components/header-profile';
import NavigationMenuComponent from './components/navigation-menu';
import SortsComponent from './components/sorts';
import BoardFilmsComponent from './components/films';
import CardsContainerComponent from './components/cards';
import CardComponent from './components/card-film';
import ShowButtonComponent from './components/show-button';
import StatisticsComponent from './components/statistics-film';
import NoCardsComponent from './components/no-card';
import DetaltedCardComponent from './components/detailted-film';
import {render} from './utils';

import {generateRatingCount} from './mock/header-profile';
import {generateFilters} from './mock/filter';
import {sorts} from './mock/sort';
import {generateCardsFilm} from './mock/card-film';


const CARD_COUNT = 20;
const QUANITY_MOVIES = Math.floor(Math.random() * 100);
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_FOR_EXTRA = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);


const renderCard = (cardsListContainer, card) => {
  const cardComponent = new CardComponent(card);
  const cardElement = cardComponent.getElement();
  render(cardsListContainer, cardElement);

  const cardDetailtedComponent = new DetaltedCardComponent(card);
  const cardDetailtedElement = cardDetailtedComponent.getElement();

  const escKeyDownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      document.body.removeChild(cardDetailtedElement);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const clickCardHandler = (evt) => {
    const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;

    if (isCurrentElement) {
      document.body.appendChild(cardDetailtedElement);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  cardElement.addEventListener(`click`, clickCardHandler);

  // close button detailted card
  const cardDetailtedCloseButton = cardDetailtedElement.querySelector(`.film-details__close-btn`);
  const buttonCloseDetailtedCardHandler = () => {
    document.body.removeChild(cardDetailtedElement);
  };

  cardDetailtedCloseButton.addEventListener(`click`, buttonCloseDetailtedCardHandler);
};


const renderBoard = (boardFilmsComponent, cards) => {
  const filmListElement = boardFilmsComponent.getElement().querySelector(`.films-list`);
  const filmListExtrasList = boardFilmsComponent.getElement().querySelectorAll(`.films-list--extra`);

  // no-card
  if (cards.length === 0) {
    render(filmListElement, new NoCardsComponent().getElement());

    filmListExtrasList
      .forEach((extraList) => extraList.remove());
    return;
  }

  // Cards container
  const cardsContainerComponent = new CardsContainerComponent();
  const cardsContainerElement = cardsContainerComponent.getElement();
  render(filmListElement, cardsContainerElement);

  // render Card
  let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;

  for (let i = 0; i < showingFilmsCount; i++) {
    if (cards[i]) {
      renderCard(cardsContainerElement, cards[i], i);
    }
  }

  // show more button
  const showMoreComponent = new ShowButtonComponent();
  const showMoreButton = showMoreComponent.getElement();
  render(filmListElement, showMoreButton);

  const deleteLoadMoreButton = () => {
    showMoreButton.remove();
    showMoreComponent.removeElement();
  };

  const allHidingCards = () => {
    if (showingFilmsCount >= cards.length) {
      deleteLoadMoreButton();
    }
  };

  allHidingCards();

  const showMoreButtonClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILM_COUNT_BY_BUTTON;

    for (let i = prevFilmsCount; i < showingFilmsCount; i++) {
      if (cards[i]) {
        renderCard(cardsContainerElement, cards[i], i);
      }
    }

    allHidingCards();
  };

  showMoreButton.addEventListener(`click`, showMoreButtonClickHandler);

  // Cards Extra container
  filmListExtrasList
    .forEach((extraList) => {
      let showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;

      const cardsExtraContainerComponent = new CardsContainerComponent();
      const cardsExtraContainerElement = cardsExtraContainerComponent.getElement();
      render(extraList, cardsExtraContainerElement);

      for (let i = 0; i < showingExtraFilmsCount; i++) {
        if (cards[i]) {
          renderCard(cardsExtraContainerElement, cards[i], i);
        }
      }
    });
};

const ratingValue = generateRatingCount();
render(header, new RatingComponent(ratingValue).getElement());

const filters = generateFilters();
render(main, new NavigationMenuComponent(filters).getElement());

render(main, new SortsComponent(sorts).getElement());

const boardFilmsComponent = new BoardFilmsComponent();
render(main, boardFilmsComponent.getElement());

const cards = generateCardsFilm(CARD_COUNT);
renderBoard(boardFilmsComponent, cards);

const statisticsComponent = new StatisticsComponent(QUANITY_MOVIES);
render(footerStatistics, statisticsComponent.getElement());
