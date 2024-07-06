import React, { useState } from "react";
import "./index.css";
import { object, string, array, mixed, ref } from "yup";

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

  const [errors, setErrors] = useState({});

  const validateForm = object({
    firstName: string()
      .required("First Name is required")
      .min(4, "First Name must be at least 4 characters")
      .max(30, "First Name cannot exceed 30 characters")
      .matches(/^[a-zA-Z\s]*$/, "First Name must be contain only alphabets"),
    lastName: string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(30, "Last Name cannot exceed 30 characters")
      .matches(/^[a-zA-Z\s]*$/, "Last Name must be contain only alphabets"),
    email: string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot exceed 30 characters"),
    confirmPassword: string().required("Confirm Password is required"),
    // .oneOf([string().ref("password")], "Passwords must match"),
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const stateName = target.id;
    setFormData((prev) => ({ ...prev, [stateName]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        formData;

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

      const userDetails = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      };
      console.log(userDetails);
      const url = `${process.env.REACT_APP_API_URL}/api/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      // console.log(response);

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

  return (
    <div className="border-2
    flex flex-row justify-between items-center">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="register-main-heading">Registration</h1>
        <div className="input-container">
          <div>
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
            {errors.firstName && (
              <p className="text-red-600 font-sans text-base">
                *{errors.firstName}
              </p>
            )}
          </div>
          <div>
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
            {errors.lastName && (
              <p className="text-red-600 font-sans text-base">
                *{errors.lastName}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
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
            {errors.email && (
              <p className="text-red-600 font-sans text-base">*{errors.email}</p>
            )}
          </div>
          <div>
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
            {errors.password && (
              <p className="text-red-600 font-sans text-base">
                *{errors.password}
              </p>
            )}
          </div>
          <div>
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
            {errors.confirmPassword && (
              <p className="text-red-600 font-sans text-base">
                *{errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="login-button hover:bg-blue-800 hover:ease-in-out"
        >
          {" "}
          REGISTER{" "}
        </button>

        {formData.showSubmitError && (
          <p className="text-red-600 font-sans text-base">*{formData.errorMsg}</p>
        )}
        <p className="footer-text">
          Already Registered ?{" "}
          <span
            className="font-semibold text-lg
          hover:cursor-pointer hover:underline transition-all ease-in-out"
            onClick={() => props.history.replace("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
