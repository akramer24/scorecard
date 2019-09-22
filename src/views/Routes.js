import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, CreateLeague, LeaguePortal, UserPortal } from '.';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/create-league" component={CreateLeague} />
    <Route exact path="/leagues/:leagueId" component={LeaguePortal} />
    <Route exact path="/users/:userId" component={UserPortal} />
  </Switch>
)

export default withRouter(Routes);