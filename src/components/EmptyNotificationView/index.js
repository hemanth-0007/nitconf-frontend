import './index.css';

const EmptyNotificationView = (props) => {

    return (
        <div className="empty-notification-container">
            <img className="empty-notification-image"  src = "https://res.cloudinary.com/drvnhpatd/image/upload/v1707208167/4966443_cao2a1.jpg" alt = "empty-notification"/>
            <p className='no-noti-text'>No Notifications Yet</p>
        </div>
    );
}

export default EmptyNotificationView;