import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Wishlist from './components/Wishlist';
import ShareableLink from './components/ShareableLink';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Wishlist />} />
          <Route path="/share/:listId" element={<ShareableLink />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;