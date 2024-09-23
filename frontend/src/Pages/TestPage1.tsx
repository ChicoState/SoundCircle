import CustomButton from '../Custom_Items/CustomButton';
import { useNavigate } from 'react-router-dom';


const TestPage1 = () => {
    const nextPage = useNavigate();
    return (
        <div className="App">
            <div className="App-header">
                <h1>Oops!</h1>
            </div>
            <div className="App-body-container">
                <div className="App-side w-1/5">Left Column</div>
                <div className="App-body w-3/5">There's nothing here.<br/>Sorry.</div>
                <div className="App-side w-1/5">Right Column</div>
            </div>
            <div className="App-footer"> {/* Footer */}
                <div className='footer-item'><CustomButton title="Back" disabled={false} click={() => nextPage('/')}/></div>
            </div>
            
        </div>
    );
}

export default TestPage1;