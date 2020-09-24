import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./NewChat.css";

export default ({ showNewChatWindown, setshowNewChatWindown }) => {
  const [contactList, setcontactList] = useState([
    {
      id: 123,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 45454,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 6494121,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 7777878848,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 599552262,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 599552262,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 599552262,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 599552262,
      name: "Courtney",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    },
  ]);

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
            <div className="newChat--contactList--item">
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
