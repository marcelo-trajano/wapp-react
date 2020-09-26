import React from "react";
import Api from "../Api";
import "./Login.css";

export default ({ onReceive }) => {
  const handleLoginFacebook = async () => {
    let result = await Api.fbPopup();
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
