

const verifyOtp = async (email, otp) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp/`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok){
            console.log("otp verify success");
            return [true, data];
        }
        console.log("otp verify failed");
        return [false, data];
    } catch (error) {
        console.error(`Error verifying otp: ${error.message}`);
        return [false, { message: error.message }];
    }
};

export default verifyOtp;