import React from "react";
import "./ChatListItem.css";

export default ({ onClick, data, active }) => {
  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem-avatar" src={data.avatar} alt="" />
      <div className="chatListItem-lines">
        <div className="chatListItem-line">
          <div className="chatListItem-userName">{data.name}</div>
          <div className="chatListItem-time">{data.time}</div>
        </div>
        <div className="chatListItem-line">
          <div className="chatListItem-lastMsg">
            <p>{data.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
