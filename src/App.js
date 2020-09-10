import React, { useState, useEffect } from "react";
import "./App.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatListItem from "./components/ChatListItem";

export default () => {
  const [chatList, setChatList] = useState([{}, {}, {}, {}]);
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
            return <ChatListItem key={key} />;
          })}
        </div>
      </div>
      <div className="contentarea">...</div>
    </div>
  );
};
