import axios from "./axios";
import React, { useState, useEffect, useRef } from "react";
import requests from "./requests";
import "./Banner.css";
import gsap, { TweenMax, Expo } from "gsap";
import anime from 'animejs';
// import Rating from "react-rating";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  let tl = gsap.timeline({ defaults: { ease: "SlowMo.easeOut" } });
  let background = useRef(null);
  let title = useRef(null);
  let button1 = useRef(null);
  let button = useRef(null);
  let description = useRef(null);
  let stars = useRef(null);
  const [movie, setMovie] = useState([]);

  let box = useRef(null);
  // let Logo = useRef(null);

  useEffect(() => {
    TweenMax.to(box, 3.4, {
      delay: 1,
      x: "100%",
      
      display:"none",
      ease: Expo.easeInOut,
    });
    // TweenMax.from(Logo, 3, {
    //   left: "-140%",
    //   ease: Expo.easeInOut,
    //   delay: 3.4,
    // });
    anime.timeline().add({
      targets: ".letter",
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 500,
      delay: (el, i) => 500 + 60 * i,
    });

    tl.to(
      background,
      2,
      {
        opacity: 1,

        ease: Expo.easeInOut,
      },
      "-=1"
    );
    tl.to(
      title,
      3,
      {
        y: "10",
        opacity: 1,

        ease: Expo.easeInOut,
      },
      "-=2"
    );
    tl.to(button, 3, {
      y: "-10",
      opacity: 1,

      ease: Expo.easeInOut,
    });
    tl.to(
      button1,
      3,
      {
        y: "-10",
        opacity: 1,

        ease: Expo.easeInOut,
      },
      "-=3"
    );
    tl.to(
      description,
      3,
      {
        y: "-10",
        opacity: 1,

        ease: Expo.easeInOut,
      },
      "-=4"
    );
    tl.to(
      stars,
      3,
      {
        y: "-10",
        opacity: 1,

        ease: Expo.easeInOut,
      },
      "-=5"
    );
  });
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
    return str?.length > n ? str.slice(0, 4) + "" : str;
  }

  return (
    <header
      className="banner"
      ref={(el) => (background = el)}
      style={{
        background: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div>
        <div className="intro_animation" ref={el => box = el}>
          <h1 className="name_logo" >
            <span className="letter" >T</span>
            <span className="letter" >E</span>
            <span className="letter" >A</span>
            <span className="letter" >T</span>
            <span className="letter" >R</span>
            <span className="letter" >O</span>
            
          </h1>

        </div>
      </div>
      <div className="all-details">
        <div className="banner__contents">
          <h1 className="banner__title" ref={(el) => (title = el)}>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="start__details" ref={(el) => (stars = el)}>
            <div className="reviews">
              <h1 className="banner_stars">
                {/* <Rating readonly stop="5"  initialRating={Math.floor(movie?.vote_average /2)} /> */}
              </h1>
              <h1>{Math.floor(movie?.vote_average / 2)}</h1>
              <h1>{movie?.vote_count} Reviews</h1>
              <h1>{year(movie.release_date, 4)}</h1>
            </div>
          </div>
        </div>

        <h1 className="banner__description" ref={(el) => (description = el)}>
          {truncate(movie?.overview, 250)}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" ref={(el) => (button1 = el)}>
            Play
          </button>
          <button className="banner__button" ref={(el) => (button = el)}>
            My List
          </button>
        </div>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
