import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export class AuthService {
    signup(email: string, password: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signin(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
      firebase.auth().signOut();
    }

    getActiveUser() {
      return firebase.auth().currentUser;
    }

}