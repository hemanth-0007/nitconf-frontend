import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OtpInput from "../OtpInput";
import verifyOtp from "../../services/apiRequests/verifyOtp";
import sendOtp from "../../services/apiRequests/sendOtp";
import useNotification from "../../hooks/use-notification";
import conferenceImage from "../../assets/conference-image.jpg";
import { object, string, email } from "yup";

const LoginForm = (props) => {
  const { login } = useAuth();
  const { NotificationComponent, triggerNotification } =
    useNotification("top-right");

  const [token, setToken] = useState("");


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  });

  const [errors, setErrors] = useState({});

  const [showOtpInput, setShowOtpInput] = useState(false);

  useEffect(() => {
    const focusInput = () => {
      const emailElement = document.getElementById("email");
      emailElement.focus();
    };
    focusInput();
  } ,[]);

  
  const validateForm = object({
    email: string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: string().required("Password is required"),
  });



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
      await validateForm.validate(formData, { abortEarly: false });
      console.log("Form is valid");
    } catch (error) {
      const newErrors = {};
      console.log(error.inner);
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

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
        if (isOtpSent === false)
          return alert("OTP not sent Please try again later");
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
      <div className="flex flex-col justify-center items-start">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <div>
          <input
            type="password"
            id="password"
            className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-600 font-sans text-base">
              *{errors.password}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderUsernameField = () => {
    const { email } = formData;
    return (
      <div className="flex flex-col justify-center items-start">
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <div>
          <input
            type="text"
            id="email"
            className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={handleInputChange}
            placeholder="Username"
          />
          {errors.email && (
            <p className="text-red-600 font-sans text-base">*{errors.email}</p>
          )}
        </div>
      </div>
    );
  };

  const renderLoginForm = () => {
    const { showSubmitError, errorMsg } = formData;
    return (
      <form
        className="flex flex-col justify-normal items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="login-heading">Author Login</h1>
        <div className="">{renderUsernameField()}</div>
        <div className="">{renderPasswordField()}</div>
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
    return (
      <div className="rounded-lg shadow-lg p-5">
        <p className="text-center font-semibold text-lg ">
          Please Enter the OTP sent to <hr />
          {formData.email}
        </p>
        <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
      </div>
    );
  };

  const onOtpSubmit = async (otp) => {
    console.log(otp);
    const { email } = formData;
    console.log(email, otp);
    // this is an async function api call to backend
    try {
      const [status, data] = await verifyOtp(email, otp);
      const { message } = data;
      if (status === false) {
        triggerNotification({
          type: "error",
          message: message,
          duration: 3000,
          animation: "pop",
        });
        return;
      }
      triggerNotification({
        type: "success",
        message: message,
        duration: 3000,
        animation: "pop",
      });
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
      });
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
      <img src={conferenceImage} className="login-image" alt="website login" />
      {showOtpInput ? renderOtpForm() : renderLoginForm()}
    </div>
  );
};

export default LoginForm;
