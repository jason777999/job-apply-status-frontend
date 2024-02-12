import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import JobService from "../services/job.service";

export const fetchJobList = createAsyncThunk(
  "job/fetchJobList",
  async ({}, thunkAPI) => {
    try {
      console.log("Action...");
      const response = await JobService.getJobList();
      console.log("Action,,", response);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email }, thunkAPI) => {
//     try {
//       const data = await AuthService.login(email);

//       if (data.success) {
//         return { user: data.user };
//       } else {
//         1;
//         const message = data.errors.join(", ");
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue();
//       }
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

const initialState = {};

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: {
    [fetchJobList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.jobList = action.payload.jobList;
    },
    [fetchJobList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchJobList.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // [login.fulfilled]: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    // },
    // [login.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
});

const { reducer } = jobSlice;
export default reducer;
