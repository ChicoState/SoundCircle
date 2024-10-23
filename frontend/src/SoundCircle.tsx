import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchResultsPage from './Pages/SearchPage';
import UserPage from './Pages/User';

const SoundCircle = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Search" element={<SearchResultsPage/>}/>
        <Route path="/User" element={<UserPage/>}/>
      </Routes>
    </>
  );
}

export default SoundCircle;