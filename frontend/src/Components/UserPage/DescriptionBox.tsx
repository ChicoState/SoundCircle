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
        <div className="relative w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <textarea
                className="w-full p-2  text-sm border border-gray-300 rounded-md bg-white resize-none min-h-[200px] overflow-hidden opacity-55"
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
                <div className="absolute top-[-45px] right-2">
                    <button onClick={isEditing ? handleSave:handleEdit} className="bg-gray-700 p-2">
                        <img src={EditIcon} alt="Edit Icon" className="w-[25px] h-[25px] top-[10px]"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;
