import React, { useState, useEffect } from "react";
// import "./register.css";
import { object, string } from "yup";

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

  useEffect(() => {
    const focusInput = () => {
      const firstNameelement = document.getElementById("firstName");
      firstNameelement.focus();
    };
    focusInput();
  }, []);

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
    <div className="border-2 flex flex-col justify-start items-center h-screen">
      <div className="mt-10">
        <form
          className="flex flex-col justify-start items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-bold text-2xl">Register</h1>

          <div className="">
            <div
              className="flex flex-row justify-between items-center
                          w-full"
            >
              <label
                className="font-semibold text-lg
                     m-3"
                htmlFor="firstName"
              >
                First Name
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  id="firstName"
                  className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-600 font-sans text-base">
                    *{errors.firstName}
                  </p>
                )}
              </div>
            </div>
            <div
              className="flex flex-row justify-between items-center
                          w-full"
            >
              <label
                className="font-semibold text-lg
                      m-3"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <div>
                <input
                  type="text"
                  id="lastName"
                  className="text-lg font-semibold p-3
                border-2 border-gray-300 rounded-lg m-3 w-80
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
            </div>
            <div
              className="flex flex-row justify-between items-center
                          w-full"
            >
              <label
                className="font-semibold text-lg
                      m-3 "
                htmlFor="email"
              >
                EMAIL
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="EMAIL ID"
                />
                {errors.email && (
                  <p className="text-red-600 font-sans text-base">
                    *{errors.email}
                  </p>
                )}
              </div>
            </div>
            <div
              className="flex flex-row justify-between items-center
                          w-full"
            >
              <label
                className="font-semibold text-lg
                      m-3 "
                htmlFor="password"
              >
                PASSWORD
              </label>
              <div>
                <input
                  type="password"
                  id="password"
                  className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
            </div>
            <div
              className="flex flex-row justify-around items-center
                          w-full"
            >
              <label
                className="font-semibold text-lg
                      m-3 "
                htmlFor="confirmPassword"
              >
                CONFIRM PASSWORD
              </label>
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
          </div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white font-semibold
                      p-3 m-3 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {" "}
            REGISTER{" "}
          </button>

          {formData.showSubmitError && (
            <p className="text-red-600 font-sans text-base">
              *{formData.errorMsg}
            </p>
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
    </div>
  );
};

export default Register;
