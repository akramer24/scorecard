import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Load } from '../../components';
import { withFirebase } from '../../components/Firebase';

const UserPortal = ({ authUser, firebase, leagues, match, user }) => {
  const [loading, setLoading] = useState(true);

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
  }, [match.params.userId])

  return (
    <div id="user-portal">
      <Load loading={loading} />
      {
        user
          ? (
            <div className="user-portal-header">
              <div className="page-header">{user.displayName}</div>
              {
                user.memberOfLeagues && user.memberOfLeagues.map(leagueId => {
                  return leagues[leagueId] ? (
                    <div key={leagueId}>{leagues[leagueId].name}</div>
                  ) : null
                })
              }
            </div>
          )
          : null
      }
    </div>
  )
}

const mapState = state => ({
  authUser: state.auth.user,
  user: state.user,
  leagues: state.leagues
})

export default connect(mapState, null)(withFirebase(UserPortal));