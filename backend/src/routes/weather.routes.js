const express = require("express");
const xss = require("xss");

const Weather = require("../models/Weather");
const Log = require("../models/Log");
const authenticate = require("../config/auth");
const cache = require("../config/cache");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const city = xss(String(req.query.city || "").trim());

    const cacheKey = `weather:${city || "all"}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    let records;

    if (city) {
      records = await Weather.search(city);
      await Log.create(req.user.id, "BUSCA", `Usuário buscou registros da cidade: ${city}`);
    } else {
      records = await Weather.findAll();
      await Log.create(req.user.id, "BUSCA", "Usuário listou todos os registros climáticos.");
    }

    cache.set(cacheKey, records);

    return res.json({
      success: true,
      cached: false,
      data: records
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar registros climáticos.",
      error: error.message
    });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    let { city, temperature, windspeed, winddirection, description } = req.body;

    city = xss(String(city || "").trim());
    description = xss(String(description || "").trim());

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "Cidade é obrigatória."
      });
    }

    if (temperature === undefined || temperature === null || temperature === "") {
      return res.status(400).json({
        success: false,
        message: "Temperatura é obrigatória."
      });
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Descrição é obrigatória."
      });
    }

    temperature = Number(temperature);
    windspeed = windspeed === "" || windspeed === undefined ? null : Number(windspeed);
    winddirection = winddirection === "" || winddirection === undefined ? null : Number(winddirection);

    if (!Number.isFinite(temperature)) {
      return res.status(400).json({
        success: false,
        message: "Temperatura deve ser um número válido."
      });
    }

    if (windspeed !== null && !Number.isFinite(windspeed)) {
      return res.status(400).json({
        success: false,
        message: "Velocidade do vento deve ser um número válido."
      });
    }

    if (winddirection !== null && !Number.isFinite(winddirection)) {
      return res.status(400).json({
        success: false,
        message: "Direção do vento deve ser um número válido."
      });
    }

    const record = await Weather.create({
      city,
      temperature,
      windspeed,
      winddirection,
      description
    });

    cache.flushAll();

    await Log.create(
      req.user.id,
      "INSERÇÃO",
      `Usuário cadastrou registro climático para ${city}.`
    );

    return res.status(201).json({
      success: true,
      message: "Registro climático cadastrado com sucesso.",
      data: record
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao cadastrar registro climático.",
      error: error.message
    });
  }
});

module.exports = router;