import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by ${SortType.DEFAULT}</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by ${SortType.RATING}</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by ${SortType.DATE}</a></li>
    </ul>`);
};

export default class Sorts extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate(SortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
