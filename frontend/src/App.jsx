import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SearchWeather from "./pages/SearchWeather";
import CreateWeather from "./pages/CreateWeather";
import "./components/App.css";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("skytrack_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Layout({ children }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("skytrack_user") || "{}");

  function handleLogout() {
    localStorage.removeItem("skytrack_token");
    localStorage.removeItem("skytrack_user");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">☁️</div>
          <div>
            <h1>SkyTrack</h1>
            <span>Clima Tempo</span>
          </div>
        </div>

        <nav className="nav-menu">
          <NavLink to="/buscar" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span>🔎</span>
            Buscar Clima
          </NavLink>

          <NavLink to="/inserir" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span>➕</span>
            Inserir Registro
          </NavLink>
        </nav>


        <div className="user-box">
          <div className="user-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div>
            <strong>{user.name || "Administrador"}</strong>
            <small>{user.email || "admin@skytrack.com"}</small>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="topbar-label">Projeto Web Fullstack</span>
            <h2>Sistema de Registros Climáticos</h2>
          </div>

          <div className="status-pill">
            <span className="status-dot"></span>
            <span>Online</span>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/buscar"
        element={
          <PrivateRoute>
            <Layout>
              <SearchWeather />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/inserir"
        element={
          <PrivateRoute>
            <Layout>
              <CreateWeather />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;