import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';

import store, { history } from './store';
import HeroesContainer from './containers/HeroesContainer';
import HeroDetailsContainer from './containers/HeroDetailsContainer';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HeroesContainer} />
        <Route path="/details/:name" component={HeroDetailsContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
