import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Routes } from './components';

const choices = [
  { value: 'Create league', onClick: () => { } },
  { value: 'Join league', onClick: () => { } },
]

const App = ({ user }) => (
  <React.Fragment>
    {
      !!user
        ? (
          <div id="header">
            <Dropdown choices={choices} icon="FaBars" />
            <div id="header-text">Scorecard</div>
          </div>
        )
        : null
    }
    <Routes />
  </React.Fragment>
)

const mapState = state => ({
  user: state.auth.user
})

export default connect(mapState, null)(App);
