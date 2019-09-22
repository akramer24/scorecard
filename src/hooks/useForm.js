import { useState } from 'react';

const useForm = (submitCallback, initialState, location) => {
  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = async evt => {
    try {
      evt && evt.preventDefault();
      await submitCallback({ ...inputs, location });
    } catch (err) {
      console.log('err');
    }
  };

  const handleChange = evt => {
    evt.persist();
    setInputs({ ...inputs, [evt.target.name]: evt.target.value });
  }

  return {
    inputs,
    handleSubmit,
    handleChange,
  }
}

export default useForm;