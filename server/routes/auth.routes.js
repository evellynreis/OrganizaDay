const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/auth.controller");
const { registerUser } = require("../controllers/register.controller");

/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Usuário Testador
 *               dateBirthday:
 *                 type: string
 *                 example: 1990-01-01
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post("/register/user", registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/auth/login", loginUser);

module.exports = router;