import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { attemptedLoadUser, setCurrentUser } from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import history from './history';

const firebase = new Firebase();

firebase.getAuthStateChanged(async currentUser => {
  let userData = null;
  if (currentUser) {
    userData = await firebase.getUserById(currentUser.uid);
  }
  store.dispatch(setCurrentUser(userData));
  store.dispatch(attemptedLoadUser());
});

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={firebase}>
      <Router history={history}>
        <App />
      </Router>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
