import React from "react";
import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import JournalList from "./JournalList.jsx";
import ViewJournal from "./ViewJournal.jsx";
import JournalEntry from "./JournalEntry.jsx";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [currentEntry, setCurrentEntry] = useState({});
  const [login, setLogin] = useState(null);
  const [signupClicked, setSignupClicked] = useState(false);
  const [newEntryClicked, setNewEntryClicked] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);


  useEffect(() => {
    if (login) {
      axios
      .get("/users", {
        auth: {
          username: login.username,
          password: login.password,
        },
      })
      .then((results) => {
        if (results.data.length === 0) {
          setInvalidLogin(true);
        } else {
          setCurrentUser(results.data[0]);
          setLogin(null);
          setInvalidLogin(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [login]);



  const getUser = (loginUserName, loginPassword, callback) => {
    axios
      .get("/users", {
        auth: {
          username: loginUserName,
          password: loginPassword,
        },
      })
      .then((results) => {
        callback(results.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createNewUser = (newUser, username, password, callback) => {
    axios
      .post("/users", newUser, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((results) => {
        callback(results.data);
      })
      .catch((err) => console.error(err));
  };

  const createNewEntry = (newEntry, callback) => {
    axios
      .post("/entries", newEntry)
      .then((results) => {
        callback(results);
      })
      .catch((err) => console.error(err));
  };

  if (signupClicked) {
    return (
      <div>
        <Signup
          setSignupClicked={setSignupClicked}
          createNewUser={createNewUser}
          setCurrentUser={setCurrentUser}
        />
      </div>
    );
  }
  if (newEntryClicked) {
    return (
      <div>
        <JournalEntry
          setNewEntryClicked={setNewEntryClicked}
          currentUser={currentUser}
          createNewEntry={createNewEntry}
        />
      </div>
    );
  }
  return (
    <div>
      <h1 className="title">
        {Object.keys(currentUser).length
          ? `${
              currentUser.firstName.charAt(0).toUpperCase() +
              currentUser.firstName.slice(1)
            }'s Journal`
          : "Journal"}
      </h1>
      {Object.keys(currentUser).length && !Object.keys(currentEntry).length ? (
        <JournalList
          currentUser={currentUser}
          setCurrentEntry={setCurrentEntry}
          setNewEntryClicked={setNewEntryClicked}
          getUser={getUser}
        />
      ) : Object.keys(currentUser) && Object.keys(currentEntry).length ? (
        <ViewJournal
          currentEntry={currentEntry}
          setCurrentEntry={setCurrentEntry}
        />
      ) : null}
      <Login
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setLogin={setLogin}
        invalidLogin={invalidLogin}
      />

      {!currentUser ? (
        <button onClick={() => setSignupClicked(true)}>Sign Up</button>
      ) : null}
    </div>
  );
};

export default App;
