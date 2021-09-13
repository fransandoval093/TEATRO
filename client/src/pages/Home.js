"++++++++++++++++++++++++++++++++++++++++++++++++"
// MATCHUPS
// COMPONENTS
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { DELETE_MATCHUP } from '../utils/mutations'

import "../App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";

const Home = () => {

  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

  const matchupList = data?.matchups || [];
  console.table(matchupList);

  return (

    <div className="App">
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Up Coming" fetchUrl={requests.fetchUpcoming} />
      <Row title="Tv Latest" fetchUrl={requests.fetchTvLatest} />
      <Row title="TopRated" fetchUrl={requests.fetchActionMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchTopRated} />
    </div>
  );

};


export default Home;