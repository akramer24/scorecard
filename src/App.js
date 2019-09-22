import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from './components';
import { withFirebase } from './components/Firebase';
import { Routes } from './views';
import history from './history';

const App = ({ firebase, user }) => {
  const choices = [
    { value: 'Create league', onClick: () => { history.push('/create-league') } },
  ]
  user && choices.push({
    value: 'Sign out', onClick: () => {
      firebase.doSignOut();
    }
  })
  return (
    <React.Fragment>
      {
        !!user
          ? (
            <div id="header">
              <Dropdown choices={choices} icon="FaBars" />
              <div id="header-text" onClick={() => history.push('/')}>Scorecard</div>
            </div>
          )
          : null
      }
      <Routes />
    </React.Fragment>
  )
}

const mapState = state => ({
  user: state.auth.user
})

export default connect(mapState, null)(withFirebase(App));
