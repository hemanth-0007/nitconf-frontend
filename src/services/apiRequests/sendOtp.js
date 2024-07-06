

const sendOtp = async (email) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/send-otp/`;
    const emailBody = { email };
    console.log(emailBody);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok){
            console.log("otp sent success");
            return [true, data];
        }
        console.log("otp not sent, something went wrong");
        return [false, data];
    } catch (error) {
        console.error(`something went wrong: ${error.message}`);
        return [false, { message: error.message }];
    }
};

export default sendOtp;