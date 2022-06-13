import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnimeDetails from './pages/AnimeDetails';
import AnimeList from './pages/AnimeList';
import CollectionDetails from './pages/CollectionDetails';
import CollectionList from './pages/CollectionList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/collection/:collectionId" element={<CollectionDetails />} />
        <Route path="/collection" element={<CollectionList />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/" element={<AnimeList />} />         
      </Routes>
    </Router>
  );
}

export default App;
