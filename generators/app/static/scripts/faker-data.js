/* eslint no-console: 0 */

const faker = require('faker');
const fs = require('fs');
const { startCase } = require('lodash');

const MAX = 100;
const FEATURED = 6;
const CATEGORIES = [
  'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Epics', 'Horror',
  'History', 'Documentary', 'Musical', 'Sci-Fi', 'War', 'Western', 'Thriller',
  'Biographical', 'Animated', 'Fantasy',
];

const dataSet = {
  categories: [],
  movies: [],
};

const generateGroup = (no, func, join = true) => {
  const group = [];

  while (group.length < no) {
    const item = func();
    if (group.indexOf(item) === -1) {
      group.push(item);
    }
  }

  if (join) {
    return group.join(', ');
  }

  return group;
};

const featuredPool = generateGroup(
  FEATURED,
  () => faker.random.number({ min: 1, max: MAX }),
  false,
);

CATEGORIES.forEach((categ, idx) => {
  dataSet.categories.push({
    id: idx + 1,
    title: categ,
  });
});

for (let i = 1; i <= MAX; i += 1) {
  dataSet.movies.push({
    id: i,
    title: startCase(faker.lorem.words()),
    released: faker.date.past(),
    genre: generateGroup(
      faker.random.number({ min: 1, max: 3 }),
      () => faker.random.arrayElement(CATEGORIES),
    ),
    rated: faker.random.arrayElement(['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'UR']),
    country: generateGroup(
      faker.random.number({ min: 1, max: 3 }),
      () => faker.random.arrayElement(['USA', 'UK', 'Hong Kong', 'Canada', 'Australia']),
    ),
    production: faker.company.companyName(),
    runtime: faker.random.number({ min: 60, max: 180 }),
    director: faker.name.findName(),
    writer: faker.name.findName(),
    actors: generateGroup(
      faker.random.number({ min: 4, max: 8 }),
      () => faker.name.findName(),
    ),
    plot: faker.lorem.paragraph(),
    poster: 'https://i.kinja-img.com/gawker-media/image/upload/b4xfydll6qktsk9dwxve.jpg',
    cover: 'https://static0.srcdn.com/wp-content/uploads/2018/01/DCEU-Wonder-Woman.jpg',
    rating: faker.finance.amount(4, 9, 1),
    boxOffice: `$${faker.finance.amount(600000, 1000000000, 0)}`,
    featured: featuredPool.indexOf(i) !== -1,
    trailer: 'http://movietrailers.apple.com/movies/wb/wonderwoman/wonder-woman-trailer-5_h720p.mov',
  });
}

fs.writeFile(
  `${__dirname}/../backend/dataSet.json`,
  JSON.stringify(dataSet, null, 2),
  () => console.log('dataSet generated'),
);
