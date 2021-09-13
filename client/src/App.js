import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Delete from './pages/Delete';
import Foobar from './pages/Foobar';
import Home from './pages/Home'; // REE and TEATRO
import List from './pages/List';
import LoginScreen from "./pages/HomeScreen/LoginScreen";
import Matchup from './pages/Matchup';
import MovieDetail from "./pages/MovieDetail";
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
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Switch>

            {/* BASE COMPONENTS */}
            <Route
              path="/details/:id"
              component={MovieDetail}
              fetchUrl={requests.fetchMovieDetails}
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