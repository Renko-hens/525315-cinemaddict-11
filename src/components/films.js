import {createCardsFilmTemplate} from './cards-film';
import {createShowButtonTemplate} from './show-button';

const createFilmListsTemplate = (cards) => {
  // Правильно ли так?
  const upcomingCardsMarkup = createCardsFilmTemplate(cards, 5);
  const topCardsMarkup = createCardsFilmTemplate(cards);
  const commentedCardsMarkup = createCardsFilmTemplate(cards);

  const showButton = createShowButtonTemplate();

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
