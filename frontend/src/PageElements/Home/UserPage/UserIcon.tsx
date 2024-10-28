import UserIcon from "../../../Components/UserIconTemp.png";
import RandomGavinNewsom from "../../../Components/download.jpg";
import './UserIcon.css';


const UserImage: React.FC = () => {
    return(
        <div className="User-Image"> 
            <img src={RandomGavinNewsom} alt="SC Logo" className="circlular-user" />
        </div>
    );
};

export default UserImage;