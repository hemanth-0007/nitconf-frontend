import "./index.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NoSessionsView = props => {
  const history = useHistory();
  const onClickUploadPaper = () =>{
    history.push("/upload-paper");
  }
  return (
    <div className="no-sessions-view-container">
      <img
        src="https://res.cloudinary.com/drvnhpatd/image/upload/v1709973976/zeoxjw0tkiykl29rompe.jpg"
        className="no-sessions-view-img"
        alt="no-sessions-img"
      />
      <h1 className="no-sessions-view-heading">You haven't submitted any papers</h1>
      <p className="no-sessions-view-description">Upload Your First Paper Here..</p>
      <button className="btn btn-primary no-sessions-view-upload-btn"
      onClick={onClickUploadPaper}>
        Upload 
      </button>
    </div>
  );
};

export default NoSessionsView;
