import { useEffect, useState } from "react";import './DescriptionBox.css';
import Cookies from "js-cookie";
import EditIcon from "../../../Components/pen.png";

const DescriptionBox: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSave = () => {
        setIsEditing(false); // Disable editing when saved
    };

    const handleEdit = () => {
        setIsEditing(true); // Re-enable editing
    };

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        setIsUserLoggedIn(!!accessToken);
    }, []);

    return (
        <div className="description-container">
            <textarea
                className="description-box"
                value={description}
                onChange={handleInputChange}
                rows={1} // Start with 1 row
                style={{ height: 'auto' }} // Allow auto height adjustment
                onInput={(e) => {
                    e.currentTarget.style.height = 'auto'; // Reset height
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set height to scrollHeight
                }}
                placeholder="Write your description here..."
                readOnly={!isEditing} // Disable editing if not in editing mode
            />
            {isUserLoggedIn && (
                <div className="action-container">
                    <button onClick={isEditing ? handleSave:handleEdit} className="Action">
                        <img src={EditIcon} alt="Edit Icon" className="Edit-Icon"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;
