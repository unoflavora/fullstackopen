import axios from "axios";
const baseUrl = "/api/login";

const Login = async (username, password) => {
  const response = axios.post(baseUrl, { username, password });
  return response;
};

export default { Login };
