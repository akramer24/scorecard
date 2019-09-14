import React from 'react';
import { Button, Input, Select } from '../../components';

// Keys must match name attributes of Input fields
const initialCreateLeagueFormState = {
  name: '',
  sport: '',
  season: ''
};

const getFormState = path => {
  if (path === '/create-league') {
    return initialCreateLeagueFormState;
  }
}

const getFormContent = (path, inputs, handleChange) => {
  const createLeagueForm = [[
    <Input
      name="name"
      value={inputs.name}
      onChange={handleChange}
      type="text"
      placeholder="League name"
    // label="League name"
    />,
    <Select
      name="sport"
      value={inputs.sport}
      onChange={handleChange}
      choices={['Baseball', 'Basketball']}
      placeholder="Sport"
    // label="Sport"
    />,
    <Select
      name="season"
      value={inputs.season}
      onChange={handleChange}
      choices={['2019', '2019-20']}
      placeholder="Season"
    // label="Season"
    />,
    <Button>Next</Button>
  ]]

  if (path === '/create-league') {
    return createLeagueForm;
  }
}

const getFormSubmitCallback = path => {
  if (path === '/create-league') {
    return () => { }
  }
}

export {
  getFormState,
  getFormContent,
  getFormSubmitCallback
}