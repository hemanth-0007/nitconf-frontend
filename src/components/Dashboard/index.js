import "./index.css";
import DashboardCard from "../DashboardCard";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ViewApiFailureView from "../ViewApiFailureView";
import NoSessionsView from "../NoSessionsView";
import LoadingView from "../LoadingView";
import deletePaper from "../../services/apiRequests/deletePaper";
import useNotification from "../../hooks/use-notification";


const Dashboard = () => {
  const apiResponseStatusConstants = {
    intial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
  };

  const {NotificationComponent, triggerNotification} =
  useNotification("top-right");

  const [apiResponse, setApiResponse] = useState({
    paperList: [],
    apiResponseStatus: null,
  });

  const fetchPapers = async () => {
    setApiResponse((prevApiResponse) => ({
      ...prevApiResponse,
      apiResponseStatus: apiResponseStatusConstants.intial,
    }));
    try {
      const jwtToken = Cookies.get("jwt_token");
      const url = `${process.env.REACT_APP_API_URL}/api/papers/all/`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      console.log("The sessions response object :", response);
      if (response.ok) {
        const data = await response.json();
        console.log("The sessions data object :", data);
        console.log(data);
        // localStorage.setItem("sessionsList", JSON.stringify(data));
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.success,
          paperList: data,
        });
        // alert("Papers fetched successfully");
        return;
      } else {
        // alert("Error in fetching the papers");
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.failure,
          paperList: [],
        });
        return;
      }
    } catch (error) {
      console.log(`The error is : ${error.message}`);
      setApiResponse({
        apiResponseStatus: apiResponseStatusConstants.failure,
        paperList: [],
      });
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);
 
  const onDeleteSession = async (id) => {
    try {
      const [isDeleted, data] =  await deletePaper(id);
      const {message} = data;
      if(!isDeleted){
        triggerNotification({
          type: "error",
          message: `${message}`,
          duration: 3000,
          animation: "pop",
        })
        console.log(message);
        return ;
      }
      const { paperList } = apiResponse;
      const updatedPaperList = paperList.filter((item) => item._id !== id);
      setApiResponse((prevApiResponse) => ({
        ...prevApiResponse,
        paperList: updatedPaperList,
      }));
      triggerNotification({
        type: "success",
        message: `${message}`,
        duration: 3000,
        animation: "pop",
      })
      console.log("Paper Deleted successfully : ", id);
    } catch (error) {
      triggerNotification({
        type: "error",
        message: `Failed: ${error.message}`,
        duration: 3000,
        animation: "pop",
      })
      console.log(`The error in deleting the paper : ${error.message}`);
    }
  };

  const renderDashboardLoadingView = () => <LoadingView />;
  const renderDashboardSuccessView = () => {
    const { paperList } = apiResponse;
    // console.log(paperList);
    return paperList.length > 0 ? (
      <>
        {NotificationComponent}
        <ul className="dashboard-session-list-container">
          {paperList.map((item) => (
            <DashboardCard
              id={item._id}
              onDeleteSession={onDeleteSession}
              cardDetails={item}
            />
          ))}
        </ul>
      </>
    ) : (
      <NoSessionsView />
    );
  };

  const renderDashboardFailureView = () => <ViewApiFailureView />;

  const renderDashboard = () => {
    const { apiResponseStatus } = apiResponse;
    switch (apiResponseStatus) {
      case apiResponseStatusConstants.intial:
        return renderDashboardLoadingView();
      case apiResponseStatusConstants.success:
        return renderDashboardSuccessView();
      case apiResponseStatusConstants.failure:
        return renderDashboardFailureView();
      default:
        return null;
    }
  };
  return (
    <>
      {renderDashboard()}
    </>
  );
};

export default Dashboard;
