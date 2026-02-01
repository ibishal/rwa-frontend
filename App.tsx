import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import MarketPage from './pages/MarketPage';
import TradePage from './pages/TradePage';
import SettlementPage from './pages/SettlementPage';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/market" element={<Layout><MarketPage /></Layout>} />
        <Route path="/trade" element={<Layout><TradePage /></Layout>} />
        <Route path="/settlement" element={<Layout><SettlementPage /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;