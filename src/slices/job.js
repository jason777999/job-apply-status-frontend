import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import JobService from "../services/job.service";
import _ from "lodash";

export const fetchJobList = createAsyncThunk(
  "job/fetchJobList",
  async ({}, thunkAPI) => {
    try {
      const response = await JobService.getJobList();
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addJobList = createAsyncThunk(
  "job/addJobList",
  async ({ link, linker }, thunkAPI) => {
    try {
      const response = await JobService.addJobList({ link, linker });
      // console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeJobList = createAsyncThunk(
  "job/removeJobList",
  async ({ link, linker }, thunkAPI) => {
    try {
      const response = await JobService.removeJobList({ link, linker });
      // console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {};

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: {
    [fetchJobList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchJobList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.jobList = [...action.payload.jobList];
    },
    [fetchJobList.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addJobList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addJobList.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.jobList = [...state.jobList, action.payload.saved];
      let index = state.jobList.findIndex(
        (item) => item._id === action.payload.saved._id
      );
      // console.log(index);
      if (index === -1) {
        state.jobList = [...state.jobList, action.payload.saved];
      } else {
        state.jobList[index] = { ...action.payload.saved };
      }

      // console.log("here is the last response,", index);
    },
    [addJobList.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [removeJobList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeJobList.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.jobList.findIndex(
        (item) => item._id === action.payload.removed._id
      );

      if (index !== -1) {
        state.jobList[index] = { ...action.payload.removed };
      }
    },
  },
});

const { reducer } = jobSlice;
export default reducer;
