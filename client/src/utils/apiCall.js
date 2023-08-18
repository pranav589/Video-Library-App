import axios from "axios";

const baseURL = "https://video-library-032i.onrender.com";

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
