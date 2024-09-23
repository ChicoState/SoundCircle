import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TestPage from './Pages/TestPage1';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/testpage" element={<TestPage/>}/>
      </Routes>
    </>
  );
}

export default App; /* We have to export the app so that it works. */