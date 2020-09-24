import React, { useState, useEffect, useRef } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import CloseIcon from "@material-ui/icons/Close";
import EmojiPicker from "emoji-picker-react";
import MessageItem from "./MessageItem";

import "./ChatWindow.css";

export default ({ activeChat, sessionUser }) => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [message, setmessage] = useState("");
  const [listening, setlistening] = useState(false);

  const body = useRef();

  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [activeChat.conversation]);

  const handleEmojiClick = (e, data) => {
    setmessage(message + data.emoji);
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setlistening(true);
      };
      recognition.onend = () => {
        setlistening(false);
      };
      recognition.onresult = (e) => {
        setmessage(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };

  const handleSendMessageClick = () => {};

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--header--userInfo">
          <img className="chatWindow--header--avatar" src={activeChat.avatar} />
          <div className="chatWindow--header--userName">{activeChat.name}</div>
        </div>
        <div className="chatWindow--header--buttons">
          <div className="chatWindow--header--btn">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--header--btn">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--header--btn">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div ref={body} className="chatWindow--body">
        {activeChat.conversation.map((item, key) => {
          return (
            <MessageItem
              key={key}
              messageItem={item}
              sessionUser={sessionUser}
            />
          );
        })}
      </div>
      <div
        className="chatWindow--emojipicker"
        style={{ height: showEmojiPicker ? `240px` : "0px" }}
      >
        <EmojiPicker
          disableSearchBar
          disableSkinTonePicker
          onEmojiClick={(e, data) => {
            handleEmojiClick(e, data);
          }}
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--footer--pre">
          <div
            className="chatWindow--header--btn"
            onClick={() => {
              setshowEmojiPicker(false);
            }}
            style={{ width: showEmojiPicker ? 40 : 0 }}
          >
            <CloseIcon style={{ color: "#919191" }} />
          </div>
          <div
            className="chatWindow--header--btn"
            onClick={() => {
              setshowEmojiPicker(true);
            }}
          >
            <InsertEmoticonIcon
              style={{ color: showEmojiPicker ? "#009688" : "#919191" }}
            />
          </div>
        </div>
        <div className="chatWindow--footer--inputarea">
          <input
            type="text"
            className="chatWindow--footer--input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
          ></input>
        </div>
        <div className="chatWindow--footer--pos">
          <div
            className="chatWindow--header--btn"
            style={{ width: message === "" ? 40 : 0 }}
            onClick={handleMicClick}
          >
            <MicIcon style={{ color: listening ? "#126ece" : "#919191" }} />
          </div>
          <div
            className="chatWindow--header--btn"
            style={{ width: message !== "" ? 40 : 0 }}
            onClick={handleSendMessageClick}
          >
            <SendIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
