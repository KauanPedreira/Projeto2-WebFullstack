import { useState } from "react";
import api from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

function CreateWeather() {
  const [formData, setFormData] = useState({
    city: "",
    temperature: "",
    windspeed: "",
    winddirection: "",
    description: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/weather", formData);

      setSuccess(response.data.message);

      setFormData({
        city: "",
        temperature: "",
        windspeed: "",
        winddirection: "",
        description: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao cadastrar registro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Novo dado climático</span>
          <h1>Inserir registro</h1>
          <p>Cadastre informações climáticas similares às utilizadas no SkyTrack original.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: Cornelio Procopio"
            />
          </div>

          <div className="input-group">
            <label>Temperatura °C</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="Ex: 24"
            />
          </div>

          <div className="input-group">
            <label>Velocidade do vento</label>
            <input
              type="number"
              name="windspeed"
              value={formData.windspeed}
              onChange={handleChange}
              placeholder="Ex: 12"
            />
          </div>

          <div className="input-group">
            <label>Direção do vento</label>
            <input
              type="number"
              name="winddirection"
              value={formData.winddirection}
              onChange={handleChange}
              placeholder="Ex: 180"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Parcialmente nublado"
            rows="5"
          />
        </div>

        {success && <p className="success-text">{success}</p>}
        {error && <ErrorMessage message={error} />}

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar registro"}
        </button>
      </form>
    </section>
  );
}

export default CreateWeather;