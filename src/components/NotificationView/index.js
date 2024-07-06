import "./index.css";
import EmptyNotificationView from "../EmptyNotificationView";

const NotificationView = (props) => {
  return (
    <div className="notification-container">
      <EmptyNotificationView />
    </div>
  );
};

export default NotificationView;
