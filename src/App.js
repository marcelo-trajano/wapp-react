import React, { useState, useEffect } from "react";
import Api from "./Api";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatListItem from "./components/ChatListItem";
import Login from "./components/Login";
import "./App.css";

export default () => {
  const [activeChat, setactiveChat] = useState({});
  const [showNewChatWindown, setshowNewChatWindown] = useState(false);
  const [sessionUser, setsessionUser] = useState(null);

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (sessionUser !== null) {
      let unsub = Api.onChatList(sessionUser.id, setChatList);
      return unsub;
    }
  }, [sessionUser]);

  const loginFirebase = async (user) => {
    console.log(user);

    let newUser = {
      id: user.uid,
      name: "Ana",
      avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    };
    await Api.addUser(newUser);
    setsessionUser(newUser);
  };

  const loginFacebook = async (user) => {
    console.log(user);

    let newUser = {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };
    await Api.addUser(newUser);
    setsessionUser(newUser);
  };

  if (sessionUser === null) {
    return (
      <Login loginFacebook={loginFacebook} loginFirebase={loginFirebase} />
    );
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          sessionUser={sessionUser}
          showNewChatWindown={showNewChatWindown}
          setshowNewChatWindown={setshowNewChatWindown}
        />
        <header>
          <img src={sessionUser.avatar} className="header--avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div className="header--btn">
              <ChatIcon
                style={{ color: "#919191" }}
                onClick={() => {
                  setshowNewChatWindown(true);
                }}
              />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{ color: "#919191" }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{ color: "#919191" }} />
            <input type="search" placeholder="Search or start new chat" />
          </div>
        </div>
        <div className="chatlist">
          {chatList.map((item, key) => {
            return (
              <ChatListItem
                key={key}
                data={item}
                active={chatList[key].chat_id === activeChat.chat_id}
                onClick={() => {
                  setactiveChat(chatList[key]);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="contentarea">
        {activeChat.chat_id !== undefined && (
          <ChatWindow activeChat={activeChat} sessionUser={sessionUser} />
        )}
        {activeChat.chat_id === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
