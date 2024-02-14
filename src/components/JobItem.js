import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobList, removeJobList } from "../slices/job";
import { Checkbox } from "@mui/material";
import styled from "styled-components";

const JobLink = styled.a`
  color: #b5bac1;
  text-decoration: none;
`;
export default function JobItem({ id, link, applied, index }) {
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleCheck = (checked, link) => {
    checked = !checked;
    if (checked) {
      console.log("Checked. so uncheck it!");
      dispatch(removeJobList({ link, linker: user }))
        .unwrap()
        .then(() => {})
        .catch(() => {
          console.log("Error occurs!");
        });
    } else {
      dispatch(addJobList({ link, linker: user }))
        .unwrap()
        .then(() => {})
        .catch(() => {
          console.log("Error occurs!");
        });
    }
  };

  return (
    <div
      className="w-full flex items-center p-2 animate__animated animate__fadeInDown bg-black bg-opacity-10"
      style={{
        borderBottom: "1px solid #4b4b4b",
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {isLoggedIn && (
        <Checkbox
          checked={applied}
          onChange={({ target: { checked } }) => handleCheck(checked, link)}
          sx={{
            color: "#224e76",
            "&.Mui-checked": {
              color: "#0b61ad",
            },
          }}
        />
      )}

      <JobLink href={link} target="blink" className="hover:no-underline ml-2">
        {link}
      </JobLink>
    </div>
  );
}
