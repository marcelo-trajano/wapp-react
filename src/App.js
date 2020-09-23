import React, { useState, useEffect } from "react";
import "./App.css";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatListItem from "./components/ChatListItem";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default () => {
  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      name: "Marcelo Trajano",
      time: "11:11",
      title:
        "jaskdhjkashdjhsadhsajhdjshadhhjashdkjh jahdjashdja   ajshdjhsadjksahd kjashdjkashd",
      avatar:
        "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png",
    },
    {
      chatId: 2,
      name: "Mary Jane",
      time: "22:44",
      title: "ptutyiuoithopiytouitkgepkhtpokhtrkhoth roeoerkorekog",
      avatar:
        "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png",
    },
    {
      chatId: 3,
      name: "Tracy Adina",
      time: "21:10",
      title: "rergergoertoet348t934it9034t43kokgodkfgopkdgg4g3",
      avatar:
        "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png",
    },
    {
      chatId: 4,
      name: "Kurt Cobain",
      time: "yesterday",
      title: "-00439t-0kggreokg0i0-r0e-gierigrekggrekogokoopk",
      avatar:
        "https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png",
    },
  ]);
  const [activeChat, setactiveChat] = useState({});
  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img
            src="https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png"
            className="header--avatar"
          />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>
            <div className="header--btn">
              <ChatIcon style={{ color: "#919191" }} />
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
          <ChatWindow activeChat={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
