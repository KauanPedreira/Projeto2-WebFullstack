import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@skytrack.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("skytrack_token", response.data.token);
      localStorage.setItem("skytrack_user", JSON.stringify(response.data.user));

      navigate("/buscar");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  }

 return (
  <main className="login-page">
    <section className="login-hero">
      <span>Projeto 2 Web Fullstack • Kauan Santos Pedreira</span>

      <h1>
        Bem-vindo ao <strong>SkyTrack</strong>
      </h1>

      <p>
        Matéria: Desenvolvimento Web Fullstack - 2026.1 (UTFPR)
        Professor: Prof. Willian Massami Watanabe
      </p>

      <div className="hero-features">
      </div>
    </section>

    <section className="login-card-wrapper">
      <div className="login-card">

        <h1>Entrar na conta</h1>
        <p>Acesse para gerenciar os registros climáticos.</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@skytrack.com"
          />

          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="admin123"
          />

          {error && <span className="error-text">{error}</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  </main>
);
}

export default Login;