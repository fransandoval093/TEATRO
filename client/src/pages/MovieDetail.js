import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";
function MovieDetail({ match }) {
  useEffect(() => {
    fetchMovie();
    fetchCredits();
    fetchSimilars();
    console.log(match.params.id);
  }, [match]);

  const [queryResult, setQueryResult] = useState("");
  const [queryStatus, setQueryStatus] = useState("GET MOVIE");
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [similars, setSimilars] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const formatYear = (str, n) => {
    return str?.length > n ? str.slice(0, 4) + "" : str;
  };
  const formatHyphen = (punctuatedString) => {
    // var s = ", -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
    var s = punctuatedString
    var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    var finalString = punctuationless.replace(/\s{2,}/g, " ");
    var hyphenedString = finalString.replaceAll(" ", "-").toLowerCase();
    return hyphenedString
  };

  const fetchMovie = async () => {
    const fetchMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );

    const movie = await fetchMovie.json();
    setMovie(movie);
    console.log(movie);
  };
  const fetchCredits = async () => {
    const fetchCredits = await fetch(
      `
        https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );

    const credits = await fetchCredits.json();
    setCredits(credits.cast);
    console.log(credits);
  };
  const fetchSimilars = async () => {
    const fetchSimilars = await fetch(
      `
      https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US&page=1`
    );

    const similars = await fetchSimilars.json();
    setSimilars(similars.results);
    console.log(similars);
  };
  const fetchQuery = async (movie) => {
    setQueryStatus("GETTING...")
    const theFilm = await fetch(
      `/api/getList?moviename=${formatHyphen(movie.original_title)}&movieyear=${formatYear(movie.release_date, 4)}`
    );

    const film = await theFilm.json();
    setQueryResult(film.slice(0, 1));
    console.log(film);

    setQueryStatus("ENJOY")

    // TESTING | Various console logs
    console.log("TESTING | Movie input\n", formatHyphen(movie.original_title));
    console.log("TESTING | Year input\n", formatYear(movie.release_date, 4));
    console.log(movie.tagline);

    console.log("TESTING | data \n");
    fetch(`/api/getList?moviename=${formatHyphen(movie.original_title)}&movieyear=${formatYear(movie.release_date, 4)}`)
      .then(response => response.json())
      .then(data => console.log(data)
      );

    // JSON ERROR TESTING
    fetch(`/api/getList?moviename=${formatHyphen(movie.original_title)}&movieyear=${formatYear(movie.release_date, 4)}`).then(async response => {
      try {
        const data = await response.json()
        console.log('response data?', data)
      } catch (error) {
        console.log('Error happened here!')
        console.error(error)
      }
    })
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // RETRIEVES TRAILER 
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };



  return (

    <div className="movie__details">

      <div className="poster">
        <div className="movie__info">

          <h1>{movie.original_title}</h1>
          <h1>{formatYear(movie.release_date, 4)}</h1>
          <h1>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</h1>
          <h1>{movie?.name}</h1>
          <h1 className="banner__description">
            {truncate(movie.overview, 150)}
          </h1>
          <button
            className="trailer__button"
            onClick={() => handleClick(movie)}>
            Watch Trailer
          </button>
          <button
            className="trailer__button movie__button"
            onClick={() => fetchQuery(movie)}>
            {queryStatus}
          </button>
          {/* Check to see if any items are found*/}

          {queryResult.length ? (
            <div>
              {/* Render the list of items */}
              <hr></hr>
              {queryResult.map((item) => {
                return (
                  <div>
                    <hr></hr>
                    <h6>{movie.tagline}</h6>
                    <iframe title="hi"
                      name="watch" id="IframeEmbed" height="auto" width="auto"
                      allowfullscreen="" frameborder="0" scrolling="no" __idm_frm__="49"
                      __idm_id__="324447233"
                      src={item}></iframe>
                  </div>
                );
              })
              }
              <hr></hr>
            </div>
          ) : (
            <div>
              <hr></hr>
              <h4>Collecting, please wait</h4>
            </div>)
          }

          <hr></hr>
          <div className="movie__overview">
            <div className="small_poster">
              <img
                key={movie.id}
                className="poster__overview"
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
              />
            </div>
            <div className="movie_story">
              <h1>Storyline</h1>
              <h1>{movie.overview}</h1>

              <div className="movie_information">
                <div className="movie_info">
                  <h1>Released </h1>
                  <h1>Budget </h1>
                  <h1>Revenue </h1>
                  <h1>Status</h1>
                  <h1>Runtime</h1>
                  <h1>Genre </h1>
                </div>
                <div className="movie_api_info">
                  <h1>{movie.release_date}</h1>
                  <h1>${movie.budget}</h1>
                  <h1>${movie.revenue}</h1>
                  <h1>{movie.status}</h1>
                  <h1>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</h1>
                  {/* <h1>{movie.genres[0].name}, {movie.genres[1].name}</h1> */}
                </div>
              </div>
            </div>
          </div>

          <div className="cast-details">
            <div className="cast">
              <h1>Cast</h1>
            </div>
            {credits.slice(0, 10).map((credit) => (
              <Link to={`/person/${credit.id}`}  >
                <div className="row__cast">
                  <div className="img__cast">

                    <img
                      // onClick={() => handleClick(movie)}
                      className="img__actor"
                      src={`${base_url}${credit.profile_path}`}
                      alt={credit.name}
                    />
                  </div>
                  <h1>{credit.name}</h1>


                </div>
              </Link>
            ))}
          </div>

        </div>
        <div>
          <img
            style={{
              background: "cover",
              backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
              backgroundPosition: "top center",
            }}
            className="large__poster"
            src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
            alt={movie.name}
          />
        </div>
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

      <div className="details__fadeBottom"></div>
      <div className="more_like_this">
        <div className="row">
          <div className="row__posters" >
            <h1>More Like this</h1>
            {similars.map((similar) => (
              <Link to={`/movie/${similar.id}`}  >
                <div className="poster" >
                  <img
                    key={similar.id}
                    // onClick={() => handleClick(movie)}
                    className={`row__poster ${"row__posterLarge"}`}
                    src={`${base_url}${similar.poster_path || similar.backdrop_path
                      }`}
                    alt={similar.name}
                  />
                  <div className="onhover" >
                    <h1>{similar.title}</h1>
                    <h1>{similar.overview}</h1>
                    <h1>{similar.media_type}</h1>
                  </div>
                </div>
              </Link>
            )
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default MovieDetail;