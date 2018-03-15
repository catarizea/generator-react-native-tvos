/* eslint max-len: 0 */
module.exports = {
  Featured: {
    willMount: {
      props: ['fetchFeatured'],
      actions: ['fetchFeatured().catch(() => {});']
    },
    propTypes: {
      featured: 'PropTypes.array',
      fetchFeatured: 'PropTypes.func.isRequired',
      navigator: 'PropTypes.object.isRequired',
    },
    defaultProps: {
      featured: '[]',
    },
    mappedProps: {
      decomposed: ['featured'],
      returned: ['featured'],
    }
  },

  Category: {
    willMount: {
      props: ['fetchCategories'],
      actions: ['fetchCategories().catch(() => {});']
    },
    propTypes: {
      categories: 'PropTypes.array',
      fetchCategories: 'PropTypes.func.isRequired',
      navigator: 'PropTypes.object.isRequired',
    },
    defaultProps: {
      categories: '[]',
    },
    mappedProps: {
      decomposed: ['categories'],
      returned: ['categories'],
    }
  },

  Poster: {
    willMount: {
      props: ['fetchMovies'],
      actions: ['fetchMovies({ sort: [\'id\'], order: [\'asc\'] }).catch(() => {});'],
    },
    propTypes: {
      movies: 'PropTypes.array',
      fetchMovies: 'PropTypes.func.isRequired',
      navigator: 'PropTypes.object.isRequired',
    },
    defaultProps: {
      movies: '[]',
    },
    handlers: ['loadMoreMovies'],
    mappedProps: {
      decomposed: ['movies'],
      returned: ['movies: map(movies, mov => ({ id: mov.id, poster: mov.poster, title: mov.title }))'],
    }
  }
};
