import {createHeaderProfileTemplate} from './components/header-profile';
import {createNavigationMenuTemplate} from './components/navigation-menu';
import {createSortsTemplate} from './components/sorts';
import {createFilmListsTemplate} from './components/films';
import {createFilmStatistics} from './components/statistics-film';

import {generateFilters} from './mock/filter';
import {sorts} from './mock/sort';
import {generateCardsFilm} from './mock/card-film';

const CARD_COUNT = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

renderElement(header, createHeaderProfileTemplate());

const filters = generateFilters();
renderElement(main, createNavigationMenuTemplate(filters));
renderElement(main, createSortsTemplate(sorts));
const cards = generateCardsFilm(CARD_COUNT);
renderElement(main, createFilmListsTemplate(cards));
renderElement(footerStatistics, createFilmStatistics());
