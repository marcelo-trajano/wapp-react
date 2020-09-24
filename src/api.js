import Firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";

import FirebaseConfig from "./FirebaseConfig";

const FirebaseApp = Firebase.initializeApp(FirebaseConfig);
const db = FirebaseApp.firestore();

export default {
  fbPopup: async () => {
    const provider = new Firebase.auth.FacebookAuthProvider();
    let result = await Firebase.auth().signInWithPopup(provider);
    return result;
  },
};
