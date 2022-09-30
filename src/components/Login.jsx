import React, { useEffect } from "react";
import { useState } from "react";

const Login = ({ currentUser, setCurrentUser, setLogin, invalidLogin }) => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = () => {

    setLogin({
      username: loginUserName,
      password: loginPassword
    })
    setLoginUserName('');
    setLoginPassword('');
    if (Object.keys(currentUser).length) {
      setLoginClicked(false);
    }
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      setCurrentUser("");
      setLoginClicked(false);
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
                {invalidLogin ? <div>Invalid username/password!</div> : null}
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
