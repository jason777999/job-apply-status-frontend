import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../slices/message";
import { addJobList, fetchJobList, removeJobList } from "../slices/job";
import _ from "lodash";
import JobItem from "./JobItem";
import Note from "./Note";

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
      .catch(() => {});
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
    setNewLink(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(addJobList({ link: newLink, linker: currentUser }))
        .unwrap()
        .then(() => {
          setNewLink("");
        })
        .catch(() => {
          console.log("Error occurs!");
        });
    }
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>JOB</h3>
      </header>
      <main style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div>
            {jobList &&
              jobList.length > 0 &&
              jobList.map(({ _id, link, applied }) => {
                return (
                  <JobItem
                    id={_id}
                    link={link}
                    applied={applied}
                    key={_id}
                    user={currentUser}
                  />
                );
              })}
          </div>
          <div>
            {isLoggedIn && (
              <input
                type="text"
                value={newLink}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            )}
          </div>
        </div>
        <div style={{ width: "280px" }}>
          <Note />
        </div>
      </main>
    </div>
  );
};

export default Job;
