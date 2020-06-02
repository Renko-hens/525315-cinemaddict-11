import AbstractSmartComponent from './abstract-smart-component';
import {checkRating} from "../utils/common.js";
import {StatMenuTypes} from '../const';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const MINUTES_IN_HOUR = 60;

const getFilteredCards = (cards, filter) => {
  const watchedMovies = cards.filter((card) => card.isWatched);
  return watchedMovies.filter((card) => {
    const date = card.watchingDate;

    switch (filter) {
      case StatMenuTypes.ALL_TIME:
        return watchedMovies;
      case StatMenuTypes.TODAY:
        return moment().isSame(date, `day`);
      case StatMenuTypes.WEEK:
        return moment().isSame(date, `week`);
      case StatMenuTypes.MONTH:
        return moment().isSame(date, `month`);
      case StatMenuTypes.YEAR:
        return moment().isSame(date, `year`);
    }

    return watchedMovies;
  });
};

const getGenresByCard = (cards) => {
  return cards.reduce((prev, next) => {
    return [...prev, ...next.genres];
  }, []);
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const getUniqueGenres = (cards) => {
  return getGenresByCard(cards).filter(getUniqItems);
};

const calcUniqueGenres = (cards, genre) => {
  return cards.filter((it) => it === genre).length;
};

const getTopGenre = (genres, cards) => {
  const arr = genres.map((it) => calcUniqueGenres(getGenresByCard(cards), it));
  const max = Math.max(...arr);

  return max === 0 || arr.indexOf(max) === -1 ? `` : genres[arr.indexOf(max)];
};

const createRankTemplate = (cards) => {
  const ratingCount = cards.filter((card) => card.isWatched).length;
  let rating = checkRating(ratingCount);

  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rating}</span>
    </p>`);
};


const createButtonMarkup = (filter, isChecked) => {
  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.value}" value="${filter.value}" ${isChecked ? `checked` : ``}>
    <label for="statistic-${filter.value}" class="statistic__filters-label">${filter.title}</label>`
  );
};

const renderMoviesChart = (statisticCtx, cards) => {

  const genres = getUniqueGenres(cards);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: genres.map((genre) => calcUniqueGenres(getGenresByCard(cards), genre)),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = ({cards, activeFilter}) => {
  // console.log(cards);
  const filteredCards = getFilteredCards(cards, activeFilter);
  // console.log(activeFilter);
  // console.log(filteredCards);
  const rankMarkup = createRankTemplate(cards);

  const filters = Object.values(StatMenuTypes).map((menuType) => {
    return {
      title: menuType.replace(`-`, ` `)[0].toUpperCase() + menuType.replace(`-`, ` `).slice(1),
      value: menuType,
      checked: menuType === activeFilter,
    };
  });
  const filterButtonMarkup = filters.map((filter) => createButtonMarkup(filter, filter.checked)).join(`\n`);

  const cardsCount = filteredCards.length;

  const moviesTotalDuration = filteredCards.reduce((prev, next) => {
    return (prev += next.duration);
  }, 0);
  const hoursAllCount = Math.trunc(moviesTotalDuration / MINUTES_IN_HOUR);
  const minutesAllCount = moviesTotalDuration % MINUTES_IN_HOUR;

  const topGenre = getTopGenre(getUniqueGenres(cards), filteredCards);

  return (
    `<section class="statistic">
      ${rankMarkup}
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${filterButtonMarkup}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${cardsCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hoursAllCount} <span class="statistic__item-description">h</span> ${minutesAllCount} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};


export default class Statistics extends AbstractSmartComponent {
  constructor(cardsModel) {
    super();

    this._cardsModel = cardsModel;
    this._activeFilter = StatMenuTypes.ALL_TIME;

    this._moviesChart = null;
    this._dataChangeHandler = this._dataChangeHandler.bind(this);

    this._renderCharts();
    this._cardsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  getTemplate() {
    return createStatisticsTemplate({cards: this._cardsModel.getCards(), activeFilter: this._activeFilter});
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {
    this._setClickFilterMenuHandler();
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;
    this._resetMovieChart();

    this._moviesChart = renderMoviesChart(statisticCtx, getFilteredCards(this._cardsModel.getCardsAll(), this._activeFilter));
    this._setClickFilterMenuHandler();
  }

  _resetMovieChart() {
    if (this._moviesChart) {
      this._moviesChart.destroy();
      this._moviesChart = null;
    }
  }

  _setClickFilterMenuHandler() {
    const menuButtons = Array.from(this.getElement().querySelectorAll(`.statistic__filters-input`));

    menuButtons.forEach((filterMenu) => {
      filterMenu.addEventListener(`change`, (evt) => {
        this._activeFilter = evt.target.value;
        this.rerender();
      });
    });
  }

  _dataChangeHandler() {
    this.rerender();
    this.hide();
  }
}
