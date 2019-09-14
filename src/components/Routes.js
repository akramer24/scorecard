import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, Form } from './index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/create-league" component={Form} />
  </Switch>
)

export default withRouter(Routes);