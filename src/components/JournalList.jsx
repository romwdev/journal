import React from "react";
import { useState, useEffect } from "react";

const JournalList = ({ currentUser, setCurrentEntry, setNewEntryClicked, }) => {

  return (
    <div>
      {currentUser ? (
        <div>
          {currentUser.entries.map((entry, i) => (
            <div key={i} onClick={() => setCurrentEntry(entry)}>
              {entry.title}
            </div>
          ))}
        </div>
      ) : null}
      <button
        onClick={() => {
          setNewEntryClicked(true);
        }}
      >
        Create New Journal Entry
      </button>
    </div>
  );
};

export default JournalList;
