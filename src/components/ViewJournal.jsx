import React from "react";
import { useState } from "react";

const ViewJournal = ({ currentEntry }) => {

  return (
    <div>
      {currentEntry.body}
    </div>
  )
};

export default ViewJournal;