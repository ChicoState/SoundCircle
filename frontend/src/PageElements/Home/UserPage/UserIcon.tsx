import React, { useState } from "react";
import UserIconTemp from "../../../Components/UserIconTemp.png";
import DescriptionBox from "./DescriptionBox";
import './UserIcon.css';

interface UserImageProps {
    username: string;
}

const UserImage: React.FC<UserImageProps> = ({ username }) => {
    const [userImage, setUserImage] = useState<string>(UserIconTemp);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setUserImage(imageURL);
        }
    };

    return (
        <div className="container">
            <div className="User-Image">
                <img src={userImage} alt="User Icon" className="circular-user" />
                <label htmlFor="file-input" className="plus-icon">+</label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                <p className="username">{username}</p>
            </div>

            {/* Render DescriptionBox as a separate component outside the background */}
            <DescriptionBox />
            
            <div className="other-section">
                {/* Additional content */}
            </div>
        </div>
    );
};

export default UserImage;
