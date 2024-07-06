import Cookies from 'js-cookie';


// returns a boolen value based on the token verification
const verifyToken = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${process.env.REACT_APP_API_URL}/api/auth/verify-token/`;
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
    };
    try {
        const response = await fetch(url, options);
        if(response.ok){
            console.log("token verify success");
            return true;
        }
        console.log("token verify failure");
        return false;
    } catch (error) {
        console.error(`Error verifying token: ${error.message}`);
        return false;
    }
}

export default verifyToken;