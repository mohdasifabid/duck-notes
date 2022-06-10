import axios from "axios";
const token = localStorage.getItem("encodedToken");

const getCall = async (endPoint) => {
  const response = await axios.post(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

const postCall = async (endPoint, requestBody) => {
  const response = await axios.post(endPoint, requestBody, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

export { getCall, postCall };
