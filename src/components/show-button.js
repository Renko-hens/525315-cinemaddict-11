import AbstractComponent from './abstract-component';

const createShowButtonTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class ShowButton extends AbstractComponent {
  getTemplate() {
    return createShowButtonTemplate();
  }

  setShowMoreButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
