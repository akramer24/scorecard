import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/firebase-functions';
import uniqid from 'uniqid';
import history from '../../history';
import { firebaseConfig } from '../../secrets';
import store, {
  getLeague,
  getPlayer,
  getTeam,
  getUser,
  removeCurrentUser,
  removeFormError,
  setCurrentUser,
  showFormError,
} from '../../store';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.functions = app.functions();
    this.firebase = app;
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

  getUsers = userId => {
    userId && userId.forEach(async id => {
      await this.getAndSetUserById(id);
    });
  }

  getAuthStateChanged = cb =>
    this.auth.onAuthStateChanged(cb);

  doLookupOrCreateTempUserByEmail = async user => {
    try {
      const querySnapshot =
        await this.db.collection('users')
          .where('email', '==', user.email)
          .get();
      let foundUser;
      querySnapshot.forEach(doc => {
        foundUser = doc.data();
      });
      if (foundUser) {
        return foundUser;
      }
      const uid = uniqid();
      const createdUser = { ...user, uid, temp: true };
      await this.db.collection('users').doc(uid).set(createdUser);
      return createdUser;
    } catch (err) {
      console.log(err);
    }
  }

  doSignUp = async (email, password, firstName, lastName, path) => {
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
      store.dispatch(setCurrentUser(userData));
      store.dispatch(removeFormError());
      path === '/' ? history.push(`/users/${user.uid}`) : history.push(path);
    } catch (err) {
      store.dispatch(showFormError(err.message));
    }
  }

  doSignInWithEmailAndPassword = async (email, password, path) => {
    const res = await this.auth.signInWithEmailAndPassword(email, password);
    const user = await this.getUserById(res.user.uid);
    store.dispatch(setCurrentUser(user));
    path === '/' ? history.push(`/users/${user.uid}`) : history.push(path);
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
        memberOfLeagues: this.firebase.firestore.FieldValue.arrayUnion(leagueId),
        adminForLeauges: this.firebase.firestore.FieldValue.arrayUnion(leagueId)
      });
      return leagueId;
    } catch (err) {
      console.log(err);
    }
  }

  getLeagueById = async id => {
    try {
      const league = await this.db.collection('leagues').doc(id).get();
      store.dispatch(getLeague(league.data()));
      return league.data();
    } catch (err) {
      console.log(err);
    }
  }

  getLeagues = async (leagues, leaguesOnState) => {
    if (leagues) {
      for (let id of leagues) {
        if (!leaguesOnState[id]) {
          const league = await this.db.collection('leagues').doc(id).get();
          store.dispatch(getLeague(league.data()));
        }
      }
    }
  }

  getTeams = teamIds => {
    teamIds && teamIds.forEach(async id => {
      await this.getTeamById(id);
    });
  }

  getTeamById = async id => {
    try {
      const team = await this.db.collection('teams').doc(id).get();
      store.dispatch(getTeam(team.data()));
      return team.data();
    } catch (err) {
      console.log(err)
    }
  }

  doCreateTeam = async (name, players, league, isCreatorOnTeam, origin) => {
    try {
      const updateUserAndLeague = async (userId, leagueId, teamId) => {
        const userRef = await this.db.collection('users').doc(userId);
        userRef.update({
          memberOfTeams: this.firebase.firestore.FieldValue.arrayUnion(teamId),
          memberOfLeagues: this.firebase.firestore.FieldValue.arrayUnion(leagueId)
        });
        const leagueRef = await this.db.collection('leagues').doc(leagueId);
        leagueRef.update({
          members: this.firebase.firestore.FieldValue.arrayUnion(userId),
          teams: this.firebase.firestore.FieldValue.arrayUnion(teamId)
        });
      }
      const teamId = uniqid();
      const user = this.getCurrentUser();
      const members = await Promise.all(players.map(async p => {
        const user = await this.doLookupOrCreateTempUserByEmail(p);
        await updateUserAndLeague(user.uid, league.id, teamId);
        return user.uid;
      }));

      if (isCreatorOnTeam) {
        members.push(user.uid);
        await updateUserAndLeague(user.uid, league.id, teamId);
      }
      const teamInfo = { name, admins: [user.uid], members, id: teamId, leagueId: league.id, sport: league.sport, leagueName: league.name };
      await this.db.collection('teams').doc(teamId).set(teamInfo);
      await this.getLeagueById(league.id);
      players.forEach(p => {
        this.sendMail({
          to: p.email, subject: 'You have been added to a team!', body: `
          <div>
            <div style="font-size: 20px; color: #12125e;">Hi, ${p.displayName}</div>
            <div>${user.displayName} has added you to the team <strong>${name}</strong> in ${league.name}, a ${league.sport} league.</div>
            <div>To view your team page, <a href=${origin}/leagues/${league.id}/teams/${teamId}>click here</a>.</div>
          </div>
        `})
      });
      this.sendMail({
        to: user.email, subject: 'Your new team', body: `
          <div>
            <div style="font-size: 20px; color: #12125e;">Hi, ${user.displayName}</div>
            <div>You have created the team <strong>${name}</strong> in ${league.name}, a ${league.sport} league.</div>
            <div>To view your team page, <a href=${origin}/leagues/${league.id}/teams/${teamId}>click here</a>.</div>
          </div>
        `
      });
      history.push(`/leagues/${league.id}/teams/${teamId}`);
      return teamId;
    } catch (err) {
      console.log(err);
    }
  }

  sendMail = async data => {
    try {
      await this.functions.httpsCallable('sendMail')(data);
    } catch (err) {
      console.log(err)
    }
  }
}

export default Firebase;