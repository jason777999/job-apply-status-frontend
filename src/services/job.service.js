import axios from "axios";

const API_URL = "http://localhost:5000/api/job-link/";

const getJobList = () => {
  return axios.get(API_URL);
};

const addJobList = ({ link, linker: { _id, email } }) => {
  console.log("Add job Service", link, email);
  return axios.post(API_URL + "/add", { link, email, userId: _id });
};

const removeJobList = ({ link, linker: { _id, email } }) => {
  console.log("remove job Service", link, _id);
  return axios.post(API_URL + "/delete", { link, userId: _id, email });
};

export default { getJobList, addJobList, removeJobList };
