import "./User.css";
import Header from "../PageElements/Home/Universal/header";
import UserImage from "../PageElements/Home/UserPage/UserIcon";

const UserPage = () => {
    return(
        <div className="min-h-screen flex flex-col">
            {/*Main Page Container*/}
            <div>
            {/*Header Section*/}
                <Header/>
            </div>
            <div className="flex flex-grow">
                <div className="bg-gray-900 w-3/4 p-4">
                    <UserImage/>
                    {/* we have to add if the user is looking at another profile or it is its own profile*/}
                    <p className="UserName">WheresTheBeat16</p>
                </div>
                <div className="w-1/4 bg-gray-700 flex flex-grow">
                </div>
            </div>
        </div>
    )
}

export default UserPage;