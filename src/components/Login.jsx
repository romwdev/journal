import React from "react";
import { useState } from "react";

const Login = ({ getUser, currentUser, setCurrentUser }) => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = () => {

    getUser(loginUserName, loginPassword, (userArray) => {
      if (userArray.length === 0) {
        setInvalid(true);
      } else {
        setInvalid(false);
        setCurrentUser(userArray[0]);
        setLoginClicked(false);
      }
    });
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      setCurrentUser("");
    }
  };

  return (
    <div>
      {currentUser ? (
        <button onClick={() => handleSignOut()}>Sign Out</button>
      ) : (
        <div>
          <div className="login">
            <button onClick={() => setLoginClicked(!loginClicked)}>
              Log In
            </button>
            {loginClicked ? (
              <div>
                {invalid ? <div>Invalid username/password!</div> : null}
                <input
                  value={loginUserName}
                  placeholder="Username"
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
                <input
                  type="password"
                  value={loginPassword}
                  placeholder="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={() => handleSubmit()}>Submit</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
