import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ViewApiFailureView from "../ViewApiFailureView";
import ModifyPaper from "../ModifyPaper";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import ReviewCard from "../ReviewCard";

import apiResponseStatusConstants from "../../constants/apiResponseStatusConstants";

import reviewsList from "../../data/reviews";

import fetchPaper from "../../services/apiRequests/getPaper";

import fetchPdf from "../../services/apiRequests/getPdf";

const PaperDetailedView = (props) => {
  const [pdfString, setPdfString] = useState("");
  const { paperId } = useParams();
  const deadline = "May 31, 2024";
  const [apiResponse, setApiResponse] = useState({
    apiResponseStatus: apiResponseStatusConstants.initial,
    data: {},
  });

  const [isModifyPaper, setisModifyPaper] = useState(false);

  // const fetchPdf = async () => {
  //   try {
  //     const jwtToken = Cookies.get("jwt_token");
  //     console.log(paperId);
  //     const url = `http://localhost:8082/api/abstract/doc/${paperId}`;
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/pdf",
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     };
  //     const response = await fetch(url, options);
  //     console.log(response);
  //     if (response.ok) {
  //       console.log("PDF fetched successfully");
  //       alert("PDF fetched successfully");
  //       const blob = await response.blob();
  //       console.log(blob);
  //       const pdfUrl = URL.createObjectURL(blob);
  //       console.log(pdfUrl);
  //       setPdfString(pdfUrl);

  //       // window.open(pdfUrl, '_blank');
  //       // let base64String;

  //       // let reader = new FileReader();
  //       // reader.readAsDataURL(blob);
  //       // reader.onloadend = () => {
  //       //   base64String = reader.result;
  //       //   setPdfString(base64String.substr(base64String.indexOf(',') + 1));
  //       // };
  //     } else {
  //       console.log("Error fetching PDF");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching PDF", error);
  //   }
  // };

  const modifyPaper = () =>
    setisModifyPaper((prevModifyPaper) => !prevModifyPaper);

  const onClickGoBack = () => props.history.goBack();

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
      apiResponseStatus: apiResponseStatusConstants.progess,
    }));
    try {
      const data = await fetchPaper(paperId);
      if (data !== null && data !== undefined) {
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.success,
          data,
        });
      } else {
        setApiResponse({
          apiResponseStatus: apiResponseStatusConstants.failure,
          data: {},
        });
      }
    } catch (error) {
      console.error(`Error fetching paper: ${error.message}`);
      setApiResponse({
        apiResponseStatus: apiResponseStatusConstants.failure,
        data: {},
      });
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const renderPaperLoadingView = () => (
    <div className="loader-container">
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );

  const renderModifyPaper = () =>
    isModifyPaper ? <ModifyPaper id={paperId} /> : null;

  const renderPaperSuccessView = () => {
    const { title, description, tags, documents } = apiResponse.data;
    const version = documents.length;

    return (
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
          <span className="component-tags-heading font-weight-bold">Tags</span>
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
            <Button
              className="bg-blue-600 font-semibold mr-2"
              type="button"
              onClick={modifyPaper}
              variant="primary"
            >
              {isModifyPaper ? "Close" : "Modify"}
            </Button>
            <Button
              className="bg-blue-600 font-semibold mr-2"
              type="button"
              onClick={handleDownloadPdf}
              variant="primary"
            >
              Download PDF
            </Button>
             
            <Button
              className="bg-blue-600 font-semibold mr-2"
              type="button"
              onClick={onClickGoBack}
              variant="primary"
            >
              Go Back{" "}
            </Button>
          </div>
          {renderModifyPaper()}
        </div>
      </div>
    );
  };

  const renderPaperFailureView = () => <ViewApiFailureView />;

  const renderPaperDetailedView = () => {
    const { apiResponseStatus } = apiResponse;
    switch (apiResponseStatus) {
      case apiResponseStatusConstants.progess:
        return renderPaperLoadingView();
      case apiResponseStatusConstants.success:
        return renderPaperSuccessView();
      case apiResponseStatusConstants.failure:
        return renderPaperFailureView();
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
