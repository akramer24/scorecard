import React from 'react';
import { connect } from 'react-redux';
import { Load } from '../../components';
import { Auth } from '../index';
import { withFirebase } from '../../components/Firebase';

const Home = ({ attemptedLoadUser, location, user }) => {
  return (
    <div id="home">
      <Load loading={!attemptedLoadUser} />
      {
        user
          ? (
            <div id="home-user">
              <span id="home-user-welcome">Welcome, {user.displayName}</span>
            </div>
          )
          : attemptedLoadUser
            ? <Auth location={location} />
            : null
      }
    </div>
  )
}

const mapState = state => ({
  user: state.auth.user,
  attemptedLoadUser: state.auth.attemptedLoadUser
});

export default connect(mapState, null)(withFirebase(Home));