import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import uniqid from 'uniqid';
import history from '../../history';
import { firebaseConfig } from '../../secrets';
import store, { showFormError, removeFormError, setCurrentUser, removeCurrentUser, getUser, getLeague } from '../../store';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getCurrentUser = () => this.auth.currentUser;

  setCurrentUser = () => {
    const user = this.getCurrentUser();
    store.dispatch(setCurrentUser(user));
  }

  getUserById = async uid => {
    const doc = await this.db.collection('users').doc(uid).get();
    return doc.data();
  }

  getAndSetUserById = async uid => {
    const user = await this.getUserById(uid);
    store.dispatch(getUser(user));
    return user;
  }

  getAuthStateChanged = cb =>
    this.auth.onAuthStateChanged(cb);

  doSignUp = async (email, password, firstName, lastName) => {
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: firstName + ' ' + lastName });
      const userData = {
        displayName: user.displayName,
        firstName,
        lastName,
        email: user.email,
        uid: user.uid
      };
      await this.db.collection('users').doc(user.uid).set(userData);
      store.dispatch(setCurrentUser(userData))
      store.dispatch(removeFormError());
      history.push(`/users/${user.uid}`);
    } catch (err) {
      store.dispatch(showFormError(err.message));
    }
  }

  doSignInWithEmailAndPassword = async (email, password) => {
    const res = await this.auth.signInWithEmailAndPassword(email, password);
    const user = await this.getUserById(res.user.uid);
    store.dispatch(setCurrentUser(user));
    history.push(`/users/${user.uid}`);
  }

  doSignOut = () => {
    this.auth.signOut();
    store.dispatch(removeCurrentUser());
    history.push('/');
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doCreateLeague = async body => {
    try {
      const leagueId = uniqid();
      const user = this.getCurrentUser();
      const leagueInfo = { ...body, admins: [user.uid], members: [user.uid], id: leagueId };
      await this.db.collection('leagues').doc(leagueId).set(leagueInfo);
      const userRef = await this.db.collection('users').doc(user.uid);
      userRef.update({
        memberOfLeagues: [leagueId],
        adminForLeauges: [leagueId]
      });
      return leagueId;
    } catch (err) {
      console.log(err);
    }
  }

  getLeagueById = async id => {
    try {
      const league = await this.db.collection('leagues').doc(id).get();
      return league.data();
    } catch (err) {
      console.log(err);
    }
  }

  getLeagues = async (leagues, leaguesOnState) => {
    for (let id of leagues) {
      if (!leaguesOnState[id]) {
        const league = await this.db.collection('leagues').doc(id).get();
        store.dispatch(getLeague(league.data()));
      }
    }
  }
}

export default Firebase;