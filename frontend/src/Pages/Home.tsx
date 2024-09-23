import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Custom_Items/CustomButton';
  
  const Home = () => {
    const [count, setCount] = useState(1);
  
    const handleButtonPress = () => {
      setCount(count + 1);
    }
  
    const nextPage = useNavigate();
  
    return (
      <div className="App">
        <header className="App-header"> {/* Header */}
          <h1>React.js Header</h1> 
        </header>
        <body className="App-body"> {/* Body */}
          <p>
            Hey. <br/> This is just a body test. <br/> Cool, huh? :)
          </p>
        </body>
        <div className="App-footer"> {/* Footer */}
          <div className='footer-item'><CustomButton title="Do Not Press" disabled={false} click={handleButtonPress}/></div>
          <div>{count}</div>
          <div className='footer-item'><CustomButton title="Next Page" disabled={false} click={() => nextPage('TestPage')}/></div>
        </div>
      </div>
    );
  }

  export default Home;