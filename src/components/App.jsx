import React from "react";
import { useState } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import JournalList from "./JournalList.jsx";
import ViewJournal from "./ViewJournal.jsx";
import JournalEntry from "./JournalEntry.jsx";
import axios from "axios";

const App = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentEntry, setCurrentEntry] = useState({});
  const [signupClicked, setSignupClicked] = useState(false);
  const [newEntryClicked, setNewEntryClicked] = useState(false);

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
        <JournalEntry setNewEntryClicked={setNewEntryClicked}/>
      </div>
    )
  }
  return (
    <div>
      <h1 className="title">
        {currentUser
          ? `${
              currentUser.firstName.charAt(0).toUpperCase() +
              currentUser.firstName.slice(1)
            }'s Journal`
          : "Journal"}
      </h1>
      {currentUser && !Object.keys(currentEntry).length ? (
        <JournalList
          currentUser={currentUser}
          setCurrentEntry={setCurrentEntry}
          setNewEntryClicked={setNewEntryClicked}
        />
      ) : currentUser && Object.keys(currentEntry).length ? (
        <ViewJournal
          currentEntry={currentEntry}
          setCurrentEntry={setCurrentEntry}
        />
      ) : null}
      <Login
        getUser={getUser}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {!currentUser ? (
        <button onClick={() => setSignupClicked(true)}>Sign Up</button>
      ) : null}
    </div>
  );
};

export default App;
