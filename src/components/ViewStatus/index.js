import "./index.css";
import { useState, useEffect } from "react";
import ViewApiFailureView from "../ViewApiFailureView";
import LoadingView from "../LoadingView";
import toDateTimeFormat from "../../utils/toDateTimeFormat";
import apiConstants from "../../constants/apiConstants";

import getAllPapersApiRequest from "../../services/apiRequests/getAllPapers";
import NoSessionsView from "../NoSessionsView";


const ViewStatus = () => {
  const [apiResponse, setApiResponse] = useState({
    apiResponseStatus: apiConstants.initial,
    papers: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getPapers = async () => {
      setApiResponse((prevApiResponse) => ({
        ...prevApiResponse,
        apiResponseStatus: apiConstants.progess,
      }));
      try {
        const response = await getAllPapersApiRequest();
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // alert('Sessions fetched successfully');
          setApiResponse({
            apiResponseStatus: apiConstants.success,
            papers: data,
            errorMsg: null,
          });
        } else {
          setApiResponse({
            apiResponseStatus: apiConstants.failure,
            papers: null,
            errorMsg: "Error fetching Papers",
          });
         
          return;
        }
      } catch (error) {
        setApiResponse({
          apiResponseStatus: apiConstants.failure,
          papers: null,
          errorMsg: `Error fetching sessions: ${error.message}`,
        });
      }
    };
    getPapers();
  }, []);

  const renderViewStatusLoadingView = () =>  <LoadingView />;

  const renderViewStatusSuccessView = () => {
    const { papers } = apiResponse;
    const isPapersAvailable = papers.length > 0;
    if(isPapersAvailable) {
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
        </div>);
    }
    else {
      return <NoSessionsView />;
    }
  };

  const renderViewStatusFailureView = () => <ViewApiFailureView />;

  const renderViewStatus = () => {
    const { apiResponseStatus } = apiResponse;
        switch (apiResponseStatus) {
        case apiConstants.progess:
            return renderViewStatusLoadingView();
        case apiConstants.success:
            return renderViewStatusSuccessView();
        case apiConstants.failure:
            return renderViewStatusFailureView();
        default:
            return null;
        }
  };

  return (
    <>
      {renderViewStatus()}
    </>
  );
};

export default ViewStatus;
