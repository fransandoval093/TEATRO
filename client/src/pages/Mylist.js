"++++++++++++++++++++++++++++++++++++++++++++++++"
// MATCHUPS
// COMPONENTS
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { DELETE_MATCHUP } from '../utils/mutations'

import "../App.css";
// import Row from "./Row";
// import requests from "./requests";
import Banner from "./Banner";

const Mylist = () => {

  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const [deleteMe, { error }] = useMutation(DELETE_MATCHUP);

  const matchupList = data?.matchups || [];
  console.table(matchupList);

  return (

    <div className="App">
      <Banner />
      {/* Link to List.js */}
      <div className="card-header bg-dark text-center">
        <h1>Project Home</h1>
        <h1>Welcome to Movie Matchup!</h1>
      </div>
      <Link to={'./list'}>
        <button className="btn btn-md btn-warning" variant="raised">
          My List
        </button>
      </Link>

      <Link to={'./foobar'}>
        <button className="btn btn-md btn-danger" variant="raised">
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

    </div>
  );

};


export default Mylist;