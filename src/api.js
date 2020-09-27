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
  emailPopup: async (email, password) => {
    let result = await Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        console.log(error);
        //return error;
      });

    console.log(result);

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

  addNewChat: async (sessionUser, user2) => {
    let newChat = null;

    newChat = await db
      .collection("chats")
      .doc(sessionUser.id + user2.id)
      .get();

    if (newChat.data() === null || newChat.data() === undefined) {
      await db
        .collection("chats")
        .doc(sessionUser.id + user2.id)
        .set({ users: [sessionUser.id, user2.id], messages: [] });

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
    }
  },

  onChatList: (userId, setChatList) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data.chats) {
            let chats = [...data.chats];

            chats.sort((a, b) => {
              if (a.timeLastMessage === undefined) {
                return -1;
              }
              if (b.timeLastMessage === undefined) {
                return -1;
              }
              if (a.timeLastMessage.seconds < b.timeLastMessage.seconds) {
                return 1;
              } else {
                return -1;
              }
            });

            setChatList(data.chats);
          }
        }
      });
  },

  onChatContent: (chat_id, setmessages, setusers) => {
    return db
      .collection("chats")
      .doc(chat_id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data = doc.data();
          if (data.messages) {
            setmessages(data.messages);
            setusers(data.users);
          }
        }
      });
  },

  sendMessage: async (activeChat, userId, type, message, users) => {
    let now = new Date();
    console.log(activeChat.chat_id);
    db.collection("chats")
      .doc(activeChat.chat_id)
      .update({
        messages: Firebase.firestore.FieldValue.arrayUnion({
          type,
          author: userId,
          body: message,
          date: now,
        }),
      });

    for (let i in users) {
      let user = await db.collection("users").doc(users[i]).get();
      let userData = user.data();
      if (userData.chats) {
        let chats = [...userData.chats];
        for (let e in chats) {
          if (chats[e].chat_id === activeChat.chat_id) {
            chats[e].lastMessage = message;
            chats[e].timeLastMessage = now;
          }
        }
        await db.collection("users").doc(users[i]).update({ chats });
      }
    }
  },
};
