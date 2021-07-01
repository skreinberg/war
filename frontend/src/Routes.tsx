import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './views/Game';

import Home from './views/Home';
import User from './views/User';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route component={Home} exact path='/' />
        <Route component={User} exact path='/user' />
        <Route component={Game} exact path='/game/:id' />
      </Switch>
    );
  }
}

export default Routes;
