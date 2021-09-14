import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Delete from './pages/Delete';
import Foobar from './pages/Foobar';
import Home from './pages/Home'; // REE and TEATRO
import List from './pages/List';
import MovieDetail from "./pages/MovieDetail";
import TvDetail from "./pages/TvDetail";
import PersonDetail from "./pages/PersonDetail";
import LoginScreen from "./pages/HomeScreen/LoginScreen";
import Matchup from './pages/Matchup';
import Mylist from "./pages/Mylist"; // BASE
import Nav from "./pages/Nav"; // BASE
import React from 'react';
import requests from "./pages/requests"; // BASE
import Signin from "./pages/Signin"; // BASE
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import "./App.css"; // BASE

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <LoginScreen />
        <Nav fetchUrl={requests.fetchSearch} />
        <div >
          <Switch>

            {/* BASE COMPONENTS */}
            <Route
              path="/movie/:id"
              component={MovieDetail}
              fetchUrlMovie={requests.fetchMovieDetails}
            />
            <Route
              path="/tv/:id"
              component={TvDetail}
              fetchUrlMovie={requests.fetchMovieDetails}
            />
            <Route
              path="/person/:id"
              component={PersonDetail}
              fetchUrlMovie={requests.fetchMovieDetails}
            />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signin" exact component={Signin} />
            <Route path="/mylist" exact component={Mylist} />
            {/* BASE END */}
            {/* MATCHUP COMPONENTS */}
            <Route exact path="/matchup/home">
              <Home />
            </Route>
            <Route exact path="/matchup">
              <Matchup />
            </Route>
            <Route exact path="/matchup/:id">
              <Vote />
            </Route>
            <Route exact path="/delete">
              <Delete />
            </Route>



            {/* REE COMPONENTS */}
            <Route exact path='/' component={Home} />
            <Route path='/list' component={List} />
            <Route path='/foobar' component={Foobar} />
            {/* REE END */}

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;