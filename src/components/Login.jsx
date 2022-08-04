import React from "react";
import { useState } from "react";

const Login = ({ getUser }) => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = () => {
    let user = {
      username: loginUserName,
      password: loginPassword
    };
    getUser(user);

  }

  return (
    <div>
      <div className="login">
        <button onClick={() => setLoginClicked(!loginClicked)}>Log In</button>
        {loginClicked ?
        <div>
          <input value={loginUserName} placeholder="Username" onChange={(e) => setLoginUserName(e.target.value)} />
          <input type="password" value={loginPassword} placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
        : null}
      </div>

      <div className="signup">
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
