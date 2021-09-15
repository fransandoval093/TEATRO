"++++++++++++++++++++++++++++++++++++++++++++++++";
// MATCHUPS
// COMPONENTS
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MATCHUPS } from "../utils/queries";
import { DELETE_MATCHUP } from "../utils/mutations";
import React, { useEffect, useRef } from "react";
import anime from 'animejs';
import "../App.css";
import requests from "./requests";
import Banner from "./Banner";
import Row from "./Row";
import TvRow from "./TvRow";
import gsap, {TweenMax ,Expo, } from 'gsap';
// import Marquee from "react-fast-marquee";




const Home = () => {
  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache",
  });

  const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

  const matchupList = data?.matchups || [];
  console.table(matchupList);

  let box = useRef(null);
  useEffect(() => {
    TweenMax.to(box, 12.4, {
      y: "-100%",
      display:"none",
      ease: Expo.easeInOut,
    });
    TweenMax.to(".color_red1", 8.4, {
      y: "70%",
      height:"100px",
      display:"none",
      ease: Expo.easeInOut,
    });
    TweenMax.to(".color_red2", 7.2, {
      y: "40%",
      height:"400px",
      display:"none",
      ease: Expo.easeInOut,
    });
    TweenMax.to(".color_red3", 5.8, {
      y: "50%",
      height:"200px",
      display:"none",
      ease: Expo.easeInOut,
    });
    TweenMax.to(".color_red4", 6.8, {
      y: "10%",
      height:"300px",
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
      duration: 2000,
      delay: (el, i) => 1000 + 60 * i,
    });
  });
  return (
    <div className="home__page">
            <div>
        <div className="intro_animation" ref={el => box = el}>
          <div className="color">
        <div className="color_red1"></div>
        <div className="color_white"></div>
        <div className="color_red2"></div>
        <div className="color_white"></div>
        <div className="color_red3"></div>
        <div className="color_red4"></div>
        </div>
          <h1 className="name_logo" >
            <span className="letter black" >T</span>
            <span className="letter black" >E</span>
            <span className="letter black" >A</span>
            <span className="letter" > T</span>
            <span className="letter" >R</span>
            <span className="letter" >O</span>
            
          </h1>
          

        
        </div>
      </div>
      <Banner />
      
        <Row
          title="Movie Trending"
          fetchUrlMovie={requests.fetchMovieTrending}
          isLargeRow
        />
        <TvRow
          title="Tv Trending"
          fetchUrlTv={requests.fetchTvTrending}
          isLargeRow
        />
        <Row title="Up Coming" fetchUrlMovie={requests.fetchUpcoming} />
        {/* <TvRow title="Tv Latest" fetchUrlTv={requests.fetchTvLatest} />
      <Row title="TopRated" fetchUrlMovie={requests.fetchActionMovies} />
      <Row title="Action Movies" fetchUrlMovie={requests.fetchTopRated} /> */}
      
    </div>
  );
};

export default Home;
