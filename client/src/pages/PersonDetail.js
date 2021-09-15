import React, { useEffect, useState } from "react";
import "./PersonDetail.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
// import Rating from "react-rating";
import { Link } from "react-router-dom";

// fast.replaceAll(" ", "-")
// fast.replace(/['"]+/g,'')
// fast.slice(0, 4)

const base_url = "https://image.tmdb.org/t/p/original/";

function PersonDetail({ match }) {
  useEffect(() => {
    fetchCredits();
    fetchMovies();
    fetchTv();
    console.log(match.params.id);
  }, [match]);

  const [credits, setCredits] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  const fetchCredits = async () => {
    const fetchCredits = await fetch(
      `
      
  https://api.themoviedb.org/3/person/${match.params.id}?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US
     `
    );

    const credits = await fetchCredits.json();
    setCredits(credits);
    console.log(credits);
  };

  const fetchMovies = async () => {
    const fetchMovies = await fetch(
      `
      
https://api.themoviedb.org/3/person/${match.params.id}/movie_credits?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US
     `
    );

    const movies = await fetchMovies.json();
    setMovies(movies.cast);
    console.log(movies);
  };
  const fetchTv = async () => {
    const fetchTv = await fetch(
      `
      
https://api.themoviedb.org/3/person/${match.params.id}/tv_credits?api_key=d42525da8940f7a7a298e98a209ec951&language=en-US
     `
    );

    const tvs = await fetchTv.json();
    setTvs(tvs.cast);
    console.log(tvs);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  function year(str, n) {
    return str?.length > n ? str.slice(0, 4) + "" : str;
  }
  // function name(str, n) {
  //   return str?.length > n ? str.replace(/['"]+/g,'')+ "" : str;
  // }

  return (
    <div className="person__details">
      <div className="person__poster">
        <div>
          <img
            style={{
              background: "cover",
              backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${credits?.profile_path}"
        )`,
              backgroundPosition: "top center",
            }}
            className="large__poster__person"
            src={`${base_url}${credits.profile_path || credits.poster_path}`}
            alt={credits.name}
          />
        </div>
        <div className="poster__info">
          <h1>{credits?.name}</h1>
          <h1 className="person__description">{truncate(credits.biography)}</h1>

          <h1>Born {credits.birthday}</h1>
          <h1>Known As: {credits.known_for_department}</h1>
          <h1>Place of Birth: {credits.place_of_birth}</h1>
        </div>
      </div>
      <div className="person_movie_list">
        <div className="person_movie_list_search">
        <h1>Movies</h1>
      {movies.map((movie) => (
           <Link style={{ textDecoration: 'none' ,color:"white"}}  to={`/movie/${movie.id}`}  >
          <div className="person__row__cast">
            <div className="person__img__cast">
            
              <img
                key={movie.id}
                // onClick={() => handleClick(movie)}
                className="person__img__actor"
                src={`${base_url}${movie.backdrop_path || movie.poster_path || "" }`}
                alt={movie.name}
              />
            </div>
            <h1>{movie.original_title}</h1>
           
                        
          </div>
          </Link>
        ))}
        </div>
        <div className="person_tv_list_search">
        <h1>TV</h1>
        {tvs.map((tv) => (
           <Link style={{ textDecoration: 'none' ,color:"white"}}  to={`/tv/${tv.id}`}  >
          <div className="person__row__cast">
            <div className="person__img__cast">
            
              <img
                key={tv.id}
                // onClick={() => handleClick(movie)}
                className="person__img__actor"
                src={`${base_url}${tv.backdrop_path || tv.poster_path || null}`}
                alt={tv.name}
              />
            </div>
            <h1>{tv.original_title}</h1>
           
                        
          </div>
          </Link>
        ))}
        </div>

      
      </div>
    </div>
  );
}

export default PersonDetail;
