import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { fetchJobList } from "../slices/job";

const Job = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { jobList } = useSelector((state) => state.job);

  console.log("JOb componnet", jobList);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>JOB</h3>
      </header>
    </div>
  );
};

export default Job;
