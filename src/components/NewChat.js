import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Api from "../Api";
import "./NewChat.css";

export default ({ showNewChatWindown, setshowNewChatWindown, sessionUser }) => {
  const [contactList, setcontactList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (sessionUser !== null) {
        const users = await Api.getContactList(sessionUser);
        setcontactList(users);
      }
    };
    getUsers();
  }, [sessionUser]);

  const startNewChat = async (user2) => {
    await Api.addNewChat(sessionUser, user2);
    setshowNewChatWindown(false);
  };

  return (
    <div
      className="newChat"
      style={{ maxWidth: showNewChatWindown ? "415px" : "0px" }}
    >
      <div className="newChat--header">
        <div
          className="newChat--header--voltar-btn"
          onClick={() => {
            setshowNewChatWindown(false);
          }}
        >
          <ArrowBackIcon style={{ color: "#ffffff" }} />
        </div>
        <div className="newChat--header--title">New Chat</div>
      </div>
      <div className="newChat--contactList">
        {contactList.map((item, key) => {
          return (
            <div
              key={key}
              className="newChat--contactList--item"
              onClick={() => {
                startNewChat(item);
              }}
            >
              <img
                className="newChat--contactList--item--imgContact"
                src={item.avatar}
              />
              <div className="newChat--contactList--item--nameContact">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
