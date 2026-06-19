import { useState } from "react";
import api from "../services/api";
import WeatherCard from "../components/WeatherCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function SearchWeather() {
  const [city, setCity] = useState("");
  const [records, setRecords] = useState([]);
  const [cached, setCached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setRecords([]);

    try {
      const response = await api.get("/weather", {
        params: {
          city
        }
      });

      setRecords(response.data.data);
      setCached(response.data.cached);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar registros.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Consulta climática</span>
          <h1>Buscar registros</h1>
          <p>Pesquise registros climáticos cadastrados no banco PostgreSQL.</p>
        </div>
      </div>

      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Digite uma cidade. Ex: Cornelio Procopio"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>


      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className="weather-grid">
        {records.map((record) => (
          <WeatherCard key={record.id} record={record} />
        ))}
      </div>

      {!loading && records.length === 0 && !error && (
        <div className="empty-state">
          <h3>Nenhum registro exibido</h3>
          <p>Faça uma busca para visualizar os dados climáticos.</p>
        </div>
      )}
    </section>
  );
}

export default SearchWeather;