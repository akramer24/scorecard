import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import { Button, Card, Column, Load, Row, Tabs } from '../../components';
import withLeague from '../hocs/withLeague';
import history from '../../history';
import { withFirebase } from '../../components/Firebase';

const getLeagueTeams = (league, stateTeams, user) => {
  return (
    <React.Fragment>
      {

        league.teams
          ? league.teams.map(teamId => {
            return stateTeams[teamId]
              ? (
                <div
                  key={teamId}
                  className="hoverable-text"
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
            </div>
          )
      }
      {
        user && league.admins && league.admins.includes(user.uid) &&
        <Button onClick={() => history.push(`/leagues/${league.id}/new-team`)}>Add team</Button>
      }
    </React.Fragment>
  )
}

const getLeagueSchedule = (league, stateGames, user) => {
  // TODO: store games on league as schedule with date as key, array of gameIds as value
  // this way we can sort by date and display games by date instead of order in which
  // they were created/stored
  const sortedGameDates = league.schedule ? Object.keys(league.schedule).sort() : [];
  return (
    <React.Fragment>
      {
        sortedGameDates.length
          ? null
          : (
            <Column horizontalAlignment="center">
              <div>No games scheduled</div>
            </Column>
          )
      }
      {
        user && league.admins && league.admins.includes(user.uid) &&
        <Button onClick={() => history.push(`/leagues/${league.id}/add-game`)}>Add game</Button>
      }
      {
        sortedGameDates.map(date => {
          return (
            <Column key={date} className="league-portal-schedule" horizontalAlignment="center">
              <div className="date-header">
                {moment(new Date(date)).format('MMM D, YYYY')}
              </div>
              {
                league.schedule[date].map(gameId => {
                  return stateGames[gameId]
                    ? (
                      <Card
                        key={gameId}
                        className="league-schedule-game-container"
                        onClick={() => history.push(`/leagues/${league.id}/games/${gameId}`)}
                      >
                        <Column horizontalAlignment="center">
                          <div>{stateGames[gameId].time}</div>
                          <div>{stateGames[gameId].awayName}</div>
                          <div>@</div>
                          <div>{stateGames[gameId].homeName}</div>
                          <div className="small-text">{stateGames[gameId].location}</div>
                          <Row><Button size="small">Edit Details</Button><Button size="small">Box Score</Button></Row>
                        </Column>
                      </Card>
                    )
                    : null
                })
              }
            </Column>
          )
        })
      }
    </React.Fragment>
  )
}

const LeaguePortal = ({ league, loading, stateGames, stateTeams, user }) => {
  const views =
    league
      ? {
        Teams: getLeagueTeams(league, stateTeams, user),
        Schedule: getLeagueSchedule(league, stateGames, user)
      }
      : {};

  return (
    <div id="league-portal">
      <Load loading={loading} />
      {
        league
          ? (
            <React.Fragment>
              <div className="portal-header">
                <div className="header page-header">{league.name}</div>
                <div className="header">{league.year}</div>
              </div>
              <Tabs
                className="league-portal-body"
                views={views}
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
  stateTeams: state.teams,
  stateGames: state.games
})

export default connect(mapState, null)(withFirebase(withLeague(LeaguePortal)));