import axios from "./axios";
import React, { useState, useEffect, useRef } from "react";
import requests from "./requests";
import "./Banner.css";
import gsap, {Expo} from 'gsap';
// import gsap, {TweenMax,Expo, } from 'gsap';

function Banner() {
  let tl = gsap.timeline({defaults: {ease: "SlowMo.easeOut"}})
  let title = useRef(null);
  const [movie, setMovie] = useState([]);
  useEffect(() =>{
    tl.to(title, 3,{
      x: "50",
      opacity: 1,
      scale: "1.2",
      ease: Expo.easeInOut,
    });
   
  })
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      console.log(request);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        background: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "top center",
      }}
    >
      <div className="all-details">
        <div className="banner__contents">
          <h1 className="banner__title" ref={el => title = el}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div>
         
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
