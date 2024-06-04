import Cookies from "js-cookie";

const getAllTags = async () => {
  const jwtToken = Cookies.get("jwt_token");
  const url = "http://localhost:8082/api/tags/get-all/";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("tagsList", JSON.stringify(data));
      return data;
    } else {
      console.log("Error fetching tags");
      throw new Error("Error fetching all tags");
    }
  } catch (error) {
    console.error("Error fetching tags", error);
    throw new Error("Error fetching all tags");
  }
};

export default getAllTags;
