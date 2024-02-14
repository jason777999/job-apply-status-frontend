import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EventBus from "../common/EventBus";
import { logout } from "../slices/auth";
import {
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Login, PersonAddAlt } from "@mui/icons-material";
import { Search } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();

  const nagivate = useNavigate();

  const { isLoggedIn, user: currentUser } = useSelector((store) => store.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  // mui
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    nagivate("/login");
  };

  const handleLogout = () => {
    handleClose();
    logOut();
    nagivate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    nagivate("/register");
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-20 flex justify-between items-center pl-6 pr-6 bg-[#2b2d31] text-[#f2f3f5]">
      <div className="">
        <Link to={"/"} className="flex items-center no-underline">
          <img src="./logo.png" width={60} className="logo"/>
          <Typography
            variant="h4"
            className="pl-3"
            sx={{ fontFamily: "Forte" }}
          >
            Apply Together
          </Typography>
        </Link>
      </div>

      <div className="relative">
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="absolute top-0 left-10 hidden">
              {currentUser.email}
            </div>

            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {currentUser.email}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="flex">
            <Button
              className="mr-2"
              variant="outlined"
              startIcon={<Login />}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              startIcon={<PersonAddAlt />}
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
