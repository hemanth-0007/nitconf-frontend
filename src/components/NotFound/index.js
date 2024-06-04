import "./index.css";
const NotFound = (props) => {
  const onClickHome = () => {
    props.history.replace("/");
  };
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/drvnhpatd/image/upload/v1709726716/rq7c5zcgvtfghms2jkvb.jpg"
        alt="404 Not Found"
        className="not-found-image"
      />
      <h2 className="not-found-description">Page Not Found</h2>
      <button
        onClick={onClickHome}
        className="not-found-home-btn btn btn-primary"
      >
        Home
      </button>
    </div>
  );
};
export default NotFound;
