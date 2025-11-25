import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AboutPage from './pages/AboutUs';
import ChatPage from './pages/AIChat';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <nav
        style={{
          padding: '1rem',
          borderBottom: '1px solid #ccc',
          marginBottom: '1rem',
        }}
      >
        <Link to="/" style={{ marginRight: '1rem' }}>
          Home
        </Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>
          About
        </Link>
        <Link to="/chat">
          Chat
        </Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
