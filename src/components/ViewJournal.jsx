import React from "react";
import { useState } from "react";

const ViewJournal = ({ currentEntry, setCurrentEntry }) => {
  return (
    <div>
      <div>{currentEntry.body}</div>
      <button onClick={() => setCurrentEntry({})}>Back</button>
    </div>
  );
};

export default ViewJournal;
