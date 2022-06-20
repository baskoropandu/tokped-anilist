/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnimeDetails from './pages/AnimeDetails';
import AnimeList from './pages/AnimeList';
import CollectionDetails from './pages/CollectionDetails';
import CollectionList from './pages/CollectionList';
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <div css={GlobalStyles.body}>
              <Toaster
                position="top-center"
                reverseOrder={false}
                containerStyle={{
                  left:0,
                  right:0,
                  top:0,
                  bottom:0
                }}
              />
              <Navbar/>
        <Routes>
            <Route path="/collections/:collectionId" element={<CollectionDetails />} />
            <Route path="/collections" element={<CollectionList />} />
            <Route path="/animes/:animeId" element={<AnimeDetails />} />
            <Route path="/" element={<AnimeList />} />         
        </Routes>
      </div>
    </Router>
  );
}

class GlobalStyles {
  static body = css`
    background-color: #F9F2ED;
    min-height: 100vh;
    width: 100vw;
    overflow-y: scroll ;
  `
}

export default App;
