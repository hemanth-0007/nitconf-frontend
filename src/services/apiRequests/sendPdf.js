import Cookies from "js-cookie";

// file is of type application/pdf 
const sendPdf = async (file, paper_id, changes) => {
   
    const jwtToken = Cookies.get("jwt_token");
    // we are sending the formData
    const pdfData = new FormData();
    pdfData.append("pdf-file", file);
    pdfData.append("changes_description", changes);
    const url = `${process.env.REACT_APP_API_URL}/api/docs/add/${paper_id}`;
    const options = {
      method: "POST",
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
        // alert("PDF uploaded successfully");
        return true;
      } else {
        // alert("Error in uploading the PDF");
        return false;
      }
    } catch (error) {
      console.log("err msg : ", error.message);
      return false;
    }
}

export default sendPdf;