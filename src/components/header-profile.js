import {createElement} from "../utils";

const createHeaderProfileTemplate = (ratingValue) => {
  let rating = ``;

  if (ratingValue > 0 && ratingValue < 11) {
    rating = `Novice`;
  } else if (ratingValue < 21) {
    rating = `Fan`;
  } else if (ratingValue >= 21) {
    rating = `Movie buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`);
};

export default class Rating {
  constructor(ratingValue) {
    this._rating = ratingValue;
    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._rating);
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
