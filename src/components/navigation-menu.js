import AbstractComponent from "./abstract-component";

const createFilterTemplate = (filter, isActive) => {
  const {name, count, id} = filter;

  return (
    `<a  href="#${id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${name}
      ${isActive ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`);
};

const createNavigationMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterTemplate(it, i === 0)).join(`\n`);

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
}
