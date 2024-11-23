import React from "react"
import { useNavigate } from "react-router-dom"

interface NavigationButtonProps {
    className?: string
    username?: string
    altText?: string
    profileImage?: string
    navigationPath?: string
}

const NavigationButton_UserProfilePic: React.FC<NavigationButtonProps> = ({ className, username, altText, profileImage, navigationPath }) => {
    // If we have a profile pic URL, use it. Otherwise use placeholder
    const profilePic = profileImage ? profileImage : process.env.REACT_APP_PLACEHOLDER_USER;

    const navigate = useNavigate(); // Init navigation function

    // Navigate to page if navigationPath not null
    const handleClick = () => {
        if (navigationPath) {
            navigate(navigationPath);
        }
    }

    return (
        <button onClick={handleClick}>
            <img 
                className={`${className}`} 
                src={profilePic}
                alt={username}
            />
        </button>
    );
}

export default NavigationButton_UserProfilePic;