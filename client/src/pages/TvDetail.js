import React, { useEffect, useState } from "react";
import "./TvDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
// import Rating from "react-rating";
import { Link } from "react-router-dom";

// fast.replaceAll(" ", "-")
// fast.replace(/['"]+/g,'')
// fast.slice(0, 4)

const base_url = "https://image.tmdb.org/t/p/original/";
function MovieDetail({ match }) {
  useEffect(() => {
    fetchCredits();
    fetchTv();
    console.log(match.params.id);
  }, [match]);

  const [tv, setTv] = useState({});
  const [credits, setCredits] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  const fetchTv = async () => {
    const fetchTv = await fetch(
      `
      https://api.themoviedb.org/3/tv/${match.params.id}?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );
// Puppeteer
    const tv = await fetchTv.json();
    setTv(tv);
    console.log(tv);
  };
  const fetchCredits = async () => {
    const fetchCredits = await fetch(
      `
      https://api.themoviedb.org/3/tv/${match.params.id}/credits?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US`
    );

    const credits = await fetchCredits.json();
    setCredits(credits.cast);
    console.log(credits);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  function year(str, n) {
    return str?.length > n ? str.slice(0,  4) + "" : str;
  }
  // function name(str, n) {
  //   return str?.length > n ? str.replace(/['"]+/g,'')+ "" : str;
  // }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (tv) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(tv?.name || tv?.title || tv?.original_name || "")
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
          <h1>{tv.original_name}</h1>
          <h1>{year(tv.release_date, 4)}</h1>
          {/* <  readonly stop="5"  initialRating={Math.floor(tv?.vote_average /2)} /> */}
          <h1>Seasons {tv.number_of_seasons}</h1>
          <h1>{year(tv.first_air_date, 4) }</h1>
          <h1>{tv?.name}</h1>
          <h1 className="banner__description">
            {truncate(tv.overview, 150)}
          </h1>
          <button
            className="trailer__button"
            onClick={() => handleClick(tv)}
          >
            Watch Trailer
          </button>
        </div>
        <div>
          <img
            style={{
              background: "cover",
              backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${tv?.backdrop_path}"
        )`,
              backgroundPosition: "top center",
            }}
            className="large__poster"
            src={`${base_url}${tv.backdrop_path || tv.poster_path}`}
            alt={tv.name}
          />
        </div>
      </div>
      <div className="movie__overview">
        <div className="small_poster">
            <img 
            key={tv.id}
            className="poster__overview"
            src={`${base_url}${tv.poster_path}`}
            alt={tv.name}
            />
        </div>
        <div className="movie_story">
            <h1>Storyline</h1>
            <h1>{tv.overview}</h1>
       
        <div className="movie_information">
          <div className="movie_info">
            <h1>First Aired </h1>
            <h1>Last Aired </h1>
            <h1>Seasons</h1>
            <h1>Episodes</h1>
            <h1>Status </h1>
            <h1>Language </h1>
          </div>
          <div className="movie_api_info">
            <h1>{tv.first_air_date}</h1>
            <h1>{tv.last_air_date}</h1>
            {/* <h1>{tv.created_by}</h1> */}
            <h1>{tv.number_of_seasons}</h1>
            <h1>{tv.number_of_episodes}</h1>
            <h1>{tv.status}</h1>
            <h1>{tv.original_language}</h1>
            {/* <h1>{movie.genres[0].name}, {movie.genres[1].name}</h1> */}
          </div>
        </div>
        </div>
      </div>


      {/* Cast */}
      <div className="cast-details">
        <div className="cast">
        <h1>Cast</h1>
        </div>
        {credits.slice(0, 10).map((credit) => (
          <Link style={{ textDecoration: 'none' ,color:"white"}}  to={`/person/${credit.id}`}  >
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

      {/* <video className="video" 
      autoplay
      controls
      
      >
        <source src="https://uppom.net/m99uzb4z8ve0/Deliler_2018.1080p.WEB-DL.MyCima.actor.mp4.html?Key=b8KNMyd6pQMsSL9IWiBpgw&Expires=1631346040" type="video/mp4" />
      </video> */}

{/*  
        <iframe title="My Daily Marathon Tracker" 
        name="watch" id="IframeEmbed" height="100%" width="100%"
         allowfullscreen="" frameborder="0" scrolling="no" __idm_frm__="49" 
         __idm_id__="324447233" 
         src="https://mycima.actor:2083/run/39299e83a30fbaed555335fb7adb8bad9572a8d0d42bdd18fca121bc87250c19ab72877116e2af2cf2a014862473615656732efda1f73282ea85c904eadaf38e3fc341cdbc3dbfa1419d2e2e1e32e69f2546c691b1be97c5a820478e9d5466e974125e/?Key=AyxzyTcL0C1UYTSAkSJLLg&Expires=1631346035">
          </iframe> */}



      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      <div className="details__fadeBottomm"></div>
    </div>
  );
}

export default MovieDetail;
