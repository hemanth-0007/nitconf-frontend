import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";


const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
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
  }

  const onSubmitSuccess = (jwtToken) => {
    const { history } = props;
    alert("Login Success");
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = formData;
      const userDetails = { email, password };
      console.log(userDetails);
      const url = "http://localhost:8082/api/auth/login/";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to indicate JSON format
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok === true){
        const data = await response.json();
        console.log(data);
        const {token} = data;
        console.log(token);
        onSubmitSuccess(token);
      }
      else {
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




  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) return <Redirect to="/" />;
  const { showSubmitError, errorMsg } = formData;
  return (
    <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/drvnhpatd/image/upload/v1705997469/Ecological_press_conference_member_speaking_on_stage_w7bnit.jpg"
          className="login-image"
          alt="website login"
        />
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
            <span
              onClick={onClickRegister}
              className="register register-new"
            >
              Register Here
            </span>
          </p>
        </form>
      </div>
  );
};

export default LoginForm;
