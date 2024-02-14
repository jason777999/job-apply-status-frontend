import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Job from "./components/Job";
import Header from "./components/Header";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { NotificationContainer } from 'react-notifications'

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <div className="w-full h-full flex flex-col">
          <Header />
          <div className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<Job />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <NotificationContainer/>
        </div>
      </StyledEngineProvider>
    </Router>
  );
};

export default App;
