import React from "react"
import { useNavigate } from "react-router-dom"

interface NavigationButtonProps {
    buttonText: string
    className?: string
    navigationPath?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ buttonText, className, navigationPath }) => {
    const navigate = useNavigate(); // Init navigation function

    // Navigate to page if navigationPath not null
    const handleClick = () => {
        if (navigationPath) {
            navigate(navigationPath);
        }
    }

    return (
        <button className={`${className}`} onClick={handleClick}>
            {buttonText}
        </button>
    );
}

export default NavigationButton;