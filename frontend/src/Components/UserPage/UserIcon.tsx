import React, { useState } from "react";
import UserIconTemp from "../Images/UserIconTemp.png";
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
        <div className="relative">
            <div className="relative top-[-70px] left-[-70px] flex flex-col items-center z-10">
                <img src={userImage} alt="User Icon" className="w-24 h-24" />
                <label htmlFor="file-input" className="absolute top-[50px] right-[50px] text-2xl text-black cursor-pointer">+</label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <p className="mt-2 text-center font-bold">{username}</p>
            </div>

            {/* Render DescriptionBox as a separate component outside the background */}
            <DescriptionBox />
            
            <div className="mt-32">
                {/* Additional content */}
            </div>
        </div>
    );
};

export default UserImage;
