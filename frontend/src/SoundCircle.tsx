import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchResultsPage from './Pages/SearchPage';

const SoundCircle = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Search" element={<SearchResultsPage/>}/>
      </Routes>
    </>
  );
}

export default SoundCircle;
