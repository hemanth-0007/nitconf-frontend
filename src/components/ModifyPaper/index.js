import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { Button } from "react-bootstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// import { Button } from "react-bootstrap";

const ModifyPaper = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }
    setPdfFile(file);
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { id } = props;
    const pdfData = new FormData();
    pdfData.append("file", pdfFile);
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:8082/api/abstract/doc/${id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: pdfData,
    };
    try {
      const response = await fetch(url, options);
      console.log("upload pdf response object : ", response);
      // const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setIsLoading(false);
        alert("PDF modified successfully");
        setPdfError("");
        return;
      } else {
        setIsLoading(false);
        alert("Error in modifying the PDF");
        setPdfError("Error in modifying the PDF");
        return;
      }
    } catch (error) {
      console.log("The err msg is : ", error.message);
      setIsLoading(false);
      setPdfError("Error in modifying the PDF");
    }
  };

  const renderPdfField = () => {
    return (
      <div>
        <label className="input-label mr-4" htmlFor="pdf-file">
          Upload PDF :{" "}
        </label>
        <input
          type="file"
          id="pdf-file"
          accept=".pdf"
          className="username-input-field"
          onChange={handleFileChange}
          placeholder="Upload PDF"
          required = "required"
        />
      </div>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <div className="loader-container">
        <Loader type="ThreeDots" color="#00BFFF" height={40} width={40} />
      </div>
    ) : null;
  };

  return (
    <form onSubmit={onHandleSubmit} className="modify-paper-container">
      <h3 className="text-2xl font-semibold pt-4">Modify Paper</h3>
      <div className="flex flex-col justify-center items-start">
        {renderPdfField()}
        <Button variant="primary" type="submit" className="bg-blue-600 font-semibold mt-3">
          Submit
        </Button>
      </div>
      {renderLoader()}
      <p>{pdfError}</p>
    </form>
  );
};

export default ModifyPaper;
