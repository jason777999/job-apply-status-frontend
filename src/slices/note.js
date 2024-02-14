import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import NoteService from "../services/note.service";
import _ from "lodash";

export const fetchNoteList = createAsyncThunk(
  "node/fetchNoteList",
  async ({ searchKeyword }, thunkAPI) => {
    try {
      const response = await NoteService.getNoteList({searchKeyword});
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
  "node/addNote",
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
  "node/deleteNote",
  async ({ noteId }, thunkAPI) => {
    try {
      const response = await NoteService.deleteNote({ noteId });
      // console.log("First response", response);
      if (response.data.success) {
        return response.data;
      } else {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue(response.data.message);
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
  currentNote: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setCurrentNote(state, action) {
      console.log("set current...", action, state);
      if (action.payload !== undefined && action.payload.id !== undefined) {
        let index = state.notes.findIndex(
          (item) => item._id === action.payload.id
        );
        state.currentNote = state.notes[index];
      } else {
        state.currentNote = null;
      }
    },
  },
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
export const { setCurrentNote } = noteSlice.actions;
export default reducer;
