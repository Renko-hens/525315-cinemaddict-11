import AbstractComponent from "./abstract-component";

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

export default class Sorts extends AbstractComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return createSortsTemplate(this._sorts);
  }
}
