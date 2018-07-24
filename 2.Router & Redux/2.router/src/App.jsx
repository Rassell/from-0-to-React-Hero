import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import HeroesContainer from './containers/HeroesContainer';
import HeroDetailsContainer from './containers/HeroDetailsContainer';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HeroesContainer} />
      <Route path="/details/:id" component={HeroDetailsContainer} />
      <Redirect from="/*" to="/" />
    </Switch>
  </Router>
);

export default hot(module)(App);
