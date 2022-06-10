import axios from "axios";
const token = localStorage.getItem("encodedToken");

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

export { postCall };
