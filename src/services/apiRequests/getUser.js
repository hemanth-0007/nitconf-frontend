import axios from "axios";
// import Cookies
import Cookies from "js-cookie";

const getUser = async () => {
  const jwtToken = Cookies.get("jwt_token");
  const url = `${process.env.REACT_APP_API_URL}/api/user/get/`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    if (response.status === 200) {
       localStorage.setItem("user", JSON.stringify(response.data));
       const user = JSON.parse(localStorage.getItem("user"));
       
        if(user === null){
          console.log("Error fetching username");
          throw new Error("Error fetching username");
        }
        console.log(user);
    } else {
      throw new Error("Error fetching username");
    }
  } catch (error) {
    throw new Error("Error fetching username");
  }
};

export default getUser;
