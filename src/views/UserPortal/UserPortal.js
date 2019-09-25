import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Load, Tabs } from '../../components';
import { withFirebase } from '../../components/Firebase';
import history from '../../history';

const getMyLeagues = (userLeagues, stateLeagues) => {
  return userLeagues && userLeagues.map(leagueId => {
    return stateLeagues[leagueId] ? (
      <div
        key={leagueId}
        className="hoverable-text"
        onClick={() => history.push(`/leagues/${leagueId}`)}
      >
        {stateLeagues[leagueId].name}
      </div>
    ) : null
  })
}

const UserPortal = ({ firebase, leagues, match, users }) => {
  const [loading, setLoading] = useState(true);
  const user = users[match.params.userId];

  useEffect(() => {
    const getUser = async () => {
      const user = await firebase.getAndSetUserById(match.params.userId);
      await firebase.getLeagues(user.memberOfLeagues, leagues);
    }
    try {
      getUser();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [match.params.userId, leagues, firebase])

  return (
    <div id="user-portal">
      <Load loading={loading} />
      {
        !!user && user.displayName
          ? (
            <React.Fragment>
              <div className="portal-header">
                <div className="page-header">{user.displayName}</div>
              </div>
              <Tabs
                className="user-portal-body"
                defaultActiveTab='My Leagues'
                views={{ 'My Leagues': getMyLeagues(user.memberOfLeagues, leagues) }}
              />
            </React.Fragment>
          )
          : null
      }
    </div>
  )
}

const mapState = state => ({
  users: state.users,
  leagues: state.leagues
})

export default connect(mapState, null)(withFirebase(UserPortal));