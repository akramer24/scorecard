import React from 'react';
import { connect } from 'react-redux';
import { Button, Load, Tabs } from '../../components';
import withTeam from '../hocs/withTeam';
import history from '../../history';
import { withFirebase } from '../../components/Firebase';

const getTeamPlayers = (team, statePlayers, league, user) => {
  return team.members
    ? team.members.map(playerId => {
      return statePlayers[playerId]
        ? (
          <div
            key={playerId}
            className="hoverable-text"
            onClick={() => history.push(`/users/${playerId}`)}
          >
            {statePlayers[playerId].displayName}
          </div>
        )
        : null
    })
    : (
      <div className="league-portal-no-teams-container">
        <div>No players on this team.</div>
        {
          user && team.admins && team.admins.includes(user.uid) &&
          <Button onClick={() => history.push(`/leagues/${league.id}/teams/${team.id}/new-player`)}>Add player</Button>
        }
      </div>
    )
}

const TeamPortal = ({ leagues, loading, match, players, team, user }) => {
  const league = leagues[match.params.leagueId];

  return (
    <div id="team-portal">
      <Load loading={loading} />
      {
        team
          ? (
            <React.Fragment>
              <div className="portal-header">
                <div className="page-header">{team.name}</div>
              </div>
              <Tabs
                className="team-portal-body"
                views={{ 'Players': getTeamPlayers(team, players, league, user) }}
              />
            </React.Fragment>
          )
          : null
      }
    </div>
  )
}

const mapState = state => ({
  leagues: state.leagues,
  players: state.users,
  teams: state.teams,
  user: state.auth.user,
})

export default connect(mapState, null)(withFirebase(withTeam(TeamPortal)));