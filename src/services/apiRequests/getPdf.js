import Cookies from "js-cookie";

const fetchPdf = async (paperId) => {
  try {
    const jwtToken = Cookies.get("jwt_token");
    console.log(paperId);
    const url = `http://localhost:8082/api/docs/get-latest/${paperId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    console.log(response);
    if (response.ok) {
      console.log(response);
      const responseData = await response.json();
      console.log(responseData);
      const buffer = new Uint8Array(responseData.file.data);
      const blob = new Blob([buffer], { type: "application/pdf" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = `${responseData.original_name}`;
      a.click();
      URL.revokeObjectURL(url);
      a.remove();
    } else {
      console.log("Error fetching PDF");
    }
  } catch (error) {
    console.error("Error fetching PDF", error);
    throw new Error("Error fetching PDF");
  }
};

export default fetchPdf;
