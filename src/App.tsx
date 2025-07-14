/* prettier-ignore */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomePage, MovieDetailsPage, FavoritesPage } from '@/pages';
import '@/styles/index.css';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1] || 'home';

  return (
    <main>
      <div className="mainContainer">
        <Header activeTab={activeTab} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </main>
  );
}
