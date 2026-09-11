import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PlayerBar from './components/PlayerBar';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { COMING_SOON_PAGES } from './navigation';
import ComingSoonPage from './pages/ComingSoonPage';
import CreditsPage from './pages/CreditsPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import OperaPage from './pages/OperaPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchPage from './pages/SearchPage';
import SignupPage from './pages/SignupPage';

function App() {
  const scrollContainerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Sidebar />
      <div className="main-column" ref={scrollContainerRef}>
        <TopBar />
        <main id="main" className="page" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlists" element={<LibraryPage />} />
            <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
            <Route path="/operas/:operaId" element={<OperaPage />} />
            {COMING_SOON_PAGES.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<ComingSoonPage title={page.title} description={page.description} />}
              />
            ))}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
