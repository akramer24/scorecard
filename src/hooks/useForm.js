import { useState } from 'react';

const useForm = (submitCallback, initialState) => {
  const [inputs, setInputs] = useState(initialState);

  const handleSubmit = async evt => {
    try {
      evt && evt.preventDefault();
      await submitCallback(inputs);
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