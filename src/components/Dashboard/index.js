import "./index.css";
import Header from "../Header";
import DashboardCard from "../DashboardCard";
import { useState, useEffect, useHistory} from "react";
import Cookies from "js-cookie";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ViewApiFailureView from '../ViewApiFailureView';
import NoSessionsView from '../NoSessionsView';


const Dashboard = () => {
  const apiResponseStatusConstants = {
    intial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
  };
  // const history = useHistory();
  // const list = [
  //     {
  //         id: 1,
  //         imageUrl : "https://res.cloudinary.com/drvnhpatd/image/upload/v1706379166/vdlrgp7zuehwf8zlakau.jpg",
  //         title: 'Keynote Speakers',
  //         path: '/dashboard'
  //     },
  //     {
  //         id: 2,
  //         imageUrl : "https://res.cloudinary.com/drvnhpatd/image/upload/v1706379166/vdlrgp7zuehwf8zlakau.jpg",
  //         title: 'Electronic Proceedings',
  //         path: '/view-status'
  //     },
  //     {
  //         id: 3,
  //         imageUrl : "https://res.cloudinary.com/drvnhpatd/image/upload/v1706379166/vdlrgp7zuehwf8zlakau.jpg",
  //         title: 'Photosynthesis',
  //         path: '/notification'
  //     },
  //     {
  //         id: 4,
  //         title: 'Upload Paper',
  //         imageUrl : "https://res.cloudinary.com/drvnhpatd/image/upload/v1706379166/vdlrgp7zuehwf8zlakau.jpg",
  //         path: '/upload-paper'
  //     }
  // ];

  const [apiResponse, setApiResponse] = useState({
    paperList: [],
    apiResponseStatus: null,
  });


  const fetchPapers = async () => {
  
    setApiResponse( prevApiResponse => ({
      ...prevApiResponse,
      apiResponseStatus: apiResponseStatusConstants.intial,
    }));
    try {
      const jwtToken = Cookies.get("jwt_token");
      const url = "http://localhost:8082/api/papers/all/";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      console.log("The sessions response object :",response);
      if (response.ok) {
        const data = await response.json();
        console.log("The sessions data object :",data);
        console.log(data);
        // localStorage.setItem("sessionsList", JSON.stringify(data));
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.success,
          paperList: data,
        });
        // alert("Papers fetched successfully");
        return;
      } 
      else {
        // alert("Error in fetching the papers");
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.failure,
          paperList: [],
        });
        return;
      }
    } 
    catch (error) {
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

  const deletePaper = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:8082/api/abstract/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        alert("Paper deleted successfully");
        return;
      } else {
        alert("Error in deleting the paper");
        // return promise reject
        return Promise.reject(new Error("Error in deleting the paper"));
      }
    } catch (error) {
      console.log(`The error is : ${error.message}`);
    }
  }


  const onDeleteSession = async (id) => {
    try {
      await deletePaper(id);
      const { paperList } = apiResponse;
      const updatedPaperList = paperList.filter((item) => item.id !== id);
      setApiResponse( prevApiResponse => ({
        ...prevApiResponse,
        paperList: updatedPaperList,
      }));
      console.log("Paper Deleted successfully : ", id);
  } 
  catch (error) {
      console.log(`The error in deleting the paper : ${error.message}`);
  }
  }

  const renderDashboardLoadingView = () => (
        <div className="loader-container">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        </div>
  );
  const renderDashboardSuccessView = () => {
    const { paperList } = apiResponse;
    console.log(paperList);
    return(
        (paperList.length > 0) ? (
          <ul className="dashboard-session-list-container">
            {paperList.map((item) => (
                <DashboardCard id = {item._id} onDeleteSession = {onDeleteSession} cardDetails={item} />
            ))}
          </ul>
        ):(
          <NoSessionsView/>
        )
    );
  };

  const renderDashboardFailureView = () => <ViewApiFailureView/>;


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
}
  return (
    <div className="dashboard-container">
      <Header />
     {renderDashboard()}
    </div>
  );
};

export default Dashboard;
