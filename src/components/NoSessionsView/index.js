import "./index.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NoSessionsView = props => {
  const history = useHistory();
  const onClickUploadPaper = () => history.push("/upload-paper");
  
  return (
    <div className="no-sessions-view-container">
      <img
        src="https://res.cloudinary.com/drvnhpatd/image/upload/v1709973976/zeoxjw0tkiykl29rompe.jpg"
        className="no-sessions-view-img"
        alt="no-sessions-img"
      />
      <h1 className="text-xl font-semibold font-mono">You haven't submitted any papers</h1>
      <p className="text-lg text-gray-700 font-mono">Upload Your First Paper Here..</p>
      <button className="rounded-full bg-blue-600 text-white font-semibold
                          hover:-translate-y-1 transition-all ease-in-out duration-100
                          p-4 m-5"
      onClick={onClickUploadPaper}>
        Upload 
      </button>
    </div>
  );
};

export default NoSessionsView;
