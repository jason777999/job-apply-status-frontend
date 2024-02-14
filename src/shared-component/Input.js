import styled from "@emotion/styled";
import React from "react";
import Send from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

const AppInputText = ({ onButtonClick, ...otherProps }) => {
  return (
    <div className="flex pl-4 pr-2 pt-1 pb-1 rounded-lg bg-black bg-opacity-10">
      <input
        type="text"
        {...otherProps}
        className="flex-grow outline-none text-[#b5bac1] text-md bg-transparent"
      />
      <IconButton
        aria-label="delete"
        size="large"
        color="primary"
        onClick={() => {
          onButtonClick();
        }}
      >
        <Send fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default AppInputText;
