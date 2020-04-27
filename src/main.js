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
// import {createDetailtedCardsFilmTemplate} from './components/detailted-film';

import {generateRatingCount} from './mock/header-profile';
import {generateFilters} from './mock/filter';
import {sorts} from './mock/sort';
import {generateCardsFilm} from './mock/card-film';

import {render} from './utils';

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
  // CARD
  const cardComponent = new CardComponent(card);
  const cardElement = cardComponent.getElement();
  render(cardsListContainer, cardElement);
};


const renderBoard = (boardFilmsComponent, cards) => {
  const filmListElement = boardFilmsComponent.getElement().querySelector(`.films-list`);
  const filmListExtrasList = boardFilmsComponent.getElement().querySelectorAll(`.films-list--extra`);
  // NO_CARD
  if (cards.length === 0) {
    render(filmListElement, new NoCardsComponent().getElement());

    filmListExtrasList
      .forEach((extraList) => extraList.remove());
    return;
  }

  // FILM_LIST
  render(filmListElement, new CardsContainerComponent().getElement());

  // FILM_LIST__CONTAINER
  const cardsListContainer = filmListElement.querySelector(`.films-list__container`);

  let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
  for (let i = 0; i < showingFilmsCount; i++) {
    if (cards[i]) {
      renderCard(cardsListContainer, cards[i], i);
    }
  }

  // LOAD_MORE_BUTTON
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

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILM_COUNT_BY_BUTTON;

    for (let i = prevFilmsCount; i < showingFilmsCount; i++) {
      if (cards[i]) {
        renderCard(cardsListContainer, cards[i], i);
      }
    }

    allHidingCards();
  });

  // FILM_LISTS--EXTRA
  filmListExtrasList
    .forEach((extraList) => {
      let showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;

      const cardsContainerComponent = new CardsContainerComponent();
      const cardsContainerElement = cardsContainerComponent.getElement();
      render(extraList, cardsContainerElement);

      for (let i = 0; i < showingExtraFilmsCount; i++) {
        if (cards[i]) {
          renderCard(cardsContainerElement, cards[i], i);
        }
      }
    });

};

const ratingValue = generateRatingCount();
render(header, new RatingComponent(ratingValue).getElement());

const filters = generateFilters();
render(main, new NavigationMenuComponent(filters).getElement());
render(main, new SortsComponent(sorts).getElement());

const cards = generateCardsFilm(CARD_COUNT);

const boardFilmsComponent = new BoardFilmsComponent();
render(main, boardFilmsComponent.getElement());
renderBoard(boardFilmsComponent, cards);

const statisticsComponent = new StatisticsComponent(QUANITY_MOVIES);
render(footerStatistics, statisticsComponent.getElement());

// const detaltedCardsComponent = new DetaltedCardComponent(cards);
// render(main, detaltedCardsComponent.getElement());
// renderDetailCards(main, )

// const filmCloseButtons = document.querySelectorAll(`.film-details__close-btn`);

// filmCloseButtons
//  .forEach((button) => {
//    button.addEventListener(`click`, (evt) => {
//      const filmDetailed = evt.target.closest(`.film-details`);
//      filmDetailed.classList.add(`visually-hidden`);
//    });
//  });
