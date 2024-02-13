import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobList, removeJobList } from "../slices/job";

export default function JobItem({ id, link, applied }) {
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
    <div>
      {isLoggedIn && (
        <input
          type="checkbox"
          checked={applied}
          onChange={({ target: { checked } }) => handleCheck(checked, link)}
        />
      )}

      <a href={link} target="blink">
        {link}
      </a>
    </div>
  );
}
