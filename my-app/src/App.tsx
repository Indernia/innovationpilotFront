import { NavLink, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutUs';
import ChatPage from './pages/AIChat';
import flag from './assets/Innovationpilotflag.jpg';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">

        {/* TITLE + FLAG */}
        <div className="app-title">
          <h1 className="title-text">
            <img src={flag} alt="Flag" className="app-flag" />
            Aquavate
          </h1>
          <span>Group 1 </span>
        </div>

        {/* NAVIGATION BAR */}
        <nav className="app-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
          >
            💬 Chat
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              'nav-link' + (isActive ? ' nav-link-active' : '')
            }
          >
            🌿 About
          </NavLink>
        </nav>
      </header>

      {/* MAIN LAYOUT */}
      <main className="app-main">
        <section className="page-section">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </section>

        <aside className="sidebar-card">
          <p>👮 Little reminder:</p>
          <p>Please don't share any personal info in this chat. Stay safe.</p>
          <div className="sidebar-chip-row">
            <span className="sidebar-chip">🤖 o3-mini is used</span>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
