import {createHeaderProfileTemplate} from './components/header-profile';
import {createNavigationMenuTemplate} from './components/navigation-menu';
import {createSortsTemplate} from './components/sorts';
import {createFilmListsTemplate} from './components/films';
import {createCardFilmTemplate} from './components/cards-film';
import {createFilmStatistics} from './components/statistics-film';
import {createDetailedFilmTemplate} from './components/detailted-film';
import {createDetailtedCardsFilmTemplate} from './components/detailted-film';
import {generateRatingCount} from './mock/header-profile';
import {generateFilters} from './mock/filter';
import {sorts} from './mock/sort';
import {generateCardsFilm} from './mock/card-film';

const CARD_COUNT = 20;
const QUANITY_MOVIES = Math.floor(Math.random() * 100);
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const ratingValue = generateRatingCount();
renderElement(header, createHeaderProfileTemplate(ratingValue));

const filters = generateFilters();
renderElement(main, createNavigationMenuTemplate(filters));
renderElement(main, createSortsTemplate(sorts));

const cards = generateCardsFilm(CARD_COUNT);
let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
const showingCards = cards.slice(0, showingFilmsCount);

renderElement(main, createFilmListsTemplate(showingCards));
renderElement(footerStatistics, createFilmStatistics(QUANITY_MOVIES));
renderElement(footer, createDetailtedCardsFilmTemplate(showingCards), `afterend`);

const films = document.querySelector(`.films`);
const filmsListContainer = films.querySelector(`.films-list__container`);
const loadMoreButton = main.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILM_COUNT_BY_BUTTON;

  cards.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => {
      renderElement(filmsListContainer, createCardFilmTemplate(film));
      renderElement(footer, createDetailedFilmTemplate(film), `afterend`);
    });

  if (showingFilmsCount >= cards.length) {
    loadMoreButton.remove();
  }
});


const filmCloseButtons = document.querySelectorAll(`.film-details__close-btn`);

filmCloseButtons.forEach((button) => {
  button.addEventListener(`click`, (evt) => {
    const filmDetailed = evt.target.closest(`.film-details`);
    filmDetailed.classList.add(`visually-hidden`);
  });
});
