import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const AddColumnBotton = () => {
  return (
    <div>
      <div className="flex w-20 h-10 p-1 rounded cursor-pointer hover:bg-gray-400">
        <AddIcon />
        <p>追加</p>
      </div>
    </div>
  );
};

export default AddColumnBotton;
