import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fetchNoteList, setCurrentNote } from "../slices/note";
import NoteCard from "./NoteCard";
import {
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { convertTime } from "../common/utils";
import Scrollbar from "../shared-component/Scrollbar";
import { Search } from "@mui/icons-material";

export default function Note() {
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const { notes, currentNote } = useSelector((store) => store.note);

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

  const handleClick = (id) => {
    dispatch(setCurrentNote({ id }));
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    dispatch(setCurrentNote());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchNoteList({ searchKeyword: e.target.value.toString() }))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div
      className="h-full flex-col p-2 bg-[#313338] w-80 relative hidden lg:flex"
      style={{ borderLeft: "1px solid #4b4b4b" }}
    >
      <div className="flex mb-3" style={{ border: "1px solid #4b4b4b" }}>
        <InputBase
          sx={{ ml: 1, flex: 1, color: "#b5bac1" }}
          placeholder="Search Notes"
          inputProps={{ "aria-label": "search notes" }}
          onChange={handleSearch}
        />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#b5bac1" }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </div>
      <div className="w-full h-[545px] overflow-auto relative">
        <Scrollbar>
          {notes && notes.length > 0 ? (
            notes.map(
              ({ text, _id, writer: { email, _id: writerId }, date }) => {
                return (
                  <NoteCard
                    key={_id}
                    text={text}
                    email={email}
                    date={date}
                    id={_id}
                    writerId={writerId}
                    onClick={(e) => {
                      handleClick(_id);
                    }}
                  />
                );
              }
            )
          ) : (
            <div>
              <Typography variant="h5" className="text-center text-[#f2f3f5]">
                There is no data
              </Typography>
            </div>
          )}
        </Scrollbar>
      </div>

      <Dialog onClose={handleClose} open={openDialog}>
        <DialogContent
          style={{
            background: "#242424",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="./bg.svg"
            className="top-0 left-0 min-w-[600px]"
            style={{
              position: "absolute",
              top: "-30%",
              left: 0,
              width: "100%",
              opacity: "0.2",
            }}
          />
          <div
            className=" flex flex-col"
            style={{ minWidth: "500px", color: "#b5bac1" }}
          >
            <div>{currentNote && currentNote.text && currentNote.text}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                paddingTop: "10px",
              }}
            >
              <div>
                {currentNote &&
                  currentNote.writer &&
                  currentNote.writer.email &&
                  currentNote.writer.email}
              </div>
              <div>
                {currentNote &&
                  currentNote.date &&
                  convertTime(currentNote.date)}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
