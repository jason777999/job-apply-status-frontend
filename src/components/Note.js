import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNoteList } from "../slices/note";
import NoteCard from "./NoteCard";
import { Navigate } from "react-router-dom";

export default function Note() {
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState("");

  const { notes } = useSelector((store) => store.note);

  const { user, isLoggedIn } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchNoteList({}))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setNewNote(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(addNote({ text: newNote, email: user.email }))
        .unwrap()
        .then(() => {
          setNewNote("");
        });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "gray",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      Hello I am note
      <div style={{ display: "flex", flexDirection: "column" }}>
        {notes &&
          notes.length > 0 &&
          notes.map(({ text, _id, writer: { email }, date }) => {
            return (
              <NoteCard
                key={_id}
                text={text}
                email={email}
                date={date}
                id={_id}
              />
            );
          })}
      </div>
      {isLoggedIn && (
        <input
          type="text"
          value={newNote}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}
