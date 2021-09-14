
import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";
import { Link } from "react-router-dom";
import gsap, {TweenMax ,Expo, } from 'gsap';
const base_url = "https://image.tmdb.org/t/p/original/";


function SimilarMovie({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    let imgs = useRef(null)
    useEffect(() => {
        async function fetchData() {
          const request = await axios.get(fetchUrl);
          setMovies(request.data.results);
          return request;
        }
        console.log(fetchUrl);
        fetchData();
      }, [fetchUrl]);
      
    return (
        <div className="row">
      {/* {Title} */}
      <h2 className="title" >{title}</h2>
      
      {/* {Container -> Posters} */}
      
      <div className="row__posters" ref={el => imgs = el}>
      
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}  >
            
            <div className="poster" >
            <img
              key={movie.id}
              
              // onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              
            />
            
            <div className="onhover" >
            <h1>{movie.title}</h1>
            <h1>{movie.overview}</h1>
            <h1>{movie.media_type}</h1>
            </div>
            

            </div>
            
          </Link>
        )
        )}
        {/* {tvs.map((movie) => (
          <Link to={`/details/${movie.id}`}  >
            
            <div className="poster" >
            <img
              key={movie.id}
              
              // onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              
            />
            <div className="onhover" >
            <h1>{movie.title}</h1>
            <h1>{movie.overview}</h1>
            </div>
            

            </div>
            
          </Link>
        )
        )} */}
        
      </div>
      
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
    )
}

export default SimilarMovie
