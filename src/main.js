import RatingComponent from './components/header-profile';
import {MenuItem} from './components/navigation-menu';
import NavigationMenuController from './controllers/navigation-menu';
import PageFilmsComponent from './components/page-films';
import PageController from './controllers/page-controller';
import StatisticsComponent from "./components/statistics.js";
import QuantityFilmComponent from './components/quantity-film';
import CardsModel from './models/cards';
import {generateRatingCount} from './mock/header-profile';
import {generateCardsFilm} from './mock/card';
import {render} from './utils/render';

const CARD_COUNT = 20;
// const QUANTITY_MOVIES = Math.floor(Math.random() * 100);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const cards = generateCardsFilm(CARD_COUNT);
const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const ratingValue = generateRatingCount();
const ratingComponent = new RatingComponent(ratingValue);
render(header, ratingComponent);

const navigationMenuController = new NavigationMenuController(main, cardsModel);
navigationMenuController.render();

const pageFilmsComponent = new PageFilmsComponent();
render(main, pageFilmsComponent);

// const dateTo = new Date();
// const dateFrom = (() => {
//   const d = new Date(dateTo);
//   d.setDate(d.getDate() - 7);
//   return d;
// })();

const statisticsComponent = new StatisticsComponent(cardsModel);
render(main, statisticsComponent);
statisticsComponent.hide();

const boardController = new PageController(pageFilmsComponent, cardsModel);
boardController.render(cards);

const quantityFilmComponent = new QuantityFilmComponent(CARD_COUNT);
render(footerStatistics, quantityFilmComponent);

navigationMenuController.setTabChangeHandler((tabItem) => {
  if (tabItem === MenuItem.STATISTICS) {
    boardController.hide();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    boardController.show();
  }
});
