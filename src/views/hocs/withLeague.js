import React, { useEffect, useState } from 'react';

const withLeague = View => props => {
  const { firebase, leagues, match, user } = props;
  const [loading, setLoading] = useState(true);
  const league = leagues[match.params.leagueId];

  useEffect(() => {
    const fetchLeague = async () => {
      const league =
        leagues[match.params.leagueId]
          ? leagues[match.params.leagueId]
          : await firebase.getLeagueById(match.params.leagueId)
      if (user && (league.admins.includes(user.uid) || league.members.includes(user.uid))) {
        setLoading(false);
      }
    };
    fetchLeague();
  }, [user, leagues, match.params.leagueId, firebase])
  return (
    <View league={league} loading={loading} {...props} />
  )
}

export default withLeague;