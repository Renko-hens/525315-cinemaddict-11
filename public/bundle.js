/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/card-film.js":
/*!*************************************!*\
  !*** ./src/components/card-film.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createCardFilmTemplate = (card) => {
  const {title, rating, year, duration, genres, poster, description, commentsArray, isWatchlist, isWatched, isFavorite} = card;
  const watchlistButtonActiveClass = isWatchlist ? `film-card__controls-item--active` : ``;
  const watchedButtonActiveClass = isWatched ? `film-card__controls-item--active` : ``;
  const favoriteButtonActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(year, `year`)}</span>
        <span class="film-card__duration">${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(duration, `letters`)}</span>
        ${genres.length === 1 ? `<span class="film-card__genre">${genres}</span>` : `<span class="film-card__genres">${genres.join(`, `)}</span>`}
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > 140 ? `${description.substring(0, 139)}...` : description}</p>
      <a class="film-card__comments">${commentsArray.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonActiveClass}">Mark as favorite</button>
      </form>
    </article>`);
};

class Card {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createCardFilmTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardsContainer; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createCardsFilmTemplate = () => {

  return (
    `<div class="films-list__container">
    </div>
  `);
};

class CardsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCardsFilmTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/comments.js":
/*!************************************!*\
  !*** ./src/components/comments.js ***!
  \************************************/
/*! exports provided: createCommentsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCommentsTemplate", function() { return createCommentsTemplate; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createCommentTemplate = (comment) => {
  const {textComment, emoji, author, data} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" alt="emoji-smile" width="55" height="55">
      </span>
      <div>
        <p class="film-details__comment-text">${textComment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatDateTime"])(data, `number`, `divider`, `number`)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
};

const createCommentsTemplate = (commentsArray) => {
  const commentMarkup = commentsArray.map((it) => createCommentTemplate(it)).join(`\n`);

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsArray.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentMarkup}
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
          </label>
        </div>
      </div>
    </section>`);
};





/***/ }),

/***/ "./src/components/detailted-film.js":
/*!******************************************!*\
  !*** ./src/components/detailted-film.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DetaltedCard; });
/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments */ "./src/components/comments.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");



const createDetailedFilmTemplate = (film) => {
  const {age, title, originalTitle, rating, director, writers, actors, year, duration, country, genres, poster, description, commentsArray, isWatchlist, isWatched, isFavorite} = film;

  const commentMarkup = Object(_comments__WEBPACK_IMPORTED_MODULE_0__["createCommentsTemplate"])(commentsArray);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${Object(_utils__WEBPACK_IMPORTED_MODULE_1__["formatDate"])(year, `normal`, `string`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${Object(_utils__WEBPACK_IMPORTED_MODULE_1__["formatTime"])(duration, `letters`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre</td>
                  <td class="film-details__cell">
                    ${genres.length === 1 ? `<span class="film-details__genre">${genres}</span>` : `<span class="film-details__genres">${genres.join(` `)}</span>`}
                  </td>
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          ${commentMarkup}
        </div>
      </form>
    </section>`);
};

// const createDetailtedCardsFilmTemplate = (cards) => {
//   return cards.map((it) => createDetailedFilmTemplate(it)).join(`\n`);
// };

class DetaltedCard {
  constructor(card) {
    this._card = card;
    this._elements = null;
  }

  getTemplate() {
    return createDetailedFilmTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/films.js":
/*!*********************************!*\
  !*** ./src/components/films.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Films; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createFilmListsTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
      </section>
      <section class="films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
      </section>
    </section>`);
};

class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/header-profile.js":
/*!******************************************!*\
  !*** ./src/components/header-profile.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rating; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


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

class Rating {
  constructor(ratingValue) {
    this._rating = ratingValue;
    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._rating);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/navigation-menu.js":
/*!*******************************************!*\
  !*** ./src/components/navigation-menu.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigationMenu; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


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

class NavigationMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createNavigationMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/no-card.js":
/*!***********************************!*\
  !*** ./src/components/no-card.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoCards; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createNoCardsTemplate = () => {

  return (`<h2 class="films-list__title">There are no movies in our database</h2>`);
};

class NoCards {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoCardsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/show-button.js":
/*!***************************************!*\
  !*** ./src/components/show-button.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowButton; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createShowButtonTemplate = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

class ShowButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/sorts.js":
/*!*********************************!*\
  !*** ./src/components/sorts.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sorts; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


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

class Sorts {
  constructor(sorts) {
    this._sorts = sorts;
    this._element = null;
  }

  getTemplate() {
    return createSortsTemplate(this._sorts);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/statistics-film.js":
/*!*******************************************!*\
  !*** ./src/components/statistics-film.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Statistics; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const createFilmStatistics = (quantity) => {
  return (`<p>${quantity} movies inside</p>`);
};

class Statistics {
  constructor(quantity) {
    this._quantity = quantity;
    this._element = null;
  }

  getTemplate() {
    return createFilmStatistics(this.quantity);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: COMMENTS_NAMES, EMOJIES, TEXT_COMMENT, MONTH_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENTS_NAMES", function() { return COMMENTS_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMOJIES", function() { return EMOJIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_COMMENT", function() { return TEXT_COMMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
const COMMENTS_NAMES = [
  `Jong Doew`, `Ray Haisenberg`, `Nix Tony`, `Akimbo Gunner`, `Matt Dainmond`, `Miner 2001`
];
const EMOJIES = [
  `./images/emoji/smile.png`, `./images/emoji/sleeping.png`, `./images/emoji/puke.png`, `./images/emoji/angry.png`,
];
const TEXT_COMMENT = [
  `Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`, `Note Mate`, `it coolsa`
];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header_profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/header-profile */ "./src/components/header-profile.js");
/* harmony import */ var _components_navigation_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/navigation-menu */ "./src/components/navigation-menu.js");
/* harmony import */ var _components_sorts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sorts */ "./src/components/sorts.js");
/* harmony import */ var _components_films__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/films */ "./src/components/films.js");
/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cards */ "./src/components/cards.js");
/* harmony import */ var _components_card_film__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/card-film */ "./src/components/card-film.js");
/* harmony import */ var _components_show_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/show-button */ "./src/components/show-button.js");
/* harmony import */ var _components_statistics_film__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/statistics-film */ "./src/components/statistics-film.js");
/* harmony import */ var _components_no_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/no-card */ "./src/components/no-card.js");
/* harmony import */ var _components_detailted_film__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/detailted-film */ "./src/components/detailted-film.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _mock_header_profile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/header-profile */ "./src/mock/header-profile.js");
/* harmony import */ var _mock_filter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mock/filter */ "./src/mock/filter.js");
/* harmony import */ var _mock_sort__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mock/sort */ "./src/mock/sort.js");
/* harmony import */ var _mock_card_film__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mock/card-film */ "./src/mock/card-film.js");


















const CARD_COUNT = 20;
const QUANTITY_MOVIES = Math.floor(Math.random() * 100);
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const SHOWING_FILM_COUNT_FOR_EXTRA = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);


const renderCard = (cardsListContainer, card) => {
  const cardComponent = new _components_card_film__WEBPACK_IMPORTED_MODULE_5__["default"](card);
  const cardElement = cardComponent.getElement();
  Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(cardsListContainer, cardElement);

  const cardDetailtedComponent = new _components_detailted_film__WEBPACK_IMPORTED_MODULE_9__["default"](card);
  const cardDetailtedElement = cardDetailtedComponent.getElement();

  const escKeyDownHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      document.body.removeChild(cardDetailtedElement);
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const clickCardHandler = (evt) => {
    const isCurrentElement = evt.target.className === `film-card__poster` || evt.target.className === `film-card__title` || evt.target.className === `film-card__comments`;

    if (isCurrentElement) {
      document.body.appendChild(cardDetailtedElement);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  cardElement.addEventListener(`click`, clickCardHandler);

  // close button detailted card
  const cardDetailtedCloseButton = cardDetailtedElement.querySelector(`.film-details__close-btn`);
  const buttonCloseDetailtedCardHandler = () => {
    document.body.removeChild(cardDetailtedElement);
  };

  cardDetailtedCloseButton.addEventListener(`click`, buttonCloseDetailtedCardHandler);
};


const renderBoard = (boardFilmsComponent, cards) => {
  const filmListElement = boardFilmsComponent.getElement().querySelector(`.films-list`);
  const filmListExtrasList = boardFilmsComponent.getElement().querySelectorAll(`.films-list--extra`);

  // no-card
  if (cards.length === 0) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(filmListElement, new _components_no_card__WEBPACK_IMPORTED_MODULE_8__["default"]().getElement());

    filmListExtrasList
      .forEach((extraList) => extraList.remove());
    return;
  }

  // Cards container
  const cardsContainerComponent = new _components_cards__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const cardsContainerElement = cardsContainerComponent.getElement();
  Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(filmListElement, cardsContainerElement);

  // render Card
  let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;

  for (let i = 0; i < showingFilmsCount; i++) {
    if (cards[i]) {
      renderCard(cardsContainerElement, cards[i], i);
    }
  }

  // show more button
  const showMoreComponent = new _components_show_button__WEBPACK_IMPORTED_MODULE_6__["default"]();
  const showMoreButton = showMoreComponent.getElement();
  Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(filmListElement, showMoreButton);

  const deleteLoadMoreButton = () => {
    showMoreButton.remove();
    showMoreComponent.removeElement();
  };

  const allHidingCards = () => {
    if (showingFilmsCount >= cards.length) {
      deleteLoadMoreButton();
    }
  };

  allHidingCards();

  const showMoreButtonClickHandler = () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += SHOWING_FILM_COUNT_BY_BUTTON;

    for (let i = prevFilmsCount; i < showingFilmsCount; i++) {
      if (cards[i]) {
        renderCard(cardsContainerElement, cards[i], i);
      }
    }

    allHidingCards();
  };

  showMoreButton.addEventListener(`click`, showMoreButtonClickHandler);

  // Cards Extra container
  filmListExtrasList
    .forEach((extraList) => {
      let showingExtraFilmsCount = SHOWING_FILM_COUNT_FOR_EXTRA;

      const cardsExtraContainerComponent = new _components_cards__WEBPACK_IMPORTED_MODULE_4__["default"]();
      const cardsExtraContainerElement = cardsExtraContainerComponent.getElement();
      Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(extraList, cardsExtraContainerElement);

      for (let i = 0; i < showingExtraFilmsCount; i++) {
        if (cards[i]) {
          renderCard(cardsExtraContainerElement, cards[i], i);
        }
      }
    });
};

const ratingValue = Object(_mock_header_profile__WEBPACK_IMPORTED_MODULE_11__["generateRatingCount"])();
Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(header, new _components_header_profile__WEBPACK_IMPORTED_MODULE_0__["default"](ratingValue).getElement());

const filters = Object(_mock_filter__WEBPACK_IMPORTED_MODULE_12__["generateFilters"])();
Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(main, new _components_navigation_menu__WEBPACK_IMPORTED_MODULE_1__["default"](filters).getElement());

Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(main, new _components_sorts__WEBPACK_IMPORTED_MODULE_2__["default"](_mock_sort__WEBPACK_IMPORTED_MODULE_13__["sorts"]).getElement());

const boardFilmsComponent = new _components_films__WEBPACK_IMPORTED_MODULE_3__["default"]();
Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(main, boardFilmsComponent.getElement());

const cards = Object(_mock_card_film__WEBPACK_IMPORTED_MODULE_14__["generateCardsFilm"])(CARD_COUNT);
renderBoard(boardFilmsComponent, cards);

const statisticsComponent = new _components_statistics_film__WEBPACK_IMPORTED_MODULE_7__["default"](QUANTITY_MOVIES);
Object(_utils__WEBPACK_IMPORTED_MODULE_10__["render"])(footerStatistics, statisticsComponent.getElement());


/***/ }),

/***/ "./src/mock/card-film.js":
/*!*******************************!*\
  !*** ./src/mock/card-film.js ***!
  \*******************************/
/*! exports provided: generateCardFilm, generateCardsFilm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCardFilm", function() { return generateCardFilm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCardsFilm", function() { return generateCardsFilm; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment */ "./src/mock/comment.js");



const DEFAULT_COUNT = 2;
const images = [`./images/posters/popeye-meets-sinbad.png`, `./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`];
const titleFilms = [`Friends`, `Gentelmens`, `Viiny Pooh`, `Lefaifan`, `Cat and Dother`];
const directors = [`Kristofer Nolan`, `John Nolan`, `Jackie Chan`, `Guy Richy`];
const writers = [`sas`, `kek`, `cheburek`];
const actors = [`Matthew Perry`, ` Cortny Cox`, `Jennifer Anyston`, `Matthew Bland`, `David Shicwimmer`];
const countries = [`England`, `Holandia`, `Swezarland`, `Portugal`, `Korea`, `Italy`, ` Spain`, `Brazil`, `Russia`];
const genres = [`Western`, `Detectiv`, `Drama`, `Comedy`, `Nuar`, `Fairytail`, `Tragedy`];
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. `, `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`];

const generateCardFilm = () => {
  return {
    age: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(3, 21),
    poster: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(images),
    title: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(titleFilms),
    originalTitle: `Original ${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(titleFilms)}`,
    rating: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(1, 100) / 10,
    director: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(directors),
    writers: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(writers).join(`, `),
    actors: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(actors).join(`, `),
    country: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(countries),
    year: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(),
    duration: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(),
    genres: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(genres),
    description: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(descriptions).join(` `),
    commentsArray: Object(_comment__WEBPACK_IMPORTED_MODULE_1__["generateComments"])(),
    isWatchlist: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomBool"])(),
    isWatched: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomBool"])(),
    isFavorite: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomBool"])(),
  };
};

const generateCardsFilm = (count = DEFAULT_COUNT) => {
  return new Array(count)
    .fill(``)
    .map(generateCardFilm);
};




/***/ }),

/***/ "./src/mock/comment.js":
/*!*****************************!*\
  !*** ./src/mock/comment.js ***!
  \*****************************/
/*! exports provided: generateComments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateComments", function() { return generateComments; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



const generateComments = (count = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_NAMES"].length)) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      author: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["COMMENTS_NAMES"]),
      emoji: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["EMOJIES"]),
      textComment: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["TEXT_COMMENT"]),
      data: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(),
    });
  }
  return comments;
};




/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
const filters = [
  {
    name: `All movies`,
    id: `all`,
  },
  {
    name: `Watchlist`,
    id: `watchlist`,
  },
  {
    name: `History`,
    id: `history`,
  },
  {
    name: `Favorites`,
    id: `favorites`
  },
];

const generateFilters = () => {
  return filters.map((it) => {
    return {
      name: it.name,
      id: it.id,
      count: Math.floor(Math.random() * 10),
    };
  });
};




/***/ }),

/***/ "./src/mock/header-profile.js":
/*!************************************!*\
  !*** ./src/mock/header-profile.js ***!
  \************************************/
/*! exports provided: generateRatingCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRatingCount", function() { return generateRatingCount; });
const generateRatingCount = () => {
  return Math.floor(Math.random() * 30);
};




/***/ }),

/***/ "./src/mock/sort.js":
/*!**************************!*\
  !*** ./src/mock/sort.js ***!
  \**************************/
/*! exports provided: sorts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sorts", function() { return sorts; });
const sorts = [`default`, `date`, `rating`];




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: RenderPosition, getRandomIntegerNumber, getRandomArrayItem, getRandomDate, getRandomArray, formatTime, formatDate, formatDateTime, getRandomBool, createElement, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntegerNumber", function() { return getRandomIntegerNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomDate", function() { return getRandomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArray", function() { return getRandomArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDateTime", function() { return formatDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomBool", function() { return getRandomBool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.js");



const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};


const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};


const getRandomDate = () => {
  const startRandomDate = new Date(1970, 0, 1);
  const endRandomDate = new Date();
  return new Date(startRandomDate.getTime() + Math.random() * (endRandomDate.getTime() - startRandomDate.getTime()));
};


const getRandomArray = (array) => array.slice(0, getRandomIntegerNumber(0, array.length) + 1);


const formatTime = (date, typeTime) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return typeTime === `letters` ? `${hours}h ${minutes}m` : `${hours}:${minutes}`;
};


const formatDate = (date, typeYear, typeMonth = `string`) => {
  let dateFormat = ``;
  const day = date.getDate();
  const month = typeMonth === `string` ? _const__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][date.getMonth()] : date.getMonth();
  const year = date.getFullYear();

  switch (typeYear) {
    case `year`:
      dateFormat = `${year}`;
      break;
    case `divider`:
      dateFormat = `${year}/${month}/${day}`;
      break;
    case `normal`:
      dateFormat = `${day} ${month} ${year}`;
      break;
  }

  return dateFormat;
};


const formatDateTime = (date, typeTime, typeYear, typeMonth) => {
  const time = formatTime(date, typeTime);
  const year = formatDate(date, typeYear, typeMonth);
  return `${year} ${time}`;
};


const getRandomBool = () => Math.random() > 0.5;


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map