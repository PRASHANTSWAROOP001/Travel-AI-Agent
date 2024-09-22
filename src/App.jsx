import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';


const LoginPage = lazy(() => import('./pages/LoginPage'));
const SavedTrip = lazy(() => import('./pages/SavedTrip'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const About = lazy(() => import('./pages/About'));
const PremiumSearch = lazy(() => import('./pages/PremiumSearch.jsx'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="saved-trip" element={<SavedTrip />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="premium-search" element={<PremiumSearch />} />
            <Route path="*" element={<ErrorPage />} /> {/* Catch all route for error handling */}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
