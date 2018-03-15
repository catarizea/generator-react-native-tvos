/* eslint max-len: 0 */
module.exports = {
  Featured: {
    propTypes: {
      featured: 'PropTypes.array.isRequired',
      navigator: 'PropTypes.object.isRequired',
      uniqueKeys: 'PropTypes.array.isRequired',
    },
    component: `
        <List
          horizontal
          items={featured}
          navigator={navigator}
          childType={'featured'}
          uniqueKey={uniqueKeys[0]}
          navigateToRoute={<%- key %>DetailsRoute}
        />`,
  },

  Category: {
    propTypes: {
      categories: 'PropTypes.array.isRequired',
      navigator: 'PropTypes.object.isRequired',
      uniqueKeys: 'PropTypes.array.isRequired',
      numColumns: 'PropTypes.number.isRequired',
    },
    component: `
        <List
          items={categories}
          navigator={navigator}
          childType={'category'}
          uniqueKey={uniqueKeys[2]}
          numColumns={numColumns}
          navigateToRoute={<%- key %>CategoryRoute}
        />`,
  },

  Poster: {
    propTypes: {
      movies: 'PropTypes.array.isRequired',
      navigator: 'PropTypes.object.isRequired',
      loadMoreMovies: 'PropTypes.func.isRequired',
      uniqueKeys: 'PropTypes.array.isRequired',
    },
    component: `
        <List
          horizontal
          items={movies}
          navigator={navigator}
          childType={'poster'}
          loadMoreItems={loadMoreMovies}
          uniqueKey={uniqueKeys[1]}
          navigateToRoute={<%- key %>DetailsRoute}
        />`,
  }
};
