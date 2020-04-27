// import {createCardsFilmTemplate} from './cards';
// import {createShowButtonTemplate} from './show-button';
import {createElement} from '../utils';



// cards <--- БЫЛО ПАРАМЕТРОМ
const createFilmListsTemplate = () => {
  // const upcomingCardsMarkup = createCardsFilmTemplate(cards);
  // const showButton = createShowButtonTemplate();

  // const topCards = cards.slice(0, SHOWING_FILM_COUNT_FOR_EXTRA);
  // const commentedCards = cards.slice(0, SHOWING_FILM_COUNT_FOR_EXTRA);

  // const topCardsMarkup = createCardsFilmTemplate(topCards);
  // const commentedCardsMarkup = createCardsFilmTemplate(commentedCards);

  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
      </section>
    </section>`);
};

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
