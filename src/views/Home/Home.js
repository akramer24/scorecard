import React from 'react';
import { connect } from 'react-redux';
import { Auth } from '../index';
import { withFirebase } from '../../components/Firebase';

const Home = ({ firebase, user }) => {
  return (
    <div id="home">
      {
        user
          ? (
            <div id="home-user">
              <span id="home-user-welcome">Welcome, {user.displayName}</span>
              <button onClick={firebase.doSignOut}>Sign out</button>
            </div>
          )
          : <Auth />
      }
    </div>
  )
}

const mapState = state => ({
  user: state.auth.user
});

export default connect(mapState, null)(withFirebase(Home));