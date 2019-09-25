import React, { useEffect, useState } from 'react';

const withTeam = View => props => {
  const { firebase, teams, match, user } = props;
  const [loading, setLoading] = useState(true);
  const team = teams[match.params.teamId];

  useEffect(() => {
    const fetchTeam = async () => {
      const team =
        teams[match.params.teamId]
          ? teams[match.params.teamId]
          : await firebase.getTeamById(match.params.teamId);
      await firebase.getUsers(team.members);
      if (user && (team.admins.includes(user.uid) || team.members.includes(user.uid))) {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [user, teams, match.params.teamId, firebase])
  return (
    <View team={team} loading={loading} {...props} />
  )
}

export default withTeam;