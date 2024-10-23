import "./User.css";
import Header from "../PageElements/Home/Universal/header";

const UserPage = () => {
    return(
        <div className="min-h-screen flex flex-col">
            {/*Main Page Container*/}
            <div>
            {/*Header Section*/}
                <Header/>
            </div>
            <div>
                <div className="w-1/4 bg-gray-700 p-4">
                </div>
            </div>
        </div>
    )
}

export default UserPage;