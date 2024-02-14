import axios from "axios";

const API_URL = "http://localhost:5000/api/note";

const getNoteList = ({ searchKeyword }) => {
  return axios.post(API_URL, { searchKeyword });
};

const addNote = ({ text, email }) => {
  console.log("Add note Service", text, email);
  return axios.post(API_URL + "/add", { text, email });
};

const deleteNote = ({ noteId }) => {
  console.log("Delete Note Service", noteId);
  return axios.get(`${API_URL}/delete/${noteId}`);
};

export default { getNoteList, addNote, deleteNote };
