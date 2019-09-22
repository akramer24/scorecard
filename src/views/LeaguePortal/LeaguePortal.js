import React from 'react';
import { connect } from 'react-redux';
import { Button, Load, Tabs } from '../../components';
import withLeague from '../hocs/withLeague';
import history from '../../history';
import { withFirebase } from '../../components/Firebase';

const getLeagueTeams = (league, stateTeams, user) => {
  return league.teams
    ? league.teams.map(teamId => {
      return stateTeams[teamId]
        ? (
          <div
            key={teamId}
            onClick={() => history.push(`/leagues/${league.id}/teams/${teamId}`)}
          >
            {stateTeams[teamId].name}
          </div>
        )
        : null
    })
    : (
      <div className="league-portal-no-teams-container">
        <div>No teams in this league.</div>
        {
          user && league.admins && league.admins.includes(user.uid) &&
          <Button onClick={() => history.push(`/leagues/${league.id}/new-team`)}>Add team</Button>
        }
      </div>
    )
}

const LeaguePortal = ({ league, loading, stateTeams, user }) => {
  return (
    <div id="league-portal">
      <Load loading={loading} />
      {
        league
          ? (
            <React.Fragment>
              <div className="league-portal-header">
                <div className="page-header">{league.name}</div>
                <div>{league.year}</div>
              </div>
              <Tabs
                className="league-portal-body"
                views={{ 'Teams': getLeagueTeams(league, stateTeams, user) }}
              />
            </React.Fragment>
          )
          : null
      }
    </div>
  )
}

const mapState = state => ({
  user: state.auth.user,
  leagues: state.leagues,
  stateTeams: state.teams
})

export default connect(mapState, null)(withFirebase(withLeague(LeaguePortal)));