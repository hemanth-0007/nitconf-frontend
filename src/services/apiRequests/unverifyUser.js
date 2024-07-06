

const unverifyUser = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/unverify/`;
    const emailBody = { email };
    console.log(emailBody);
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok){
            console.log("user unverified success");
            return [true, data];
        }
        console.log("user not unverified, something went wrong");
        return [false, data];
    } catch (error) {
        console.error(`something went wrong: ${error.message}`);
        return [false, { message: error.message }];
    }
};

export default unverifyUser;