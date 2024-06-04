import { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = (props) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const  onDocumentLoadSuccess = ({ numPages }) =>  {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={props.pdfString} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>

      {/* <Document
        file={`data:application/pdf;base64,${props.pdfString}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
         {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document> */}
   
    </div>
  );
}
export default PdfViewer;