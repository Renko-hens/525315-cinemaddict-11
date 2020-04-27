import {createElement} from "../utils";

const createSortTemplate = (name, isActive) => {
  return (`<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">Sort by ${name}</a></li>`);
};

const createSortsTemplate = (sorts) => {
  const sortsMarkup = sorts.map((it, i) => createSortTemplate(it, i === 0)).join(`\n`);
  return (
    `<ul class="sort">
      ${sortsMarkup}
    </ul>`);
};

export default class Sorts {
  constructor(sorts) {
    this._sorts = sorts;
    this._element = null;
  }

  getTemplate() {
    return createSortsTemplate(this._sorts);
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
