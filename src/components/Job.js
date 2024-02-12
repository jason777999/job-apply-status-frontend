import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../slices/message";
import { addJobList, fetchJobList, removeJobList } from "../slices/job";
import _ from "lodash";

const Job = () => {
  const dispatch = useDispatch();

  // store data
  const { user: currentUser } = useSelector((state) => state.auth);
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

  const handleCheck = (checked, link) => {
    checked = !checked;
    if (checked) {
      console.log("Checked. so uncheck it!");
      dispatch(removeJobList({ link, linker: currentUser }))
        .unwrap()
        .then(() => {})
        .catch(() => {
          console.log("Error occurs!");
        });
    } else {
      dispatch(addJobList({ link, linker: currentUser }))
        .unwrap()
        .then(() => {
          setNewLink("");
        })
        .catch(() => {
          console.log("Error occurs!");
        });
    }
  };

  // redirection
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>JOB</h3>
        <div>
          {jobList &&
            jobList.length > 0 &&
            jobList.map(({ _id, link, applied }) => {
              return (
                <div key={_id}>
                  <input
                    type="checkbox"
                    checked={applied}
                    onChange={({ target: { checked } }) =>
                      handleCheck(checked, link)
                    }
                  />
                  <a href={link} target="blink">
                    {link}
                  </a>
                </div>
              );
            })}
        </div>
        <input
          type="text"
          value={newLink}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </header>
    </div>
  );
};

export default Job;
