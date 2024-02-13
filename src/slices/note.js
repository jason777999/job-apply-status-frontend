import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import NoteService from "../services/note.service";
import _ from "lodash";

export const fetchNoteList = createAsyncThunk(
  "job/fetchNoteList",
  async ({}, thunkAPI) => {
    try {
      const response = await NoteService.getNoteList();
      console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue();
      }
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

export const addNote = createAsyncThunk(
  "job/addNote",
  async ({ text, email }, thunkAPI) => {
    try {
      const response = await NoteService.addNote({ text, email });
      // console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      }
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

export const deleteNote = createAsyncThunk(
  "job/deleteNote",
  async ({ noteId }, thunkAPI) => {
    try {
      const response = await NoteService.deleteNote({ noteId });
      // console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      }
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

const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  extraReducers: {
    [fetchNoteList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchNoteList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notes = [...action.payload.notes];
    },
    [fetchNoteList.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addNote.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addNote.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.notes = [...state.notes, action.payload.note];
    },
    [addNote.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteNote.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.notes.findIndex(
        (item) => item._id === action.payload.removed._id
      );

      state.notes.splice(index, 1);
    },
    [deleteNote.pending]: (state, action) => {
      state.isLoading = true;
    },
  },
});

const { reducer } = noteSlice;
export default reducer;
