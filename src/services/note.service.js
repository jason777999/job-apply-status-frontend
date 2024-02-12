import axios from "axios";

const API_URL = "http://localhost:5000/api/note/";

const getNoteList = () => {
  return axios.get(API_URL);
};

const addNote = ({ text, email }) => {
  console.log("Add job Service", text, email);
  return axios.post(API_URL + "/add", { text, email });
};

export default { getNoteList, addNote };
