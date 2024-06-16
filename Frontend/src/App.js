import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import SigninPage from './components/Signin';
import SignupPage from './components/Signup';
import SpaceCollection from './components/SpaceCollection';
import SpaceCollectionNew from './components/spaceCollectionNew';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/spaceCollection" element={<SpaceCollection />} />
        <Route path="/spaceCollectionNew" element={<SpaceCollectionNew />} />
      </Routes>
    </Router>
  );
}

export default App;
