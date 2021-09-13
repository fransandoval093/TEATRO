import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { DELETE_MATCHUP } from '../utils/mutations';


import "../App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";


const { loading, data } = useQuery(QUERY_MATCHUPS, {
  fetchPolicy: "no-cache"
});

const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

const matchupList = data?.matchups || [];
console.table(matchupList);

class Home extends Component {

  render() {

    // ROW CAN BE CREATED HERE
    return (
      < div className="App" >
        <Banner></Banner>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
        <Row title="Up Coming" fetchUrl={requests.fetchUpcoming} />
        <Row title="Tv Latest" fetchUrl={requests.fetchTvLatest} />
        <Row title="TopRated" fetchUrl={requests.fetchActionMovies} />
        <Row title="Action Movies" fetchUrl={requests.fetchTopRated} />

        {/* Link to List.js */}
        <h1>Project Home</h1>
        <Link to={'./list'}>
          <button variant="raised">
            My List
          </button>
        </Link>

        <Link to={'./foobar'}>
          <button variant="raised">
            FOOBAR
          </button>
        </Link>

        <div className="card bg-white card-rounded w-50">
          <div className="card-header bg-dark text-center">
            <h1>Welcome to Movie Matchup!</h1>
          </div>
          <div className="card-body m-5">
            <h2>Here is a list of movie matchups you can vote on:</h2>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="square">
                {matchupList.map((matchup) => {
                  return (
                    <li key={matchup._id}>
                      <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                        {matchup.tech1} vs. {matchup.tech2}
                      </Link>
                      <button onClick={(e) => deleteMe({ variables: { id: matchup._id } })}>Dealete Row</button>
                      {/* <button onClick={(e) => {console.log(matchup._id)}}>Delete Row</button> */}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="card-footer text-center m-3">
            <h2>Ready to create a new matchup?</h2>
            <div>
              <Link to="/matchup">
                <button className="btn btn-lg btn-danger">Create Matchup HOME!</button>
              </Link>
              {error && <div>Something went wrong...</div>}
            </div>

          </div>
        </div>

      </div >
    );
  }
}
export default Home;
