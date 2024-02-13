import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../slices/note";

export default function NoteCard({ text, email, date, id, ...otherProps }) {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((store) => store.auth);

  const handleClick = (id) => {
    console.log("Delete Note Function", id);
    dispatch(deleteNote({ noteId: id }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        background: "white",
        borderRadius: "8px",
        position: "relative",
      }}
      {...otherProps}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>{email}</div>
        <div>{date}</div>
      </div>
      <div>{text}</div>
      <div>
        {isLoggedIn && (
          <button
            onClick={() => {
              handleClick(id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
