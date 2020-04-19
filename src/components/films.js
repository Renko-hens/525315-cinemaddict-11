import {createCardsFilmTemplate} from './cards-film';
import {createShowButtonTemplate} from './show-button';

const SHOWING_FILM_COUNT_FOR_EXTRA = 2;

const createFilmListsTemplate = (cards) => {
  const upcomingCardsMarkup = createCardsFilmTemplate(cards);
  const showButton = createShowButtonTemplate();

  const topCards = cards.slice(0, SHOWING_FILM_COUNT_FOR_EXTRA);
  const commentedCards = cards.slice(0, SHOWING_FILM_COUNT_FOR_EXTRA);

  const topCardsMarkup = createCardsFilmTemplate(topCards);
  const commentedCardsMarkup = createCardsFilmTemplate(commentedCards);

  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        ${upcomingCardsMarkup}
        ${showButton}
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        ${topCardsMarkup}
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        ${commentedCardsMarkup}
      </section>
    </section>
  `);
};

export {createFilmListsTemplate};
