"++++++++++++++++++++++++++++++++++++++++++++++++"
// MATCHUPS
// COMPONENTS
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { DELETE_MATCHUP } from '../utils/mutations'

import React, { useEffect, useRef } from "react";
import "../App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import TvRow from "./TvRow";
import gsap, {TweenMax ,Expo, } from 'gsap';
import Marquee from "react-fast-marquee";

const Home = () => {

  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

  const matchupList = data?.matchups || [];
  console.table(matchupList);

  return (
<div className="home__page">

      <Banner />
      <Row title="Movie Trending" fetchUrlMovie={requests.fetchMovieTrending} isLargeRow />
      <TvRow title="Tv Trending" fetchUrlTv={requests.fetchTvTrending} isLargeRow />
      <Row title="Up Coming" fetchUrlMovie={requests.fetchUpcoming} />
      <TvRow title="Tv Latest" fetchUrlTv={requests.fetchTvLatest} />
      <Row title="TopRated" fetchUrlMovie={requests.fetchActionMovies} />
      <Row title="Action Movies" fetchUrlMovie={requests.fetchTopRated} />
    </div>
  );

};


export default Home;