import React, { useState } from "react";
import "./index.css";

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
    showSubmitError: false,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const stateName = target.id;
    setFormData((prevFormData) => ({ ...prevFormData, [stateName]: value }));
  };


  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        setFormData({
          errorMsg: "Please enter all the details",
          showSubmitError: true,
        });
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setFormData({
          errorMsg: "Please enter a valid email",
          showSubmitError: true,
        });
        return;
      }

      const userDetails = {
        firstName,
        lastName,
        email,
        password,
      };
      console.log(userDetails);
      const url = "http://localhost:8082/api/auth/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to indicate JSON format
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Registered Successfully");
        props.history.replace("/login");
      } else alert("Unable to Register \n Please Try Again Later");
    } catch (error) {
      console.log("Error while Registering", error);
    }
  };

  const onClickLogin = () => {
    props.history.replace("/login");
  }
  return (
    <div className="register-form-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="register-main-heading">Registration</h1>
        <div className="input-container">
          <>
            <label className="input-label" htmlFor="firstName">
              FIRST NAME
            </label>
            <input
              type="text"
              id="firstName"
              className="username-input-field"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="FIRST NAME"
            />
          </>
          <>
            <label className="input-label" htmlFor="lastName">
              LAST NAME
            </label>
            <input
              type="text"
              id="lastName"
              className="username-input-field"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="LAST NAME"
            />
          </>
          <>
            <label className="input-label" htmlFor="email">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="username-input-field"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="EMAIL ID"
            />
          </>
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="username-input-field"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="PASSWORD"
            />
          </>
          <>
            <label className="input-label" htmlFor="confirmPassword">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="username-input-field"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="RE-ENTER YOUR PASSWORD"
            />
          </>
        </div>
        <button type="submit" className="login-button">
          {" "}
          REGISTER{" "}
        </button>
        {formData.showSubmitError && (
          <p className="error-message">*{formData.errorMsg}</p>
        )}
      <p className="footer-text">
        Already Registered ? <span className="span-login" onClick={onClickLogin}>Login</span>
      </p>
      </form>
    </div>
  );
};

export default Register;
