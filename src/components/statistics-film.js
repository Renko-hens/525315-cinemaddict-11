import {createElement} from '../utils';

const createFilmStatistics = (quanity) => {
  return (`<p>${quanity} movies inside</p>`);
};

export default class Statistics {
  constructor(quanity) {
    this._quanity = quanity;
    this._element = null;
  }

  getTemplate() {
    return createFilmStatistics(this._quanity);
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
