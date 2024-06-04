import Cookies from "js-cookie";

const getAllPapersApiRequest = async () => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    const url = "http://localhost:8082/api/papers/all/";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(`Error fetching sessions: ${error.message}`);
    return null;
  }
};

export default getAllPapersApiRequest;
