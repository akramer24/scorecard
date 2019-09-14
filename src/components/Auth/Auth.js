import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from '../index';
import { withFirebase } from '../Firebase';
import useForm from '../../hooks/useForm';

const Auth = ({ authFormError, firebase }) => {
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const formError =
    error.length
      ? error
      : authFormError
        ? authFormError
        : null

  const firebaseAuth = async ({ email, passwordOne, firstName, lastName }) => {
    try {
      isSignUp
        ? await firebase.doSignUp(email, passwordOne, firstName, lastName)
        : await firebase.doSignInWithEmailAndPassword(email, passwordOne);
    } catch (err) {
      setError(err.message);
    }
  }

  // Keys must match name attributes of Input fields
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  };

  const { inputs, handleSubmit, handleChange } = useForm(firebaseAuth, initialState);

  return (
    <form id="auth-form" onSubmit={handleSubmit}>
      {
        isSignUp
          ? (
            <React.Fragment>
              <Input
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                type="text"
                placeholder="First name"
                label="First name"
              />
              <Input
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Last name"
                label="Last name"
              />
            </React.Fragment>
          )
          : null
      }
      <Input
        name="email"
        value={inputs.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
        label="Email Address"
      />
      <Input
        name="passwordOne"
        value={inputs.passwordOne}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        label="Password"
      />
      {
        isSignUp
          ? <Input
            name="passwordTwo"
            value={inputs.passwordTwo}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
          />
          : null
      }
      {
        formError
          ? <span className="error">{formError}</span>
          : null
      }
      <div id="auth-form-footer">
        <Button id="auth-form-submit-button" type="submit">{isSignUp ? 'Sign Up' : 'Log in'}</Button>
        {
          isSignUp
            ? <span>Already have an account? <span id="auth-form-footer-redirect" onClick={() => setIsSignUp(false)}>Log in!</span></span>
            : <span>Don't have an account? <span id="auth-form-footer-redirect" onClick={() => setIsSignUp(true)}>Sign up!</span></span>
        }
      </div>
    </form>
  );
}

const mapState = state => ({
  authFormError: state.auth.error,
})

export default connect(mapState, null)(withFirebase(Auth));