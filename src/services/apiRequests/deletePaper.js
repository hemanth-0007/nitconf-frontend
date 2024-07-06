import Cookies from "js-cookie";

const deletePaper = async (paper_id) => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${process.env.REACT_APP_API_URL}/api/papers/delete/${paper_id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    // data : {message : .....}
    if (response.ok) return [true, data];
    return [false, data];
  } catch (error) {
    // console.error(`Error deleting the Paper : ${error.message}`);
    return [false, {message : error.message}];
  }
};

export default deletePaper;
