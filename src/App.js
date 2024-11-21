import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SharedWishlist from './components/SharedWishlist';
import ShareableLink from './components/ShareableLink';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './firebase';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/signin" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute><SharedWishlist /></PrivateRoute>} />
        <Route path="/wishlist/:listId" element={<PrivateRoute><ShareableLink /></PrivateRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;