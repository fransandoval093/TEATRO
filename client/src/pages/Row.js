import React, { useState, useEffect, useRef } from "react";
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";
import { Link } from "react-router-dom";
import gsap, {TweenMax ,Expo, } from 'gsap';



const base_url = "https://image.tmdb.org/t/p/original/";


function Row({title, fetchUrlMovie, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // const [tvs, setTvs] = useState([]);
  // const [trailerUrl, setTrailerUrl] = useState("");
  let tl = gsap.timeline({defaults: {ease: "SlowMo.easeOut"}})
  let imgs = useRef(null)
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrlMovie);
      setMovies(request.data.results);
      return request;
    }
    console.log(fetchUrlMovie);
    fetchData();
  }, [fetchUrlMovie]);
  
  // useEffect(() => {
  //   async function fetchTv() {
  //     const request = await axios.get(fetchUrlTv);
  //     setTvs(request.data.results);
  //     return request;
  //   }
  //   console.log(fetchUrlTv);
  //   fetchTv();
  // }, [fetchUrlTv]);


  useEffect(() =>{
    
    gsap.from(
      imgs,
      {
          opacity: 1,
          stagger:1.2,
          scale: 1.1,
          delay: 2,
          duration:3,
      }
     
    );
  })


  // const opts = {
  //   height: "390",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };
  return (

    <div className="row">
      {/* {Title} */}
      <h2 className="title" >{title}</h2>
      
      {/* {Container -> Posters} */}
      
      <div className="row__posters" ref={el => imgs = el}>
      
        {movies.map((movie) => (
          <Link style={{ textDecoration: 'none' ,color:"white"}}  to={`/movie/${movie.id}`}  >
            
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
    
  );
}

export default Row;
