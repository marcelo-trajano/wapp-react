import React, { useState, useEffect } from "react";
import "./MessageItem.css";

export default ({ messageItem, sessionUser }) => {
  const [time, settime] = useState(null);

  useEffect(() => {
    let date = new Date(messageItem.date.seconds * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    settime(`${hours}:${minutes}`);
  }, [time]);

  return (
    <div
      className="messageLine"
      style={{
        justifyContent:
          messageItem.author === sessionUser.id ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="messageItem"
        style={{
          backgroundColor:
            messageItem.author === sessionUser.id ? "#d6f8c6" : "#fff",
        }}
      >
        <div className="messageText">{messageItem.body}</div>
        <div className="messageTime">{time}</div>
      </div>
    </div>
  );
};
