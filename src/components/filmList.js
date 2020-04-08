import createFilmCardTemplate from './filmCard';
import createShowButtonTemplate from './showButton';

const DEFAULT_COUNT = 5;

const createCardsListTemplate = (count = DEFAULT_COUNT) => {
  let cardsList = ``;

  for (let i = 0; i < count; i++) {
    cardsList += createFilmCardTemplate();
  }

  return cardsList;
};

const createFilmListsTemplate = () => {
  const upcomingCards = createCardsListTemplate();
  const topCards = createCardsListTemplate(2);
  const commentedCards = createCardsListTemplate(2);
  const showButton = createShowButtonTemplate();

  return (`
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">${upcomingCards}</div>
        ${showButton}
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container">${topCards}</div>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container">${commentedCards}</div>
      </section>
    </section>
  `);
};

export default createFilmListsTemplate;
