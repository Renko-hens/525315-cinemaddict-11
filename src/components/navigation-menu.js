import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

const FILTER_HREF_PREFIX = `#`;

export const MenuItem = {
  STATISTICS: `stats`,
};

const getFilterNameByHref = (href) => {
  return href.substring(href.lastIndexOf(FILTER_HREF_PREFIX) + 1);
};

const createFilterTemplate = (filter, isActive) => {
  const {name, count, id} = filter;

  return (
    `<a  href="#${id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${name}
      ${id === FilterType.ALL_MOVIES.id ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`);
};

const createNavigationMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterTemplate(it, it.checked)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
};

export default class NavigationMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationMenuTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.closest(`A`)) {
        const filterName = getFilterNameByHref(evt.target.closest(`A`).href);
        handler(filterName);
      }
    });
  }

  setTabChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.closest(`A`)) {
        const filterName = getFilterNameByHref(evt.target.closest(`A`).href);
        handler(filterName);
      }
    });
  }
}
