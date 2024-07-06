import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";
import ViewApiFailureView from "../ViewApiFailureView";
import ModifyPaper from "../ModifyPaper";
import ReviewCard from "../ReviewCard";
import LoadingView from "../LoadingView";

import apiConstants from "../../constants/apiConstants";

import reviewsList from "../../data/reviews";

import fetchPaper from "../../services/apiRequests/getPaper";

import fetchPdf from "../../services/apiRequests/getPdf";

const PaperDetailedView = (props) => {
  const { paperId } = useParams();
  const deadline = "May 31, 2024";

  const [apiResponse, setApiResponse] = useState({
    apiResponseStatus: apiConstants.initial,
    data: {},
  });
  const [isModifyPaper, setisModifyPaper] = useState(false);

  useEffect(() => {
    fetchSession();
  }, []);

  const modifyPaper = () =>
    setisModifyPaper((prevModifyPaper) => !prevModifyPaper);

  const handleDownloadPdf = async () => {
    try {
      await fetchPdf(paperId);
    } catch (error) {
      console.error(`Error fetching PDF: ${error.message}`);
    }
  };

  const fetchSession = async () => {
    setApiResponse((prevApiResponse) => ({
      ...prevApiResponse,
      apiResponseStatus: apiConstants.progess,
    }));
    try {
      const data = await fetchPaper(paperId);
      console.log("paper data is : ", data);
      if (data !== null && data !== undefined) {
        setApiResponse({
          apiResponseStatus: apiConstants.success,
          data,
        });
      } else {
        setApiResponse({
          apiResponseStatus: apiConstants.failure,
          data: {},
        });
      }
    } catch (error) {
      console.error(`Error fetching paper: ${error.message}`);
      setApiResponse({
        apiResponseStatus: apiConstants.failure,
        data: {},
      });
    }
  };

  const renderModifyPaper = () =>
    isModifyPaper ? <ModifyPaper id={paperId} /> : null;

  const renderPaperSuccessView = () => {
    const { title, description, tags, documents } = apiResponse.data;
    const version = documents.length;

    return (
      <>
        <IoMdArrowRoundBack className="ml-5 mt-5 size-10 
        hover:-translate-x-2 transition-all ease-in-out hover:cursor-pointer "
        onClick={() => props.history.goBack()}/>
        <div className="flex flex-row justify-center">
          <div className="h-auto p-5 w-2/4 bg-slate-100 rounded-3xl border-4 border-slate-600 m-5 overflow-auto">
            <h1 className="text-4xl fw-600 font-sans font-semibold mb-2">
              {title}
            </h1>
            <p className="text-xl font-normal font-sans mb-2">{description}</p>
            <p className="text-xl">
              {" "}
              <span className="font-weight-bold">Deadline</span>: {deadline}
            </p>
            <p className="component-version">
              <span className="font-weight-bold">Version : </span>
              {version}
            </p>
            <span className="component-tags-heading font-weight-bold">
              Tags
            </span>
            <ul className="list-none flex flex-row justify-start mb-3">
              {tags.map((tag) => (
                <li key={tag.id} className="mr-2 mt-1 text-lg p-1">
                  {tag.title}
                </li>
              ))}
            </ul>
            <p className="text-xl font-semibold">Reviews</p>
            {reviewsList.length > 0 ? (
              <ul className="list-none">
                {reviewsList.map((review) => (
                  <ReviewCard key={review.id} reviewDetails={review} />
                ))}
              </ul>
            ) : (
              <p className="">No reviews yet</p>
            )}

            <div className="mt-4">
              <button
                className="bg-blue-600 font-semibold mr-2 rounded-full px-4 py-2 text-white hover:-translate-y-1 transition-all duration-300 ease-in-out"
                type="button"
                onClick={modifyPaper}
                variant="primary"
              >
                {isModifyPaper ? "Close" : "Modify"}
              </button>
              <button
                className="bg-blue-600 font-semibold mr-2 rounded-full px-4 py-2 text-white hover:-translate-y-1 transition-all duration-300 ease-in-out"
                type="button"
                onClick={handleDownloadPdf}
                variant="primary"
              >
                Download PDF
              </button>
            </div>
            {renderModifyPaper()}
          </div>
        </div>
      </>
    );
  };

  const renderPaperDetailedView = () => {
    const { apiResponseStatus } = apiResponse;
    switch (apiResponseStatus) {
      case apiConstants.progess:
        return <LoadingView />;
      case apiConstants.success:
        return renderPaperSuccessView();
      case apiConstants.failure:
        return <ViewApiFailureView />;
      default:
        return null;
    }
  };

  return (
    <div className="paper-detailed-view-main-container">
      {renderPaperDetailedView()}
    </div>
  );
};

export default PaperDetailedView;
