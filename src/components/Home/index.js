import "./index.css";
import Header from "../Header";
import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import Cookies from "js-cookie";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ViewApiFailureView from "../ViewApiFailureView";


const Home = () => {
  
  const apiResponseStatusConstants = {
    intial: 'INITIAL',
    sucess: 'SUCCESS',
    failure: 'FAILURE',
  };

  const [apiResponse, setApiResponse] = useState({
    apiResponseStatus: null,
    errorMsg: null,
    username: "",
  });

  useEffect(() => {
    const getUsername = async () => {
      // const localStorageUsername = localStorage.getItem("username");
      // if (localStorageUsername !== null) {
      //   setApiResponse({
      //     apiResponseStatus: apiResponseStatusConstants.sucess,
      //     username: localStorageUsername,
      //   });
      //   return;
      // }
      setApiResponse(prevApiResponse => ({
        ...prevApiResponse,
        apiResponseStatus: apiResponseStatusConstants.intial
      }));
      try {
      const jwtToken = Cookies.get("jwt_token");
      const url = "http://localhost:8082/api/user/profile/";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("username", data.firstName + " " + data.lastName);
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          apiResponseStatus: apiResponseStatusConstants.sucess,
          username: data.firstName + " " + data.lastName,
        }));
      } else {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          apiResponseStatus: apiResponseStatusConstants.failure,
          errorMsg: "Failed to fetch the username. Please try again later.",
        }));
      }
      } catch (error) {
        setApiResponse(prevApiResponse => ({
          ...prevApiResponse,
          apiResponseStatus: apiResponseStatusConstants.failure,
          errorMsg: error.message,
        }));
      }
      // setUsername(data.firstName + " " + data.lastName);
    }
    getUsername();
  }, []);

  const renderLodingView = () => {
    return (
      <div className="loader-container">
          <Loader type="ThreeDots" color="blue" height={80} width={80} />
      </div>
    );
  }

  const renderHomeSuccessView = () => {
    const {username} = apiResponse;
    return (
      <div className="home-container">
        <div className="home-content">
          <h1 className="text-amber-700 home-heading"> Welcome {username} </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Welcome to our conference website! Join industry leaders, academics,
            and enthusiasts for a dynamic exchange of ideas, insights, and
            innovations. Explore cutting-edge research, engage in lively
            discussions, and network with professionals from around the globe.
          </p>
          <Link to="/upload-paper">
            <button type="button" className="shop-now-button">
              Upload Paper
            </button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/drvnhpatd/image/upload/v1706455644/sgllcp3jkrz5ibku3qof.jpg"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    );
  }

  const renderHomeFailureView = () =>  <ViewApiFailureView />;



  const renderHomeView = () => {
    const {apiResponseStatus} = apiResponse;
    switch (apiResponseStatus) {
      case apiResponseStatusConstants.intial:
        return (renderLodingView());
      case apiResponseStatusConstants.sucess:
        return (renderHomeSuccessView());
      case apiResponseStatusConstants.failure:
        return (renderHomeFailureView());
      default:
        return null;
    }
  }

  return (
    <>
    <Header />
    {renderHomeView()}
    </>
  );
};

export default Home;
