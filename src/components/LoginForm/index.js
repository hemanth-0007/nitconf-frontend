import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OtpInput from "../OtpInput";
import verifyOtp from "../../services/apiRequests/verifyOtp";
import sendOtp from "../../services/apiRequests/sendOtp";
import useNotification from "../../hooks/use-notification";

const LoginForm = (props) => {
  const { login } = useAuth();
  const {NotificationComponent, triggerNotification} =
  useNotification("top-right");

  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const stateName = target.id;
    setFormData((prevFormData) => ({ ...prevFormData, [stateName]: value }));
  };

  const onSubmitFailure = (errorMsg) => {
    alert("Login Failed");
    setFormData((prevFormData) => ({
      ...prevFormData,
      showSubmitError: true,
      errorMsg,
    }));
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = formData;
      const userDetails = { email, password };
      console.log(userDetails);
      console.log(process.env.REACT_APP_API_URL);
      const url = `${process.env.REACT_APP_API_URL}/api/auth/login/`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to indicate JSON format
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok === true) {
        const data = await response.json();
        console.log(data);
        const { token } = data;
        // console.log(token);
        // using the auth context
        // login(token);
        // onSubmitSuccess(token);
        setToken(token);
        setShowOtpInput(true);
        console.log(email);
        const isOtpSent = await sendOtp(email);
        if(isOtpSent === false) return alert("OTP not sent Please try again later");
        alert("OTP sent successfully");


      } else {
        onSubmitFailure("Invalid Username or Password error occurred");
      }
    } catch (error) {
      console.log("Error while Logging in", error);
    }
  };

  const onClickRegister = () => {
    const { history } = props;
    history.push("/register");
  };

  const renderPasswordField = () => {
    const { password } = formData;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={handleInputChange}
          placeholder="Password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    const { email } = formData;
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={handleInputChange}
          placeholder="Username"
        />
      </>
    );
  };

  const renderLoginForm = () => {
    const { showSubmitError, errorMsg } = formData;
    return (
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="login-heading">Author Login</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        <p className="register">
          New User ?{" "}
          <span onClick={onClickRegister} className="register register-new">
            Register Here
          </span>
        </p>
      </form>
    );
  };

  const renderOtpForm = () => {
    return <div className="rounded-lg shadow-lg p-5">
      <p className="text-center font-semibold text-lg ">Please Enter the OTP sent to <hr/>{formData.email}</p>
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
    </div>;
  };

  const onOtpSubmit = async (otp) => {
    console.log(otp);
    const { email } = formData;
    console.log(email, otp);
    // this is an async function api call to backend
    try {
      const [status, data] = await verifyOtp(email, otp);
      const { message } = data;
      if(status === false){
        triggerNotification({
          type: "error",
          message: message,
          duration: 3000,
          animation: "pop",
        })
        return;
      }
      triggerNotification({
        type: "success",
        message: message,
        duration: 3000,
        animation: "pop",
      })
      const { history } = props;
      Cookies.set("jwt_token", token, {
        expires: 30,
        path: "/",
      });
      login(token);
      history.replace("/");
      return;
    } catch (error) {
      triggerNotification({
        type: "error",
        message: error.message,
        duration: 3000,
        animation: "pop",
      })
      console.log("Error while verifying OTP", error.message);
      return;
    }
  };

  //  Check if the user is already logged in
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) return <Redirect to="/" />;

  return (
    <div className="login-form-container">
       {NotificationComponent}
      <img
        src="https://res.cloudinary.com/drvnhpatd/image/upload/v1705997469/Ecological_press_conference_member_speaking_on_stage_w7bnit.jpg"
        className="login-image"
        alt="website login"
      />
      {showOtpInput ? renderOtpForm() : renderLoginForm()}
    </div>
  );
};

export default LoginForm;
