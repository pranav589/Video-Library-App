import axios from "axios";

const baseURL = "http://localhost:5000";

export const apiCall = async (type, url, token, payload) => {
  const res = await axios({
    method: type,
    url: `${baseURL}/api/${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: payload,
  });
  return res;
};
