import React from "react";
import { useState } from "react";
import moment from "moment";

const JournalEntry = ({ setNewEntryClicked, currentUser, createNewEntry }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  const handleSubmit = () => {

    const newEntry = {
      title: titleInput,
      body: bodyInput,
      currentUser: currentUser.username,
      timestamp: moment().format(),
    };

    // console.log(newEntry);
    // console.log(moment(newEntry.timestamp).format("MMMM Do YYYY, h:mm:ss a"));
    // console.log(moment(newEntry.timestamp).fromNow());

    createNewEntry(newEntry, (results) => {
      setNewEntryClicked(false);
    });
  };

  const handleBack = () => {
    if (confirm("Are you sure you wish to cancel form entry?")) {
      setNewEntryClicked(false);
    }
    return;
  };

  return (
    <div>
      <div>
        <input
          value={titleInput}
          placeholder="Enter title here..."
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <div>
        <textarea
          value={bodyInput}
          placeholder="Enter body here..."
          rows="5"
          cols="80"
          onChange={(e) => setBodyInput(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
      <div>
        <button onClick={() => handleBack()}>Back</button>
      </div>
    </div>
  );
};

export default JournalEntry;
