import axios from "axios";

const API_URL = "http://localhost:5000/api/job-link/";

const getJobList = () => {
  console.log('Service :(')
  return axios.get(API_URL);
};

export default { getJobList };
