import React, { useState, useEffect } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import "./ChatWindow.css";

export default ({ activeChat }) => {
  return (
    <div className="chatWindow">
      <div className="chatWindow--header"></div>
      <div className="chatWindow--body"></div>
      <div className="chatWindow--footer"></div>
    </div>
  );
};
