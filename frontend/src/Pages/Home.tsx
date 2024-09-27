import "./Home.css";
// import { useNavigate } from "react-router-dom";
import FeedContainer from "../PageElements/Home/Feed/feed-container";


const Home = () => {
    return (
        <div className="HomePage">
            <div className="HomePage-header"></div>
            <div className="HomePage-columnLeft">
                <FeedContainer/>
            </div>
            <div className="HomePage-columnRight"></div>
            <div className="HomePage-footer"></div>
        </div>
    );
}

export default Home;