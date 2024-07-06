import Cookies from "js-cookie";

const uploadPaper = async (paperData) => {
  const jwtToken = Cookies.get("jwt_token");
  const url = `${process.env.REACT_APP_API_URL}/api/papers/add/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(paperData),
  };
  try {
    const response = await fetch(url, options);
    console.log( response);
    const data = await response.json();
    console.log(data);
    if (response.ok) return [true, data];
    return [false, data];
  } catch (error) {
    console.log("Error in uploading the paper : ", error.message);
    return [false, {message : error.message}];
  }
};

export default uploadPaper;
