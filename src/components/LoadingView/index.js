import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingView = () => {
  return (
    <div className="loader-container flex flex-col justify-center items-center h-screen">
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoadingView;
