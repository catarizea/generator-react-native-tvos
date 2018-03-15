module.exports = {
  loadMoreMovies: {
    dep: `
import { FETCH_MOVIES_LIMIT } from '../../../../constants/pagination';`,

    binding: 'this.loadMoreMovies = this.loadMoreMovies.bind(this);',

    func: `
  loadMoreMovies() {
    const { movies, fetchMovies } = this.props;

    if (movies.length && movies.length % FETCH_MOVIES_LIMIT === 0) {
      fetchMovies({
        page: (movies.length / FETCH_MOVIES_LIMIT) + 1,
        sort: ['id'],
        order: ['asc'],
      }).catch(() => {});
    }
  }`,

    prop: 'loadMoreMovies={this.loadMoreMovies}',
  }
};
