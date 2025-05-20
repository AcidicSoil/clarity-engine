import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VeilPage from './pages/VeilPage';
import CastPage from './pages/CastPage';
import LogPage from './pages/LogPage';
import CutPage from './pages/CutPage';
import QueryPage from './pages/QueryPage';
import ScanPage from './pages/ScanPage';
import FlagPage from './pages/FlagPage';
import SavePage from './pages/SavePage';
import GlyphViewer from './pages/GlyphViewer';
import NotificationProvider from './context/NotificationContext';

// veil:design() log:"Defining CLARITY-OR-DEATH UI structure"

const App: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <NotificationProvider>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard">
          {sidebarActive && <Sidebar />}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/veil" element={<VeilPage />} />
              <Route path="/cast" element={<CastPage />} />
              <Route path="/log" element={<LogPage />} />
              <Route path="/cut" element={<CutPage />} />
              <Route path="/query" element={<QueryPage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/flag" element={<FlagPage />} />
              <Route path="/save" element={<SavePage />} />
              <Route path="/glyphs" element={<GlyphViewer />} />
            </Routes>
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default App;