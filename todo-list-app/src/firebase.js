import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDM5JLrwmpNTbxp2tesi8JqDuGgVRbRd28",
    authDomain: "cs-178-to-do-list.firebaseapp.com",
    projectId: "cs-178-to-do-list",
    storageBucket: "cs-178-to-do-list.appspot.com",
    messagingSenderId: "633864371316",
    appId: "1:633864371316:web:29d2757d4d12731d4ce521"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();