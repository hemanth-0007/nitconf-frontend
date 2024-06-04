const uploafPdf = async (sessionId, file) => {
  const pdfData = new FormData();
  pdfData.append("pdf-file", file);
  const jwtToken = Cookies.get("jwt_token");
  const url = `http://localhost:8082/api/abstract/doc/${sessionId}`;
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
      alert("PDF uploaded successfully");
      return;
    } else {
      alert("Error in uploading the PDF");
      return;
    }
  } catch (error) {
    console.log("err msg : ", error.message);
  }
};

export default uploafPdf;
