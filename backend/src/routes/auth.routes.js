const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const xss = require("xss");

const User = require("../models/User");
const Log = require("../models/Log");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = xss(String(email || "").trim());
    password = String(password || "");

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email é obrigatório."
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido."
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Senha é obrigatória."
      });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha inválidos."
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      await Log.create(user.id, "AUTH_ERROR", `Tentativa de login inválida para ${email}`);

      return res.status(401).json({
        success: false,
        message: "Email ou senha inválidos."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

    await Log.create(user.id, "LOGIN", `Usuário ${email} realizou login.`);

    return res.json({
      success: true,
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno ao realizar login.",
      error: error.message
    });
  }
});

module.exports = router;