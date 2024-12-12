import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SearchResultsPage from './Pages/SearchPage';
import UserPage from './Pages/User';
import UserSetup from './Pages/UserSetup';
import Feed from './Pages/Feed';
import Events from './Pages/Events';
import EventCreation from './Pages/EventCreation';

const SoundCircle = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <RouteBREAK path="/Search" element={<SearchResultsPage/>}/>
        <Route path="/User" element={<UserPage/>}/>
        <Route path="/Feed" element={<Feed/>}/>
        <Route path="/Usersetup" element={<UserSetup/>}/>
        <Route path="/Events" element={<Events/>}/>
        <Route path="/EventCreation" element={<EventCreation/>}/>
      </Routes>
    </>
  );
}

export default SoundCircle;
