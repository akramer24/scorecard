import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Load } from '../../components';
import { withFirebase } from '../../components/Firebase';

const LeaguePortal = ({ firebase, match, user }) => {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeague = async () => {
      const league = await firebase.getLeagueById(match.params.leagueId);
      if (user && (league.admins.includes(user.uid) || league.members.includes(user.uid))) {
        setLeague(league);
        setLoading(false);
      }
    };
    fetchLeague();
  }, [user])

  return (
    <div id="league-portal">
      <Load loading={loading} />
      {
        league
          ? (
            <div className="league-portal-header">
              <div className="page-header">{league.name}</div>
              <div>{league.year}</div>
            </div>
          )
          : null
      }
    </div>
  )
}

const mapState = state => ({
  user: state.auth.user
})

export default connect(mapState, null)(withFirebase(LeaguePortal));