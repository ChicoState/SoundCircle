import { useState,useEffect } from "react";
import UserIcon from "../../../Components/UserIconTemp.png";
import './UserIcon.css';


const UserImage: React.FC = () => {
    return(
        <div className="User-Image"> 
            <img src={UserIcon} alt="SC Logo" className="circlular-user" />
        </div>
    );
};

export default UserImage;