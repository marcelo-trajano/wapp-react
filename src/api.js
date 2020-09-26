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
  addUser: async (user) => {
    await db
      .collection("users")
      .doc(user.id)
      .set({ name: user.name, avatar: user.avatar }, { merge: true });
  },
  getContactList: async (sessionUser) => {
    let contactList = [];

    let users = await db.collection("users").get();

    users.forEach((item) => {
      if (item.id !== sessionUser.id) {
        let user = {
          id: item.id,
          name: item.data().name,
          avatar: item.data().avatar,
        };
        contactList.push(user);
      }
    });

    return contactList;
  },
  getUserbyId: async (id) => {
    let users = await db.collection("users").doc(id).get();

    return users.data();
  },
  addNewChat: async (sessionUser, user2) => {
    let newChat = await db
      .collection("chats")
      .add({ users: [sessionUser.id, user2.id], messages: [] });

    db.collection("users")
      .doc(sessionUser.id)
      .update({
        chats: Firebase.firestore.FieldValue.arrayUnion({
          chat_id: newChat.id,
          title: user2.name,
          avatar: user2.avatar,
          with: user2.id,
        }),
      });

    db.collection("users")
      .doc(user2.id)
      .update({
        chats: Firebase.firestore.FieldValue.arrayUnion({
          chat_id: newChat.id,
          title: sessionUser.name,
          avatar: sessionUser.avatar,
          with: sessionUser.id,
        }),
      });
  },
  onChatList: (userId, setChatList) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data.chats) {
            console.log(data.chats);
            setChatList(data.chats);
          }
        }
      });
  },
};
