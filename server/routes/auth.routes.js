const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/auth.controller");

const {
  registerUser,
  getAllUsers,
  getRegisterUser
} = require("../controllers/register.controller");

const {
  registerOutlay,
  registerPay,
  getAllOutlays,
  getPay,
  getFinancialSummary
} = require("../controllers/finance.controller");


/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Registrar usuário
 *     tags: [Users]
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
 * /users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get("/users", getAllUsers);


/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Buscar usuário por email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email do usuário
 *         schema:
 *           type: string
 *           example: usuario@email.com
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/users/:email", getRegisterUser);


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
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/auth/login", loginUser);


/**
 * @swagger
 * /finance/outlay:
 *   post:
 *     summary: Registrar nova despesa
 *     tags: [Finance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Psicólogo
 *               money:
 *                 type: number
 *                 example: 100
 *               date:
 *                 type: string
 *                 example: 2026-03-20
 *               paid:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Despesa registrada com sucesso
 */
router.post("/finance/outlay", registerOutlay);


/**
 * @swagger
 * /finance/outlays:
 *   get:
 *     summary: Listar todas as despesas
 *     tags: [Finance]
 *     responses:
 *       200:
 *         description: Lista de despesas retornada com sucesso
 */
router.get("/finance/outlays", getAllOutlays);


/**
 * @swagger
 * /finance/pay:
 *   post:
 *     summary: Registrar salário do mês
 *     tags: [Finance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               money:
 *                 type: number
 *                 example: 2500
 *               dateRegister:
 *                 type: string
 *                 example: 2026-03-01
 *     responses:
 *       201:
 *         description: Salário registrado com sucesso
 */
router.post("/finance/pay", registerPay);


/**
 * @swagger
 * /finance/pays:
 *   get:
 *     summary: Listar salários registrados
 *     tags: [Finance]
 *     responses:
 *       200:
 *         description: Lista de salários retornada com sucesso
 */
router.get("/finance/pays", getPay);


/**
 * @swagger
 * /finance/summary:
 *   get:
 *     summary: Retornar resumo financeiro
 *     tags: [Finance]
 *     responses:
 *       200:
 *         description: Resumo financeiro retornado com sucesso
 */
router.get("/finance/summary", getFinancialSummary);


module.exports = router;