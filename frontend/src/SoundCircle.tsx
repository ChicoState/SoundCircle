import './SoundCircle.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TestPage from './Pages/TestPage1';

const SoundCircle = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/testpage" element={<TestPage/>}/>
      </Routes>
    </>
  );
}

export default SoundCircle;