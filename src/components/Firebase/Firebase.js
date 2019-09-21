import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import uniqid from 'uniqid';
import { firebaseConfig } from '../../secrets';
import store, { showFormError, removeFormError, setCurrentUser, removeCurrentUser } from '../../store';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getCurrentUser = () => this.auth.currentUser;

  getUserFromDb = async uid => {
    const doc = await this.db.collection('users').doc(uid).get();
    return doc.data();
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
      };
      await this.db.collection('users').doc(user.uid).set(userData);
      store.dispatch(setCurrentUser(userData))
      store.dispatch(removeFormError());
    } catch (err) {
      store.dispatch(showFormError(err.message));
    }
  }

  doSignInWithEmailAndPassword = async (email, password) => {
    const res = await this.auth.signInWithEmailAndPassword(email, password);
    const user = await this.getUserFromDb(res.user.uid);
    store.dispatch(setCurrentUser(user))
  }

  doSignOut = () => {
    this.auth.signOut();
    store.dispatch(removeCurrentUser())
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doCreateLeague = async body => {
    try {
      const leagueId = uniqid();
      const user = this.getCurrentUser();
      const leagueInfo = { ...body, admins: [user.uid] };
      await this.db.collection('leagues').doc(leagueId).set(leagueInfo);
      const userRef = await this.db.collection('users').doc(user.uid);
      userRef.update({
        memberOfLeagues: [leagueId],
        adminForLeauges: [leagueId]
      });
      return leagueId;
      // const league = await this.db.collection('leagues').doc(leagueId).get();
      // return league.data();
    } catch (err) {
      console.log(err);
    }
  }
}

export default Firebase;