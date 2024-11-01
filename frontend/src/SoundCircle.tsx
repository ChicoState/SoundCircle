import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchResultsPage from './Pages/SearchPage';
import UserPage from './Pages/User';
import Feed from './Pages/Feed/Feed';

const SoundCircle = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Search" element={<SearchResultsPage/>}/>
        <Route path="/User" element={<UserPage/>}/>
        <Route path="/Feed" element={<Feed/>}/>
      </Routes>
    </>
  );
}

export default SoundCircle;
