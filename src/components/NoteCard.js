import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../slices/note";
import { IconButton } from "@mui/material";
import { Delete, DeleteOutlined } from "@mui/icons-material";
import { convertTime } from "../common/utils";
import { NotificationManager } from "react-notifications";

export default function NoteCard({
  text,
  email,
  date,
  id,
  writerId,
  ...otherProps
}) {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((store) => store.auth);

  const handleClick = (e, id) => {
    e.stopPropagation();

    dispatch(deleteNote({ noteId: id }))
      .then(() => {
        NotificationManager.success("Note Deleted");
      })
      .catch((err) => {
        NotificationManager.error(err);
      });
  };

  return (
    <div
      className="flex flex-col p-2 bg-black bg-opacity-10 text-[#b5bac1] relative rounded-lg shadow-sm hover:bg-opacity-15 duration-100 cursor-pointer min-h-24 max-h-24 mb-1 overflow-hidden "
      {...otherProps}
    >
      <div className="overflow-hidden text-ellipsis text-nowrap">{text}</div>
      <div className="flex justify-between items-center text-[11px] text-[#949aa2]">
        <div className="self-end">
          PostedBy {email}. {convertTime(date)}
        </div>
        {isLoggedIn && writerId === user._id && (
          <IconButton
            onClick={(e) => handleClick(e, id)}
            className="text-[#e75d5d]"
          >
            <DeleteOutlined />
          </IconButton>
        )}
      </div>
    </div>
  );
}
