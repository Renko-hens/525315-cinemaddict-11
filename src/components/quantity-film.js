import AbstractComponent from './abstract-component';

const createFilmStatistics = (quantity) => {
  return (`<p>${quantity} movies inside</p>`);
};

export default class QuantityFilm extends AbstractComponent {
  constructor(quantity) {
    super();
    this._quantity = quantity;
  }

  getTemplate() {
    return createFilmStatistics(this._quantity);
  }
}
