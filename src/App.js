import React, { useState, useEffect } from "react";
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

  const [conversation, setconversation] = useState([
    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ",
      time: "11:11",
    },
    {
      user: { id: 1234 },
      message:
        "bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu ",
      time: "15:44",
    },
    {
      user: { id: 123 },
      message:
        "babe babe babe babe babe babe babe babe babe babe babe babe babe babe ",
      time: "today",
    },
    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go ",
      time: "yesterday",
    },

    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ",
      time: "11:11",
    },
    {
      user: { id: 1234 },
      message:
        "bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu ",
      time: "15:44",
    },
    {
      user: { id: 123 },
      message:
        "babe babe babe babe babe babe babe babe babe babe babe babe babe babe ",
      time: "today",
    },
    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go ",
      time: "yesterday",
    },

    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ",
      time: "11:11",
    },
    {
      user: { id: 1234 },
      message:
        "bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu ",
      time: "15:44",
    },
    {
      user: { id: 123 },
      message:
        "babe babe babe babe babe babe babe babe babe babe babe babe babe babe ",
      time: "today",
    },
    {
      user: {
        id: 123,
        name: "Vanessa",
        avatar: "https://randomuser.me/api/portraits/women/96.jpg",
      },
      message:
        "go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go ",
      time: "yesterday",
    },
  ]);

  const [conversation2, setconversation2] = useState([
    {
      user: {
        id: 123,
        name: "Courtney",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      },
      message: " bu bu bu bu bu ",
      time: "11:11",
    },
    {
      user: { id: 1234 },
      message:
        "bu bu bu bu bu bu bu bu bu  bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu bu ",
      time: "15:44",
    },
    {
      user: { id: 123 },
      message:
        "babe babe babe babe babe babe babe babe babe babe babe babe babe babe ",
      time: "today",
    },
    {
      user: {
        id: 123,
        name: "Courtney",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      },
      message:
        "bu bu bu bu bua bla bla bla blao go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go go ",
      time: "yesterday",
    },
  ]);

  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      name: conversation[conversation.length - 1].user.name,
      time: conversation[conversation.length - 1].time,
      title: conversation[conversation.length - 1].message,
      avatar: conversation[conversation.length - 1].user.avatar,
      conversation: conversation,
    },
    {
      chatId: 2,
      name: conversation2[conversation2.length - 1].user.name,
      time: conversation2[conversation2.length - 1].time,
      title: conversation2[conversation2.length - 1].message,
      avatar: conversation2[conversation2.length - 1].user.avatar,
      conversation: conversation2,
    },
  ]);

  const handleUserLogin = (user) => {
    console.log(user);
    setsessionUser({
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    });
  };

  if (sessionUser === null) {
    return <Login onReceive={handleUserLogin} />;
  } else {
    return (
      <div className="app-window">
        <div className="sidebar">
          <NewChat
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
                  active={chatList[key].chatId === activeChat.chatId}
                  onClick={() => {
                    setactiveChat(chatList[key]);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="contentarea">
          {activeChat.chatId !== undefined && (
            <ChatWindow activeChat={activeChat} sessionUser={sessionUser} />
          )}
          {activeChat.chatId === undefined && <ChatIntro />}
        </div>
      </div>
    );
  }
};
