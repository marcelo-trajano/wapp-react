import React from "react";
import "./MessageItem.css";

export default ({ messageItem, sessionUser }) => {
  return (
    <div
      className="messageLine"
      style={{
        justifyContent:
          messageItem.user.id === sessionUser.id ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="messageItem"
        style={{
          backgroundColor:
            messageItem.user.id === sessionUser.id ? "#d6f8c6" : "#fff",
        }}
      >
        <div className="messageText">{messageItem.message}</div>
        <div className="messageTime">{messageItem.time}</div>
      </div>
    </div>
  );
};
