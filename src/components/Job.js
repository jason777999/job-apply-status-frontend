import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../slices/message";
import { addJobList, fetchJobList, removeJobList } from "../slices/job";
import _ from "lodash";
import JobItem from "./JobItem";
import Note from "./Note";
import { Input, TextField, Typography } from "@mui/material";
import AppInputText from "../shared-component/Input";
import { isValidUrl } from "../common/utils";
import { addNote } from "../slices/note";
import Scrollbar from "../shared-component/Scrollbar";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { NotificationManager } from "react-notifications";

const Job = () => {
  const dispatch = useDispatch();

  // store data
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const { jobList } = useSelector((state) => state.job);

  // state
  const [newLink, setNewLink] = useState("");

  // fetch data
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchJobList({}))
      .unwrap()
      .then(() => {})
      .catch((msg) => {
        NotificationManager.error(msg);
      });
  }, [dispatch]);

  // state handle methods
  const handleInput = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setNewLink("");
    } else {
      setNewLink(e.target.value);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setNewLink(event.target.value);
  };

  const addNewContent = () => {
    if (isValidUrl(newLink)) {
      dispatch(addJobList({ link: newLink, linker: currentUser }))
        .unwrap()
        .then(() => {
          setNewLink("");
          NotificationManager.success("New Link Added");
        })
        .catch((msg) => {
          NotificationManager.error(msg);
        });
    } else {
      dispatch(addNote({ text: newLink, email: currentUser.email }))
        .unwrap()
        .then(() => {
          setNewLink("");
          NotificationManager.success("New Note Added");
        })
        .catch((err) => {
          NotificationManager.error(err);
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addNewContent();
    }
  };

  return (
    <div className="w-full flex h-full ">
      <div className="flex-grow h-full  bg-[#313338] relative">
        <div
          className="flex flex-col pl-3 pr-3 relative pt-2"
          style={{ paddingBottom: "8px", height : isLoggedIn ? '550px' : "610px" }}
        >
          <Scrollbar>
            {jobList && jobList.length > 0 ? (
              jobList.map(({ _id, link, applied }, index) => {
                return (
                  <JobItem
                    id={_id}
                    link={link}
                    applied={applied}
                    key={_id}
                    user={currentUser}
                    index={index}
                  />
                );
              })
            ) : (
              <div>
                <Typography
                  variant="h3"
                  className="text-center text-[#f2f3f5] pt-2"
                >
                  There is no data
                </Typography>
              </div>
            )}
          </Scrollbar>
        </div>

        {isLoggedIn && (
          <div className="w-full absolute bottom-0 left-0 p-[15px] ">
            <AppInputText
              value={newLink}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onButtonClick={() => addNewContent()}
            />
          </div>
        )}
      </div>
      <Note />
    </div>
  );
};

export default Job;
