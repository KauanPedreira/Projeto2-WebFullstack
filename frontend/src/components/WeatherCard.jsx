function WeatherCard({ record }) {
  return (
    <article className="weather-card">
      <div className="weather-card-header">
        <div>
          <span className="card-label">Cidade</span>
          <h2>{record.city}</h2>
        </div>

        <div className="temperature-badge">
          {Number(record.temperature).toFixed(1)}°C
        </div>
      </div>

      <p className="weather-description">{record.description}</p>

      <div className="weather-details">
        <div>
          <span>Vento</span>
          <strong>{record.windspeed ?? "-"} km/h</strong>
        </div>

        <div>
          <span>Direção</span>
          <strong>{record.winddirection ?? "-"}°</strong>
        </div>

        <div>
          <span>Cadastrado em</span>
          <strong>
            {new Date(record.created_at).toLocaleDateString("pt-BR")}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;