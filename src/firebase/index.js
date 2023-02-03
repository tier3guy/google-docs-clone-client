import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwiRVJLv_gXQgVxJHkkYhPzqCX3kriAa8",
    authDomain: "docs-clone-e61d1.firebaseapp.com",
    projectId: "docs-clone-e61d1",
    storageBucket: "docs-clone-e61d1.appspot.com",
    messagingSenderId: "755535043467",
    appId: "1:755535043467:web:a1f468b76dc58c568d2d8e"
};
  
/*
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
*/

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;