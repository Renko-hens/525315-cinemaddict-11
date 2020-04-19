import {createHeaderProfileTemplate} from './components/header-profile';
import {createNavigationMenuTemplate} from './components/navigation-menu';
import {createSortsTemplate} from './components/sorts';
import {createFilmListsTemplate} from './components/films';
import {createFilmStatistics} from './components/statistics-film';
import {createDetailtedCardsFilmTemplate} from './components/detailted-film';

import {generateRatingCount} from './mock/header-profile';
import {generateFilters} from './mock/filter';
import {sorts} from './mock/sort';
import {generateCardsFilm} from './mock/card-film';

const CARD_COUNT = 15;
const QUANITY_MOVIES = Math.floor(Math.random() * 100);

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
renderElement(main, createFilmListsTemplate(cards));
renderElement(footerStatistics, createFilmStatistics(QUANITY_MOVIES));

renderElement(footer, createDetailtedCardsFilmTemplate(cards), `afterend`);
