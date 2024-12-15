import { useEffect, useState } from "react";import './DescriptionBox.css';
import Cookies from "js-cookie";
import EditIcon from "../Images/pen.png";

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
        <div className="w-7/10 h-[60px] max-w-xs top-[-570px] left-[-5px] relative ">
            <textarea
                className="w-full p-2 max-w-xs text-sm border border-gray-300 rounded-md bg-white resize-none min-h-[200px] overflow-hidden opacity-55"
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
                        <img src={EditIcon} alt="Edit Icon" className="bg-gray-700 w-[50px] h-[50px]"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;
