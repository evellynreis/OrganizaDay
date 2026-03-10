function registerUser(req, res) {
  const { nome, dateBirthday, email, password } = req.body;

  if (!nome || !dateBirthday || !email || !password) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  return res.status(201).json({
    message: "Usuário registrado com sucesso",
    user: {
      nome,
      email,
    },
  });
}

module.exports = {
  registerUser
};