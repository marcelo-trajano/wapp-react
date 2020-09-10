import React from "react";
import "./ChatListItem.css";

export default () => {
  return (
    <div className="chatListItem">
      <img
        className="chatListItem-avatar"
        src="https://cdn.icon-icons.com/icons2/1368/PNG/512/-avatar_89781.png"
        alt=""
      />
      <div className="chatListItem-lines">
        <div className="chatListItem-line">
          <div className="chatListItem-userName">Marcelo Trajano</div>
          <div className="chatListItem-time">11:11</div>
        </div>
        <div className="chatListItem-line">
          <div className="chatListItem-lastMsg">
            <p>how are you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};