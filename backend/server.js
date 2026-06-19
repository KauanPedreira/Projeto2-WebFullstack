require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const pool = require("./src/config/database");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Muitas requisições. Tente novamente mais tarde."
  }
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "SkyTrack API funcionando!",
      database: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao conectar com o banco de dados.",
      error: error.message
    });
  }
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});