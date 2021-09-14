import axios from "./axios";
import React, { useState, useEffect, useRef } from "react";
import requests from "./requests";
import "./Banner.css";
import gsap, {TweenMax ,Expo, } from 'gsap';
import Marquee from "react-fast-marquee";
// import Rating from "react-rating";


const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  let tl = gsap.timeline({defaults: {ease: "SlowMo.easeOut"}})
  let background = useRef(null);
  let title = useRef(null);
  let button1 = useRef(null);
  let button = useRef(null);
  let description = useRef(null);
  let stars = useRef(null);
  const [movie, setMovie] = useState([]);
  
  let box = useRef(null)



  useEffect(() =>{
    TweenMax.to(
      box, 2.4,
      {
        delay: 0,
        top: "-100%",
        ease: Expo.easeInOut
      },
      
    );

    tl.to(background, 1,{
      
      opacity: 1,
      
      ease: Expo.easeInOut,
    },"-=1");
    tl.to(title, 1,{
      y: "10",
      opacity: 1,
      
      ease: Expo.easeInOut,
    },"-=1");
    tl.to(button, 1,{
      y: "-10",
      opacity: 1,
      
      ease: Expo.easeInOut,
    });
    tl.to(button1, 1,{
      y: "-10",
      opacity: 1,
      
      ease: Expo.easeInOut,
    }, "-=1");
    tl.to(description, 1,{
      y: "-10",
      opacity: 1,
      
      ease: Expo.easeInOut,
    }, "-=1");
    tl.to(stars, 2,{
      y: "-10",
      opacity: 1,
      
      ease: Expo.easeInOut,
    }, "-=1");

   
  })
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      console.log("+++");
      console.log(request);
      console.log("+++");
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function year(str, n) {
    return str?.length > n ? str.slice(0,  4) + "" : str;
  }

  return (
    <header
      className="banner"
      ref={el => background = el}
      style={{
        background: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div>
      <div className="intro_animation" ref={el => box  = el}>
        <h1 className="name_logo">TEATRO</h1>
        <Marquee   speed="30"  direction="left" gradientColor= "[255, 255, 255]">
       <h1 className="text_scroll1" > TEATRO TEATRO TEATRO</h1>
       </Marquee>
       <Marquee  speed="80" direction="right" gradientColor= "[255, 255, 255]">
       <h1 className="text_scroll2" >TEATRO TEATRO TEATRO</h1>
       </Marquee>
       <Marquee  speed="50"  direction="left" gradientColor= "[255, 255, 255]">
       <h1 className="text_scroll3" >TEATRO TEATRO TEATRO</h1>
       </Marquee>
       <Marquee  speed="150" direction="right" gradientColor= "[255, 255, 255]">
       <h1 className="text_scroll4" >TEATRO TEATRO TEATRO</h1>
       </Marquee>
      </div>
      </div>
      <div className="all-details">
        <div className="banner__contents">
          <h1 className="banner__title" ref={el => title = el}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="start__details"  ref={el => stars = el}>
            <div className="reviews">
            <h1 className="banner_stars">
              
            {/* <Rating readonly stop="5"  initialRating={Math.floor(movie?.vote_average /2)} /> */}
              
            </h1>
            <h1>{Math.floor(movie?.vote_average /2)}</h1>
            <h1>{movie?.vote_count} Reviews</h1>
            <h1>{year(movie.release_date, 4)}</h1>
            
            </div>
            
          </div>
        </div>
         
        <h1 className="banner__description" ref={el => description = el}>
          {truncate(movie?.overview, 250)}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" ref={el => button1 = el}>Play</button>
          <button className="banner__button" ref={el => button = el}>My List</button>
        </div>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
