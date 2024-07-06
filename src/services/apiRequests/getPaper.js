import Cookies from "js-cookie";

const fetchPaper = async (paperId) => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${process.env.REACT_APP_API_URL}/api/papers/get/${paperId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("Error fetching session");
      return null;
    }
  } catch (error) {
    console.error("Error fetching session", error.message);
    return null;
  }
};

export default fetchPaper;
