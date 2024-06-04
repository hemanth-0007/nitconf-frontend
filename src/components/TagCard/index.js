import './index.css'
import { FaDeleteLeft } from "react-icons/fa6";

const TagCard = props => {
    const {tag, deleteTag} = props;
    const {id , title} = tag;
    return(
        <li className="tag-card-container">
            <p className='tag-card-title'>{title}</p>
            <FaDeleteLeft className="tag-card-delete-icon" onClick={() => deleteTag(id)}/>
        </li>
    );
}

export default TagCard;