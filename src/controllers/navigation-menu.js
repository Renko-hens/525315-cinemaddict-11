import NavigationMenuComponent from '../components/navigation-menu';
import * as utils from "../utils/render.js";
import {FilterType} from "../const.js";
import {getCardsByFilter} from "../utils/navigation-menu";

export default class NavigationMenuController {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._activeFilterType = FilterType.ALL_MOVIES.id;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._cardsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allCards = this._cardsModel.getCardsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType.name,
        id: filterType.id,
        count: getCardsByFilter(allCards, filterType.id).length,
        checked: filterType.id === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new NavigationMenuComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      utils.replace(this._filterComponent, oldComponent);
    } else {
      utils.render(container, this._filterComponent);
    }
  }

  _filterChangeHandler(filterType) {
    this._cardsModel.setFilter(filterType);
    this._activeFilterType = filterType;

    this._dataChangeHandler();
  }

  _dataChangeHandler() {
    this.render();
  }
}
