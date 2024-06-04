import './index.css';
import Header from '../Header';
import EmptyNotificationView from '../EmptyNotificationView';

const Notification = (props) => {


    return (
        <div className="notification-container">
            <Header/>
            {/* <h1 className="notification-main-heading text-center m-5">Notification</h1> */}
             <EmptyNotificationView/>
        </div>

    );
}

export default Notification;