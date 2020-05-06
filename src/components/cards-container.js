import AbstractComponent from './abstract-component';

const createCardsFilmTemplate = () => {

  return (
    `<div class="films-list__container">
    </div>
  `);
};

export default class CardsContainer extends AbstractComponent {
  getTemplate() {
    return createCardsFilmTemplate();
  }
}
