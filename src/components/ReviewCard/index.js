import { FaUserCircle } from "react-icons/fa";

const ReviewCard = props => {
    const { reviewDetails } = props;
    const {reviewer, reviewContent } = reviewDetails;
    return (
        <li className="flex flex-row justify-start items-center m-2">
            <FaUserCircle className="mr-2 size-5" />
            <div>
                <p className="">XXX-XXX</p>
                <p className="">{reviewContent}</p>
            </div>
        </li>
    );
}

export default ReviewCard;