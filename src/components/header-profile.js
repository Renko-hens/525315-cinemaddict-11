const createHeaderProfileTemplate = (ratingValue) => {
  let rating = ``;

  if (ratingValue > 0 && ratingValue < 11) {
    rating = `novice`;
  } else if (ratingValue > 10 && ratingValue < 21) {
    rating = `fan`;
  } else if (ratingValue > 21) {
    rating = `movie buff`;
  }

  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);
};

export {createHeaderProfileTemplate};
