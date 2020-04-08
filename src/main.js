import createHeaderProfileTemplate from './components/headerProfile';
import createNavigationMenuTemplate from './components/navigationMenu';
import createFiltersTemplate from './components/filters';
import createFilmListsTemplate from './components/filmList';
import createFilmStatistics from './components/filmStatistics';
import createDetailedFilmTemplate from './components/detailtedFilm';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

renderElement(header, createHeaderProfileTemplate());
renderElement(main, createNavigationMenuTemplate());
renderElement(main, createFiltersTemplate());
renderElement(main, createFilmListsTemplate());
renderElement(footerStatistics, createFilmStatistics());
renderElement(main, createDetailedFilmTemplate());
