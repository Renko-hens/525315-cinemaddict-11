import {createElement} from '../utils';

const createFilmStatistics = (quantity) => {
  return (`<p>${quantity} movies inside</p>`);
};

export default class Statistics {
  constructor(quantity) {
    this._quantity = quantity;
    this._element = null;
  }

  getTemplate() {
    return createFilmStatistics(this.quantity);
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
