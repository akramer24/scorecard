import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from './components';
import { withFirebase } from './components/Firebase';
import { Routes } from './views';
import history from './history';

const App = ({ firebase, authUser }) => {
  const mainChoices = [
    { value: 'Create league', onClick: () => { history.push('/create-league') } },
  ]

  const userChoices = [
    { value: 'My page', onClick: () => history.push(`/users/${authUser.uid}`) },
    { value: 'Sign out', onClick: () => firebase.doSignOut() }
  ]

  return (
    <React.Fragment>
      {
        !!authUser
          ? (
            <div id="header">
              <div id="header-left">
                <Dropdown choices={mainChoices} icon="FaBars" />
                <div id="header-text" onClick={() => history.push('/')}>Scorecard</div>
              </div>
              <Dropdown choices={userChoices} icon="FaUser" align='right' />
            </div>
          )
          : null
      }
      <Routes />
    </React.Fragment>
  )
}

const mapState = state => ({
  authUser: state.auth.user
})

export default connect(mapState, null)(withFirebase(App));
