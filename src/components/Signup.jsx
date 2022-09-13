import React from "react";
import { useState } from "react";

const Signup = ({ setSignupClicked, createNewUser, setCurrentUser }) => {
  const [firstName, setFirstName] = useState({
    value: "",
    isHighlighted: false,
  });
  const [lastName, setLastName] = useState({
    value: "",
    isHighlighted: false,
  });
  const [email, setEmail] = useState({
    value: "",
    isHighlighted: false,
  });
  const [username, setUsername] = useState({
    value: "",
    isHighlighted: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isHighlighted: false,
  });
  const [confirmedPass, setConfirmedPass] = useState({
    value: "",
    isHighlighted: false,
  });
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatched] = useState(true);
  const [duplicate, setDuplicate] = useState("");
  const [unfilled, setUnfilled] = useState(false);

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel form entry?")) {
      setSignupClicked(false);
    }
  };

  const inputsFilled = () => {
    let isValid = true;

    if (!firstName.value) {
      setFirstName({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }
    if (!lastName.value) {
      setLastName({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }
    if (!email.value) {
      setEmail({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }
    if (!username.value) {
      setUsername({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }
    if (!password.value) {
      setPassword({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }
    if (!confirmedPass.value) {
      setConfirmedPass({
        value: "",
        isHighlighted: true,
      });
      isValid = false;
    }

    if (isValid) {
      return true;
    } else return false;
  };

  const isValidEmail = () => {
    return email.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = () => {
    if (!inputsFilled()) {
      setUnfilled(true);
      return;
    }

    if (password.value !== confirmedPass.value) {
      setPasswordsMatched(false);
      setPassword({
        value: "",
        isHighlighted: true,
      });
      setConfirmedPass({
        value: "",
        isHighlighted: true,
      });
      return;
    }
    if (!isValidEmail()) {
      setEmail({
        value: email.value,
        isHighlighted: true,
      });
      setInvalidEmail(true);
      return;
    }
    setPasswordsMatched(true);

    let newUser = {
      firstName: firstName.value.toLowerCase(),
      lastName: lastName.value.toLowerCase(),
      email: email.value,
    };

    setDuplicate("");
    createNewUser(newUser, username.value, password.value, (data) => {
      console.log(data);
      if (data.sqlMessage && data.sqlMessage.indexOf("username") > -1) {
        setDuplicate("username");
      } else if (data.sqlMessage && data.sqlMessage.indexOf("email") > -1) {
        setDuplicate("email");
      } else {
        setSignupClicked(false);
        setCurrentUser(newUser);
      }
    });
  };

  return (
    <div>
      <div className="signup-form">
        {unfilled ? (
          <div style={{ color: "red" }}>Please fill out required fields</div>
        ) : null}
        <input
          value={firstName.value}
          placeholder="First Name"
          style={{ borderColor: firstName.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setFirstName({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        <input
          value={lastName.value}
          placeholder="Last Name"
          style={{ borderColor: lastName.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setLastName({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        {duplicate === "email" ? (
          <div>Email already in use. Please enter another one.</div>
        ) : null}
        {invalidEmail ? <div>Invalid Email. Please enter again.</div> : null}
        <input
          value={email.value}
          placeholder="Email"
          style={{ borderColor: email.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setEmail({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        {duplicate === "username" ? (
          <div>Username already in use. Please enter another one.</div>
        ) : null}
        <input
          value={username.value}
          placeholder="Username"
          style={{ borderColor: username.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setUsername({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        {!passwordsMatch ? (
          <div>Passwords do not match. Please enter again.</div>
        ) : null}
        <input
          value={password.value}
          placeholder="Password"
          type="password"
          style={{ borderColor: password.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setPassword({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        <input
          value={confirmedPass.value}
          placeholder="Re-type Password"
          type="password"
          style={{ borderColor: confirmedPass.isHighlighted ? "red" : null }}
          onChange={(e) =>
            setConfirmedPass({
              value: e.target.value,
              isHighlighted: false,
            })
          }
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
      <button onClick={() => handleCancel()}>Cancel</button>
    </div>
  );
};

export default Signup;
