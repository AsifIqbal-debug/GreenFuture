import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import DonatePage from './components/DonatePage';
import Dashboard from './components/Dashboard';
import CSRPage from './components/CSR';
import TrackPage from './components/TrackPage';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track" element={<TrackPage />} /> 
            <Route path="/csr" element={<CSRPage />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;
