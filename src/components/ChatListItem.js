import React, { useState, useEffect } from "react";
import "./ChatListItem.css";

export default ({ onClick, data, active }) => {
  const [time, settime] = useState(null);
  useEffect(() => {
    let date = new Date(data.timeLastMessage.seconds * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    settime(`${hours}:${minutes}`);
  }, [time]);
  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem-avatar" src={data.avatar} alt="" />
      <div className="chatListItem-lines">
        <div className="chatListItem-line">
          <div className="chatListItem-userName">{data.name}</div>
          <div className="chatListItem-time">{time}</div>
        </div>
        <div className="chatListItem-line">
          <div className="chatListItem-lastMsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
