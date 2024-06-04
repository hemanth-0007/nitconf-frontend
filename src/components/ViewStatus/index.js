import "./index.css";
// react hooks
import { useState, useEffect } from "react";

// components
import Header from "../Header";
import ViewApiFailureView from "../ViewApiFailureView";

// loader spinner
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// utils
import toDateTimeFormat from "../../utils/toDateTimeFormat";

// constants
import apiResponseStatusConstants from "../../constants/apiResponseStatusConstants";

// services api requests
import getAllPapersApiRequest from "../../services/apiRequests/getAllPapers";


const ViewStatus = () => {
  const [apiResponse, setApiResponse] = useState({
    apiResponseStatus: apiResponseStatusConstants.initial,
    papers: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getSessions = async () => {
      setApiResponse((prevApiResponse) => ({
        ...prevApiResponse,
        apiResponseStatus: apiResponseStatusConstants.progess,
      }));
      try {
        const response = await getAllPapersApiRequest();
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // alert('Sessions fetched successfully');
          setApiResponse({
            apiResponseStatus: apiResponseStatusConstants.success,
            papers: data,
            errorMsg: null,
          });
        } else {
          setApiResponse({
            apiResponseStatus: apiResponseStatusConstants.failure,
            papers: null,
            errorMsg: "Error fetching sessions",
          });
          // alert('Error fetching sessions');
          return;
        }
      } catch (error) {
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.failure,
          papers: null,
          errorMsg: `Error fetching sessions: ${error.message}`,
        });
      }
    };
    getSessions();
  }, []);

  const renderViewStatusLoadingView = () => {
    return (
      <div className="loader-container">
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  };

  const renderViewStatusSuccessView = () => {
    return (
      <div className="view-status-container">
        <h1 className="view-status-main-heading text-center m-5">
          View Status
        </h1>
        <div>
          <table className="table-container">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
            {apiResponse.papers.map((paper) => (
              <tr key={paper._id}>
                <td>{paper.title}</td>
                <td>Pending</td>
                <td>{toDateTimeFormat(paper.createdAt)}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  };

  const renderViewStatusFailureView = () => <ViewApiFailureView />;

  const renderViewStatus = () => {
    const { apiResponseStatus } = apiResponse;
        switch (apiResponseStatus) {
        case apiResponseStatusConstants.progess:
            return renderViewStatusLoadingView();
        case apiResponseStatusConstants.success:
            return renderViewStatusSuccessView();
        case apiResponseStatusConstants.failure:
            return renderViewStatusFailureView();
        default:
            return null;
        }
  };

  return (
    <>
      <Header />
      {renderViewStatus()}
    </>
  );
};

export default ViewStatus;
