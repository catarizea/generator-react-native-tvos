export const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }

  return state;
};

export const singleValueReducer = (field, type, isResponseAnArray = false) => {
  const falseCase = state => ({ ...state, [field]: false });

  return {
    [type[1]]: (state, action) => (
      {
        ...state,
        [field]: isResponseAnArray ? action.payload.data[0] : action.payload.data,
      }
    ),
    [type[0]]: falseCase,
    [type[2]]: falseCase,
    [type[3]]: falseCase,
  };
};

export const arrayReducer = (field, type) => {
  const falseCase = state => ({ ...state, [field]: [] });

  return {
    [type[1]]: (state, action) => ({
      ...state,
      [field]: [...state[field], ...action.payload.data],
    }),
    [type[2]]: falseCase,
    [type[3]]: falseCase,
  };
};

export const createHandlers = actionTypes => {
  const {
    FETCH_MOVIE,
    FETCH_MOVIES,
    SEARCH_MOVIES,
    FETCH_FEATURED,
    FETCH_CATEGORIES,
  } = actionTypes;

  const selectedMovie = singleValueReducer('selectedMovie', FETCH_MOVIE, true);
  const movies = arrayReducer('movies', FETCH_MOVIES);
  const searchedMovies = arrayReducer('searchedMovies', SEARCH_MOVIES);
  const featured = arrayReducer('featured', FETCH_FEATURED);
  const categories = arrayReducer('categories', FETCH_CATEGORIES);

  return {
    ...selectedMovie,
    ...movies,
    ...searchedMovies,
    ...featured,
    ...categories,
  };
};
