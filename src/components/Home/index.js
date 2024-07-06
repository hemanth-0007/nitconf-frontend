import "./index.css";
import { Link } from "react-router-dom";
import {useState, useEffect } from "react";
import ViewApiFailureView from "../ViewApiFailureView";
import LoadingView from "../LoadingView";
import apiConstants from "../../constants/apiConstants";
import getUser from "../../services/apiRequests/getUser";

const Home = () => {
 

  const [apiResponse, setApiResponse] = useState({
    responseStatus : null,
    errorMsg: null,
    username: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setApiResponse({responseStatus : apiConstants.initial})
      try{
        await getUser();
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("user is", user);
        if(user === null){
          throw new Error("Error fetching username");
        }
        setApiResponse({
          responseStatus : apiConstants.success,
          errorMsg: "",
          username: user.firstname + " " + user.lastname 
        });
      }
      catch(error){
        setApiResponse({
          responseStatus : apiConstants.failure,
          errorMsg: error.message,
          username: ""
        });
      }  
    }
    fetchData();
  }, []);

  const renderLodingView = () =>  <LoadingView />;
  const renderHomeFailureView = () =>  <ViewApiFailureView />;

  const renderHomeSuccessView = () => {
    const {username} = apiResponse;
    return (
      <div className="home-container">
        <div className="home-content">
          <h1 className="text-amber-700 home-heading"> Welcome {username} </h1>
          <p className="home-description">
            Welcome to our conference website! Join industry leaders, academics,
            and enthusiasts for a dynamic exchange of ideas, insights, and
            innovations. Explore cutting-edge research, engage in lively
            discussions, and network with professionals from around the globe.
          </p>
          <img
            src="https://res.cloudinary.com/drvnhpatd/image/upload/v1706455644/sgllcp3jkrz5ibku3qof.jpg"
            alt="conference icon"
            className="home-mobile-img"
        />
          <Link to="/upload-paper">
            <button type="button" className="rounded-full bg-blue-600 text-white font-semibold
                                            hover:-translate-y-1 transition-all ease-in-out duration-100
                                            p-4 m-5">
              Upload Paper
            </button>
          </Link>
        </div>
        <img
          src="https://res.cloudinary.com/drvnhpatd/image/upload/v1706455644/sgllcp3jkrz5ibku3qof.jpg"
          alt="conference icon"
          className="home-desktop-img"
        />
      </div>
    );
  }
 

  const renderHomeView = () => {
    const {responseStatus } = apiResponse;
    switch (responseStatus ) {
      case apiConstants.initial:
        return (renderLodingView());
      case apiConstants.success:
        return (renderHomeSuccessView());
      case apiConstants.failure:
        return (renderHomeFailureView());
      default:
        return null;
    }
  }

  return (
    <>
    {renderHomeView()}
    </>
  );
};

export default Home;
