import React, { useEffect, useState, useRef } from "react";
import "./MovieDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import Model from "./Model";
import gsap, { timeline, TweenMax, Expo } from "gsap";

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
  const [isOpen, setIsOpen] = useState(false)
  // ====
  // Animation
  // ===
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  let titleAnimation = useRef(null)
  let movieOverAnimation = useRef(null)
  let laragePosterAnimation = useRef(null)
  let smallPosterAnimation = useRef(null)
useEffect(() => {
  tl.to(
    laragePosterAnimation,
    1,
    {
      opacity: 1,
      scale: "1",
      overflow: "hidden",
      ease: Expo.easeInOut,
    },
    
  );
  
  tl.to(
    titleAnimation,
    1,
    {
      opacity: 1,
      x: 50,
      ease: Expo.easeInOut,
    },
    
  );

  tl.to(
    smallPosterAnimation,
    1,
    {
      opacity: 1,
      x: 40,
      scale: "1.1",
      ease: Expo.easeInOut,
    },
    "-=1"
  );
  tl.to(
    movieOverAnimation,
    2,
    {
      opacity: 1,
      scale: "1.1",
      ease: Expo.easeInOut,
    },
    "-=1"
  );
  
  
});


  

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

    // console.log("TESTING | data1 \n");
    // fetch(`/api/getList?moviename=${formatHyphen(movie.original_title)}&movieyear=${formatYear(movie.release_date, 4)}`)
    //   .then(response => response.json())
    //   .then(data => console.log("DATA1 | thenthen \n",data)
    // );

    // JSON ERROR TESTING
    console.log("TESTING | data2 \n");
    fetch(`/api/getList?moviename=${formatHyphen(movie.original_title)}&movieyear=${formatYear(movie.release_date, 4)}`).then(async response => {
      try {
        const data = await response.json()
        console.log('RESPONSE DATA2 | Error handling and data?\n', data)
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

      <div className="background-blur"></div>
      <div className="poster">
        <div className="movie__info">
          <div className="movie__overview" ref={el => movieOverAnimation = el}>
            <div className="small_poster"ref={el => smallPosterAnimation = el} >
              <img
                key={movie.id}
                className="poster__overview"
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
              />
            </div>
            <div className="movie_story" ref={el =>  titleAnimation = el}>
            <h1 >{movie.original_title}</h1>
            <h1 className="description" >{truncate(movie.overview, 250)}</h1>
              
              <h1>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</h1>
          
          <button
            className="trailer__button"
            onClick={() => handleClick(movie)}>
            Watch Trailer
          </button>
          <button
          
            className="trailer__button movie__button"
            onClick={() => {fetchQuery(movie); setIsOpen(true)}}>
            {queryStatus}
            {/* <button  className="trailer__button movie__button" onClick={() => setIsOpen(true)}></button> */}
          </button>
          {/* Check to see if any items are found*/}

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
        </div>
        <Model open={isOpen} onClose={() => setIsOpen(false)} >
          
          {queryResult.length ? (
            <div>
              {/* Render the list of items */}
              
              {queryResult.map((item) => {
                return (
                  <div>
                    <hr></hr>
                    <h6>{movie.tagline}</h6>
                    <iframe title="hi"
                      name="watch" id="IframeEmbed" height="580px" width="1080px"
                      allowfullscreen="true" frameborder="0" scrolling="no" __idm_frm__="49"
                      __idm_id__="324447233"
                      src={item}></iframe>
                  </div>
                );
              })
              }
              
            </div>
          ) : (
            <div>
              
              <h4>Please wait...</h4>
            </div>)
          }

          </Model>
        <div className="cast-details">
            <div className="cast">
              <h1>Cast</h1>
            </div>
            {credits.slice(0, 10).map((credit) => (
              <Link style={{ textDecoration: 'none' ,color:"white"}} to={`/person/${credit.id}`}  >
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
        <div>
          <img
            style={{
              background: "cover",
              backgroundPosition: "center center",
            }}
            className="large__poster"
            src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
            alt={movie.name}
            ref={el =>  laragePosterAnimation = el} />
        </div>
      </div>

      

      <div className="details__fadeBottom"></div>
      <div className="more_like_this">
        <div className="row">
          <div className="row__posters" >
            <h1>More Like this</h1>
            {similars.map((similar) => (
              <Link style={{ textDecoration: 'none' ,color:"white" }} to={`/movie/${similar.id}`}  >
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
            ))};
          </div>
        </div>
      </div>

    
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      
    </div>
  );
}

export default MovieDetail;