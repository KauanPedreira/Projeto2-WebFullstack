const express = require("express");

const Log = require("../models/Log");
const authenticate = require("../config/auth");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const logs = await Log.findAll();

    return res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar logs.",
      error: error.message
    });
  }
});

module.exports = router;