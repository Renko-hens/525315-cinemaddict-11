import RatingComponent from './components/header-profile';
import NavigationMenuComponent from './components/navigation-menu';
import BoardFilmsComponent from './components/board-films';
import PageController from './controllers/board-films';
import StatisticsComponent from './components/statistics-film';
import {generateRatingCount} from './mock/header-profile';
import {generateFilters} from './mock/filter';
import {generateCardsFilm} from './mock/card-film';
import {render} from './utils/render';

const CARD_COUNT = 20;
const QUANTITY_MOVIES = Math.floor(Math.random() * 100);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);


const ratingValue = generateRatingCount();
render(header, new RatingComponent(ratingValue));

const filters = generateFilters();
render(main, new NavigationMenuComponent(filters));

const boardFilmsComponent = new BoardFilmsComponent();
render(main, boardFilmsComponent);

const cards = generateCardsFilm(CARD_COUNT);
const boardController = new PageController(boardFilmsComponent);
boardController.render(cards);

const statisticsComponent = new StatisticsComponent(QUANTITY_MOVIES);
render(footerStatistics, statisticsComponent);
