import React, { useState } from 'react';
import { Button, Input, Select } from '../index';
import useForm from '../../hooks/useForm';
import { getFormState, getFormContent, getFormSubmitCallback } from '../utils/forms';

const Form = (props) => {
  const [error, setError] = useState('');

  const initialState = getFormState(props.match.path);
  const submitCallback = getFormSubmitCallback(props.match.path);

  const { inputs, handleSubmit, handleChange } = useForm(submitCallback, initialState);
  // const content = getFormContent(props.match.path, inputs, handleChange);
  const content = [[
    <Input
      name="name"
      value={inputs.name}
      onChange={handleChange}
      type="text"
      placeholder="League name"
      label="League name"
    />,
    <Select
      name="sport"
      value={inputs.sport}
      onChange={handleChange}
      choices={['Baseball', 'Basketball']}
      placeholder="Sport"
      label="Sport"
    />,
    <Select
      name="season"
      value={inputs.season}
      onChange={handleChange}
      choices={['2019', '2019-20']}
      placeholder="Season"
      label="Season"
    />,
    <Button onClick={() => console.log(inputs)}>Next</Button>
  ]]

  return (
    <div>hi</div>
  );
}

export default Form;