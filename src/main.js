import RatingComponent from './components/header-profile';
import NavigationMenuController from './controllers/navigation-menu';
import BoardFilmsComponent from './components/page-films';
import PageController from './controllers/page-controller';
import StatisticsComponent from './components/statistics-film';
import CardsModel from './models/cards';
import {generateRatingCount} from './mock/header-profile';
import {generateCardsFilm} from './mock/card';
import {render} from './utils/render';

const CARD_COUNT = 20;
const QUANTITY_MOVIES = Math.floor(Math.random() * 100);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const ratingValue = generateRatingCount();
render(header, new RatingComponent(ratingValue));

const cards = generateCardsFilm(CARD_COUNT);
const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const navigationMenuController = new NavigationMenuController(main, cardsModel);
navigationMenuController.render();

const boardFilmsComponent = new BoardFilmsComponent();
render(main, boardFilmsComponent);

const boardController = new PageController(boardFilmsComponent, cardsModel);
boardController.render(cards);

const statisticsComponent = new StatisticsComponent(QUANTITY_MOVIES);
render(footerStatistics, statisticsComponent);
