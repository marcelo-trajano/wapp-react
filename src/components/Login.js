import React from "react";
import api from "../api";
import "./Login.css";

export default ({ onReceive }) => {
  const handleLoginFacebook = async () => {
    let result = await api.fbPopup();
    if (result) {
      onReceive(result.user);
    } else {
      alert("Erro ");
    }
  };
  return (
    <div className="login">
      <button onClick={handleLoginFacebook}>Facebook Login</button>
    </div>
  );
};
