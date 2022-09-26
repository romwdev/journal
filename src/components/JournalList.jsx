import React from "react";
import { useState } from "react";

const JournalList = ({ currentUser, setCurrentEntry }) => {
  return (
  <div>
    {currentUser ?
    <div>
      { currentUser.entries.map((entry, i) => (
        <div key={i} onClick={() => setCurrentEntry(entry)}>
          {entry.title}
        </div>
      ))}
    </div>
    : null}
  </div>
  )
};

export default JournalList;
