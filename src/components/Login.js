import React, { useState } from "react";
import Api from "../Api";
import TextField from "@material-ui/core/TextField";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";

import "./Login.css";

export default ({ loginFacebook, loginFirebase }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLoginFacebook = async () => {
    let result = await Api.fbPopup();

    if (result) {
      loginFacebook(result.user);
    } else {
      alert("Erro ");
    }
  };

  const handleFirebaseUesr = async () => {
    let result = await Api.emailPopup(email, password);

    if (result) {
      loginFirebase(result.user);
    } else {
      alert("Erro ");
    }
  };
  return (
    <div className="login">
      <div className="layoutContent">
        <div className="icons">
          <EmailIcon />
        </div>
        <div className="icons">
          <TextField
            placeholder="e-mail"
            type="email"
            required={true}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="layoutContent">
        <div className="icons">
          <VpnKeyIcon />
        </div>
        <div className="icons">
          <TextField
            placeholder="password"
            type="password"
            required={true}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="buttC">
        <div className="buttClass">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleFirebaseUesr();
            }}
          >
            login
          </Button>
        </div>
      </div>
    </div>
  );
};
