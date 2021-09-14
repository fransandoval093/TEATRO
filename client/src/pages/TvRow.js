import React, { useState, useEffect, useRef } from "react";

import axios from "./axios";
import "./Row.css";
import { Link } from "react-router-dom";
import gsap, {TweenMax ,Expo, } from 'gsap';
const base_url = "https://image.tmdb.org/t/p/original/";


function TvRow({title, fetchUrlTv, isLargeRow}) {
    const [tvs, setTvs] = useState([]);
  // const [tvs, setTvs] = useState([]);
  // const [trailerUrl, setTrailerUrl] = useState("");
  let tl = gsap.timeline({defaults: {ease: "SlowMo.easeOut"}})
  let imgs = useRef(null)
  useEffect(() => {
    async function fetchTv() {
      const request = await axios.get(fetchUrlTv);
      setTvs(request.data.results);
      return request;
    }
    console.log(fetchUrlTv);
    fetchTv();
  }, [fetchUrlTv]);
  
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

  // const handleClick = (tv) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(tv?.name || tv?.title || tv?.original_name || "")
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
      
        {tvs.map((tv) => (
          <Link to={`/tv/${tv.id}`}  >
            
            <div className="poster" >
            <img
              key={tv.id}
              
              // onClick={() => handleClick(tv)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? tv.poster_path : tv.backdrop_path
              }`}
              alt={tv.name}
              
            />
            <div className="onhover" >
            <h1>{tv.title}</h1>
            <h1>{tv.overview}</h1>
            </div>
            

            </div>
            
          </Link>
        )
        )}
        
        
      </div>
      
      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </div>
    
  );

}

export default TvRow
