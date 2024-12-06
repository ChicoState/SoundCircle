import React from 'react';
import { IoMdCalendar } from "react-icons/io";

interface EventCreationButtonProps {
    className?: string;
    onClick?: () => void;
}

const EventCreationButton: React.FC<EventCreationButtonProps> = ({
    className = '',
    onClick
}) => {
    return (
        <button
            onClick={onClick}
                className={`
                bg-purple-600
                text-white
                px-6
                py-2
                rounded-full
                hover:bg-purple-700
                text-center
                font-semibold
                shadow-md
                transition
                duration-300
                ease-in-out
                ${className}
            `}
        >
        <span className="flex items-center">
            <IoMdCalendar />
            <span className="px-2">Create Event</span>
        </span>
    </button>
    );
};

export default EventCreationButton;