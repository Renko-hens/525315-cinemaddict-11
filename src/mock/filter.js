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

export {generateFilters};
