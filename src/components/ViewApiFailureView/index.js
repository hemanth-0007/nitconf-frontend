import './index.css';
import apiFailed from '../../assets/apiFailed.jpg'; 

const ViewApiFailureView = () => {
    return (
        <div className="view-status-failure-view">
            <img className='failed-image' src = {apiFailed} alt = "no-response-image" />
            <h1 className='failed-view-text'>Failed to fetch data</h1>
        </div>
    );
}

export default ViewApiFailureView;