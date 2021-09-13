const API_KEY = "d42525da8940f7a7a298e98a209ec951";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchTvLatest: `/tv/popular?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`,
  fetchMovieDetails: `?api_key=${API_KEY}&language=en-US`,
  fetchSearch: `search/multi?api_key=${API_KEY}&language=en-US&query=`,
};

export default requests;
