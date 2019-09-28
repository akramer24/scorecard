import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, CreateGame, CreateLeague, CreateTeam, LeaguePortal, TeamPortal, UserPortal } from '.';

const Routes = ({ authUser }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    {
      !!authUser
        ? (
          <React.Fragment>
            <Route exact path="/create-league" component={CreateLeague} />
            <Route exact path="/leagues/:leagueId" component={LeaguePortal} />
            <Route exact path="/leagues/:leagueId/add-game" component={CreateGame} />
            <Route exact path="/leagues/:leagueId/teams/:teamId" component={TeamPortal} />
            <Route exact path="/leagues/:leagueId/new-team" component={CreateTeam} />
            <Route exact path="/users/:userId" component={UserPortal} />
          </React.Fragment>
        )
        : null
    }
    <Route component={Home} />
  </Switch>
)

const mapState = state => ({
  authUser: state.auth.user
})

export default connect(mapState)(withRouter(Routes));